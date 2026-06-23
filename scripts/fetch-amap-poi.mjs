#!/usr/bin/env node
/**
 * 高德 POI 增量拉取 → js/data-amap-poi.js
 *
 * 用法:
 *   node scripts/fetch-amap-poi.mjs              # 每日增量（默认）
 *   AMAP_FULL_SYNC=1 node scripts/fetch-amap-poi.mjs  # 全量同步
 *
 * 环境变量:
 *   AMAP_WEB_KEY      必填（.env 或 CI secret）
 *   AMAP_FULL_SYNC=1  全量页数；否则每任务仅前 2 页增量
 *   AMAP_CITIES=zhejiang|all|杭州,宁波  覆盖城市列表
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { amapWebKey } from "./lib/load-env.mjs";
import {
  ZHEJIANG_CITIES,
  ROTATION_CITIES,
  FETCH_TASKS,
  citiesForRun,
  pageLimit,
  CATEGORY_FACILITIES,
} from "./lib/amap-poi-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const JS_DIR = path.join(ROOT, "js");
const OUT = path.join(JS_DIR, "data-amap-poi.js");
const LEGACY_OUT = path.join(JS_DIR, "data-amap-hangzhou.js");
const CACHE = path.join(__dirname, ".amap-poi-cache.json");
const LOG = path.join(ROOT, "docs", "amap-sync-log.md");

const FULL_SYNC = process.env.AMAP_FULL_SYNC === "1";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function asText(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return asText(v[0]);
  return String(v).trim();
}

function districtFromAdname(adname) {
  if (!adname) return "";
  return adname.replace(/(区|县|市)$/, "");
}

function normalizeKey(name, address, city) {
  return `${city}|${(name || "").replace(/\s/g, "")}|${(address || "").slice(0, 24)}`;
}

function poiToResource(poi, category, city, slug) {
  const [lng, lat] = (poi.location || "").split(",").map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const address = asText(poi.address) || asText(poi.name);
  if (!address) return null;

  const id = `amap-${slug}-${category}-${poi.id}`;
  const tel = asText(poi.tel).split(";")[0].trim();

  return {
    id,
    name: asText(poi.name),
    category,
    city,
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
    syncedAt: new Date().toISOString().slice(0, 10),
  };
}

function loadExistingResources() {
  const byId = new Map();
  const files = [
    { path: OUT, vars: ["AMAP_POI_RESOURCES"] },
    { path: LEGACY_OUT, vars: ["AMAP_HANGZHOU_RESOURCES", "AMAP_POI_RESOURCES"] },
  ];

  for (const { path: fp, vars } of files) {
    if (!fs.existsSync(fp)) continue;
    const ctx = vm.createContext({});
    try {
      vm.runInContext(fs.readFileSync(fp, "utf8"), ctx);
      for (const v of vars) {
        const arr = ctx[v];
        if (!Array.isArray(arr)) continue;
        for (const r of arr) {
          if (r?.id) byId.set(r.id, r);
        }
      }
    } catch (e) {
      console.warn("跳过解析", fp, e.message);
    }
  }
  return byId;
}

function resolveCityList() {
  const raw = (process.env.AMAP_CITIES || "").trim();
  if (raw === "all") {
    return [...ZHEJIANG_CITIES, ...ROTATION_CITIES];
  }
  if (raw === "zhejiang") {
    return [...ZHEJIANG_CITIES];
  }
  if (raw) {
    const names = raw.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    const all = [...ZHEJIANG_CITIES, ...ROTATION_CITIES];
    return all.filter((c) => names.includes(c.name));
  }
  return citiesForRun({ fullSync: FULL_SYNC, includeRotation: !FULL_SYNC });
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
  if (!res.ok) throw new Error(`HTTP ${res.status} ${city} ${keywords} p${page}`);
  const data = await res.json();
  if (data.status !== "1") {
    throw new Error(`Amap ${data.info || data.infocode} ${city} ${keywords} p${page}`);
  }
  return data;
}

async function fetchCityTask(city, slug, task, key, byId, seenKeys, stats) {
  const { keywords, category } = task;
  const maxP = pageLimit(city.name, task, FULL_SYNC);
  let added = 0;
  let updated = 0;

  for (let page = 1; page <= maxP; page++) {
    await sleep(FULL_SYNC ? 180 : 120);
    const data = await fetchPlacePage(keywords, city.name, page, key);
    const pois = data.pois || [];
    if (!pois.length) break;

    for (const poi of pois) {
      if (!poi.id) continue;
      const resource = poiToResource(poi, category, city.name, slug);
      if (!resource) continue;
      const dk = normalizeKey(resource.name, resource.address, city.name);
      if (seenKeys.has(dk) && !byId.has(resource.id)) continue;

      if (byId.has(resource.id)) {
        const prev = byId.get(resource.id);
        byId.set(resource.id, { ...prev, ...resource, syncedAt: resource.syncedAt });
        updated++;
      } else {
        byId.set(resource.id, resource);
        seenKeys.add(dk);
        added++;
      }
    }

    const total = parseInt(data.count, 10) || 0;
    if (page * 25 >= total) break;
  }

  stats.requests += maxP;
  console.log(`  ✓ ${city.name} · ${keywords} +${added} ~${updated}`);
  return { added, updated };
}

function writeOutput(byId) {
  const resources = [...byId.values()].sort((a, b) =>
    (a.city || "").localeCompare(b.city || "", "zh-CN") ||
    (a.category || "").localeCompare(b.category || "") ||
    (a.name || "").localeCompare(b.name || "", "zh-CN")
  );

  const header = `/** 高德 POI 资源（fetch-amap-poi.mjs 生成，勿手改） */
