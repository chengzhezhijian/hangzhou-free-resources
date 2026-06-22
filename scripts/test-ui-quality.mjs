#!/usr/bin/env node
/**
 * UI / 产品定位自动化检查
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_V = "75";
const appJs = fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const siteConfig = fs.readFileSync(path.join(ROOT, "js", "site-config.js"), "utf8");
const designLayouts = fs.readFileSync(path.join(ROOT, "css", "design-layouts.css"), "utf8");
const styleCss = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
const premiumCss = fs.readFileSync(path.join(ROOT, "css", "premium-ui.css"), "utf8");
const designSystem = fs.readFileSync(path.join(ROOT, "css", "design-system.css"), "utf8");
const adaptiveFontsJs = fs.readFileSync(path.join(ROOT, "js", "adaptive-fonts.js"), "utf8");
const quickCategoryBlock = appJs.split('if (kind === "quick-category")')[1]?.split('if (kind === "quick-facility")')[0] || "";
const quickFacilityBlock = appJs.split('if (kind === "quick-facility")')[1]?.split('panel.innerHTML = `')[1]?.split('return;')[0] || "";

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

console.log("\n═══ UI / 定位检查 ═══\n");

ok("单行筛选栏", /id="filterToolbar"/.test(indexHtml));
ok("排序下拉层", /id="sortDropPanel"/.test(indexHtml));
ok("快捷下拉层", /id="quickDropPanel"/.test(indexHtml));
ok("筛选顶栏下拉", /id="filterDropPanel"/.test(indexHtml));
ok("筛选面板排序段", /id="filterSortSegment"/.test(indexHtml));
ok("排序段渲染函数", /function renderFilterSortSegment/.test(appJs));
ok("快捷筛选渲染函数", /function renderFilterToolbar/.test(appJs) && /quickCategoryBtn/.test(appJs));
ok(
  "四段顺序代码",
  /quickSortBtn[\s\S]*quickSceneBtn[\s\S]*quickCategoryBtn[\s\S]*quickFacilityBtn/.test(appJs)
);
ok("类型下拉渲染", /kind === "quick-category"/.test(appJs));
ok(
  "类型下拉无图标",
  /quick-drop-item__label/.test(quickCategoryBlock) && !/c\.icon/.test(quickCategoryBlock)
);
ok(
  "类型下拉标签自适应",
  /quick-drop-item__label/.test(designLayouts) && /labelEl\?\.textContent/.test(appJs)
);
ok("桌面端隐藏 sidebar CSS", /@media \(min-width: 960px\)[\s\S]*\.app-ui\.filter-toolbar-layout \.sidebar[\s\S]*display:\s*none/.test(designLayouts));
ok("glass-nav 城市在品牌左侧", /glass-nav__row[\s\S]*?id="cityQuickBtn"[\s\S]*?glass-nav__brand[\s\S]*?nav-brand-mini/.test(indexHtml));
ok("品牌间距黄金比例", /--nav-gap-base:\s*10px[\s\S]*--nav-brand-gap:\s*calc\(var\(--nav-gap-base\) \* var\(--phi\)\)/.test(designSystem));
ok("discover-bar 无城市按钮", !/id="discoverBar"[\s\S]*?id="cityQuickBtn"/.test(indexHtml));
ok("H5 无双城市入口 CSS", /#cityQuickBtn[\s\S]*display:\s*none/.test(designLayouts) && /\.loc-pill--header[\s\S]*display:\s*none/.test(designLayouts));
ok("快捷筛选下箭头", /ft-chip--quick/.test(appJs) && /▾/.test(appJs));
ok("分段筛选条", /filter-segment/.test(appJs) && /\.filter-segment/.test(designLayouts));
ok("城市面板不含全国项", !/cityPillHtml\("全部"/.test(appJs) && !/cityPillHtml\("全部", china \? "全国"/.test(appJs));
ok("城市面板隐藏浏览范围", /cityScopeSection/.test(indexHtml) && /scopeSection\.hidden = true/.test(appJs));
ok("未定位 pill 默认文案", /选择城市/.test(appJs) && /cityQuickDisplayLabel/.test(appJs));
ok("美团搜索框 class", /search-box--meituan/.test(indexHtml) && /search-box--meituan/.test(designLayouts));
ok("去除筛选图标按钮", !/id="searchFilterBtn"/.test(indexHtml));
ok("城市选中态 class 修复", /is-active active/.test(appJs));
ok("城市选中态无障碍同步", /aria-pressed=/.test(appJs));
ok("全国工具文案移除", !/全国工具/.test(appJs + indexHtml));
ok("未定位距离回退逻辑", /if \(state\.userLocation\)[\s\S]*?else \{[\s\S]*?renderFilterSortSegment\(\)/.test(appJs));
ok("综合排序选项", /综合排序/.test(appJs) && /距离最近/.test(appJs) && /评分最高/.test(appJs));
ok("定位横幅默认隐藏", /geoBanner.*hidden/.test(indexHtml));
ok("距离仅精确坐标", /coordIsPrecise/.test(appJs));
ok("无蹭享旧品牌", !/蹭享|蹭/.test(indexHtml + siteConfig));
ok("全国惠民地图品牌", /全国惠民地图/.test(siteConfig));
ok("桌面端快捷下拉未被禁用", !/toolbar-drop-layer\s*\{\s*display:\s*none !important/.test(designLayouts));
ok("城市激活态对比增强", /city-pill\.is-active[\s\S]*box-shadow/.test(designLayouts));
ok("桌面卡片可读性增强", /@media \(min-width: 960px\)[\s\S]*card-premium h3/.test(designLayouts));
ok("下拉锚点变量", /--toolbar-drop-anchor-left/.test(designLayouts) && /--toolbar-drop-anchor-width/.test(designLayouts));
ok("下拉锚点定位逻辑", /updateToolbarDropAnchor/.test(appJs));
ok("下拉宽度贴合触发器", /triggerRect\?\.width|triggerW/.test(appJs) && !/\+ 88/.test(appJs));
ok("下拉宽度 CSS 回退收窄", !/min\(420px/.test(designLayouts) && !/min\(320px, calc\(100% - 24px\)\)/.test(designLayouts));
ok("下拉项长文案处理", /\.quick-drop-item[\s\S]*word-break/.test(designLayouts) && /\.sort-drop-item[\s\S]*text-overflow/.test(designLayouts));
ok("下拉项换行非 ellipsis", /\.quick-drop-item\s*\{[^}]*white-space:\s*normal/.test(designLayouts) && !/\.quick-drop-item\s*\{[^}]*text-overflow:\s*ellipsis/.test(designLayouts));
ok("下拉项字号变量", /--drop-item-font-size/.test(designLayouts) && /syncDropPanelFonts/.test(appJs));
ok("类型设施共用字号计算", /quickFilterDropItemLabels/.test(appJs) && /quickFilterDropAnchorWidth/.test(appJs) && /calcDropItemFontPx/.test(appJs));
ok("类型设施统一宽度上限", /QUICK_FILTER_DROP_CEILING/.test(appJs));
ok("设施按钮自适应 class", /ft-chip--facility/.test(appJs) && /has-count/.test(appJs) && /\.ft-chip--facility/.test(designLayouts));
ok("设施下拉标签结构", /quick-drop-item__label/.test(quickFacilityBlock));
ok("设施下拉无完成按钮", !/quickFacilityDone/.test(appJs));
ok("重置按钮字号变量", /--drop-action-font-size/.test(designLayouts) && /quickFacilityReset/.test(appJs) && /DROP_ACTION_FONT_MIN/.test(appJs));
ok("工具栏标签字号变量", /--chip-label-font-size/.test(designLayouts) && /syncToolbarChipFonts/.test(appJs));
ok("工具栏四段 chip 统一字号", /unifiedPx/.test(appJs) && /Math\.min\(unifiedPx/.test(appJs));
ok("设施 chip 无单独标签字号 CSS", !/\.ft-chip--facility[\s\S]*?\.ft-chip__label[\s\S]*?font-size/.test(designLayouts));
ok("全站自适应入口", /function syncAdaptiveFonts/.test(adaptiveFontsJs) && /scheduleAdaptiveFonts/.test(adaptiveFontsJs));
ok("城市 pill 字号变量", /--loc-pill-font-size/.test(designSystem + designLayouts) && /syncLocPillFonts/.test(adaptiveFontsJs));
ok("详情标题字号变量", /--detail-title-font-size/.test(premiumCss) && /syncDetailSheetFonts/.test(adaptiveFontsJs));
ok("Sheet 按钮字号变量", /--sheet-action-font-size/.test(designLayouts + styleCss) && /syncSheetActionFonts/.test(adaptiveFontsJs));
ok("城市面板 pill 字号", /--city-pill-font-size/.test(designLayouts) && /syncCityPanelFonts/.test(appJs));
ok("筛选 chip 字号变量", /--filter-chip-font-size/.test(designLayouts) && /syncActiveFilterChipFonts/.test(appJs));
ok("排序下拉字号变量", /--sort-drop-item-font-size/.test(designLayouts) && /syncSortDropPanelFonts/.test(appJs));
ok(
  "下拉层移出 sticky",
  /scroll-main[\s\S]*?<\/div>\s*\n\s*<div class="toolbar-drop-layer" id="toolbarDropLayer"/.test(indexHtml)
);
ok(
  "快捷列表 H5 可滚动",
  /\.quick-drop-list[\s\S]*?overflow-y:\s*auto/.test(designLayouts) &&
    !/\.quick-drop-list[\s\S]*?padding:[\s\S]*@media \(min-width: 960px\)[\s\S]*?overflow-y:\s*auto/.test(
      designLayouts.replace(/@media \(min-width: 960px\)[\s\S]*$/, "")
    )
);
ok("快捷面板 flex 限高", /\.quick-drop-panel[\s\S]*display:\s*flex[\s\S]*max-height:/.test(designLayouts));
ok("下拉 top 贴触发器底", /triggerRect\.bottom/.test(appJs) && !/Math\.max\(stickyRect\.top/.test(appJs));
ok("详情页图标化概览", /class=\"detail-overview\"/.test(appJs) && /detail-pill--distance/.test(appJs));
ok("详情页图标行与设施标签", /class=\"detail-lines\"/.test(appJs) && /detail-facilities/.test(appJs) && /detail-facility__icon/.test(appJs));
ok("详情页隐藏重复导航词", /isRedundantDetailQuery/.test(appJs) && /showMapQuery/.test(appJs));
ok("详情页叠层渐变头", /--detail-header-gradient/.test(premiumCss) && /detail-panel::before/.test(premiumCss));
ok("移除四个快捷设施项渲染", /renderValuePerks[\s\S]*el\.innerHTML = \"\"[\s\S]*el\.hidden = true/.test(appJs));
ok("发现页有搜索", /id="searchInput"/.test(indexHtml));
ok("顶栏有城市选择", /id="cityQuickBtn"/.test(indexHtml) && /id="cityQuickBtnDesktop"/.test(indexHtml));
ok("发现页有设施筛选", /id="heroPerks"/.test(indexHtml));
ok("发现页有结果列表", /id="cardGrid"/.test(indexHtml));
ok("详情 Sheet", /id="detailModal"/.test(indexHtml));
ok("距离排序 Tab", /data-sort="distance"/.test(indexHtml));
ok("坐标数据文件存在", fs.existsSync(path.join(ROOT, "js", "resource-coords.js")));
ok("结果计数层叠可读", /\.filter-toolbar-layout \.content-header[\s\S]*isolation:\s*isolate/.test(designLayouts) && /\.result-count[\s\S]*white-space:\s*nowrap/.test(designLayouts + designSystem));
ok("结果计数不被 sticky 渐变吞没", /--discover-sticky-bg:[\s\S]*100%\)/.test(premiumCss) && !/rgba\(242, 242, 247, 0\) 100%/.test(premiumCss));
ok("Apple 柔化 surface token", /--ios-surface-soft/.test(designSystem) && /--ios-separator-soft/.test(designSystem));
ok("筛选条圆角柔化", /\.filter-segment[\s\S]*--ios-radius-sm/.test(designLayouts));
ok("结果计数文案函数", /function resultCountLabel/.test(appJs) && /近→远/.test(appJs));

// ─── 菜单页内容适配 ───
const guideHtml = fs.readFileSync(path.join(ROOT, "guide.html"), "utf8");
const toolsHtml = fs.readFileSync(path.join(ROOT, "tools.html"), "utf8");
const aboutHtml = fs.readFileSync(path.join(ROOT, "about.html"), "utf8");
const feedbackHtml = fs.readFileSync(path.join(ROOT, "feedback.html"), "utf8");
const pagesJs = fs.readFileSync(path.join(ROOT, "js", "pages.js"), "utf8");
const siteStatsJs = fs.readFileSync(path.join(ROOT, "js", "site-stats.js"), "utf8");
const brandShellJs = fs.readFileSync(path.join(ROOT, "js", "brand-shell.js"), "utf8");
const menuPages = guideHtml + toolsHtml + aboutHtml + feedbackHtml;
const allPages = [indexHtml, guideHtml, toolsHtml, aboutHtml, feedbackHtml];
const expectedCssChain = [
  `css/style.css?v=${CACHE_V}`,
  `css/design-system.css?v=${CACHE_V}`,
  `css/themes/variants.css?v=${CACHE_V}`,
  `css/copy-variants.css?v=${CACHE_V}`,
  `css/design-layouts.css?v=${CACHE_V}`,
  `css/premium-ui.css?v=${CACHE_V}`,
];

ok("site-stats 模块存在", fs.existsSync(path.join(ROOT, "js", "site-stats.js")));
ok("子页引入 site-stats", new RegExp(`site-stats\\.js\\?v=${CACHE_V}`).test(menuPages));
ok("子页引入 premium-ui", new RegExp(`premium-ui\\.css\\?v=${CACHE_V}`).test(menuPages));
ok(`子页 v=${CACHE_V}`, new RegExp(`design-system\\.css\\?v=${CACHE_V}`).test(menuPages) && !/design-system\.css\?v=33/.test(menuPages));
ok("场景页动态容器", /id="guideGrid"/.test(guideHtml) && /id="guideSceneChips"/.test(guideHtml));
ok("说明页动态容器", /id="aboutGrid"/.test(aboutHtml) && /id="aboutPageDesc"/.test(aboutHtml));
ok("工具页动态描述", /id="toolsPageDesc"/.test(toolsHtml) && /tools-section--site/.test(pagesJs));
ok("反馈渠道区块", /id="feedbackChannels"/.test(feedbackHtml) && /feedback-channel-card/.test(pagesJs));
ok("说明页无硬编码 2993", !/2993/.test(aboutHtml));
ok("说明页无硬编码 72城", !/72\s*城/.test(aboutHtml) && !/72城/.test(aboutHtml));
ok("子页引入 filter-shared", new RegExp(`filter-shared\\.js\\?v=${CACHE_V}`).test(menuPages));
ok("菜单页无硬编码 72城", !/72\s*城/.test(menuPages) && !/72城/.test(menuPages));
ok("菜单页无硬编码 2993", !/2993/.test(menuPages));
ok("动态 tagline 占位", /\{cities\}/.test(siteConfig) && /SiteStats\.compute/.test(fs.readFileSync(path.join(ROOT, "js", "layout.js"), "utf8")));
ok("pages 渲染 about", /function renderAbout/.test(pagesJs));
ok("pages 场景计数", /guideCounts|countBadge/.test(pagesJs));
ok("SiteStats 导出", /global\.SiteStats/.test(siteStatsJs));
ok("首页引入 site-stats", new RegExp(`site-stats\\.js\\?v=${CACHE_V}`).test(indexHtml));
ok("子页导航含反馈", /feedback\.html/.test(guideHtml + toolsHtml + aboutHtml));
ok("反馈 Sheet dialog", /<dialog class="feedback-modal sheet-dialog"/.test(feedbackHtml));

// ─── 设计统一（v70） ───
const layoutJs = fs.readFileSync(path.join(ROOT, "js", "layout.js"), "utf8");
ok("子页引入 adaptive-fonts", new RegExp(`adaptive-fonts\\.js\\?v=${CACHE_V}`).test(menuPages));
ok("layout 子页 shell", /initSubpageShell/.test(layoutJs) && /glass-nav/.test(layoutJs));
ok("brand-shell 模块", /BrandShell/.test(brandShellJs) && /glassNavRowHtml/.test(brandShellJs));
ok("layout 使用 brand-shell", /BrandShell/.test(layoutJs) && /initBrandShell/.test(layoutJs));
ok("子页 design-system token", /\.app-ui\.subpage[\s\S]*--ios-bg-elevated/.test(designSystem));
ok("子页卡片条纹", /\.app-ui\.subpage[\s\S]*--card-stripe/.test(designSystem));
ok("子页 chip 对齐发现页", /\.app-ui\.subpage \.guide-scene-chip[\s\S]*--ios-shadow/.test(designSystem));
ok("子页无独立 bottom-nav 配色", !/\.app-ui\.subpage[\s\S]*\.bottom-nav[\s\S]*--border/.test(styleCss));
ok("反馈 Sheet 紫渐变", /\.app-ui\.subpage \.feedback-modal[\s\S]*--detail-header-gradient/.test(premiumCss));
ok("子页四页样式栈一致", [guideHtml, toolsHtml, aboutHtml, feedbackHtml].every((h) =>
  expectedCssChain.every((css) => h.includes(css)) &&
  new RegExp(`theme-switch\\.js\\?v=${CACHE_V}`).test(h) &&
  new RegExp(`design-variants\\.js\\?v=${CACHE_V}`).test(h) &&
  new RegExp(`copy-variants\\.js\\?v=${CACHE_V}`).test(h)
));
ok("五页 CSS 链路一致", allPages.every((h) => expectedCssChain.every((css) => h.includes(css))));
ok("五页 app-ui class", allPages.every((h) => /\bclass="app-ui/.test(h)));
ok("子页 home-head 标题", [guideHtml, toolsHtml, aboutHtml, feedbackHtml].every((h) => /class="home-head"/.test(h) && /class="display-title"/.test(h)));
ok("反馈页无 legacy page-head", !/class="page-head"/.test(feedbackHtml));
ok("子页引入 brand-shell", new RegExp(`brand-shell\\.js\\?v=${CACHE_V}`).test(menuPages));
ok("首页引入 adaptive-fonts", new RegExp(`adaptive-fonts\\.js\\?v=${CACHE_V}`).test(indexHtml));

// ─── 品牌统一（v71） ───
ok("单一品牌渐变 token", /--brand-gradient:\s*linear-gradient\(135deg,\s*#007aff,\s*#5856d6\)/.test(designSystem));
ok("nav-brand 引用 brand-gradient", /--nav-brand-gradient:\s*var\(--brand-gradient\)/.test(designSystem));
ok("默认无 teal 品牌渐变", !/--nav-brand-gradient:\s*[^;]*#0d9488/.test(designSystem) && !/--nav-brand-gradient:\s*[^;]*var\(--ios-teal\)/.test(designSystem) && !/--brand-gradient:\s*[^;]*#0d9488/.test(designSystem));
ok("brand-mark 统一样式", /\.app-ui \.brand-mark[\s\S]*--brand-mark-bg/.test(designSystem));
ok("桌面 h1 渐变字", /\.app-ui \.brand h1[\s\S]*--nav-brand-gradient/.test(designSystem));
ok("首页 glass-nav 含 brand-mark", /glass-nav__brand[\s\S]*brand-mark[\s\S]*nav-brand-mini/.test(indexHtml));
ok("layout 注入同款 glass-nav", /glassNavRowHtml/.test(brandShellJs) && /glass-nav__brand[\s\S]*brand-mark[\s\S]*nav-brand-mini/.test(brandShellJs));
ok("style 子页 legacy 已隔离", !/^\s*\.page-head \{/m.test(styleCss) && !/^\s*\.subpage-main \{/m.test(styleCss));
ok("子页顶区渐变", /\.app-ui\.subpage \.subpage-scroll::before/.test(fs.readFileSync(path.join(ROOT, "css", "premium-ui.css"), "utf8")));
ok("首页惠字统一 class", /brand-mark brand-icon/.test(indexHtml));

// ─── 桌面 header 布局（v73） ───
ok("app-ui brand 无下划线", /\.app-ui \.brand[\s\S]*text-decoration:\s*none/.test(designSystem));
ok("app-ui brand-sub 副标题色", /\.app-ui \.brand-sub[\s\S]*--ios-label-secondary/.test(designSystem));
ok("app-ui header-inner 横向 flex", /\.app-ui \.header-inner[\s\S]*display:\s*flex[\s\S]*justify-content:\s*space-between/.test(designSystem));
ok("app-ui header-leading 横向 flex", /\.app-ui \.header-leading[\s\S]*display:\s*flex[\s\S]*align-items:\s*center/.test(designSystem));
ok("桌面 discover-sticky 对齐 scroll-main", /@media \(min-width: 960px\)[\s\S]*\.app-ui \.discover-sticky[\s\S]*margin-left:\s*-24px/.test(designSystem));
ok("filter-toolbar main 无重复水平 padding", /@media \(min-width: 960px\)[\s\S]*\.app-ui\.filter-toolbar-layout \.main[\s\S]*padding-left:\s*0/.test(designSystem));
ok("legacy 桌面 discover-inner 已隔离", !/@media \(min-width: 960px\)[\s\S]*^\s*\.discover-inner \{/m.test(styleCss));

function injectDesktopStyles(doc) {
  for (const file of [
    "css/style.css",
    "css/design-system.css",
    "css/themes/variants.css",
    "css/copy-variants.css",
    "css/design-layouts.css",
    "css/premium-ui.css",
  ]) {
    const style = doc.createElement("style");
    style.textContent = fs.readFileSync(path.join(ROOT, file), "utf8");
    doc.head.appendChild(style);
  }
  const override = doc.createElement("style");
  override.textContent = [
    ".app-ui .site-header{display:block!important}",
    ".app-ui .glass-nav{display:none!important}",
    ".app-ui.filter-toolbar-layout #cityQuickBtn{display:none!important}",
    ".app-ui.filter-toolbar-layout .loc-pill--header{display:inline-flex!important}",
  ].join("");
  doc.head.appendChild(override);
}

function bootDesktopIndex() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, { pretendToBeVisual: true, url: "https://localhost/" });
  const { window } = dom;
  Object.defineProperty(window, "innerWidth", { value: 1280, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
  injectDesktopStyles(window.document);
  return { window, doc: window.document };
}

{
  const { window, doc } = bootDesktopIndex();
  const brand = doc.getElementById("brandHome");
  const headerInner = doc.querySelector(".header-inner");
  const discoverInner = doc.querySelector(".discover-inner");
  const headerLeading = doc.querySelector(".header-leading");
  const brandStyle = brand && window.getComputedStyle(brand);
  const h1Style = brand?.querySelector("h1") && window.getComputedStyle(brand.querySelector("h1"));
  const subStyle = brand?.querySelector(".brand-sub") && window.getComputedStyle(brand.querySelector(".brand-sub"));
  const headerStyle = headerInner && window.getComputedStyle(headerInner);
  const leadingStyle = headerLeading && window.getComputedStyle(headerLeading);

  ok("桌面 brand 无 text-decoration", brandStyle && brandStyle.textDecorationLine === "none");
  ok("桌面 h1 渐变字 color transparent", h1Style && h1Style.color === "rgba(0, 0, 0, 0)");
  ok("桌面 brand-sub 无下划线", subStyle && subStyle.textDecorationLine === "none");
  ok("桌面 header-inner 为 flex", headerStyle && headerStyle.display === "flex");
  ok("桌面 header-leading 为 flex", leadingStyle && leadingStyle.display === "flex");

  if (headerInner && discoverInner) {
    const headerRect = headerInner.getBoundingClientRect();
    const discoverRect = discoverInner.getBoundingClientRect();
    const delta = Math.abs(discoverRect.left - headerRect.left);
    ok("桌面 discover 与 header 左缘对齐", delta <= 2);
  } else {
    ok("桌面 discover 与 header 左缘对齐", false);
  }
}

// ─── H5 反馈 FAB ───
function injectMobileStyles(doc) {
  for (const file of [
    "css/style.css",
    "css/design-system.css",
    "css/themes/variants.css",
    "css/copy-variants.css",
    "css/design-layouts.css",
    "css/premium-ui.css",
  ]) {
    const style = doc.createElement("style");
    style.textContent = fs.readFileSync(path.join(ROOT, file), "utf8");
    doc.head.appendChild(style);
  }
}

{
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, { pretendToBeVisual: true, url: "https://localhost/" });
  const { window } = dom;
  Object.defineProperty(window, "innerWidth", { value: 375, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: 812, configurable: true });
  injectMobileStyles(window.document);
  const fab = window.document.getElementById("feedbackFab");
  const fabStyle = fab && window.getComputedStyle(fab);
  ok("H5 首页反馈 FAB DOM", !!fab);
  ok("H5 反馈 FAB 非 hidden", fabStyle && fabStyle.display !== "none" && fabStyle.visibility !== "hidden");
  ok("H5 反馈 FAB 为 inline-flex", fabStyle && fabStyle.display === "inline-flex");
}

ok("app-ui feedback-fab 完整样式", /\.app-ui \.feedback-fab[\s\S]*display:\s*inline-flex/.test(designSystem));

ok("高德杭州数据文件存在", fs.existsSync(path.join(ROOT, "js/data-amap-hangzhou.js")));
ok(
  "index 引用 data-amap-hangzhou",
  /data-amap-hangzhou\.js/.test(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"))
);
ok("app.js verified 排序优先", /a\.verified/.test(fs.readFileSync(path.join(ROOT, "js/app.js"), "utf8")));
ok("badge-verified 样式", /\.badge-verified/.test(fs.readFileSync(path.join(ROOT, "css/premium-ui.css"), "utf8")));

const total = pass + fail;
console.log(`UI/定位: ${pass}/${total} 通过`);
if (errors.length) {
  errors.forEach((e) => console.log("  ✗", e));
  process.exit(1);
}
console.log("");
