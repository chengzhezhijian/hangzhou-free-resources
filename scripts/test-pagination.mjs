#!/usr/bin/env node
/**
 * 分页与筛选联动 — jsdom 集成测试
 * 覆盖：筛选后页数重算、页码重置、clamp、空结果、默认列表分页
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";
import { loadSiteData } from "./lib/load-site-data.mjs";
import { createFilterEngine } from "./lib/filter-logic.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const JS_DIR = path.join(ROOT, "js");
const GEO_POS_KEY = "hz_geo_pos_v1";

const SCRIPTS = [
  "theme-switch.js",
  "design-variants.js",
  "copy-variants.js",
  "site-config.js",
  "copy-switch.js",
  "data-china-config.js",
  "geo.js",
  "map-nav.js",
  "analytics.js",
  "data-study-spaces.js",
  "data-extra-resources.js",
  "data-zhejiang-cities.js",
  "data-zhejiang-expanded.js",
  "data-china-nationwide.js",
  "data-amap-poi.js",
  "data.js",
  "resource-coords.js",
  "filter-shared.js",
  "site-stats.js",
  "adaptive-fonts.js",
  "layout.js",
  "design-engine.js",
  "ui-premium.js",
  "app.js",
];

const tick = () => new Promise((r) => setTimeout(r, 0));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function makeMatchMedia(opts = {}) {
  const desktop = !!opts.desktop;
  return (query) => ({
    matches: /min-width:\s*960px/.test(String(query)) ? desktop : false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

function boot(opts = {}) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: opts.url || "https://localhost/",
  });
  const { window } = dom;

  window.matchMedia = makeMatchMedia({ desktop: !!opts.desktop });
  window.fetch = async () => ({ ok: true, json: async () => ({ themes: [] }) });
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  }
  Object.defineProperty(window.navigator, "vibrate", { value: () => true, configurable: true });
  Object.defineProperty(window.navigator, "geolocation", {
    configurable: true,
    value: {
      getCurrentPosition(success, error) {
        const geo = opts.geo ?? "error";
        if (geo === "error") {
          error(Object.assign(new Error("denied"), { code: 1 }));
        } else {
          success({ coords: { latitude: geo.lat, longitude: geo.lng, accuracy: 30 } });
        }
      },
    },
  });

  window.localStorage.setItem("zheli_onboard_v1", "1");
  if (opts.seedLocation) {
    window.localStorage.setItem(
      GEO_POS_KEY,
      JSON.stringify({ lat: opts.seedLocation.lat, lng: opts.seedLocation.lng, at: Date.now() })
    );
  }

  const code = SCRIPTS.map((f) => fs.readFileSync(path.join(JS_DIR, f), "utf8")).join("\n;\n");
  window.eval(code);

  const cssFiles = ["css/style.css", "css/premium-ui.css"];
  for (const file of cssFiles) {
    const style = window.document.createElement("style");
    style.textContent = fs.readFileSync(path.join(ROOT, file), "utf8");
    window.document.head.appendChild(style);
  }

  return { dom, window, doc: window.document };
}

function pageInfo(doc) {
  return doc.querySelector("#pagination .page-info")?.textContent?.trim() || "";
}

function totalPagesFromInfo(text) {
  const m = String(text).match(/\/\s*(\d+)\s*$/);
  return m ? Number(m[1]) : 0;
}

function parseCount(doc) {
  const text = doc.getElementById("resultCount")?.textContent || "";
  const m = text.match(/共\s*(\d+)\s*处/);
  return m ? Number(m[1]) : 0;
}

async function selectCity(doc, city) {
  doc.getElementById("cityQuickBtn")?.click();
  await tick();
  doc.querySelector(`#cityHotGrid .city-pill[data-city="${city}"]`)?.click();
  await wait(80);
}

async function selectCategory(doc, categoryId) {
  doc.getElementById("quickCategoryBtn")?.click();
  await tick();
  doc.querySelector(`#quickDropPanel [data-category="${categoryId}"]`)?.click();
  await wait(80);
}

async function goNextPage(doc) {
  doc.querySelector('#pagination [data-page="next"]:not([disabled])')?.click();
  await wait(50);
}

async function goPrevPage(doc) {
  doc.querySelector('#pagination [data-page="prev"]:not([disabled])')?.click();
  await wait(50);
}

const site = loadSiteData();
const engine = createFilterEngine({
  RESOURCES: site.RESOURCES,
  RESOURCE_CATEGORIES: site.RESOURCE_CATEGORIES,
});
const PAGE_SIZE = 48;

function filteredCount(state) {
  return engine.filterResources({
    group: "all",
    category: "all",
    subType: "all",
    facilities: [],
    city: "全部",
    district: "全部",
    search: "",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
    ...state,
  }).length;
}

function expectedPages(count) {
  return count === 0 ? 0 : Math.ceil(count / PAGE_SIZE);
}

let pass = 0;
let fail = 0;
const errors = [];

function ok(name, cond) {
  if (cond) pass++;
  else {
    fail++;
    errors.push(name);
  }
}

async function run() {
  const hzParkCount = filteredCount({ city: "杭州", category: "park" });
  const hzAllCount = filteredCount({ city: "杭州" });
  const hzTotalPages = expectedPages(hzAllCount);
  const allCount = filteredCount({ city: "全部" });

  ok("数据:杭州+公园 ≥25", hzParkCount >= 25);
  ok("数据:杭州全量 > 公园", hzAllCount > hzParkCount);
  ok("数据:默认全量 ≥33000", allCount >= 33000);

  // ── 杭州+公园：页数应与筛选结果一致 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await selectCategory(doc, "park");

    const count = parseCount(doc);
    const info = pageInfo(doc);
    const pag = doc.getElementById("pagination");
    ok("杭州+公园:结果数=28量级", count === hzParkCount);
    ok("杭州+公园:分页文案 1/1", info === "1 / 1");
    ok("杭州+公园:单页隐藏分页", pag?.hidden === true);
    ok("杭州+公园:卡片数=结果数", doc.querySelectorAll("#cardGrid .card").length === count);
  }

  // ── 复现 Bug：杭州第 3 页 → 筛公园 → 不得残留 10 页 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    await goNextPage(doc);
    ok("复现:杭州第3页", pageInfo(doc) === `3 / ${hzTotalPages}`);

    await selectCategory(doc, "park");
    ok("复现:筛选后分页 1/1", pageInfo(doc) === "1 / 1");
    ok("复现:筛选后隐藏分页", doc.getElementById("pagination")?.hidden === true);
    ok("复现:筛选后结果数=公园数", parseCount(doc) === hzParkCount);
  }

  // ── URL 参数 city+category ──
  {
    const { doc } = boot({ url: "https://localhost/?city=%E6%9D%AD%E5%B7%9E&category=park" });
    await wait(120);
    ok("URL:结果数正确", parseCount(doc) === hzParkCount);
    ok("URL:分页 1/1", pageInfo(doc) === "1 / 1");
    ok("URL:隐藏分页", doc.getElementById("pagination")?.hidden === true);
  }

  // ── 切换城市后页码重置 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    await goNextPage(doc);
    ok("切城:杭州第3页", pageInfo(doc) === `3 / ${hzTotalPages}`);

    await selectCity(doc, "北京");
    const beijingCount = filteredCount({ city: "北京" });
    ok("切城:结果数更新", parseCount(doc) === beijingCount);
    ok("切城:回到第1页", pageInfo(doc).startsWith("1 /"));
    ok("切城:总页数重算", totalPagesFromInfo(pageInfo(doc)) === expectedPages(beijingCount));
  }

  // ── 切换类型后页码重置 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    await selectCategory(doc, "library");
    const libCount = filteredCount({ city: "杭州", category: "library" });
    ok("切类型:结果数", parseCount(doc) === libCount);
    ok("切类型:第1页", pageInfo(doc).startsWith("1 /"));
  }

  // ── 搜索后页码重置 ──
  {
    const { doc, window } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    await goNextPage(doc);

    const input = doc.getElementById("searchInput");
    input.value = "西湖";
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    await wait(280);
    ok("搜索:回到第1页", pageInfo(doc).startsWith("1 /"));
    ok("搜索:总页数≤杭州全量页数", totalPagesFromInfo(pageInfo(doc)) <= hzTotalPages);
  }

  // ── 场景快捷项后页码重置 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    doc.getElementById("quickSceneBtn")?.click();
    await tick();
    doc.querySelector('#quickDropPanel [data-scene-index="0"]')?.click();
    await wait(80);
    ok("场景:第1页", pageInfo(doc).startsWith("1 /"));
    ok("场景:公园结果", parseCount(doc) === hzParkCount);
  }

  // ── 设施筛选后页码重置 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    doc.getElementById("quickFacilityBtn")?.click();
    await tick();
    doc.querySelector('#quickDropPanel [data-facility="wifi"]')?.click();
    await wait(80);
    ok("设施:第1页", pageInfo(doc).startsWith("1 /"));
  }

  // ── 末页 / 上一页·下一页 disabled ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    const total = expectedPages(hzAllCount);
    ok("末页:总页数=杭州全量页数", total === hzTotalPages);

    const prev = doc.querySelector('#pagination [data-page="prev"]');
    const next = doc.querySelector('#pagination [data-page="next"]');
    ok("末页:首页 prev disabled", prev?.hasAttribute("disabled"));
    ok("末页:首页 next 可用", !next?.hasAttribute("disabled"));

    for (let i = 1; i < total; i++) await goNextPage(doc);
    ok("末页:到达最后一页", pageInfo(doc) === `${total} / ${total}`);
    ok("末页:next disabled", doc.querySelector('#pagination [data-page="next"]')?.hasAttribute("disabled"));
    ok("末页:prev 可用", !doc.querySelector('#pagination [data-page="prev"]')?.hasAttribute("disabled"));

    await goPrevPage(doc);
    ok("末页:后退一页", pageInfo(doc) === `${total - 1} / ${total}`);
  }

  // ── 空结果 0 页 ──
  {
    const { doc, window } = boot();
    await wait(100);
    const input = doc.getElementById("searchInput");
    input.value = "zzzznotfound999";
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    await wait(280);
    ok("空结果:0 条", parseCount(doc) === 0);
    ok("空结果:分页隐藏", doc.getElementById("pagination")?.hidden === true);
    ok("空结果:无页码文案", pageInfo(doc) === "");
    ok("空结果:展示 empty", doc.getElementById("emptyState")?.hidden === false);
  }

  // ── 全量默认列表分页 ──
  {
    const { doc } = boot();
    await wait(100);
    const total = expectedPages(allCount);
    ok("默认:总页数≥200", total >= 200);
    ok("默认:第1页", pageInfo(doc) === `1 / ${total}`);
    ok("默认:48 张卡片", doc.querySelectorAll("#cardGrid .card").length === PAGE_SIZE);
    ok("默认:分页可见", doc.getElementById("pagination")?.hidden === false);
  }

  // ── 排序切换后页码重置 ──
  {
    const { doc } = boot();
    await wait(100);
    await selectCity(doc, "杭州");
    await goNextPage(doc);
    doc.getElementById("quickSortBtn")?.click();
    await tick();
    doc.querySelector('#quickDropPanel [data-sort="rating"]')?.click();
    await wait(80);
    ok("排序:回到第1页", pageInfo(doc).startsWith("1 /"));
  }

  console.log("\n═══ 分页与筛选联动（jsdom） ═══\n");
  const total = pass + fail;
  console.log(`分页测试: ${pass}/${total} 通过`);
  if (errors.length) {
    errors.forEach((e) => console.log("  ✗", e));
    process.exit(1);
  }
  console.log("");
}

run().catch((err) => {
  console.error("分页测试运行异常:", err);
  process.exit(1);
});