/** 数据来源：高德地图 POI · 更新于 ${new Date().toISOString()} */
const AMAP_POI_RESOURCES = `;
  fs.writeFileSync(OUT, `${header}${JSON.stringify(resources, null, 2)};\n`);
  return resources;
}

function appendLog(summary) {
  const line = `- **${summary.date}** ${summary.mode}：${summary.total} 条（+${summary.added}）· ${summary.cities.join("、")}\n`;
  let body = "";
  if (fs.existsSync(LOG)) {
    body = fs.readFileSync(LOG, "utf8");
  } else {
    body = "# 高德 POI 同步日志\n\n";
  }
  if (!body.includes(line.slice(0, 20))) {
    fs.writeFileSync(LOG, body + line);
  }
}

async function main() {
  const key = amapWebKey();
  if (!key) {
    console.error("缺少 AMAP_WEB_KEY（.env 或 GitHub Secrets）");
    process.exit(1);
  }

  const cities = resolveCityList();
  const byId = loadExistingResources();
  const before = byId.size;
  const seenKeys = new Set(
    [...byId.values()].map((r) => normalizeKey(r.name, r.address, r.city))
  );

  console.log(
    FULL_SYNC ? "全量同步高德 POI…" : "每日增量同步高德 POI…",
    `已有 ${before} 条 · ${cities.length} 城`
  );

  const stats = { added: 0, updated: 0, requests: 0 };

  for (const city of cities) {
    console.log(`\n▸ ${city.name}`);
    for (const task of FETCH_TASKS) {
      const { added, updated } = await fetchCityTask(
        city,
        city.slug,
        task,
        key,
        byId,
        seenKeys,
        stats
      );
      stats.added += added;
      stats.updated += updated;
    }
  }

  const resources = writeOutput(byId);

  fs.writeFileSync(
    CACHE,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        mode: FULL_SYNC ? "full" : "daily",
        total: resources.length,
        added: stats.added,
        updated: stats.updated,
        cities: cities.map((c) => c.name),
      },
      null,
      2
    )
  );

  appendLog({
    date: new Date().toISOString().slice(0, 10),
    mode: FULL_SYNC ? "全量" : "增量",
    total: resources.length,
    added: stats.added,
    cities: cities.map((c) => c.name),
  });

  const byCity = {};
  const byCat = {};
  resources.forEach((r) => {
    byCity[r.city] = (byCity[r.city] || 0) + 1;
    byCat[r.category] = (byCat[r.category] || 0) + 1;
  });

  console.log(`\n✓ 写入 ${OUT}`);
  console.log(`  合计 ${resources.length} 条（+${stats.added} 新增，~${stats.updated} 更新）`);
  console.log("  城市:", JSON.stringify(byCity));
  console.log("  分类:", JSON.stringify(byCat));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
