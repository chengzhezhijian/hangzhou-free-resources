/**
 * 全站数据统计 — 从 RESOURCES / 配置派生，避免文案硬编码过期
 * 场景计数与首页 filterResources（默认「全部」城市）对齐
 */
(function (global) {
  function filterDeps(resources) {
    return {
      RESOURCES: resources,
      RESOURCE_CATEGORIES:
        typeof RESOURCE_CATEGORIES !== "undefined" ? RESOURCE_CATEGORIES : [],
    };
  }

  function getFilterShared() {
    if (typeof FilterShared !== "undefined") return FilterShared;
    if (typeof globalThis !== "undefined" && globalThis.FilterShared) return globalThis.FilterShared;
    return null;
  }

  function countSceneLikeHomepage(resources, scene) {
    const shared = getFilterShared();
    if (shared) {
      return shared.countSceneFilter(filterDeps(resources), scene, "全部");
    }
    return resources.length;
  }

  function hasFacility(r, id) {
    const fac = r.facilities;
    if (!fac || typeof fac !== "object") return false;
    const val = fac[id];
    return val === true || val === "partial";
  }

  function formatCount(n) {
    if (n >= 10000) {
      const v = Math.floor(n / 1000) / 10;
      return `${String(v).replace(/\.0$/, "")}万+`;
    }
    if (n >= 1000) return `${Math.floor(n / 100) * 100}+`;
    return `${n}+`;
  }

  function compute() {
    const resources = typeof RESOURCES !== "undefined" ? RESOURCES : [];
    const prefectures =
      typeof PREFECTURE_CITIES !== "undefined"
        ? PREFECTURE_CITIES
        : typeof CITY_PICKER !== "undefined"
          ? CITY_PICKER.filter((c) => c !== "全部")
          : [];
    const cityCount = prefectures.length;
    const total = resources.length;
    const hangzhou = resources.filter((r) => r.city === "杭州").length;
    const zjCities =
      typeof CITIES !== "undefined"
        ? CITIES.filter((c) => !["全部", "全省", "全国"].includes(c))
        : [];
    const zjCount = zjCities.length;
    const perks = typeof VALUE_PERKS !== "undefined" ? VALUE_PERKS : [];
    const facilities = typeof FACILITY_FILTERS !== "undefined" ? FACILITY_FILTERS : [];
    const quickScenes = typeof QUICK_SCENES !== "undefined" ? QUICK_SCENES : [];
    const guides = typeof SCENE_GUIDES !== "undefined" ? SCENE_GUIDES : [];
    const tools = typeof EXTERNAL_TOOLS !== "undefined" ? EXTERNAL_TOOLS : [];

    const categoryCount = (id) => resources.filter((r) => r.category === id).length;

    return {
      total,
      cityCount,
      hangzhou,
      zjCount,
      perkCount: perks.length,
      facilityFilterCount: facilities.length,
      externalToolCount: tools.length,
      formatCount,
      tagline: `政府免费便民 · ${cityCount}城搜完即走`,
      coverageLine: `全国 ${formatCount(total)} 条收录 · ${cityCount} 城可查 · 浙江 ${hangzhou}+ 杭州细录`,
      sceneCounts: quickScenes.map((s) => ({
        label: s.label.replace(/^[^\s]+\s*/, ""),
        count: countSceneLikeHomepage(resources, s),
        category: s.category,
        search: s.search,
      })),
      guideCounts: guides.map((g) => ({
        need: g.need,
        count:
          g.category || g.search
            ? countSceneLikeHomepage(resources, {
                category: g.category || "all",
                search: g.search || "",
              })
            : null,
      })),
      perkStats: perks.map((p) => ({
        id: p.id,
        short: p.short,
        label: p.label,
        count: resources.filter((r) => hasFacility(r, p.facility)).length,
      })),
      topCategories: [
        { id: "gov_service", label: "政务服务" },
        { id: "reading", label: "城市书房" },
        { id: "park", label: "公园" },
        { id: "court", label: "法院" },
        { id: "community", label: "党群中心" },
      ].map((c) => ({ ...c, count: categoryCount(c.id) })),
    };
  }

  global.SiteStats = { compute, countSceneLikeHomepage, formatCount };
})(typeof window !== "undefined" ? window : globalThis);
