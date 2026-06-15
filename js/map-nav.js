/**
 * 高德地图直达 — 打开对应地址/关键词的搜索结果页
 * @see https://lbs.amap.com/api/uri-api/guide
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
    return "杭州";
  }

  function cityParam(city) {
    if (!city || city === "全省") return "";
    return city.endsWith("市") ? city : `${city}市`;
  }

  function cityPrefix(city) {
    if (!city || city === "全省") return "浙江省";
    return cityParam(city);
  }

  function needsKeyword(text, keyword) {
    return keyword && text && !text.includes(keyword);
  }

  function hasConcreteAddress(addr) {
    return (
      addr &&
      addr.length > 5 &&
      !/^(全市|浙江省|浙江|各)/.test(addr) &&
      /[路街道巷弄号区县镇乡村站]/.test(addr)
    );
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
    const name = (resource.fullName || resource.name || "").trim();
    const shortName = name.replace(/（[^）]*）/g, "").trim();
    const addr = (resource.address || "").trim();

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

    const kw = CATEGORY_KEYWORD[resource.category];

    // 有具体地址 → 以地址为主搜索词，直达搜索结果页
    if (hasConcreteAddress(addr)) {
      if (/省|市/.test(addr)) {
        const q = shortName && !addr.includes(shortName) ? `${shortName} ${addr}` : addr;
        return needsKeyword(q, kw) ? `${q} ${kw}` : q;
      }
      const q = `${prefix} ${addr}`;
      if (shortName && !addr.includes(shortName)) {
        return needsKeyword(`${shortName} ${q}`, kw) ? `${shortName} ${q} ${kw}` : `${shortName} ${q}`;
      }
      return needsKeyword(q, kw) ? `${q} ${kw}` : q;
    }

    if (addr && addr.length > 4 && !/^(全市|浙江省|浙江|各)/.test(addr)) {
      return `${prefix} ${name} ${addr}`.trim();
    }

    const parts = [prefix, name];
    if (needsKeyword(name, kw)) parts.push(kw);
    return parts.filter(Boolean).join(" ");
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

  return {
    buildQuery,
    buildUrl,
    copyText,
    isWebsiteOnlyTool,
    CATEGORY_KEYWORD,
  };
})();
