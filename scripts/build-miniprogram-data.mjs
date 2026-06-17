#!/usr/bin/env node
/**
 * 将网站数据导出为微信小程序可用模块（全国版 + 坐标 + 字段瘦身）
 * 用法: node scripts/build-miniprogram-data.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { loadSiteData } from "./lib/load-site-data.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "miniprogram", "packageData", "data");

function slimResource(r, coords) {
  const c = coords[r.id];
  const facilities = [];
  if (r.facilities) {
    for (const [k, v] of Object.entries(r.facilities)) {
      if (v === true || v === "partial") facilities.push(k);
    }
  }
  const item = {
    id: r.id,
    name: r.name,
    city: r.city || "杭州",
    category: r.category,
  };
  if (r.district) item.district = r.district;
  if (r.address) item.address = r.address;
  if (r.hours) item.hours = r.hours;
  if (r.note) item.note = r.note;
  if (r.subType) item.subType = r.subType;
  if (facilities.length) item.facilities = facilities;
  if (r.costType && r.costType !== "free") item.costType = r.costType;
  if (r.featured) item.featured = true;
  if (r.seasonal) item.seasonal = true;
  if (r.isTool) item.isTool = true;
  if (c?.lat != null && c?.lng != null) {
    item.lat = c.lat;
    item.lng = c.lng;
  }
  return item;
}

function build() {
  const site = loadSiteData();
  const {
    RESOURCES,
    RESOURCE_CATEGORIES,
    CATEGORY_GROUPS,
    COST_TYPE_LABELS,
    FACILITY_FILTERS,
    CITY_PICKER,
    DISTRICTS,
    SCENE_GUIDES,
    SITE_SCOPE,
    RESOURCE_COORDS,
  } = site;

  const extraCtx = vm.createContext({ console });
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js", "data.js"), "utf8"), extraCtx);

  let CITY_CENTERS = {};
  const cfgCtx = vm.createContext({});
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, "js", "data-china-config.js"), "utf8") +
      ";globalThis.__CC = CITY_CENTERS;",
    cfgCtx
  );
  CITY_CENTERS = cfgCtx.__CC || {};

  const slim = RESOURCES.map((r) => slimResource(r, RESOURCE_COORDS));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const meta = {
    siteScope: SITE_SCOPE || "china",
    siteBrandName: "全国惠民地图",
    siteTagline: "政府免费便民 · 72城搜完即走",
    resourceCategories: RESOURCE_CATEGORIES,
    categoryGroups: CATEGORY_GROUPS,
    costTypeLabels: COST_TYPE_LABELS,
    facilityFilters: FACILITY_FILTERS,
    valuePerks: extraCtx.VALUE_PERKS,
    quickScenes: extraCtx.QUICK_SCENES,
    cities: CITY_PICKER,
    districts: DISTRICTS,
    sceneGuides: SCENE_GUIDES,
    cityCenters: CITY_CENTERS,
    generatedAt: new Date().toISOString(),
    total: slim.length,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "resources.js"),
    `/** 自动生成 · build-miniprogram-data */\nmodule.exports = ${JSON.stringify(slim)};\n`
  );
  fs.writeFileSync(
    path.join(OUT_DIR, "meta.js"),
    `/** 自动生成 · build-miniprogram-data */\nmodule.exports = ${JSON.stringify(meta)};\n`
  );

  const resSize = fs.statSync(path.join(OUT_DIR, "resources.js")).size;
  const metaSize = fs.statSync(path.join(OUT_DIR, "meta.js")).size;

  console.log(`✓ 小程序数据已生成 ${slim.length} 条`);
  console.log(`  resources.js ${(resSize / 1024).toFixed(1)} KB`);
  console.log(`  meta.js ${(metaSize / 1024).toFixed(1)} KB`);
  if (resSize > 1.8 * 1024 * 1024) {
    console.warn("⚠ resources.js 接近 2MB 分包上限，可考虑按省拆分");
  }
}

try {
  build();
} catch (e) {
  console.error(e);
  process.exit(1);
}
