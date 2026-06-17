#!/usr/bin/env node
/**
 * 定位 / 未定位下「排序与筛选」交互的真实 DOM 集成测试（jsdom）
 * 覆盖：搜索框右侧筛选入口、排序段（综合/距离/评分）、定位成功/失败/已定位回放。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const JS_DIR = path.join(ROOT, "js");
const GEO_POS_KEY = "hz_geo_pos_v1";

// index.html 中 <script src> 的加载顺序
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
  "data.js",
  "resource-coords.js",
  "layout.js",
  "design-engine.js",
  "ui-premium.js",
  "app.js",
];

const tick = () => new Promise((r) => setTimeout(r, 0));

function makeMatchMedia() {
  return (query) => ({
    matches: false, // 始终按移动端布局测试
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

/**
 * 启动一份隔离的页面运行时。
 * @param {object} opts
 * @param {"error"|{lat:number,lng:number}} opts.geo 定位桩：error=拒绝，坐标=成功
 * @param {{lat:number,lng:number}} [opts.seedLocation] 预置已定位状态（localStorage）
 */
function boot(opts = {}) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: "https://localhost/",
  });
  const { window } = dom;

  // ── polyfills / 桩 ──
  window.matchMedia = makeMatchMedia();
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

  const geo = opts.geo ?? "error";
  Object.defineProperty(window.navigator, "geolocation", {
    configurable: true,
    value: {
      getCurrentPosition(success, error) {
        if (geo === "error") {
          error(Object.assign(new Error("denied"), { code: 1 }));
        } else {
          success({ coords: { latitude: geo.lat, longitude: geo.lng, accuracy: 30 } });
        }
      },
    },
  });

  // 跳过新手引导弹层，避免干扰
  window.localStorage.setItem("zheli_onboard_v1", "1");
  if (opts.seedLocation) {
    window.localStorage.setItem(
      GEO_POS_KEY,
      JSON.stringify({ lat: opts.seedLocation.lat, lng: opts.seedLocation.lng, at: Date.now() })
    );
  }

  const code = SCRIPTS.map((f) => fs.readFileSync(path.join(JS_DIR, f), "utf8")).join("\n;\n");
  window.eval(code);

  return { dom, window, doc: window.document };
}

// ── 断言框架 ──
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

const HANGZHOU = { lat: 30.2741, lng: 120.1551 };

