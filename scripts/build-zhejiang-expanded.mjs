#!/usr/bin/env node
/**
 * 从 seed 生成浙江省各地市扩展资源
 * 用法: node scripts/build-zhejiang-expanded.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, "zhejiang-cities-seed.json");
const OUT_PATH = path.join(__dirname, "..", "js", "data-zhejiang-expanded.js");

const CITY_SLUG = {
  宁波: "ningbo",
  温州: "wenzhou",
  嘉兴: "jiaxing",
  湖州: "huzhou",
  绍兴: "shaoxing",
  金华: "jinhua",
  衢州: "quzhou",
  舟山: "zhoushan",
  台州: "taizhou",
  丽水: "lishui",
};

const LIB_FAC = { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false };
const READ_FAC = { wifi: "partial", water: "partial", ac: true, study: true, charge: "partial", open24: false };

function stableId(city, category, name) {
  const slug = CITY_SLUG[city] || "zj";
  const prefix = { library: "lib", reading: "read", museum: "museum", park: "park", tool: "tool", policy: "pol", station: "sta", toilet: "toil", parking: "park-t", sports: "sport", community: "com", charging: "chg" }[category] || "res";
  let h = 0;
  const raw = `${city}:${name}`;
  for (let i = 0; i < raw.length; i++) h = ((h << 5) - h + raw.charCodeAt(i)) | 0;
  return `${prefix}-${slug}-${Math.abs(h).toString(36)}`;
}

function cleanDistrict(d) {
  if (!d) return "";
  return d.replace(/（.*?）/g, "").replace(/(市|区|县)$/, "") || d;
}

function cleanAddr(addr) {
  return (addr || "").replace(/^浙江省/, "").trim();
}

function cleanName(name) {
  return (name || "").trim();
}

function mkLibrary(city, item, featured = false) {
  return {
    id: stableId(city, "library", item.name),
    name: cleanName(item.name),
    category: "library",
    city,
    district: cleanDistrict(item.district),
    address: cleanAddr(item.address),
    hours: item.hours || "周二至周日 9:00—20:00，周一闭馆",
    phone: item.phone || "",
    transport: item.transport || "",
    facilities: { ...LIB_FAC },
    seasonal: false,
    featured: !!featured,
    website: item.website || "",
    features: item.features || ["公共图书馆", "可自习"],
    note: item.note || "",
  };
}

function mkReading(city, item) {
  return {
    id: stableId(city, "reading", item.name),
    name: item.name,
    fullName: item.name,
    category: "reading",
    subType: "城市书房",
    city,
    district: cleanDistrict(item.district),
    address: cleanAddr(item.address),
    hours: item.hours || "以书房公告为准",
    phone: item.phone || "",
    facilities: { ...READ_FAC },
    seasonal: false,
    featured: false,
    website: item.website || "",
    features: ["城市书房", "免费阅览"],
    note: item.note || "",
  };
}

function mkMuseum(city, item) {
  const cond = /门票|购票|收费/.test(item.name + (item.note || ""));
  return {
    id: stableId(city, "museum", item.name),
    name: item.name,
    category: "museum",
    city,
    district: cleanDistrict(item.district),
    address: cleanAddr(item.address),
    hours: item.hours || "周二至周日 9:00—17:00，周一闭馆",
    phone: item.phone || "",
    costType: cond ? "conditional" : "free",
    facilities: { ac: true },
    seasonal: false,
    featured: !!item.featured,
    website: item.website || "",
    features: item.features || ["博物馆"],
    note: item.note || "",
  };
}

function mkPark(city, item) {
  const cond = /错峰|部分|购票|收费/.test((item.name || "") + (item.note || "") + (item.features || []).join(""));
  return {
    id: stableId(city, "park", item.name),
    name: item.name,
    category: "park",
    city,
    district: cleanDistrict(item.district),
    address: cleanAddr(item.address),
    hours: item.hours || "全天开放",
    costType: cond ? "conditional" : "free",
    facilities: {},
    seasonal: false,
    featured: !!item.featured,
    features: item.features || ["城市公园"],
    note: item.note || "",
  };
}

function mkCityTools(city, tools) {
  const slug = CITY_SLUG[city];
  const zlb = tools?.zheli_app || "https://www.zjzwfw.gov.cn/";
  const libFinder = tools?.library_reading_room_finder || "";
  const list = [
    {
      id: `tool-${slug}-zlb`,
      name: `浙里办 · ${city}服务`,
      category: "policy",
      subType: "地市工具",
      city,
      district: city,
      address: `${city}市`,
      hours: "在线",
      costType: "tool",
      isTool: true,
      website: zlb,
      features: ["找公厕", "找车位", "政务便民", `${city}分厅`],
      facilities: {},
      seasonal: false,
    },
    {
      id: `tool-${slug}-toilet`,
      name: `${city} · 公共厕所查询`,
      category: "toilet",
      city,
      district: city,
      address: `${city}市`,
      hours: "实时查询",
      costType: "tool",
      isTool: true,
      website: zlb,
      features: ["浙里办/地图搜公厕"],
      note: "海量点位以官方平台为准",
      facilities: {},
      seasonal: false,
    },
    {
      id: `tool-${slug}-parking`,
      name: `${city} · 停车查询`,
      category: "parking",
      city,
      district: city,
      address: `${city}市`,
      hours: "实时查询",
      costType: "tool",
      isTool: true,
      website: zlb,
      features: ["道路泊位", "公共停车场"],
      facilities: {},
      seasonal: false,
    },
    {
      id: `tool-${slug}-station`,
      name: `${city} · 爱心驿家`,
      category: "station",
      city,
      district: city,
      address: `${city}市`,
      hours: "以站点为准",
      costType: "tool",
      isTool: true,
      website: "https://map.qq.com/",
      features: ["饮水", "休息", "部分充电空调"],
      note: "腾讯地图搜「爱心驿站」可筛选",
      facilities: { water: true, charge: "partial", ac: "partial" },
      seasonal: false,
    },
    {
      id: `tool-${slug}-sports`,
      name: `${city} · 公共体育场馆`,
      category: "sports",
      city,
      district: city,
      address: `${city}市`,
      hours: "以场馆公告为准",
      costType: "tool",
      isTool: true,
      website: zlb,
      features: ["公共体育馆", "校园场地预约"],
      note: "节假日部分场馆免费开放",
      facilities: {},
      seasonal: false,
    },
  ];
  if (libFinder && libFinder.startsWith("http")) {
    list.push({
      id: `read-${slug}-tool`,
      name: `${city}城市书房分布查询`,
      category: "reading",
      subType: "城市书房",
      city,
      district: city,
      address: `${city}市`,
      hours: "在线查询",
      costType: "tool",
      isTool: true,
      website: libFinder.split("；")[0].split("（")[0].trim(),
      features: ["城市书房", "阅读空间地图"],
      note: "海量书房点位请通过官方平台查询",
      facilities: { wifi: "partial", ac: true, study: true },
      seasonal: false,
      featured: true,
    });
  }
  return list;
}

function buildFromSeed(seed) {
  const resources = [];
  const seen = new Set();

  for (const block of seed) {
    const city = block.city;
    block.libraries?.forEach((item, i) => {
      const r = mkLibrary(city, item, i === 0);
      if (seen.has(r.id)) return;
      seen.add(r.id);
      resources.push(r);
    });
    block.city_reading_rooms?.forEach((item) => {
      const r = mkReading(city, item);
      if (seen.has(r.id)) return;
      seen.add(r.id);
      resources.push(r);
    });
    block.free_museums?.forEach((item) => {
      const r = mkMuseum(city, item);
      if (seen.has(r.id)) return;
      seen.add(r.id);
      resources.push(r);
    });
    block.free_parks?.forEach((item) => {
      const r = mkPark(city, item);
      if (seen.has(r.id)) return;
      seen.add(r.id);
      resources.push(r);
    });
    mkCityTools(city, block.official_tools).forEach((r) => {
      if (seen.has(r.id)) return;
      seen.add(r.id);
      resources.push(r);
    });
  }

  return resources;
}

function main() {
  const seed = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));
  const resources = buildFromSeed(seed);
  const byCity = {};
  resources.forEach((r) => {
    byCity[r.city] = (byCity[r.city] || 0) + 1;
  });

  const body = `/** 浙江省各地市扩展资源（build-zhejiang-expanded.mjs 生成，勿手改） */\nconst ZHEJIANG_EXPANDED_RESOURCES = ${JSON.stringify(resources, null, 2)};\n`;
  fs.writeFileSync(OUT_PATH, body);

  console.log(`✓ 生成 ${resources.length} 条地市扩展资源 → js/data-zhejiang-expanded.js`);
  Object.entries(byCity)
    .sort(([a], [b]) => a.localeCompare(b, "zh-CN"))
    .forEach(([c, n]) => console.log(`  ${c}: ${n} 条`));
}

main();
