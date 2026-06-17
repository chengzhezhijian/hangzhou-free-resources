/**
 * 筛选逻辑（与网站 js/app.js 保持同步）
 */
const FACILITY_LABELS = {
  wifi: "WiFi",
  ac: "空调",
  water: "饮水",
  charge: "充电",
  study: "自习",
  open24: "24h",
};

const SEARCH_INTENTS = [
  {
    pattern: /自习|自修|看书|阅读室/,
    match: (r) =>
      r.category === "reading" ||
      r.category === "library" ||
      hasFacility(r, "study") ||
      /书房|阅读|自习|图书馆/.test(textOf(r)),
  },
  {
    pattern: /书房|阅读空间/,
    match: (r) => r.category === "reading" || /书房|阅读/.test(r.name || ""),
  },
  {
    pattern: /图书馆/,
    match: (r) => r.category === "library" || /图书馆/.test(r.name || ""),
  },
  {
    pattern: /停车|泊位/,
    match: (r) => r.category === "parking" || /停车|泊位/.test(textOf(r)),
  },
  {
    pattern: /纳凉|凉快|避暑/,
    match: (r) =>
      ["bunker", "metro", "community", "station"].includes(r.category) ||
      /纳凉|避暑|防空洞/.test(textOf(r)),
  },
  {
    pattern: /公厕|厕所|卫生间/,
    match: (r) => r.category === "toilet" || /公厕|厕所/.test(textOf(r)),
  },
  {
    pattern: /充电|充电桩/,
    match: (r) => r.category === "charging" || /充电/.test(textOf(r)),
  },
  {
    pattern: /公园|遛娃|散步/,
    match: (r) => r.category === "park" || /公园|绿道/.test(textOf(r)),
  },
];

function textOf(r) {
  return [r.name, r.note, r.address].filter(Boolean).join("");
}

function hasFacility(r, id) {
  return Array.isArray(r.facilities) && r.facilities.includes(id);
}

function resourceCity(r) {
  return r.city || "杭州";
}

function matchesCity(r, city) {
  if (city === "全部") return true;
  if (city === "全省") return resourceCity(r) === "全省";
  if (city === "全国") return resourceCity(r) === "全国";
  return (
    resourceCity(r) === city ||
    resourceCity(r) === "全省" ||
    resourceCity(r) === "全国"
  );
}

function haystack(r, categoryLabels) {
  const parts = [
    r.name,
    resourceCity(r),
    r.address,
    r.district,
    r.note,
    categoryLabels[r.category],
  ];
  if (hasFacility(r, "study")) parts.push("自习");
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function matchesSearch(r, query, categoryLabels) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return true;
  if (haystack(r, categoryLabels).includes(q)) return true;
  return SEARCH_INTENTS.some((i) => i.pattern.test(q) && i.match(r));
}

function buildCategoryMap(categories) {
  const labels = {};
  const toGroup = {};
  categories.forEach((c) => {
    labels[c.id] = c.label;
    if (c.group) toGroup[c.id] = c.group;
  });
  return { labels, toGroup };
}

function filterResources(resources, state, meta) {
  const { labels, toGroup } = buildCategoryMap(meta.resourceCategories || []);
  return resources.filter((r) => {
    if (state.category !== "all" && r.category !== state.category) return false;
    if (state.category === "all" && state.group !== "all") {
      if (toGroup[r.category] !== state.group) return false;
    }
    if (!matchesCity(r, state.city)) return false;
    if (state.district && state.district !== "全部") {
      if (resourceCity(r) !== "杭州") return false;
      if (r.district !== state.district && r.district !== "杭州") return false;
    }
    if (state.featuredOnly && !r.featured) return false;
    if (state.freeOnly && r.costType && r.costType !== "free") return false;
    if (state.yearRoundOnly && r.seasonal) return false;
    for (const f of state.facilities || []) {
      if (!hasFacility(r, f)) return false;
    }
    if (!matchesSearch(r, state.search, labels)) return false;
    return true;
  });
}

function sortResources(list, mode, userLocation) {
  const arr = list.slice();
  if (mode === "distance" && userLocation) {
    arr.sort((a, b) => distKm(a, userLocation) - distKm(b, userLocation));
  }
  return arr;
}

function distKm(r, loc) {
  if (!loc || r.lat == null || r.lng == null) return Infinity;
  const R = 6371;
  const dLat = ((r.lat - loc.lat) * Math.PI) / 180;
  const dLng = ((r.lng - loc.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((loc.lat * Math.PI) / 180) *
      Math.cos((r.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km) {
  if (km == null || !isFinite(km)) return "";
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

function facilityTags(r) {
  if (!Array.isArray(r.facilities)) return [];
  return r.facilities.map((f) => FACILITY_LABELS[f] || f);
}

module.exports = {
  FACILITY_LABELS,
  hasFacility,
  filterResources,
  sortResources,
  distKm,
  formatDistance,
  facilityTags,
  resourceCity,
};
