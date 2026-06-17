#!/usr/bin/env node
/**
 * 定位 / 未定位下「独立下拉筛选」交互的真实 DOM 集成测试（jsdom）
 * 覆盖：排序/场景/类型/设施四段独立下拉、定位成功/失败、已定位回放、计数联动。
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

/**
 * 启动一份隔离的页面运行时。
 * @param {object} opts
 * @param {"error"|{lat:number,lng:number}} opts.geo 定位桩：error=拒绝，坐标=成功
 * @param {{lat:number,lng:number}} [opts.seedLocation] 预置已定位状态（localStorage）
 * @param {boolean} [opts.desktop] 是否按桌面断点运行
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

  injectStyles(window.document, [
    "css/style.css",
    "css/design-system.css",
    "css/design-layouts.css",
  ]);
  injectBreakpointOverrides(window.document, !!opts.desktop);

  return { dom, window, doc: window.document };
}

function injectBreakpointOverrides(doc, desktop) {
  const style = doc.createElement("style");
  style.setAttribute("data-test-css", "breakpoint-override");
  style.textContent = desktop
    ? `.app-ui .site-header{display:block!important}.app-ui .glass-nav{display:none!important}.app-ui.filter-toolbar-layout #cityQuickBtn{display:none!important}.app-ui.filter-toolbar-layout .loc-pill--header{display:inline-flex!important}`
    : `.app-ui .site-header{display:none!important}.app-ui .glass-nav{display:block!important}.app-ui.filter-toolbar-layout .loc-pill--header{display:none!important}`;
  doc.head.appendChild(style);
}

function injectStyles(doc, files) {
  for (const file of files) {
    const css = fs.readFileSync(path.join(ROOT, file), "utf8");
    const style = doc.createElement("style");
    style.setAttribute("data-test-css", file);
    style.textContent = css;
    doc.head.appendChild(style);
  }
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

function isVisible(el, win) {
  if (!el || el.hidden) return false;
  let node = el;
  while (node && node !== win.document) {
    const style = win.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return false;
    node = node.parentElement;
  }
  return true;
}

function segmentOrder(doc) {
  return [...doc.querySelectorAll("#filterToolbar [data-quick]")].map((btn) => btn.dataset.quick);
}

const HANGZHOU = { lat: 30.2741, lng: 120.1551 };

async function run() {
  // ───────────────────────────────────────────────
  // 场景 1：未定位首屏
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    ok("未定位:快捷筛选-排序按钮存在", !!doc.getElementById("quickSortBtn"));
    ok("未定位:快捷筛选-场景按钮存在", !!doc.getElementById("quickSceneBtn"));
    ok("未定位:快捷筛选-类型按钮存在", !!doc.getElementById("quickCategoryBtn"));
    ok("未定位:快捷筛选-设施按钮存在", !!doc.getElementById("quickFacilityBtn"));
    ok(
      "未定位:四段顺序为排序/场景/类型/设施",
      JSON.stringify(segmentOrder(doc)) === JSON.stringify(["sort", "scene", "category", "facility"])
    );
    ok("未定位:快捷筛选带下箭头", doc.getElementById("quickSortBtn")?.textContent.includes("▾"));
    ok("未定位:移除筛选图标按钮", !doc.getElementById("searchFilterBtn"));
    ok("未定位:四个快捷设施项已隐藏", doc.querySelectorAll("[data-value-perks] .value-perk").length === 0);
    ok("未定位:快捷设施容器隐藏", doc.getElementById("heroPerks")?.hidden === true);
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
    ok("未定位:筛选大面板初始隐藏", doc.getElementById("filterDropPanel").hidden === true);
    ok("未定位:快捷下拉面板初始隐藏", doc.getElementById("quickDropPanel").hidden === true);
  }

  // ───────────────────────────────────────────────
  // 场景 2：四段快捷项为独立下拉，不共用单一筛选框
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    doc.getElementById("quickSceneBtn").click();
    await tick();

    const quickPanel = doc.getElementById("quickDropPanel");
    const sceneBtn = doc.getElementById("quickSceneBtn");
    ok("下拉层不在 sticky 内", !doc.querySelector(".discover-sticky")?.contains(quickPanel.parentElement));
    ok(
      "场景下拉:top 对齐触发器底边",
      Math.abs(
        parseFloat(doc.documentElement.style.getPropertyValue("--toolbar-drop-top")) -
          sceneBtn.getBoundingClientRect().bottom
      ) <= 1
    );
    const listStyle = doc.defaultView.getComputedStyle(quickPanel.querySelector(".quick-drop-list"));
    ok("场景下拉:列表可滚动", listStyle.overflowY === "auto" || listStyle.overflowY === "scroll");
    ok("场景下拉:快捷面板可见", quickPanel.hidden === false);
    ok(
      "场景下拉:锚点变量已写入",
      !!doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-left").trim() &&
        !!doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-width").trim()
    );
    const viewportW = doc.defaultView.innerWidth || 1024;
    const anchorWidth = parseFloat(doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-width"));
    ok("场景下拉:宽度未铺满视口", Number.isFinite(anchorWidth) && anchorWidth <= viewportW - 24);
    ok("场景下拉:标题正确", /场景/.test(quickPanel.textContent || ""));
    ok("场景下拉:含场景条目", quickPanel.querySelectorAll(".quick-drop-item").length >= 2);
    ok("场景下拉:不打开大筛选框", doc.getElementById("filterDropPanel").hidden === true);

    doc.getElementById("quickCategoryBtn").click();
    await tick();
    ok("类型下拉:标题正确", /类型/.test(quickPanel.textContent || ""));
    ok("类型下拉:含类型条目", quickPanel.querySelectorAll("[data-category]").length >= 2);
    const catItem = quickPanel.querySelector("[data-category]:not([data-category='all'])");
    ok(
      "类型下拉:选项仅文字",
      !!catItem?.querySelector(".quick-drop-item__label") &&
        !/^[^\u4e00-\u9fa5a-zA-Z0-9]/.test(catItem.querySelector(".quick-drop-item__label").textContent.trim())
    );
    ok("类型下拉:字号变量已设", !!quickPanel.style.getPropertyValue("--drop-item-font-size"));
    const catPanelFontVar = quickPanel.style.getPropertyValue("--drop-item-font-size");

    doc.getElementById("quickFacilityBtn").click();
    await tick();
    ok("设施下拉:标题正确", /设施/.test(quickPanel.textContent || ""));
    ok("设施下拉:含设施条目", quickPanel.querySelectorAll(".quick-drop-item").length >= 3);
    ok("设施下拉:无完成按钮", !doc.getElementById("quickFacilityDone"));
    ok("设施按钮:含 ft-chip--facility", doc.getElementById("quickFacilityBtn")?.classList.contains("ft-chip--facility"));
    const facilityItem = quickPanel.querySelector("[data-facility]");
    ok("设施下拉:选项含标签结构", !!facilityItem?.querySelector(".quick-drop-item__label"));
    const facPanelFontVar = quickPanel.style.getPropertyValue("--drop-item-font-size");
    ok("设施下拉:字号变量已设", !!facPanelFontVar);
    ok("设施下拉:项字号变量在范围内", parseFloat(facPanelFontVar) >= 11 && parseFloat(facPanelFontVar) <= 13.6);
    ok("设施下拉:与类型共用字号变量机制", !!catPanelFontVar && parseFloat(catPanelFontVar) >= 11);
    const resetBtn = doc.getElementById("quickFacilityReset");
    const resetFontVar = resetBtn?.style.getPropertyValue("--drop-action-font-size");
    ok("设施下拉:重置字号变量已设", !!resetFontVar && parseFloat(resetFontVar) >= 10 && parseFloat(resetFontVar) <= 13);

    doc.getElementById("quickSortBtn").click();
    await tick();
    ok("排序下拉:标题正确", /排序/.test(quickPanel.textContent || ""));
    ok("排序下拉:三种排序", quickPanel.querySelectorAll("[data-sort]").length === 3);

    doc.getElementById("toolbarDropBackdrop").click();
    await tick();
    ok("关闭:快捷面板隐藏", doc.getElementById("quickDropPanel").hidden === true);
    ok("关闭:body 取消下拉态", !doc.body.classList.contains("toolbar-drop-open"));
  }

  // ───────────────────────────────────────────────
  // 场景 2b：窄触发器 → 窄下拉，左缘对齐
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    const narrowRect = { left: 48, right: 120, width: 72, top: 168, bottom: 200, height: 32 };
    for (const id of ["quickSceneBtn", "quickCategoryBtn", "quickFacilityBtn", "quickSortBtn"]) {
      const btn = doc.getElementById(id);
      btn.getBoundingClientRect = () => narrowRect;
    }

    doc.getElementById("quickSceneBtn").click();
    await tick();

    const anchorWidth = parseFloat(doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-width"));
    const anchorLeft = parseFloat(doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-left"));
    ok("窄触发器:下拉宽度贴合", anchorWidth >= 72 && anchorWidth <= 96);
    ok("窄触发器:左缘对齐", Math.abs(anchorLeft - 48) <= 1);

    doc.getElementById("quickSortBtn").click();
    await tick();
    const sortWidth = parseFloat(doc.documentElement.style.getPropertyValue("--toolbar-drop-anchor-width"));
    ok("窄触发器:排序下拉同样收窄", sortWidth >= 72 && sortWidth <= 96);
  }

  // ───────────────────────────────────────────────
  // 场景 3：未定位点「距离最近」→ 定位成功 → 切距离排序
  // ───────────────────────────────────────────────
  {
    const { doc, window } = boot({ geo: HANGZHOU });
    await tick();

    doc.getElementById("quickSortBtn").click();
    await tick();
    const panel = doc.getElementById("quickDropPanel");
    panel.querySelector('[data-sort="distance"]').click();
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

    doc.getElementById("quickSortBtn").click();
    await tick();
    const panel = doc.getElementById("quickDropPanel");
    panel.querySelector('[data-sort="distance"]').click();
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
    ok("定位失败:不会打开大筛选框", doc.getElementById("filterDropPanel").hidden === true);
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

    doc.getElementById("quickFacilityBtn").click();
    await tick();
    const facility = doc.querySelector("#quickDropPanel [data-facility]");
    if (facility) {
      facility.click();
      await tick();
      const facilityBtn = doc.getElementById("quickFacilityBtn");
      ok("筛选联动:设施按钮展示计数", facilityBtn && /设施\(\d+\)/.test(facilityBtn.textContent || ""));
      ok("筛选联动:设施按钮高亮", !!facilityBtn?.classList.contains("is-active"));
      ok("筛选联动:设施按钮 has-count", !!facilityBtn?.classList.contains("has-count"));
      ok("筛选联动:设施标签字号变量", !!facilityBtn?.style.getPropertyValue("--chip-label-font-size"));
    } else {
      ok("筛选联动:设施按钮展示计数", false);
      ok("筛选联动:设施按钮高亮", false);
      errors.push("未找到设施下拉项(quickDropPanel 为空)");
    }
  }

  // ───────────────────────────────────────────────
  // 场景 7：桌面端快捷筛选与移动端保持同一交互模型
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error", desktop: true });
    await tick();

    ok(
      "桌面:sidebar 筛选块隐藏",
      doc.defaultView.getComputedStyle(doc.getElementById("sidebar")).display === "none"
    );

    doc.getElementById("quickSceneBtn").click();
    await tick();
    ok("桌面:场景快捷下拉可见", doc.getElementById("quickDropPanel").hidden === false);
    ok("桌面:下拉打开时 body 进入锁定态", doc.body.classList.contains("toolbar-drop-open"));

    doc.getElementById("quickSortBtn").click();
    await tick();
    const quickPanel = doc.getElementById("quickDropPanel");
    ok("桌面:排序快捷项仍为 3 个", quickPanel.querySelectorAll("[data-sort]").length === 3);

    doc.getElementById("toolbarDropBackdrop").click();
    await tick();
    ok("桌面:点击遮罩后下拉关闭", doc.getElementById("quickDropPanel").hidden === true);
  }

  // ───────────────────────────────────────────────
  // 场景 8：全站仅一个城市选择入口（移动 glass-nav / 桌面 site-header）
  // ───────────────────────────────────────────────
  {
    const { doc, window } = boot({ geo: "error", desktop: false });
    await tick();
    const navBtn = doc.getElementById("cityQuickBtn");
    const headerBtn = doc.getElementById("cityQuickBtnDesktop");
    const brand = doc.querySelector(".glass-nav__row .nav-brand-mini");
    ok("移动:glass-nav 城市按钮可见", isVisible(navBtn, window));
    const rowKids = [...doc.querySelector(".glass-nav__row").children];
    ok("移动:glass-nav 城市在品牌左侧", rowKids.indexOf(navBtn) < rowKids.indexOf(brand));
    ok("移动:site-header 城市按钮不可见", !isVisible(headerBtn, window));
    ok("移动:discover-bar 无城市按钮", !doc.querySelector("#discoverBar #cityQuickBtn"));
    ok("移动:仅一个可见城市入口", Number(isVisible(navBtn, window)) + Number(isVisible(headerBtn, window)) === 1);
  }

  {
    const { doc, window } = boot({ geo: "error", desktop: true });
    await tick();
    const navBtn = doc.getElementById("cityQuickBtn");
    const headerBtn = doc.getElementById("cityQuickBtnDesktop");
    const brandLink = doc.querySelector(".header-leading .brand");
    ok("桌面:site-header 城市按钮可见", isVisible(headerBtn, window));
    const leadingKids = [...doc.querySelector(".header-leading").children];
    ok("桌面:site-header 城市在品牌左侧", leadingKids.indexOf(headerBtn) < leadingKids.indexOf(brandLink));
    ok("桌面:glass-nav 城市按钮不可见", !isVisible(navBtn, window));
    ok("桌面:discover-bar 无城市按钮", !doc.querySelector("#discoverBar #cityQuickBtn"));
    ok("桌面:仅一个可见城市入口", Number(isVisible(navBtn, window)) + Number(isVisible(headerBtn, window)) === 1);
  }

  // ───────────────────────────────────────────────
  // 场景 9：城市激活态在移动/桌面都清晰且可读
  // ───────────────────────────────────────────────
  for (const [label, desktop] of [
    ["移动", false],
    ["桌面", true],
  ]) {
    const { doc } = boot({ geo: "error", desktop });
    await tick();
    const cityBtn = doc.querySelector('#cityHotGrid .city-pill[data-city="杭州"]');
    if (!cityBtn) {
      ok(`${label}:杭州按钮存在`, false);
      continue;
    }
    cityBtn.click();
    await tick();
    const active = doc.querySelector('#cityHotGrid .city-pill[data-city="杭州"]');
    ok(`${label}:杭州激活态 class`, !!active?.classList.contains("is-active"));
    ok(`${label}:杭州激活态 aria`, active?.getAttribute("aria-pressed") === "true");
  }

  // ───────────────────────────────────────────────
  // 场景 10：详情页不重复展示与标题相同的导航词
  // ───────────────────────────────────────────────
  {
    const { doc, window } = boot({ geo: "error" });
    await tick();

    const searchInput = doc.getElementById("searchInput");
    searchInput.value = "聚沙邻里";
    searchInput.dispatchEvent(new window.Event("input", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 250));
    await tick();

    const card = doc.querySelector('[data-id="study-jusha"]');
    card?.click();
    await tick();

    ok("详情:标题为资源名", doc.getElementById("modalTitle")?.textContent === "聚沙邻里中心城市书房");
    ok("详情:隐藏重复导航词行", !doc.querySelector("#modalBody .detail-line--map"));
    ok("详情:仍保留地址行", !!doc.querySelector("#modalBody .detail-lines .detail-line"));
  }

  // ───────────────────────────────────────────────
  // 场景 11：城市面板无「全国/全部」浏览范围
  // ───────────────────────────────────────────────
  {
    const { doc } = boot({ geo: "error" });
    await tick();

    ok("城市面板:浏览范围区隐藏", doc.getElementById("cityScopeSection")?.hidden === true);
    ok("城市面板:无全部 pill", !doc.querySelector('#cityScopeGrid .city-pill[data-city="全部"]'));
    ok("城市面板:热门城市存在", doc.querySelectorAll("#cityHotGrid .city-pill").length >= 3);
    ok("未定位:顶部 pill 默认文案", doc.getElementById("cityQuickValue")?.textContent === "选择城市");
    ok("美团搜索框 class", doc.querySelector(".search-box--meituan") !== null);
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
