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
const premiumCss = fs.readFileSync(path.join(ROOT, "css", "premium-ui.css"), "utf8");

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
ok("快捷筛选渲染函数", /function renderFilterToolbar/.test(appJs) && /quickSceneBtn/.test(appJs));
ok("快捷筛选下箭头", /ft-chip--quick/.test(appJs) && /▾/.test(appJs));
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
ok("详情头部轻渐变变量", /detail-header-gradient/.test(premiumCss));
ok("详情头部玻璃层", /detail-panel \.modal-header[\s\S]*backdrop-filter/.test(premiumCss));
ok("发现页有搜索", /id="searchInput"/.test(indexHtml));
ok("发现页有城市选择", /id="cityQuickBtn"/.test(indexHtml));
ok("发现页有设施筛选", /id="heroPerks"/.test(indexHtml));
ok("发现页有结果列表", /id="cardGrid"/.test(indexHtml));
ok("详情 Sheet", /id="detailModal"/.test(indexHtml));
ok("距离排序 Tab", /data-sort="distance"/.test(indexHtml));
ok("坐标数据文件存在", fs.existsSync(path.join(ROOT, "js", "resource-coords.js")));

const total = pass + fail;
console.log(`UI/定位: ${pass}/${total} 通过`);
if (errors.length) {
  errors.forEach((e) => console.log("  ✗", e));
  process.exit(1);
}
console.log("");
