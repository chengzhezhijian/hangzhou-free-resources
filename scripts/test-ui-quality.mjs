#!/usr/bin/env node
/**
 * UI / 产品定位自动化检查
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appJs = fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const siteConfig = fs.readFileSync(path.join(ROOT, "js", "site-config.js"), "utf8");
const designLayouts = fs.readFileSync(path.join(ROOT, "css", "design-layouts.css"), "utf8");
const styleCss = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
const premiumCss = fs.readFileSync(path.join(ROOT, "css", "premium-ui.css"), "utf8");
const designSystem = fs.readFileSync(path.join(ROOT, "css", "design-system.css"), "utf8");
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
ok("glass-nav 城市在品牌左侧", /glass-nav__row[\s\S]*?id="cityQuickBtn"[\s\S]*?nav-brand-mini/.test(indexHtml));
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
ok("全站自适应入口", /function syncAdaptiveFonts/.test(appJs) && /scheduleAdaptiveFonts/.test(appJs));
ok("城市 pill 字号变量", /--loc-pill-font-size/.test(designSystem + designLayouts) && /syncLocPillFonts/.test(appJs));
ok("详情标题字号变量", /--detail-title-font-size/.test(premiumCss) && /syncDetailSheetFonts/.test(appJs));
ok("Sheet 按钮字号变量", /--sheet-action-font-size/.test(designLayouts + styleCss) && /syncSheetActionFonts/.test(appJs));
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

const total = pass + fail;
console.log(`UI/定位: ${pass}/${total} 通过`);
if (errors.length) {
  errors.forEach((e) => console.log("  ✗", e));
  process.exit(1);
}
console.log("");
