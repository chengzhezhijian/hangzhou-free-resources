#!/usr/bin/env node
/**
 * 产品需求 + 用户体验验收自动化（对标 Top App 核心路径）
 * 用法: node scripts/test-product-flows.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { loadSiteData } from "./lib/load-site-data.mjs";
import { createFilterEngine } from "./lib/filter-logic.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const runner = { passed: 0, failed: 0, failures: [] };

function assert(name, ok, detail = "") {
  if (ok) runner.passed++;
  else {
    runner.failed++;
    runner.failures.push({ name, detail });
  }
}

const site = loadSiteData();
const { RESOURCES, RESOURCE_CATEGORIES, SITE_SCOPE, MapNav, GeoCity } = site;

const engine = createFilterEngine({ RESOURCES, RESOURCE_CATEGORIES });

function filter(state) {
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
  });
}

const dataCtx = vm.createContext({});
vm.runInContext(
  fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8") +
    "; globalThis.VP = VALUE_PERKS; globalThis.QS = QUICK_SCENES;",
  dataCtx
);
const VP = dataCtx.VP;
const QS = dataCtx.QS;

// ─── 1. 产品定位 ───
console.log("\n═══ 产品需求 ═══");
assert("全国版 SITE_SCOPE", SITE_SCOPE === "china");
assert("资源规模 ≥ 33000", RESOURCES.length >= 33000);
assert("设施卖点 4 项", VP?.length === 4);
assert("设施顺序：WiFi 优先", VP?.[0]?.id === "wifi");
assert("场景标签 6 项", QS?.length === 6);
assert("场景首项：遛娃", QS?.[0]?.category === "park");

// ─── 2. UI 交付物（Top App 对标要素） ───
console.log("\n═══ 体验交付物 ═══");
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const premiumCss = fs.readFileSync(path.join(ROOT, "css/premium-ui.css"), "utf8");
const designCss = fs.readFileSync(path.join(ROOT, "css/design-system.css"), "utf8");

const UI_REQUIREMENTS = [
  ["app-ui 壳层", /\bapp-ui\b/],
  ["毛玻璃顶栏", /glass-nav/],
  ["粘性筛选区", /discover-sticky/],
  ["Premium 样式", /premium-ui\.css\?v=76/],
  ["整站 UX 设计", /design-variants\.js/],
  ["设计布局 CSS", /design-layouts\.css/],
  ["设计挂载点", /id="filterToolbar"/],
  ["设施标签容器", /id="heroPerks"/],
  ["iOS 分段排序", /sort-tabs/],
  ["底部 Tab", /bottom-nav/],
  ["Sheet 详情", /detailModal/],
  ["新手引导", /onboardOverlay/],
];

for (const [label, re] of UI_REQUIREMENTS) {
  assert(`首页 ${label}`, re.test(indexHtml));
}

const UX_PATTERNS = [
  ["滚动紧凑模式", /is-scrolled/],
  ["卡片入场动效", /card-enter/],
  ["Sheet 弹簧动画", /sheet-up/],
  ["骨架屏", /card-skeleton/],
  ["减少动效适配", /prefers-reduced-motion/],
  ["详情渐变头", /detail-panel \.modal-header/],
];

for (const [label, re] of UX_PATTERNS) {
  assert(`Premium ${label}`, re.test(premiumCss));
}

assert("设计系统 Tab 毛玻璃", /backdrop-filter/.test(designCss));

// ─── 3. 核心用户路径（产品闭环） ───
console.log("\n═══ 用户路径 ═══");

const journeyWifi = filter({ facilities: ["wifi"], city: "全部" });
assert("路径A：全国免费WiFi ≥ 200", journeyWifi.length >= 200);

const journeyBeijing = filter({ city: "北京" });
assert("路径B：北京 ≥ 35 条", journeyBeijing.length >= 35);
assert(
  "路径B：北京无他市泄漏",
  journeyBeijing.every((r) => ["北京", "全国", "全省"].includes(r.city || "北京"))
);

const journeyStudy = filter({ search: "自习", city: "全部" });
assert("路径C：搜自习 ≥ 500", journeyStudy.length >= 500);

const journeyHangzhouPark = filter({ category: "park", city: "杭州" });
assert("路径D：杭州遛娃公园 ≥ 25", journeyHangzhouPark.length >= 25);

const perkScene = filter({ category: "reading", city: "上海" });
assert("路径E：上海自习 ≥ 10", perkScene.length >= 10);

const navTarget = journeyBeijing.find((r) => r.id && !r.isTool);
assert("路径F：北京有可导航点位", !!navTarget);
if (navTarget) {
  const url = MapNav.buildUrl(navTarget, "北京");
  assert("路径F：生成高德链接", !!url && url.includes("amap.com"));
}

// ─── 4. 定位体验 ───
console.log("\n═══ 定位 ═══");
const bj = GeoCity.resolveCity(39.9042, 116.4074);
assert("定位北京 → 北京", bj.ok && bj.city === "北京");
const sh = GeoCity.resolveCity(31.2304, 121.4737);
assert("定位上海 → 上海", sh.ok && sh.city === "上海");

// ─── 5. 分享 URL 逻辑（ui-premium 契约） ───
console.log("\n═══ 分享态 ═══");
const uiPremium = fs.readFileSync(path.join(ROOT, "js/ui-premium.js"), "utf8");
assert("URL 同步能力", /syncPremiumUrl/.test(uiPremium));
assert("结果数动效", /animateResultCount/.test(uiPremium));
assert("列表入场", /markCardsEnter/.test(uiPremium));
assert("文案变体 10 套", (() => {
  const c = vm.createContext({});
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, "js/copy-variants.js"), "utf8") + "; globalThis.__CV = COPY_VARIANTS;",
    c
  );
  return Object.keys(c.__CV).length === 10;
})());
assert("文案 AB 报告", fs.existsSync(path.join(ROOT, "docs/ab-copy-results.json")));
assert("首页对比墙", fs.existsSync(path.join(ROOT, "labs/ab-homepage.html")));
assert("整站设计对比墙", fs.existsSync(path.join(ROOT, "labs/ab-design.html")));
assert("5套UX候选对比墙", fs.existsSync(path.join(ROOT, "labs/ux-candidates.html")));

// ─── 6. 场景计数与 filterResources 对齐 ───
console.log("\n═══ 场景计数 ═══");
const statsCtx = vm.createContext({ globalThis: {} });
const statsDataFiles = [
  "js/data-china-config.js",
  "js/data-study-spaces.js",
  "js/data-extra-resources.js",
  "js/data-zhejiang-cities.js",
  "js/data-zhejiang-expanded.js",
  "js/data-china-nationwide.js",
  "js/data-amap-poi.js",
  "js/data.js",
].filter((f) => fs.existsSync(path.join(ROOT, f)));
vm.runInContext(
  statsDataFiles.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n") +
    "\n" +
    fs.readFileSync(path.join(ROOT, "js/filter-shared.js"), "utf8") +
    "\n" +
    fs.readFileSync(path.join(ROOT, "js/site-stats.js"), "utf8"),
  statsCtx
);
const computed = statsCtx.globalThis.SiteStats.compute();
for (let i = 0; i < QS.length; i++) {
  const scene = QS[i];
  const expected = engine.filterResources({
    group: "all",
    subType: "all",
    facilities: [],
    city: "全部",
    district: "全部",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
    category: scene.category || "all",
    search: scene.search || "",
  }).length;
  const actual = computed.sceneCounts[i]?.count;
  assert(
    `场景计数 ${scene.label.trim()}`,
    actual === expected,
    `SiteStats=${actual} filter=${expected}`
  );
}

const indexHtmlAll = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const guideHtmlAll = fs.readFileSync(path.join(ROOT, "guide.html"), "utf8");
assert("首页 H5 反馈 FAB", /id="feedbackFab"/.test(indexHtmlAll));
assert("场景页 H5 反馈 FAB", /id="feedbackFab"/.test(guideHtmlAll));
assert("子页无过期 2993", !/2993/.test(guideHtmlAll + fs.readFileSync(path.join(ROOT, "about.html"), "utf8")));
assert("子页无过期 72城", !/72城/.test(guideHtmlAll + fs.readFileSync(path.join(ROOT, "tools.html"), "utf8")));

// ─── Report ───
const total = runner.passed + runner.failed;
const rate = total ? ((runner.passed / total) * 100).toFixed(2) : "0";
console.log("\n───────────────────────────────────────");
console.log(`产品验收: ${runner.passed}/${total} 通过 (${rate}%)`);
if (runner.failures.length) {
  console.log("\n失败项:");
  runner.failures.forEach((f) => console.log(`  ✗ ${f.name}${f.detail ? `: ${f.detail}` : ""}`));
  process.exit(1);
}
console.log("───────────────────────────────────────\n");
