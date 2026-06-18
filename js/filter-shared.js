/**
 * 与 js/app.js、scripts/lib/filter-logic.mjs 共用的筛选逻辑（浏览器 + Node 测试）
 */
(function (global) {
  function createFilterEngine(deps) {
    const {
      RESOURCES,
      RESOURCE_CATEGORIES,
      CATEGORY_TO_GROUP: categoryToGroupInput,
    } = deps;

    const CATEGORY_LABELS = Object.fromEntries(
      RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
    );

    const CATEGORY_TO_GROUP =
      categoryToGroupInput ||
      Object.fromEntries(
        RESOURCE_CATEGORIES.filter((c) => c.group).map((c) => [c.id, c.group])
      );

    const SEARCH_INTENTS = [
      {
        pattern: /自习|自修|看书|阅读室/,
        match: (r) =>
          r.category === "reading" ||
          r.category === "library" ||
          hasFacility(r, "study") ||
          /书房|阅读|自习|图书馆/.test(
            [r.name, r.fullName, r.subType, ...(r.features || []), r.note]
              .filter(Boolean)
              .join("")
          ),
      },
      {
        pattern: /书房|阅读空间|邻里阅读/,
        match: (r) =>
          r.category === "reading" ||
          /书房|阅读/.test([r.name, r.fullName, r.subType].filter(Boolean).join("")),
      },
      {
        pattern: /图书馆/,
        match: (r) => r.category === "library" || /图书馆/.test(r.name || ""),
      },
      {
        pattern: /停车|泊位/,
        match: (r) =>
          r.category === "parking" ||
          /停车|泊位/.test([r.name, r.note].filter(Boolean).join("")),
      },
      {
        pattern: /纳凉|凉快|避暑/,
        match: (r) =>
          ["bunker", "metro", "community", "station"].includes(r.category) ||
          /纳凉|避暑|防空洞/.test([r.name, r.note].filter(Boolean).join("")),
      },
      {
        pattern: /公厕|厕所|卫生间/,
        match: (r) =>
          r.category === "toilet" ||
          /公厕|厕所/.test([r.name, r.note].filter(Boolean).join("")),
      },
      {
        pattern: /充电|充电桩/,
        match: (r) =>
          r.category === "charging" ||
          /充电/.test([r.name, r.note].filter(Boolean).join("")),
      },
      {
        pattern: /公园|遛娃|散步/,
        match: (r) =>
          r.category === "park" ||
          /公园|绿道/.test([r.name, r.note].filter(Boolean).join("")),
      },
    ];

    function hasFacility(resource, facilityId) {
      const val = resource.facilities?.[facilityId];
      return val === true || val === "partial";
    }

    function resourceCity(r) {
      return r.city || "杭州";
    }

    function resourceSearchHaystack(r) {
      const parts = [
        r.name,
        r.fullName,
        r.subType,
        resourceCity(r),
        r.address,
        r.district,
        r.transport,
        r.note,
        CATEGORY_LABELS[r.category],
        ...(r.features || []),
      ];
      if (hasFacility(r, "study")) parts.push("自习", "可自习", "自修");
      if (r.category === "reading") parts.push("城市书房", "书房", "自习", "阅读");
      if (r.category === "library") parts.push("图书馆", "自习", "自修");
      return parts.filter(Boolean).join(" ").toLowerCase();
    }

    function matchesSearch(r, query) {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const hay = resourceSearchHaystack(r);
      if (hay.includes(q)) return true;
      return SEARCH_INTENTS.some((intent) => intent.pattern.test(q) && intent.match(r));
    }

    function matchesCityFilter(r, city) {
      if (city === "全部") return true;
      if (city === "全省") return resourceCity(r) === "全省";
      if (city === "全国") return resourceCity(r) === "全国";
      return (
        resourceCity(r) === city ||
        resourceCity(r) === "全省" ||
        resourceCity(r) === "全国"
      );
    }

    function filterResources(state) {
      return RESOURCES.filter((r) => {
        if (state.category !== "all" && r.category !== state.category) return false;
        if (state.category === "all" && state.group !== "all") {
          const g = CATEGORY_TO_GROUP[r.category];
          if (g !== state.group) return false;
        }
        if (
          state.category === "reading" &&
          state.subType !== "all" &&
          r.subType !== state.subType
        )
          return false;
        if (!matchesCityFilter(r, state.city)) return false;
        if (state.district !== "全部") {
          if (resourceCity(r) !== "杭州") return false;
          if (r.district !== state.district && r.district !== "杭州") return false;
        }
        if (state.featuredOnly && !r.featured) return false;
        if (state.freeOnly && r.costType && r.costType !== "free") return false;
        if (state.yearRoundOnly && r.seasonal) return false;
        for (const f of state.facilities || []) {
          if (!hasFacility(r, f)) return false;
        }
        if (state.search && !matchesSearch(r, state.search)) return false;
        return true;
      });
    }

    function scopedResources(city) {
      return RESOURCES.filter((r) => matchesCityFilter(r, city));
    }

    return {
      hasFacility,
      resourceCity,
      matchesSearch,
      matchesCityFilter,
      filterResources,
      scopedResources,
      resourceSearchHaystack,
      CATEGORY_TO_GROUP,
    };
  }

  const DEFAULT_FILTER_STATE = {
    group: "all",
    subType: "all",
    facilities: [],
    city: "全部",
    district: "全部",
    search: "",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
  };

  function countSceneFilter(deps, scene, city) {
    const engine = createFilterEngine(deps);
    return engine.filterResources({
      ...DEFAULT_FILTER_STATE,
      city: city || "全部",
      category: scene.category || "all",
      search: scene.search || "",
    }).length;
  }

  global.FilterShared = { createFilterEngine, countSceneFilter, DEFAULT_FILTER_STATE };
})(typeof globalThis !== "undefined" ? globalThis : {});
