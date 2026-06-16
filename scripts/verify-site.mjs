#!/usr/bin/env node
/**
 * 站点数据与地图链接自检
 * 用法: node scripts/verify-site.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

import { loadSiteData } from "./lib/load-site-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JS_DIR = path.join(__dirname, "..", "js");

const site = loadSiteData();
const { RESOURCES, CITIES, MapNav, GeoCity, RESOURCE_COORDS } = site;
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
  if (city === "全国") return resourceCity(r) === "全国";
  return (
    resourceCity(r) === city ||
    resourceCity(r) === "全省" ||
    resourceCity(r) === "全国"
  );
}

const CHECK_CITIES = [
  "杭州", "宁波", "温州", "北京", "上海", "广州", "深圳", "成都", "武汉",
];

for (const city of CHECK_CITIES) {
  const list = RESOURCES.filter((r) => resourceCity(r) === city);
  const leaked = RESOURCES.filter(
    (r) =>
      matchesCityFilter(r, city) &&
      resourceCity(r) !== city &&
      resourceCity(r) !== "全省" &&
      resourceCity(r) !== "全国"
  );
  if (leaked.length) fail(`${city} 筛选混入 ${leaked.length} 条他市数据`);
  else ok(`${city} 本地 ${list.length} 条，筛选池 ${RESOURCES.filter((r) => matchesCityFilter(r, city)).length} 条`);
}

// 2. 地图链接应含类目关键词
const samples = [
  ["lib-hz-main", "图书馆"],
  ["tool-toilet", "公共厕所"],
  ["read-ningbo-tool", "城市书房"],
  ["lib-ningbo-xp3amp", "图书馆"],
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
const nb = RESOURCES.find((r) => r.id === "lib-ningbo-xp3amp");
if (nb?.mapUrl?.includes(encodeURIComponent("杭州"))) {
  fail("宁波图书馆 mapUrl 仍含杭州");
} else ok("宁波图书馆 mapUrl 已按地市生成");

// 5. 全省工具浙里办不走地图
const zlb = RESOURCES.find((r) => r.id === "prov-zheliban");
if (MapNav.buildUrl(zlb)) warn("浙里办仍生成地图链接（预期仅官网）");
else ok("浙里办仅走官方平台");

// 6. 城市定位抽查
const { resolveCity } = GeoCity;
const geoCases = [
  ["杭州主城", 30.2741, 120.1551, "杭州"],
  ["市民中心", 30.25, 120.21, "杭州"],
  ["临平", 30.42, 120.3, "杭州"],
  ["钱塘东部", 30.28, 120.35, "杭州"],
  ["北京城区", 39.9042, 116.4074, "北京"],
  ["上海城区", 31.2304, 121.4737, "上海"],
];
for (const [label, lat, lng, expect] of geoCases) {
  const r = resolveCity(lat, lng);
  if (!r.ok || r.city !== expect) fail(`定位 ${label} 应为 ${expect}，实际 ${r.city || r.reason}`);
  else ok(`定位 ${label} → ${r.city}`);
}

// 7. 页面源码不应明文暴露 GitHub Pages 域名
const htmlFiles = ["index.html", "guide.html", "tools.html", "about.html", "feedback.html"];
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  if (/chengzhezhijian\.github\.io/i.test(html)) {
    fail(`${file} 不应包含 GitHub Pages 明文域名`);
  } else {
    ok(`${file} 未暴露 GitHub Pages 域名`);
  }
}

// 8. 资源坐标应覆盖全部点位，且落在中国范围
const CHINA_BBOX = { latMin: 18.0, latMax: 54.0, lngMin: 73.0, lngMax: 135.5 };
const coordsPath = path.join(JS_DIR, "resource-coords.js");
if (!fs.existsSync(coordsPath)) {
  fail("缺少 js/resource-coords.js，请运行 node scripts/build-resource-coords.mjs");
} else {
  const coordsCtx = vm.createContext({});
  vm.runInContext(
    fs.readFileSync(coordsPath, "utf8") + ";globalThis.__C__ = RESOURCE_COORDS;",
    coordsCtx
  );
  const coords = coordsCtx.__C__;
  const missing = RESOURCES.filter((r) => !coords[r.id]);
  if (missing.length > RESOURCES.length * 0.01) fail(`坐标缺失 ${missing.length} 条，如 ${missing[0]?.id}`);
  else ok(`${RESOURCES.length} 条资源坐标覆盖 ${Object.keys(coords).length}（缺失 ${missing.length}）`);

  const oob = RESOURCES.filter((r) => {
    const c = coords[r.id];
    if (!c) return false;
    return (
      c.lat < CHINA_BBOX.latMin ||
      c.lat > CHINA_BBOX.latMax ||
      c.lng < CHINA_BBOX.lngMin ||
      c.lng > CHINA_BBOX.lngMax
    );
  });
  if (oob.length) fail(`坐标越界 ${oob.length} 条，如 ${oob[0]?.id}`);
  else ok("全部坐标落在中国范围内");
}

// 9. 重点城市应有足够数据
const MIN_CITY_RESOURCES = {
  杭州: 400,
  宁波: 25,
  温州: 22,
  北京: 35,
  上海: 35,
  广州: 35,
  深圳: 35,
  成都: 35,
  武汉: 35,
};
for (const [city, min] of Object.entries(MIN_CITY_RESOURCES)) {
  const n = RESOURCES.filter((r) => resourceCity(r) === city).length;
  if (n < min) fail(`${city} 仅 ${n} 条，期望至少 ${min} 条`);
  else ok(`${city} ${n} 条（≥${min}）`);
}

console.log(`\n完成：${errors} 错误，${warnings} 警告`);
process.exit(errors ? 1 : 0);
