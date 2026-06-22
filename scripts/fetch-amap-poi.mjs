#!/usr/bin/env node
/**
 * 从高德 POI 搜索 API 拉取杭州真实点位，生成 js/data-amap-hangzhou.js
 * 用法: node scripts/fetch-amap-poi.mjs
 * 需 .env 中 AMAP_WEB_KEY（Web 服务）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { amapWebKey } from "./lib/load-env.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "js", "data-amap-hangzhou.js");
const CACHE = path.join(__dirname, ".amap-poi-cache.json");

/** 杭州 POI 检索任务：keywords + 站点类别 + 最大页数（每页 25 条） */
const FETCH_TASKS = [
  { keywords: "市民之家", category: "gov_service", maxPages: 8 },
  { keywords: "政务服务中心", category: "gov_service", maxPages: 8 },
  { keywords: "人力资源和社会保障局", category: "gov_service", maxPages: 5 },
  { keywords: "人民法院", category: "court", maxPages: 8 },
  { keywords: "劳动人事争议仲裁", category: "court", maxPages: 4 },
  { keywords: "公共厕所", category: "toilet", maxPages: 12 },
  { keywords: "充电站", category: "charging", maxPages: 10 },
  { keywords: "公共图书馆", category: "library", maxPages: 5 },
  { keywords: "城市书房", category: "reading", maxPages: 8 },
  { keywords: "人民公园", category: "park", maxPages: 8 },
  { keywords: "体育场馆", category: "sports", maxPages: 6 },
  { keywords: "党群服务中心", category: "community", maxPages: 6 },
];

const DISTRICT_SHORT = {
  上城区: "上城",
  拱墅区: "拱墅",
  西湖区: "西湖",
  滨江区: "滨江",
  萧山区: "萧山",
  余杭区: "余杭",
  临平区: "临平",
  钱塘区: "钱塘",
  富阳区: "富阳",
  临安区: "临安",
  桐庐县: "桐庐",
  淳安县: "淳安",
  建德市: "建德",
};

const CATEGORY_FACILITIES = {
  gov_service: { wifi: "partial", water: "partial", ac: true },
  court: { wifi: "partial", water: "partial", ac: true },
  toilet: { water: "partial" },
  charging: { charge: true },
  library: { wifi: true, water: "partial", ac: true, study: true, charge: true },
  reading: { wifi: "partial", ac: true, study: true, charge: "partial" },
  park: { water: "partial" },
  sports: { water: "partial", ac: "partial" },
  community: { wifi: "partial", water: true, ac: "partial", charge: "partial" },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function districtFromAdname(adname) {
  if (!adname) return "";
  return DISTRICT_SHORT[adname] || adname.replace(/(区|县|市)$/, "");
}

function normalizeKey(name, address) {
  return `${(name || "").replace(/\s/g, "")}|${(address || "").slice(0, 24)}`;
}

function asText(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return asText(v[0]);
  return String(v).trim();
}

function poiToResource(poi, category) {
  const [lng, lat] = (poi.location || "").split(",").map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const address = asText(poi.address) || asText(poi.name);
  if (!address) return null;

  const id = `amap-hz-${category}-${poi.id}`;
  const tel = asText(poi.tel).split(";")[0].trim();

  return {
    id,
    name: asText(poi.name),
    category,
    city: "杭州",
    district: districtFromAdname(poi.adname),
    address,
    phone: tel && tel !== "[]" ? tel : "",
    hours: "",
    lat,
    lng,
    verified: true,
    source: "amap",
    amapId: poi.id,
    amapType: poi.type || "",
    facilities: { ...(CATEGORY_FACILITIES[category] || {}) },
    features: ["高德POI"],
    note: "数据来源：高德地图 POI，开放时间与是否免费请以现场及官方公告为准",
    seasonal: false,
    costType: "free",
  };
}

async function fetchPlacePage(keywords, city, page, key) {
  const url = new URL("https://restapi.amap.com/v3/place/text");
  url.searchParams.set("key", key);
  url.searchParams.set("keywords", keywords);
  url.searchParams.set("city", city);
  url.searchParams.set("citylimit", "true");
  url.searchParams.set("offset", "25");
  url.searchParams.set("page", String(page));
  url.searchParams.set("extensions", "base");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${keywords} p${page}`);
  const data = await res.json();
  if (data.status !== "1") {
    throw new Error(`Amap ${data.info || data.infocode} ${keywords} p${page}`);
  }
  return data;
}

async function fetchTask(task, key, seenIds, seenKeys, out) {
  const { keywords, category, maxPages } = task;
  let added = 0;

  for (let page = 1; page <= maxPages; page++) {
    await sleep(180);
    const data = await fetchPlacePage(keywords, "杭州", page, key);
    const pois = data.pois || [];
    if (!pois.length) break;

    for (const poi of pois) {
      if (!poi.id || seenIds.has(poi.id)) continue;
      const resource = poiToResource(poi, category);
      if (!resource) continue;
      const dk = normalizeKey(resource.name, resource.address);
      if (seenKeys.has(dk)) continue;
      seenIds.add(poi.id);
      seenKeys.add(dk);
      out.push(resource);
      added++;
    }

    const total = parseInt(data.count, 10) || 0;
    if (page * 25 >= total) break;
  }

  console.log(`  ✓ ${keywords} (${category}) +${added}`);
  return added;
}

function writeOutput(resources) {
  const header = `/** 杭州市高德 POI 资源（fetch-amap-poi.mjs 生成，勿手改） */
/** 数据来源：高德地图 POI 搜索 API · 生成于 ${new Date().toISOString()} */
const AMAP_HANGZHOU_RESOURCES = `;
  fs.writeFileSync(OUT, `${header}${JSON.stringify(resources, null, 2)};\n`);
}

async function main() {
  const key = amapWebKey();
  if (!key) {
    console.error("缺少 AMAP_WEB_KEY，请在 .env 中配置");
    process.exit(1);
  }

  let cache = {};
  try {
    cache = JSON.parse(fs.readFileSync(CACHE, "utf8"));
  } catch {
    /* empty */
  }

  const seenIds = new Set(Object.keys(cache.seenIds || {}));
  const seenKeys = new Set(cache.seenKeys || []);
  const resources = [];

  console.log("拉取杭州高德 POI…");
  for (const task of FETCH_TASKS) {
    await fetchTask(task, key, seenIds, seenKeys, resources);
  }

  fs.writeFileSync(
    CACHE,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        seenIds: Object.fromEntries([...seenIds].map((id) => [id, true])),
        seenKeys: [...seenKeys],
        count: resources.length,
      },
      null,
      2
    )
  );

  writeOutput(resources);
  console.log(`\n✓ 写入 ${OUT}`);
  console.log(`  共 ${resources.length} 条 verified 杭州 POI`);

  const byCat = {};
  resources.forEach((r) => {
    byCat[r.category] = (byCat[r.category] || 0) + 1;
  });
  console.log("  分类:", JSON.stringify(byCat));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