async function run() {
  // ───────────────────────────────────────────────
  // 场景 1：未定位首屏
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    ok("未定位:搜索框右侧筛选入口存在", !!doc.getElementById("searchFilterBtn"));
    const seg = doc.getElementById("filterSortSegment");
    ok("未定位:排序段已渲染", !!seg && seg.querySelectorAll(".fss-opt").length === 3);
    ok(
      "未定位:三种排序齐全",
      ["comprehensive", "distance", "rating"].every((s) => seg.querySelector(`.fss-opt[data-sort="${s}"]`))
    );
    ok(
      "未定位:默认综合排序高亮",
      seg.querySelector(".fss-opt.is-active")?.dataset.sort === "comprehensive"
    );
    ok(
      "未定位:距离最近显示「点此定位」提示",
      !!seg.querySelector('.fss-opt[data-sort="distance"] .fss-hint')
    );
    ok("未定位:筛选面板初始隐藏", doc.getElementById("filterDropPanel").hidden === true);
  }

  // ───────────────────────────────────────────────
  // 场景 2：点筛选入口 → 面板从上往下打开，含筛选项
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    doc.getElementById("searchFilterBtn").click();
    await tick();

    ok("打开:筛选面板可见", doc.getElementById("filterDropPanel").hidden === false);
    ok("打开:遮罩层可见", doc.getElementById("toolbarDropLayer").hidden === false);
    ok("打开:body 标记下拉态", doc.body.classList.contains("toolbar-drop-open"));
    const mount = doc.getElementById("filterDropMount");
    ok("打开:筛选项已挂载到弹层", !!mount.querySelector("#sidebarInner") || !!mount.querySelector("#categoryFilters"));

    doc.getElementById("filterDropClose").click();
    await tick();
    ok("关闭:筛选面板隐藏", doc.getElementById("filterDropPanel").hidden === true);
    ok("关闭:body 取消下拉态", !doc.body.classList.contains("toolbar-drop-open"));
  }

  // ───────────────────────────────────────────────
  // 场景 3：未定位点「距离最近」→ 定位成功 → 切距离排序
  // ───────────────────────────────────────────────
  {
    const { doc, window } = boot({ geo: HANGZHOU });
    await tick();

    doc.getElementById("searchFilterBtn").click();
    await tick();
    const seg = doc.getElementById("filterSortSegment");
    seg.querySelector('.fss-opt[data-sort="distance"]').click();
    // 等待定位 Promise 链完成
    await tick();
    await tick();
    await tick();

    const segAfter = doc.getElementById("filterSortSegment");
    ok(
      "定位成功:距离最近高亮",
      segAfter.querySelector(".fss-opt.is-active")?.dataset.sort === "distance"
    );
    ok(
      "定位成功:距离提示消失",
      !segAfter.querySelector('.fss-opt[data-sort="distance"] .fss-hint')
    );
    const distBadges = doc.querySelectorAll("#cardGrid .badge-distance");
    ok("定位成功:卡片出现距离信息", distBadges.length > 0);
  }

  // ───────────────────────────────────────────────
  // 场景 4：未定位点「距离最近」→ 定位失败 → 回退综合，不卡死
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    doc.getElementById("searchFilterBtn").click();
    await tick();
    const seg = doc.getElementById("filterSortSegment");
    seg.querySelector('.fss-opt[data-sort="distance"]').click();
    await tick();
    await tick();
    await tick();

    const segAfter = doc.getElementById("filterSortSegment");
    ok(
      "定位失败:回退综合排序",
      segAfter.querySelector(".fss-opt.is-active")?.dataset.sort === "comprehensive"
    );
    ok(
      "定位失败:距离仍提示定位",
      !!segAfter.querySelector('.fss-opt[data-sort="distance"] .fss-hint')
    );
    ok("定位失败:面板未卡死(仍可见)", doc.getElementById("filterDropPanel").hidden === false);
  }

  // ───────────────────────────────────────────────
  // 场景 5：已定位（localStorage 回放）→ 默认距离排序 + 卡片含距离
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: HANGZHOU, seedLocation: HANGZHOU });
    await tick();

    const seg = doc.getElementById("filterSortSegment");
    ok(
      "已定位:默认距离最近高亮",
      seg.querySelector(".fss-opt.is-active")?.dataset.sort === "distance"
    );
    ok("已定位:距离提示不出现", !seg.querySelector('.fss-opt[data-sort="distance"] .fss-hint'));
    ok("已定位:卡片含距离信息", doc.querySelectorAll("#cardGrid .badge-distance").length > 0);

    // 已定位下切回综合排序
    seg.querySelector('.fss-opt[data-sort="comprehensive"]').click();
    await tick();
    ok(
      "已定位:可切回综合排序",
      doc.getElementById("filterSortSegment").querySelector(".fss-opt.is-active")?.dataset.sort ===
        "comprehensive"
    );
  }

  // ───────────────────────────────────────────────
  // 场景 6：选择筛选项 → 入口角标计数联动
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    doc.getElementById("searchFilterBtn").click();
    await tick();
    const facility = doc.querySelector("#filterDropMount #facilityFilters .chip, #filterDropMount #facilityFilters button");
    if (facility) {
      facility.click();
      await tick();
      const badge = doc.getElementById("searchFilterBadge");
      ok("筛选联动:入口角标显示计数", badge && badge.hidden === false && Number(badge.textContent) >= 1);
      ok("筛选联动:入口高亮", doc.getElementById("searchFilterBtn").classList.contains("is-active"));
    } else {
      ok("筛选联动:入口角标显示计数", false);
      ok("筛选联动:入口高亮", false);
      errors.push("未找到设施筛选按钮(facilityFilters 为空)");
    }
  }

  // ── 汇总 ──
  console.log("\n═══ 定位 / 筛选交互（jsdom） ═══\n");
  const total = pass + fail;
  console.log(`交互测试: ${pass}/${total} 通过`);
  if (errors.length) {
    errors.forEach((e) => console.log("  ✗", e));
    process.exit(1);
  }
  console.log("");
}

run().catch((err) => {
  console.error("交互测试运行异常:", err);
  process.exit(1);
});
