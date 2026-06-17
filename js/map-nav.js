/**
 * 高德地图直达 — 按名称打开搜索结果页（城市由 URL city 参数限定）
 * @see https://lbs.amap.com/api/uri-api/guide/search/search
 */
const MapNav = (function () {
  const CATEGORY_KEYWORD = {
    library: "图书馆",
    reading: "城市书房",
    museum: "博物馆",
    station: "爱心驿站",
    bunker: "防空洞",
    metro: "地铁站",
    community: "党群服务中心",
    parking: "停车场",
    park: "公园",
    sports: "体育场馆",
    toilet: "公共厕所",
    charging: "充电桩",
    wifi_pub: "公共WiFi",
  };

  const TOOL_SEARCH = {
    toilet: "公共厕所",
    charging: "充电桩",
    station: "爱心驿站",
    parking: "停车场",
    reading: "城市书房",
    sports: "体育场馆",
    park: "公园",
    library: "图书馆",
    wifi_pub: "免费WiFi",
  };

  const WEBSITE_ONLY_TOOLS = [
    "浙里文化圈",
    "邻里停",
    "杭州体育在线",
    "一键找桩",
    "浙江省公共文化",
    "通借通还",
  ];

  function effectiveCity(resource, contextCity) {
    if (resource.city && resource.city !== "全省") return resource.city;
    if (contextCity && contextCity !== "全部" && contextCity !== "全省") return contextCity;
    return "全省";
  }

  function cityParam(city) {
    if (!city || city === "全省") return "";
    return city.endsWith("市") ? city : `${city}市`;
  }

  function cityPrefix(city) {
    if (!city || city === "全省") return "浙江省";
    return cityParam(city);
  }

  function isWebsiteOnlyTool(resource) {
    if (!resource.isTool) return false;
    const n = resource.name || "";
    if (TOOL_SEARCH[resource.category] && /找公厕|找车位|公厕|充电|停车|驿/.test(n)) {
      return false;
    }
    if (n === "浙里办" || n.startsWith("浙里办 · 全省")) return true;
    return WEBSITE_ONLY_TOOLS.some((k) => n.includes(k));
  }

  function buildQuery(resource, contextCity) {
    const city = effectiveCity(resource, contextCity);
    const prefix = cityPrefix(city);
    const name = (resource.name || resource.fullName || "").trim();

    if (resource.category === "policy" && resource.isTool && isWebsiteOnlyTool(resource)) {
      return null;
    }

    if (resource.isTool) {
      if (TOOL_SEARCH[resource.category]) {
        return `${prefix} ${TOOL_SEARCH[resource.category]}`;
      }
      if (/书房|阅读/.test(name)) return `${prefix} 城市书房`;
      if (/公厕|厕所/.test(name)) return `${prefix} 公共厕所`;
      if (/停车/.test(name)) return `${prefix} 停车场`;
      if (/充电|找桩/.test(name)) return `${prefix} 充电桩`;
      if (/驿/.test(name)) return `${prefix} 爱心驿站`;
      return `${prefix} ${name}`;
    }

    // 普通点位：仅搜名称，城市范围由 buildUrl 的 city 参数限定
    if (name) return name;

    const kw = CATEGORY_KEYWORD[resource.category];
    return kw ? `${prefix} ${kw}` : prefix;
  }

  /** 高德 URI 搜索页（keyword 为必选参数；view=list 展示结果列表） */
  function buildUrl(resource, contextCity) {
    const query = buildQuery(resource, contextCity);
    if (!query) return null;

    const city = effectiveCity(resource, contextCity);
    const parts = [
      `keyword=${encodeURIComponent(query)}`,
      `view=list`,
      `callnative=1`,
      `src=zhelihuimin`,
    ];
    const c = cityParam(city);
    if (c) parts.push(`city=${encodeURIComponent(c)}`);

    return `https://uri.amap.com/search?${parts.join("&")}`;
  }

  function copyText(resource, contextCity) {
    return buildQuery(resource, contextCity) || resource.address || resource.name;
  }

  function normalizeQueryText(text) {
    return (text || "").replace(/\s+/g, "").trim();
  }

  /** 导航词与详情标题/名称/地址完全一致时，详情页无需再展示预览行 */
  function isRedundantDetailQuery(resource, query) {
    if (!query) return true;
    const normalizedQuery = normalizeQueryText(query);
    return [resource.fullName || resource.name, resource.name, resource.fullName, resource.address]
      .filter(Boolean)
      .some((field) => normalizeQueryText(field) === normalizedQuery);
  }

  return {
    buildQuery,
    buildUrl,
    copyText,
    isRedundantDetailQuery,
    isWebsiteOnlyTool,
    CATEGORY_KEYWORD,
  };
})();
