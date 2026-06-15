/**
 * 高德地图直达搜索词生成
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

  /** 官方工具类：地图一键搜什么 */
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

  /** 不走地图、只走官网的工具（名称匹配） */
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

  function cityPrefix(city) {
    if (!city || city === "全省") return "浙江省";
    if (city.endsWith("市")) return city;
    return `${city}市`;
  }

  function needsKeyword(name, keyword) {
    return keyword && name && !name.includes(keyword);
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

    if (resource.category === "policy" && resource.isTool && isWebsiteOnlyTool(resource)) {
      return null;
    }

    if (resource.isTool) {
      const toolKw = TOOL_SEARCH[resource.category] || TOOL_SEARCH[resource.subType] || name;
      if (TOOL_SEARCH[resource.category]) {
        return `${prefix} ${TOOL_SEARCH[resource.category]}`;
      }
      if (/书房|阅读/.test(name)) return `${prefix} 城市书房`;
      if (/公厕|厕所/.test(name)) return `${prefix} 公共厕所`;
      if (/停车/.test(name)) return `${prefix} 停车场`;
      if (/充电|找桩/.test(name)) return `${prefix} 充电桩`;
      if (/驿/.test(name)) return `${prefix} 爱心驿站`;
      return `${prefix} ${toolKw || name}`;
    }

    const kw = CATEGORY_KEYWORD[resource.category];
    const addr = (resource.address || "").trim();

    if (addr && !/^(全市|浙江省|浙江|各)/.test(addr) && addr.length > 6) {
      const hasCityInAddr = /市/.test(addr);
      const parts = [];
      if (!hasCityInAddr) parts.push(prefix);
      const shortName = name.replace(/（[^）]*）/g, "").trim();
      if (shortName && !addr.includes(shortName)) parts.push(shortName);
      parts.push(addr);
      const joined = parts.join(" ");
      if (needsKeyword(joined, kw)) parts.push(kw);
      return parts.join(" ");
    }

    const parts = [prefix, name];
    if (needsKeyword(name, kw)) parts.push(kw);
    return parts.filter(Boolean).join(" ");
  }

  function buildUrl(resource, contextCity) {
    const query = buildQuery(resource, contextCity);
    if (!query) return null;
    return `https://uri.amap.com/search?query=${encodeURIComponent(query)}`;
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
