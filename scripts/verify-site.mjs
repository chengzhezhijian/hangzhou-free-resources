#!/usr/bin/env node
/**
 * 站点数据与地图链接自检
 * 用法: node scripts/verify-site.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JS_DIR = path.join(__dirname, "..", "js");

const files = [
  "map-nav.js",
  "data-study-spaces.js",
  "data-extra-resources.js",
  "data-zhejiang-cities.js",
  "data.js",
];

const combined = files.map((f) => fs.readFileSync(path.join(JS_DIR, f), "utf8")).join("\n");
const ctx = vm.createContext({ console });
vm.runInContext(
  `${combined}
;globalThis.__EXPORT__ = { RESOURCES, CITIES, MapNav };`,
  ctx
);

const { RESOURCES, CITIES, MapNav } = ctx.__EXPORT__;
let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error("✗", msg);
  errors++;
}
function warn(msg) {
  console.warn("!", msg);
  warnings++;
}
function ok(msg) {
  console.log("✓", msg);
}

function resourceCity(r) {
  return r.city || "杭州";
}

function matchesCityFilter(r, city) {
  if (city === "全部") return true;
  if (city === "全省") return resourceCity(r) === "全省";
  return resourceCity(r) === city || resourceCity(r) === "全省";
}

// 1. 各地市筛选不应混入他市点位（不含全省）
for (const city of CITIES.filter((c) => c !== "全部" && c !== "全省")) {
  const list = RESOURCES.filter((r) => resourceCity(r) === city);
  const leaked = RESOURCES.filter(
    (r) => matchesCityFilter(r, city) && resourceCity(r) !== city && resourceCity(r) !== "全省"
  );
  if (leaked.length) fail(`${city} 筛选混入 ${leaked.length} 条他市数据`);
  else ok(`${city} 本地 ${list.length} 条，筛选池 ${RESOURCES.filter((r) => matchesCityFilter(r, city)).length} 条`);
}

// 2. 地图链接应含类目关键词
const samples = [
  ["lib-hz-main", "图书馆"],
  ["tool-toilet", "公共厕所"],
  ["read-ningbo-tool", "城市书房"],
  ["lib-ningbo-main", "图书馆"],
];

for (const [id, kw] of samples) {
  const r = RESOURCES.find((x) => x.id === id);
  if (!r) {
    warn(`样例 ${id} 不存在`);
    continue;
  }
  const q = MapNav.buildQuery(r, resourceCity(r) === "全省" ? "杭州" : resourceCity(r));
  const url = MapNav.buildUrl(r, "宁波");
  if (!q || !q.includes(kw)) fail(`${id} 地图词缺少「${kw}」: ${q}`);
  else ok(`${id} → ${q}`);
  if (id === "lib-hz-main" && /解放东路|市民中心J楼/.test(q)) {
    fail(`${id} 地图词不应包含地址: ${q}`);
  }
  if (id === "tool-toilet" && url && !url.includes(encodeURIComponent("公共厕所"))) {
    fail("公厕工具在宁波上下文中未生成公共厕所搜索");
  }
}

// 3. 地图链接应进入高德搜索页（含 keyword、view=list、callnative）
const hz = RESOURCES.find((r) => r.id === "lib-hz-main");
if (!hz?.mapUrl?.includes("uri.amap.com/search")) fail("地图链接未使用高德搜索页");
else if (!hz.mapUrl.includes("keyword=")) fail("地图链接未使用 keyword 参数");
else if (!hz.mapUrl.includes("view=list")) fail("地图链接未设置 view=list");
else if (!hz.mapUrl.includes("callnative=1")) fail("地图链接未设置 callnative=1");
else ok(`高德搜索页 → ${decodeURIComponent(hz.mapUrl.split("keyword=")[1]?.split("&")[0] || "")}`);

// 4. 不应再保留「仅杭州」硬编码在新建资源 mapUrl（抽查宁波）
const nb = RESOURCES.find((r) => r.id === "lib-ningbo-main");
if (nb?.mapUrl?.includes(encodeURIComponent("杭州"))) {
  fail("宁波图书馆 mapUrl 仍含杭州");
} else ok("宁波图书馆 mapUrl 已按地市生成");

// 5. 全省工具浙里办不走地图
const zlb = RESOURCES.find((r) => r.id === "prov-zheliban");
if (MapNav.buildUrl(zlb)) warn("浙里办仍生成地图链接（预期仅官网）");
else ok("浙里办仅走官方平台");

// 6. 地市定位：杭州常见坐标不应落入嘉兴/绍兴
const geoCtx = vm.createContext({});
vm.runInContext(
  fs.readFileSync(path.join(JS_DIR, "geo.js"), "utf8") + ";globalThis.__GEO__ = GeoCity;",
  geoCtx
);
const { resolveCity } = geoCtx.__GEO__;
const geoCases = [
  ["杭州主城", 30.2741, 120.1551, "杭州"],
  ["市民中心", 30.25, 120.21, "杭州"],
  ["临平", 30.42, 120.3, "杭州"],
  ["钱塘东部", 30.28, 120.35, "杭州"],
  ["嘉兴市区", 30.7461, 120.7555, "嘉兴"],
];
for (const [label, lat, lng, expect] of geoCases) {
  const r = resolveCity(lat, lng);
  if (!r.ok || r.city !== expect) fail(`定位 ${label} 应为 ${expect}，实际 ${r.city || r.reason}`);
  else ok(`定位 ${label} → ${r.city}`);
}

// 7. 页面源码不应明文暴露 GitHub Pages 域名
const indexHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
if (/chengzhezhijian\.github\.io/i.test(indexHtml)) {
  fail("index.html 不应包含 GitHub Pages 明文域名");
} else ok("index.html 未暴露 GitHub Pages 域名");

console.log(`\n完成：${errors} 错误，${warnings} 警告`);
process.exit(errors ? 1 : 0);
