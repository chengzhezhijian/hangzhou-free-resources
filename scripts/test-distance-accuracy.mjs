#!/usr/bin/env node
/**
 * 距离精度与坐标质量自动化测试
 */
import { loadSiteData } from "./lib/load-site-data.mjs";

const site = loadSiteData();
const { RESOURCES, RESOURCE_COORDS, GeoCity } = site;
const IS_CHINA = site.SITE_SCOPE === "china";

const runner = { passed: 0, failed: 0, failures: [] };

function assert(name, ok, detail = "") {
  if (ok) runner.passed++;
  else {
    runner.failed++;
    runner.failures.push({ name, detail });
  }
}

function distKm(lat1, lng1, lat2, lng2) {
  return GeoCity.distanceKm(lat1, lng1, lat2, lng2);
}

function isPrecise(c) {
  return c && (c.p === "g" || c.p === "e");
}

function isPointAddress(r) {
  if (!r.address) return false;
  if (/^(全市|全省|全国)/.test(r.address)) return false;
  if (/\d+所(中小学|学校)/.test(r.address)) return false;
  return r.address.length >= 6;
}

console.log("\n═══ 距离精度测试 ═══\n");

const GOLDEN = [
  {
    name: "金沙湖书房 ← 金沙湖站附近",
    id: "study-jinshahu",
    user: { lat: 30.308, lng: 120.325 },
    maxKm: 1,
  },
  {
    name: "杭州图书馆 ← 市民中心附近",
    id: "lib-hz-main",
    user: { lat: 30.247, lng: 120.21 },
    maxKm: 3,
  },
  {
    name: "钱塘书房 ← 学林街附近",
    id: "study-qiantang",
    user: { lat: 30.314, lng: 120.38 },
    maxKm: 1.5,
  },
  {
    name: "党群书房 ← 义府大街附近",
    id: "study-dangqun",
    user: { lat: 30.273, lng: 120.488 },
    maxKm: 2,
  },
];

for (const g of GOLDEN) {
  const c = RESOURCE_COORDS[g.id];
  assert(`${g.name} 有精确坐标`, isPrecise(c), c ? `p=${c.p}` : "无坐标");
  if (c && g.user) {
    const km = distKm(g.user.lat, g.user.lng, c.lat, c.lng);
    assert(`${g.name} 距离 ≤ ${g.maxKm}km`, km <= g.maxKm, `实际 ${km.toFixed(2)} km`);
  }
}

const studySpaces = RESOURCES.filter((r) => r.id.startsWith("study-"));
const studyBad = studySpaces.filter((r) => !isPrecise(RESOURCE_COORDS[r.id]));
assert(
  `杭州书房 ${studySpaces.length} 条均有精确坐标`,
  studyBad.length === 0,
  studyBad.map((r) => r.name).join("、") || ""
);

const featuredPoint = RESOURCES.filter(
  (r) =>
    r.featured &&
    isPointAddress(r) &&
    !r.isTool &&
    (r.city === "杭州" || !r.city)
);
const featuredBad = featuredPoint.filter((r) => !isPrecise(RESOURCE_COORDS[r.id]));
assert(
  `杭州推荐点位（具体地址）${featuredPoint.length} 条均有精确坐标`,
  featuredBad.length === 0,
  featuredBad.slice(0, 5).map((r) => r.name).join("、") + (featuredBad.length > 5 ? "…" : "")
);

const byP = {};
Object.values(RESOURCE_COORDS).forEach((v) => {
  byP[v.p] = (byP[v.p] || 0) + 1;
});
const geocodeRate = ((byP.g || 0) + (byP.e || 0)) / RESOURCES.length;
const locatedRate =
  ((byP.g || 0) + (byP.e || 0) + (byP.c || 0) + (byP.d || 0)) / RESOURCES.length;
if (IS_CHINA) {
  assert("地理编码占比 ≥ 18%", geocodeRate >= 0.18, JSON.stringify(byP));
  assert("坐标可定位率 ≥ 99%", locatedRate >= 0.99, JSON.stringify(byP));
} else {
  assert("地理编码占比 ≥ 90%", geocodeRate >= 0.9, JSON.stringify(byP));
}
assert("区县粗精度 ≤ 80 条", (byP.d || 0) <= 80, `区县 ${byP.d} 条`);

const jinshahu = RESOURCE_COORDS["study-jinshahu"];
if (jinshahu) {
  const km = distKm(30.308, 120.325, jinshahu.lat, jinshahu.lng);
  assert("金沙湖书房回归：距金沙湖站 < 1km", km < 1, `${km.toFixed(2)} km`);
}

const total = runner.passed + runner.failed;
const rate = total ? ((runner.passed / total) * 100).toFixed(2) : "0";
console.log(`\n距离精度: ${runner.passed}/${total} 通过 (${rate}%)`);
if (runner.failures.length) {
  console.log("\n失败项:");
  runner.failures.forEach((f) => console.log(`  ✗ ${f.name}${f.detail ? `: ${f.detail}` : ""}`));
  process.exit(1);
}
console.log(`坐标分布: ${JSON.stringify(byP)}\n`);
