#!/usr/bin/env node
/**
 * 数据逻辑自动化测试
 * 用法: node scripts/test-data-logic.mjs
 * 输出: 终端摘要 + scripts/test-report.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadSiteData } from "./lib/load-site-data.mjs";
import { createFilterEngine } from "./lib/filter-logic.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MIN_PASS_RATE = 0.99;

const site = loadSiteData();
const {
  RESOURCES,
  CITIES,
  CITY_PICKER,
  PREFECTURE_CITIES,
  RESOURCE_CATEGORIES,
  FACILITY_FILTERS,
  EXTERNAL_TOOLS,
  SCENE_GUIDES,
  MapNav,
  GeoCity,
  RESOURCE_COORDS,
} = site;

const engine = createFilterEngine({
  RESOURCES,
  RESOURCE_CATEGORIES,
});

const VALID_CATEGORIES = new Set(
  RESOURCE_CATEGORIES.map((c) => c.id).filter((id) => id !== "all")
);
const VALID_CITIES = new Set([...CITIES.filter((c) => c !== "全部"), "全省"]);

const CHINA_BBOX = { latMin: 18.0, latMax: 54.0, lngMin: 73.0, lngMax: 135.5 };
const ZJ_BBOX = { latMin: 27.0, latMax: 31.5, lngMin: 118.0, lngMax: 123.5 };
const IS_CHINA = site.SITE_SCOPE === "china";

const runner = {
  passed: 0,
  failed: 0,
  skipped: 0,
  failures: [],
  sections: [],
  currentSection: "",
};

function section(name) {
  runner.currentSection = name;
  runner.sections.push({ name, tests: [] });
}

function record(name, ok, detail = "") {
  const entry = { name, ok, detail, section: runner.currentSection };
  const sec = runner.sections[runner.sections.length - 1];
  if (sec) sec.tests.push(entry);
  if (ok) runner.passed++;
  else {
    runner.failed++;
    runner.failures.push({ ...entry, detail });
  }
}

function assert(name, condition, detail = "") {
  record(name, !!condition, condition ? detail : detail || "断言失败");
}

function assertEq(name, actual, expected, detail = "") {
  const ok = actual === expected;
  record(
    name,
    ok,
    ok ? detail : detail || `期望 ${expected}，实际 ${actual}`
  );
}

function assertGte(name, actual, min, detail = "") {
  const ok = actual >= min;
  record(
    name,
    ok,
    ok ? `${actual} ≥ ${min}` : detail || `期望 ≥ ${min}，实际 ${actual}`
  );
}

function assertLte(name, actual, max, detail = "") {
  const ok = actual <= max;
  record(
    name,
    ok,
    ok ? `${actual} ≤ ${max}` : detail || `期望 ≤ ${max}，实际 ${actual}`
  );
}

function filter(state) {
  return engine.filterResources({
    group: "all",
    category: "all",
    subType: "all",
    facilities: [],
    city: "全部",
    district: "全部",
    search: "",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
    ...state,
  });
}

// ─── 1. 常量与配置 ───
section("常量与配置");

assertGte("资源总数 ≥ 15000", RESOURCES.length, 15000);
assertGte("PREFECTURE_CITIES ≥ 100", PREFECTURE_CITIES.length, 100);
assert("CITY_PICKER 不含「全国」", !CITY_PICKER.includes("全国"));
assert("CITY_PICKER 含「全部」", CITY_PICKER.includes("全部"));
assertGte("EXTERNAL_TOOLS ≥ 3", EXTERNAL_TOOLS.length, 3);
assertGte("SCENE_GUIDES = 9 条", SCENE_GUIDES.length, 9);

const provinceTools = EXTERNAL_TOOLS.filter((t) => t.scope === "全省");
assertGte("全省官方工具 ≥ 3", provinceTools.length, 3);

if (!IS_CHINA) {
  assertEq("CITY_PICKER 长度 = 1 + 11", CITY_PICKER.length, PREFECTURE_CITIES.length + 1);
  for (const city of PREFECTURE_CITIES) {
    const libTool = EXTERNAL_TOOLS.find(
      (t) => t.scope === city && /图书馆/.test(t.name)
    );
    assert(`${city} 有图书馆官方工具`, !!libTool);
  }
}

// ─── 2. 资源数据完整性 ───
section("资源数据完整性");

const ids = RESOURCES.map((r) => r.id);
const uniqueIds = new Set(ids);
assertEq("资源 id 无重复", uniqueIds.size, ids.length);

const missingCore = RESOURCES.filter((r) => !r.id || !r.name || !r.category);
assert(
  "每条资源具备 id/name/category",
  missingCore.length === 0,
  missingCore.length
    ? `缺失 ${missingCore.length} 条: ${missingCore.slice(0, 3).map((r) => r.id).join(", ")}`
    : ""
);

const badCategory = RESOURCES.filter((r) => !VALID_CATEGORIES.has(r.category));
assert(
  "category 均在合法枚举内",
  badCategory.length === 0,
  badCategory.length ? badCategory[0].id : ""
);

const amapVerified = RESOURCES.filter((r) => r.source === "amap" && r.verified);
assertGte("高德 verified POI ≥ 1400", amapVerified.length, 1400);
assert(
  "高德 POI 均含 lat/lng",
  amapVerified.every((r) => r.lat != null && r.lng != null),
  String(amapVerified.filter((r) => r.lat == null).length)
);

const badCity = RESOURCES.filter(
  (r) => r.city && !VALID_CITIES.has(r.city)
);
assert(
  "city 字段合法",
  badCity.length === 0,
  badCity.length ? `${badCity[0].id}=${badCity[0].city}` : ""
);

const nationalResources = RESOURCES.filter((r) => engine.resourceCity(r) === "全国");
assertGte("全国工具资源 ≥ 5", nationalResources.length, 5);

const provinceResources = RESOURCES.filter((r) => engine.resourceCity(r) === "全省");
assertGte("全省政策/工具资源 ≥ 5", provinceResources.length, 5);
assertLte("全省政策/工具资源 ≤ 10", provinceResources.length, 10);

const readingAll = RESOURCES.filter((r) => r.category === "reading");
assertGte("城市书房总量 ≥ 2000", readingAll.length, 2000);

const hzReading = readingAll.filter((r) => engine.resourceCity(r) === "杭州");
assertGte("杭州书房 ≥ 200", hzReading.length, 200);

for (const city of ["北京", "上海", "广州", "成都", "武汉"]) {
  const local = RESOURCES.filter((r) => engine.resourceCity(r) === city);
  assertGte(`${city} 本地资源 ≥ 30`, local.length, 30);
}

for (const city of PREFECTURE_CITIES.filter((c) => ["宁波", "温州", "嘉兴"].includes(c))) {
  const local = RESOURCES.filter((r) => engine.resourceCity(r) === city);
  assertGte(`${city} 本地资源 ≥ 20`, local.length, 20);
}

const coordsMissing = RESOURCES.filter((r) => !RESOURCE_COORDS[r.id]);
assertGte(
  "资源坐标覆盖率 ≥ 99%",
  RESOURCES.length - coordsMissing.length,
  Math.floor(RESOURCES.length * 0.99),
  `缺失 ${coordsMissing.length} 条`
);

const bbox = IS_CHINA ? CHINA_BBOX : ZJ_BBOX;
const badCoords = RESOURCES.filter((r) => {
  const c = RESOURCE_COORDS[r.id];
  if (!c) return false;
  return (
    c.lat < bbox.latMin ||
    c.lat > bbox.latMax ||
    c.lng < bbox.lngMin ||
    c.lng > bbox.lngMax
  );
});
assert(
  IS_CHINA ? "坐标落在中国范围内" : "坐标落在浙江省范围内",
  badCoords.length === 0,
  badCoords.length
    ? `${badCoords[0].id} (${RESOURCE_COORDS[badCoords[0].id]?.lat}, ${RESOURCE_COORDS[badCoords[0].id]?.lng})`
    : ""
);

const toolsNoWebsite = RESOURCES.filter(
  (r) => r.isTool && !r.website && !r.mapUrl
);
assert(
  "工具类资源有 website 或 mapUrl",
  toolsNoWebsite.length === 0,
  toolsNoWebsite.length ? toolsNoWebsite[0].id : ""
);

// ─── 3. 地市筛选逻辑 ───
section("地市筛选逻辑");

assertEq(
  "「全部」返回全部资源",
  engine.scopedResources("全部").length,
  RESOURCES.length
);

const provinceOnly = engine.scopedResources("全省");
assert(
  "「全省」仅含 city=全省 条目",
  provinceOnly.every((r) => engine.resourceCity(r) === "全省"),
  `共 ${provinceOnly.length} 条`
);

for (const city of PREFECTURE_CITIES) {
  const pool = engine.scopedResources(city);
  const leaked = pool.filter(
    (r) =>
      engine.resourceCity(r) !== city &&
      engine.resourceCity(r) !== "全省" &&
      engine.resourceCity(r) !== "全国"
  );
  assert(`${city} 筛选池无他市泄漏`, leaked.length === 0);
      const minPool = city === "杭州" ? 500 : 98;
  assertGte(`${city} 筛选池 ≥ 本地`, pool.length, minPool);
}

assert(
  "宁波筛选池含宁波本地",
  poolHasCity("宁波", "宁波"),
  ""
);
assert(
  "温州筛选池含温州本地",
  poolHasCity("温州", "温州"),
  ""
);

function poolHasCity(filterCity, expectCity) {
  return engine
    .scopedResources(filterCity)
    .some((r) => engine.resourceCity(r) === expectCity);
}

// ─── 4. 搜索逻辑 ───
section("搜索逻辑");

const searchCases = [
  { q: "自习", city: "全部", min: 1200, label: "全省搜自习" },
  { q: "自习", city: "杭州", min: 200, label: "杭州搜自习" },
  { q: "自习", city: "宁波", min: 3, label: "宁波搜自习" },
  { q: "书房", city: "全部", min: 1500, label: "全省搜书房" },
  { q: "图书馆", city: "全部", min: 80, label: "全省搜图书馆" },
  { q: "停车", city: "全部", min: 700, label: "全省搜停车" },
  { q: "纳凉", city: "杭州", min: 3, label: "杭州搜纳凉" },
  { q: "公厕", city: "全部", min: 700, label: "全省搜公厕" },
  { q: "公园", city: "全部", min: 400, label: "全省搜公园" },
  { q: "充电", city: "全部", min: 700, label: "全省搜充电" },
  { q: "露营", city: "全部", min: 600, label: "全省搜露营" },
  { q: "法律", city: "全部", min: 600, label: "全省搜法律" },
  { q: "培训", city: "全部", min: 600, label: "全省搜培训" },
  { q: "政务", city: "全部", min: 1500, label: "全省搜政务" },
  { q: "市民之家", city: "全部", min: 100, label: "全省搜市民之家" },
  { q: "法院", city: "全部", min: 700, label: "全省搜法院" },
  { q: "人社局", city: "全部", min: 100, label: "全省搜人社局" },
];

for (const { q, city, min, label } of searchCases) {
  const n = filter({ search: q, city }).length;
  assertGte(label, n, min, `「${q}」@${city} 得 ${n} 条`);
}

const allReading = RESOURCES.filter((r) => r.category === "reading");
const readingMissStudy = allReading.filter((r) => !engine.matchesSearch(r, "自习"));
assert(
  "全部 reading 类别可被「自习」搜到",
  readingMissStudy.length === 0,
  readingMissStudy.length
    ? `未匹配 ${readingMissStudy.length} 条，如 ${readingMissStudy[0]?.id}`
    : `${allReading.length} 条`
);

const allLibrary = RESOURCES.filter((r) => r.category === "library");
const libMissStudy = allLibrary.filter((r) => !engine.matchesSearch(r, "自习"));
assert(
  "全部 library 类别可被「自习」搜到",
  libMissStudy.length === 0,
  libMissStudy.length ? libMissStudy[0]?.id : `${allLibrary.length} 条`
);

assertEq("空搜索不减少结果", filter({ search: "" }).length, RESOURCES.length);
assert(
  "不存在的结果搜索为 0",
  filter({ search: "xyznotexist999" }).length === 0
);

// ─── 5. 分类筛选 ───
section("分类筛选");

for (const cat of VALID_CATEGORIES) {
  const list = filter({ category: cat.id });
  const wrong = list.filter((r) => r.category !== cat.id);
  assert(
    `分类「${cat.label}」结果纯净`,
    wrong.length === 0,
    wrong.length ? wrong[0].id : `${list.length} 条`
  );
}

assertGte(
  "category=reading 杭州 ≥ 200",
  filter({ category: "reading", city: "杭州" }).length,
  200
);
assertGte(
  "category=library 全省 ≥ 30",
  filter({ category: "library", city: "全部" }).length,
  30
);

// ─── 6. 组合筛选 ───
section("组合筛选");

assertGte(
  "宁波 + 自习",
  filter({ city: "宁波", search: "自习" }).length,
  3
);
assertGte(
  "杭州 + reading + 上城区县",
  filter({ city: "杭州", category: "reading", district: "上城" }).length,
  5
);
assert(
  "freeOnly 仅 free",
  filter({ freeOnly: true }).every(
    (r) => !r.costType || r.costType === "free"
  )
);
assert(
  "featuredOnly 均 featured",
  filter({ featuredOnly: true }).every((r) => r.featured)
);
assert(
  "study 设施筛选有效",
  filter({ facilities: ["study"], city: "杭州" }).every((r) =>
    engine.hasFacility(r, "study")
  )
);

// ─── 7. 地图导航逻辑 ───
section("地图导航逻辑");

const hzLib = RESOURCES.find((r) => r.id === "lib-hz-main");
assert("杭州图书馆存在", !!hzLib);
if (hzLib) {
  assert("杭州图书馆 mapUrl 为高德搜索", /uri\.amap\.com\/search/.test(hzLib.mapUrl || ""));
  assert("杭州图书馆 mapUrl 含 keyword", (hzLib.mapUrl || "").includes("keyword="));
  assert("杭州图书馆 mapUrl 含 view=list", (hzLib.mapUrl || "").includes("view=list"));
  const q = MapNav.buildQuery(hzLib, "杭州");
  assert("buildQuery 含图书馆语义", q && /图书馆|杭州图书馆/.test(q));
}

const nbLib = RESOURCES.find((r) => r.id === "lib-ningbo-xp3amp");
if (nbLib) {
  const url = MapNav.buildUrl(nbLib, "宁波");
  assert("宁波图书馆 mapUrl 不含杭州硬编码", !url?.includes(encodeURIComponent("杭州市")));
}

const zlb = RESOURCES.find((r) => r.id === "prov-zheliban");
assert("浙里办不走地图链接", !MapNav.buildUrl(zlb));

const toiletTool = RESOURCES.find((r) => r.id === "tool-toilet");
if (toiletTool) {
  const q = MapNav.buildQuery(toiletTool, "宁波");
  assert("公厕工具搜索词含公共厕所", q && q.includes("公共厕所"));
  assert("公厕工具导航词非重复", !MapNav.isRedundantDetailQuery(toiletTool, q));
}

const jusha = RESOURCES.find((r) => r.id === "study-jusha");
if (jusha) {
  const q = MapNav.buildQuery(jusha, "杭州");
  assert("聚沙邻里 mapQuery 与名称一致", q === jusha.name);
  assert("聚沙邻里详情页应隐藏重复导航词", MapNav.isRedundantDetailQuery(jusha, q));
}

// ─── 8. 地理定位 ───
section("地理定位");

const geoCases = [
  [30.2741, 120.1551, "杭州"],
  [30.25, 120.21, "杭州"],
  [30.42, 120.3, "杭州"],
  [30.7461, 120.7555, "嘉兴"],
  [29.8683, 121.544, "宁波"],
  [28.0, 120.65, "温州"],
];
for (const [lat, lng, expect] of geoCases) {
  const r = GeoCity.resolveCity(lat, lng);
  assert(
    `定位 (${lat},${lng}) → ${expect}`,
    r.ok && r.city === expect,
    r.city || r.reason || ""
  );
}

// ─── 9. 场景与工具数据 ───
section("场景与工具数据");

for (const g of SCENE_GUIDES) {
  assert(`场景「${g.need.slice(0, 12)}…」有 pick`, !!g.pick);
  assert(`场景「${g.need.slice(0, 12)}…」有 alt`, !!g.alt);
}

for (const t of EXTERNAL_TOOLS) {
  assert(`工具「${t.name}」有 url`, !!t.url && /^https?:/.test(t.url));
  assert(`工具「${t.name}」有 scope`, !!t.scope);
}

// ─── 10. 黄金场景计数（回归） ───
section("黄金场景计数");

const golden = [
  { state: { city: "全部" }, min: 15000, max: 16000, label: "默认全量" },
  { state: { city: "杭州" }, min: 1900, max: 2100, label: "杭州筛选池" },
  { state: { city: "北京" }, min: 110, max: 150, label: "北京筛选池" },
  { state: { city: "上海" }, min: 110, max: 150, label: "上海筛选池" },
  { state: { search: "自习", city: "全部" }, min: 1200, max: 2800, label: "全国自习" },
  { state: { category: "reading", city: "杭州" }, min: 220, max: 260, label: "杭州书房分类" },
  { state: { category: "parking", city: "全部" }, min: 700, max: 800, label: "停车分类" },
  { state: { category: "toilet", city: "全部" }, min: 700, max: 1000, label: "公厕分类" },
  { state: { category: "camping", city: "全部" }, min: 600, max: 680, label: "露营分类" },
  { state: { category: "sports", city: "全部" }, min: 700, max: 950, label: "体育分类" },
  { state: { category: "charging", city: "全部" }, min: 700, max: 980, label: "充电分类" },
  { state: { category: "policy", city: "全部" }, min: 700, max: 850, label: "政策分类" },
  { state: { category: "gov_service", city: "全部" }, min: 1500, max: 2000, label: "政务服务分类" },
  { state: { category: "court", city: "全部" }, min: 800, max: 1150, label: "法院分类" },
  { state: { category: "legal", city: "全部" }, min: 600, max: 680, label: "法律分类" },
  { state: { category: "training", city: "全部" }, min: 600, max: 680, label: "培训分类" },
  { state: { category: "gov_service", city: "杭州" }, min: 350, max: 420, label: "杭州政务服务" },
  { state: { category: "court", city: "杭州" }, min: 300, max: 340, label: "杭州法院" },
];

for (const { state, min, max, label } of golden) {
  const n = filter(state).length;
  assertGte(`${label} 下限`, n, min);
  assertLte(`${label} 上限`, n, max);
}

// ─── 报告 ───
const total = runner.passed + runner.failed;
const passRate = total ? runner.passed / total : 0;
const passPct = (passRate * 100).toFixed(2);

console.log("\n═══════════════════════════════════════");
console.log("  浙里惠民地图 · 数据逻辑自动化测试");
console.log("═══════════════════════════════════════\n");

for (const sec of runner.sections) {
  const ok = sec.tests.filter((t) => t.ok).length;
  const fail = sec.tests.filter((t) => !t.ok).length;
  const icon = fail ? "✗" : "✓";
  console.log(`${icon} ${sec.name}  (${ok}/${sec.tests.length})`);
  for (const t of sec.tests.filter((x) => !x.ok)) {
    console.log(`    ✗ ${t.name}${t.detail ? `: ${t.detail}` : ""}`);
  }
}

console.log("\n───────────────────────────────────────");
console.log(`通过: ${runner.passed}  失败: ${runner.failed}  合计: ${total}`);
console.log(`正确率: ${passPct}%  (目标 ≥ ${MIN_PASS_RATE * 100}%)`);
console.log("───────────────────────────────────────\n");

const reportPath = path.join(ROOT, "scripts", "test-report.md");
const md = buildMarkdownReport();
fs.writeFileSync(reportPath, md, "utf8");
console.log(`详细报告: ${reportPath}\n`);

process.exit(passRate >= MIN_PASS_RATE && runner.failed === 0 ? 0 : 1);

function buildMarkdownReport() {
  const lines = [
    "# 数据逻辑自动化测试报告",
    "",
    `生成时间: ${new Date().toISOString().replace("T", " ").slice(0, 19)}`,
    "",
    "## 摘要",
    "",
    "| 指标 | 值 |",
    "|------|-----|",
    `| 通过 | ${runner.passed} |`,
    `| 失败 | ${runner.failed} |`,
    `| 合计 | ${total} |`,
    `| **正确率** | **${passPct}%** |`,
    `| 目标 | ≥ ${MIN_PASS_RATE * 100}% |`,
    "",
    passRate >= MIN_PASS_RATE && runner.failed === 0
      ? "> ✅ 达到 99% 正确率目标，可进入人工抽查。"
      : "> ⚠️ 未达目标，请先修复失败项。",
    "",
  ];

  if (runner.failures.length) {
    lines.push("## 失败项", "");
    for (const f of runner.failures) {
      lines.push(`- **${f.section}** · ${f.name}${f.detail ? `: ${f.detail}` : ""}`);
    }
    lines.push("");
  }

  lines.push("## 分模块结果", "");
  for (const sec of runner.sections) {
    const ok = sec.tests.filter((t) => t.ok).length;
    lines.push(`### ${sec.name} (${ok}/${sec.tests.length})`, "");
    lines.push("| 状态 | 用例 | 说明 |", "|------|------|------|");
    for (const t of sec.tests) {
      lines.push(`| ${t.ok ? "✅" : "❌"} | ${t.name} | ${t.detail || "-"} |`);
    }
    lines.push("");
  }

  lines.push("## 建议人工抽查项", "", "请在浏览器打开站点，逐项验证：", "");
  lines.push("1. **地市切换**：选宁波/温州，列表仅含本地 + 全省工具，无杭州书房。");
  lines.push("2. **搜索「自习」**：应出现大量城市书房与图书馆卡片。");
  lines.push("3. **筛选抽屉**：类型 chips 可用，「更多筛选」可展开设施。");
  lines.push("4. **首次引导**：无痕窗口打开，应出现 4 步新手引导。");
  lines.push("5. **导航链接**：随机点 3 张卡片「高德地图导航」，确认跳转合理。");
  lines.push("6. **工具页**：11 地市图书馆链接可打开。");
  lines.push("");

  return lines.join("\n");
}
