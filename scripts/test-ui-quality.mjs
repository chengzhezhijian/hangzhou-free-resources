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

ok("距离仅精确坐标显示", /coordIsPrecise/.test(appJs) && /!coordIsPrecise\(c\)/.test(appJs));
ok("无蹭享旧品牌", !/蹭享|蹭/.test(indexHtml + siteConfig));
ok("全国惠民地图品牌", /全国惠民地图/.test(siteConfig));
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
