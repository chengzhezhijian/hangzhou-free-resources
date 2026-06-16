#!/usr/bin/env node
/**
 * 为资源生成经纬度（供距离排序）
 * 用法:
 *   node scripts/build-resource-coords.mjs
 *   AMAP_WEB_KEY=你的Key node scripts/build-resource-coords.mjs  # 精确地理编码
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const JS_DIR = path.join(ROOT, "js");
const OUT = path.join(JS_DIR, "resource-coords.js");
const CACHE = path.join(__dirname, ".geocode-cache.json");

function loadEnvFile() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && val && process.env[key] == null) process.env[key] = val;
  }
}

loadEnvFile();

const DISTRICT_CENTROIDS = {
  上城: { lat: 30.242, lng: 120.169 },
  拱墅: { lat: 30.319, lng: 120.142 },
  西湖: { lat: 30.259, lng: 120.130 },
  滨江: { lat: 30.208, lng: 120.211 },
  萧山: { lat: 30.185, lng: 120.264 },
  余杭: { lat: 30.419, lng: 120.299 },
  富阳: { lat: 30.049, lng: 119.960 },
  临平: { lat: 30.421, lng: 120.299 },
  钱塘: { lat: 30.322, lng: 120.493 },
  临安: { lat: 30.234, lng: 119.715 },
  桐庐: { lat: 29.795, lng: 119.691 },
  淳安: { lat: 29.609, lng: 119.042 },
  建德: { lat: 29.472, lng: 119.281 },
  杭州: { lat: 30.274, lng: 120.155 },
};

const CITY_CENTROIDS = {
  杭州: { lat: 30.2741, lng: 120.1551 },
  宁波: { lat: 29.8683, lng: 121.544 },
  温州: { lat: 28.0006, lng: 120.6994 },
  嘉兴: { lat: 30.7461, lng: 120.7555 },
  湖州: { lat: 30.8931, lng: 120.0881 },
  绍兴: { lat: 30.0023, lng: 120.582 },
  金华: { lat: 29.0789, lng: 119.6478 },
  衢州: { lat: 28.9417, lng: 118.8743 },
  舟山: { lat: 29.9853, lng: 122.2072 },
  台州: { lat: 28.6564, lng: 121.4208 },
  丽水: { lat: 28.4517, lng: 119.9229 },
  全省: { lat: 29.5, lng: 120.5 },
};

function loadResources() {
const files = [
  "map-nav.js",
  "data-study-spaces.js",
  "data-extra-resources.js",
  "data-zhejiang-cities.js",
  "data-zhejiang-expanded.js",
  "data.js",
];
  const combined = files.map((f) => fs.readFileSync(path.join(JS_DIR, f), "utf8")).join("\n");
  const ctx = vm.createContext({ console });
  vm.runInContext(`${combined};globalThis.__R__ = RESOURCES;`, ctx);
  return ctx.__R__;
}

function geocodeQuery(resource) {
  const city = resource.city || "杭州";
  const addr = (resource.address || "").trim();
  const name = (resource.fullName || resource.name || "").trim();
  if (addr) {
    if (/^杭州/.test(addr) || /^浙江/.test(addr)) return addr;
    if (city === "全省") return `浙江省${addr}`;
    return `${city}${city.endsWith("市") ? "" : "市"}${addr}`;
  }
  if (name) {
    if (city === "全省") return `浙江省${name}`;
    return `${city}${city.endsWith("市") ? "" : "市"}${name}`;
  }
  return null;
}

function fallbackCoord(resource) {
  const city = resource.city || "杭州";
  if (city === "杭州" || !city || city === "全省") {
    const d = resource.district;
    if (d && DISTRICT_CENTROIDS[d]) return { ...DISTRICT_CENTROIDS[d], precision: "district" };
    if (city === "杭州") return { ...DISTRICT_CENTROIDS.杭州, precision: "city" };
  }
  if (CITY_CENTROIDS[city]) return { ...CITY_CENTROIDS[city], precision: "city" };
  return null;
}

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
}

async function amapGeocode(query, key) {
  const url = new URL("https://restapi.amap.com/v3/geocode/geo");
  url.searchParams.set("address", query);
  url.searchParams.set("key", key);
  url.searchParams.set("city", "浙江");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== "1" || !data.geocodes?.length) return null;
  const [lng, lat] = data.geocodes[0].location.split(",").map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng, precision: "geocode" };
}

async function resolveCoord(resource, cache, key) {
  if (resource.lat != null && resource.lng != null) {
    return { lat: resource.lat, lng: resource.lng, precision: "exact" };
  }
  const query = geocodeQuery(resource);
  if (query && cache[query]) return cache[query];
  if (query && key) {
    try {
      await new Promise((r) => setTimeout(r, 120));
      const hit = await amapGeocode(query, key);
      if (hit) {
        cache[query] = hit;
        return hit;
      }
    } catch (e) {
      console.warn("!", resource.id, e.message);
    }
  }
  return fallbackCoord(resource);
}

async function main() {
  const resources = loadResources();
  const cache = loadCache();
  const key = process.env.AMAP_WEB_KEY || "";
  const coords = {};
  let geocoded = 0;
  let district = 0;
  let city = 0;

  for (const r of resources) {
    const c = await resolveCoord(r, cache, key);
    if (!c) continue;
    coords[r.id] = { lat: +c.lat.toFixed(6), lng: +c.lng.toFixed(6), p: c.precision?.[0] || "?" };
    if (c.precision === "geocode" || c.precision === "exact") geocoded++;
    else if (c.precision === "district") district++;
    else city++;
  }

  saveCache(cache);

  const body = `/** 资源坐标（build-resource-coords.mjs 生成，勿手改） */\nconst RESOURCE_COORDS = ${JSON.stringify(coords, null, 2)};\n`;
  fs.writeFileSync(OUT, body);

  console.log(`✓ ${resources.length} 条资源 → ${Object.keys(coords).length} 条坐标`);
  console.log(`  精确/地理编码 ${geocoded}，区县 ${district}，地市 ${city}`);
  if (!key) console.log("  提示：设置 AMAP_WEB_KEY 可重新运行以提升精度");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
