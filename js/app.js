(function () {
  const PAGE_SIZE_DEFAULT = 48;

  function getDesign() {
    return typeof getDesignVariant === "function" ? getDesignVariant() : null;
  }

  function getPageSize() {
    const d = getDesign();
    return d?.pageSize || PAGE_SIZE_DEFAULT;
  }

  function track(name, props) {
    if (typeof window.trackEvent === "function") window.trackEvent(name, props);
  }

  function applyUrlParams() {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const q = params.get("q");
    const group = params.get("group");
    if (group) state.group = group;
    if (category) state.category = category;
    if (q) {
      state.search = q;
      const input = document.getElementById("searchInput");
      if (input) input.value = q;
      const clear = document.getElementById("searchClear");
      if (clear) clear.hidden = !q;
    }
    const city = params.get("city");
    if (city && CITIES.includes(city)) {
      state.city = city;
    }
    if (params.get("free") === "1") state.freeOnly = true;
    if (params.toString()) {
      track("landing_params", Object.fromEntries(params.entries()));
    }
  }

  const GEO_POS_KEY = "hz_geo_pos_v1";
  const GEO_POS_TTL_MS = 24 * 60 * 60 * 1000;
  function isChinaScope() {
    return (
      (typeof SITE_SCOPE !== "undefined" && SITE_SCOPE === "china") ||
      (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.siteScope === "china")
    );
  }

  function scopeLabelAll() {
    return isChinaScope() ? "全国" : "浙江";
  }

  function hotCityList() {
    if (typeof HOT_CITIES !== "undefined" && Array.isArray(HOT_CITIES) && HOT_CITIES.length) {
      return HOT_CITIES;
    }
    return ["杭州", "宁波", "温州", "绍兴", "嘉兴", "金华"];
  }

  const FILTER_DESKTOP_MQ = window.matchMedia("(min-width: 960px)");

  const SORT_OPTIONS = [
    { id: "comprehensive", label: "综合排序" },
    { id: "distance", label: "距离最近", needsGeo: true },
    { id: "rating", label: "评分最高" },
  ];

  let toolbarDropKind = null;

  const state = {
    group: "all",
    category: "all",
    subType: "all",
    facilities: new Set(),
    city: "全部",
    district: "全部",
    search: "",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
    page: 1,
    userLocation: null,
    sortMode: "comprehensive",
  };

  const CATEGORY_LABELS = Object.fromEntries(
    RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
  );

  const CATEGORY_TO_GROUP = Object.fromEntries(
    RESOURCE_CATEGORIES.filter((c) => c.group).map((c) => [c.id, c.group])
  );

  const FACILITY_LABELS = {
    wifi: "免费WiFi",
    water: "可饮水",
    ac: "有空调",
    study: "可自习",
    charge: "可充电",
    open24: "24h",
  };

  const SEARCH_INTENTS = [
    {
      pattern: /自习|自修|看书|阅读室/,
      match: (r) =>
        r.category === "reading" ||
        r.category === "library" ||
        hasFacility(r, "study") ||
        /书房|阅读|自习|图书馆/.test(
          [r.name, r.fullName, r.subType, ...(r.features || []), r.note].filter(Boolean).join("")
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
      match: (r) => r.category === "parking" || /停车|泊位/.test([r.name, r.note].filter(Boolean).join("")),
    },
    {
      pattern: /纳凉|凉快|避暑/,
      match: (r) =>
        ["bunker", "metro", "community", "station"].includes(r.category) ||
        /纳凉|避暑|防空洞/.test([r.name, r.note].filter(Boolean).join("")),
    },
    {
      pattern: /公厕|厕所|卫生间/,
      match: (r) => r.category === "toilet" || /公厕|厕所/.test([r.name, r.note].filter(Boolean).join("")),
    },
    {
      pattern: /充电|充电桩/,
      match: (r) => r.category === "charging" || /充电/.test([r.name, r.note].filter(Boolean).join("")),
    },
    {
      pattern: /公园|遛娃|散步/,
      match: (r) => r.category === "park" || /公园|绿道/.test([r.name, r.note].filter(Boolean).join("")),
    },
  ];

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

  function hasFacility(resource, facilityId) {
    const val = resource.facilities[facilityId];
    return val === true || val === "partial";
  }

  function facilityClass(resource, facilityId) {
    const val = resource.facilities[facilityId];
    if (val === true) return "on";
    if (val === "partial") return "partial";
    return "";
  }

  function visibleCategories() {
    const order =
      typeof CATEGORY_DISPLAY_ORDER !== "undefined"
        ? CATEGORY_DISPLAY_ORDER
        : RESOURCE_CATEGORIES.map((c) => c.id);
    const byId = Object.fromEntries(RESOURCE_CATEGORIES.map((c) => [c.id, c]));
    return order.map((id) => byId[id]).filter(Boolean);
  }

  function isQuickSceneActive(scene) {
    if (scene.search) {
      return state.search === scene.search && state.category === scene.category;
    }
    return state.category === scene.category && !state.search;
  }

  function resourceCity(r) {
    return r.city || "杭州";
  }

  function matchesCityFilter(r) {
    if (state.city === "全部") return true;
    if (state.city === "全省") return resourceCity(r) === "全省";
    if (state.city === "全国") return resourceCity(r) === "全国";
    return (
      resourceCity(r) === state.city ||
      resourceCity(r) === "全省" ||
      resourceCity(r) === "全国"
    );
  }

  function scopedResources() {
    return RESOURCES.filter(matchesCityFilter);
  }

  function resourceCoord(resource) {
    const c =
      typeof RESOURCE_COORDS !== "undefined" ? RESOURCE_COORDS[resource.id] : null;
    return c ? { lat: c.lat, lng: c.lng, p: c.p } : null;
  }

  function coordIsPrecise(c) {
    return c && (c.p === "g" || c.p === "e");
  }

  function resourceDistanceKm(resource) {
    if (!state.userLocation || typeof GeoCity === "undefined") return null;
    const c = resourceCoord(resource);
    if (!c || !coordIsPrecise(c)) return null;
    return GeoCity.distanceKm(
      state.userLocation.lat,
      state.userLocation.lng,
      c.lat,
      c.lng
    );
  }

  function formatDistance(km, approx) {
    if (km == null || !Number.isFinite(km)) return "";
    const prefix = approx ? "约 " : "";
    if (km < 1) return `${prefix}${Math.max(1, Math.round(km * 1000))} m`;
    if (km < 10) return `${prefix}${km.toFixed(1)} km`;
    return `${prefix}${Math.round(km)} km`;
  }

  function sortComprehensive(list) {
    return [...list].sort((a, b) => {
      if (!!a.featured !== !!b.featured) return b.featured - a.featured;
      return (a.name || "").localeCompare(b.name || "", "zh-CN");
    });
  }

  function resourceScore(r) {
    let score = 0;
    if (r.featured) score += 100;
    score += (r.facilities?.length || 0) * 5;
    if (r.hours) score += 2;
    if (r.address) score += 1;
    return score;
  }

  function sortByRating(list) {
    return [...list].sort((a, b) => {
      const sa = resourceScore(a);
      const sb = resourceScore(b);
      if (sb !== sa) return sb - sa;
      if (!!a.featured !== !!b.featured) return b.featured - a.featured;
      return (a.name || "").localeCompare(b.name || "", "zh-CN");
    });
  }

  function sortByDistance(list) {
    if (!state.userLocation) return list;
    return [...list].sort((a, b) => {
      const da = resourceDistanceKm(a);
      const db = resourceDistanceKm(b);
      if (da == null && db == null) return 0;
      if (da == null) return 1;
      if (db == null) return -1;
      if (Math.abs(da - db) > 0.001) return da - db;
      if (!!a.featured !== !!b.featured) return b.featured - a.featured;
      return (a.name || "").localeCompare(b.name || "", "zh-CN");
    });
  }

  function filterResources() {
    const list = RESOURCES.filter((r) => {
      if (state.category !== "all" && r.category !== state.category) return false;
      if (state.category === "all" && state.group !== "all") {
        const g = CATEGORY_TO_GROUP[r.category];
        if (g !== state.group) return false;
      }
      if (state.category === "reading" && state.subType !== "all" && r.subType !== state.subType) return false;
      if (!matchesCityFilter(r)) return false;
      if (state.district !== "全部") {
        if (resourceCity(r) !== "杭州") return false;
        if (r.district !== state.district && r.district !== "杭州") return false;
      }
      if (state.featuredOnly && !r.featured) return false;
      if (state.freeOnly && r.costType && r.costType !== "free") return false;
      if (state.yearRoundOnly && r.seasonal) return false;
      for (const f of state.facilities) {
        if (!hasFacility(r, f)) return false;
      }
      if (state.search && !matchesSearch(r, state.search)) return false;
      return true;
    });
    if (state.sortMode === "distance" && state.userLocation) {
      return sortByDistance(list);
    }
    if (state.sortMode === "rating") {
      return sortByRating(list);
    }
    return sortComprehensive(list);
  }

  function countByCategory() {
    const pool = scopedResources();
    const filtered =
      state.group === "all"
        ? pool
        : pool.filter((r) => CATEGORY_TO_GROUP[r.category] === state.group);
    const counts = {};
    RESOURCE_CATEGORIES.forEach((c) => {
      if (state.group !== "all" && c.id !== "all" && c.group !== state.group) {
        counts[c.id] = 0;
        return;
      }
      counts[c.id] =
        c.id === "all"
          ? filtered.length
          : pool.filter((r) => r.category === c.id).length;
    });
    return counts;
  }

  function updateContentHeader() {
    const h2 = document.getElementById("contentTitle");
    if (!h2) return;
    const copyTitles = window.__COPY_CONTENT_TITLE__;
    if (state.userLocation && state.sortMode === "distance") {
      h2.textContent = copyTitles?.nearby || "附近 · 按距离排序";
      return;
    }
    if (copyTitles?.default) {
      h2.textContent = copyTitles.default;
      return;
    }
    h2.textContent = isChinaScope()
      ? "全国免费便民 · 按设施筛选"
      : "浙江免费便民 · 按设施筛选";
  }

  function enableNearbySort() {
    if (!state.userLocation) return;
    state.sortMode = "distance";
    updateSortTabs();
    updateContentHeader();
  }

  function syncCityFromLocation() {
    if (!state.userLocation || typeof GeoCity === "undefined") return false;
    if (new URLSearchParams(location.search).get("city")) return false;
    const result = GeoCity.resolveCity(state.userLocation.lat, state.userLocation.lng);
    if (!result.ok) return false;
    if (state.city === "全部" || state.city === result.city) {
      sessionStorage.setItem("hz_geo_city_v2", result.city);
      if (state.city !== result.city) {
        applyCitySelection(result.city);
      }
      return true;
    }
    return false;
  }

  function applyLocationPriority() {
    enableNearbySort();
    updateCityLocateStatus();
    updateContentHeader();
  }

  function sortModeLabel(mode = state.sortMode) {
    return SORT_OPTIONS.find((o) => o.id === mode)?.label || "综合排序";
  }

  function resultCountLabel(total) {
    const sortHint =
      state.sortMode === "distance" && state.userLocation
        ? " · 近→远"
        : state.sortMode === "rating"
          ? " · 评分高"
          : "";
    if (state.city === "全部") return `共 ${total} 处${sortHint}`;
    return `共 ${total} 处 · ${state.city}${sortHint}`;
  }

  function getResourceMapUrl(resource) {
    if (typeof MapNav === "undefined") return resource.mapUrl;
    return MapNav.buildUrl(resource, state.city) || resource.mapUrl;
  }

  function getPrimaryAction(resource) {
    const mapUrl = getResourceMapUrl(resource);
    const websiteOnly =
      typeof MapNav !== "undefined" && MapNav.isWebsiteOnlyTool(resource);

    if (resource.isTool && resource.website && (websiteOnly || !mapUrl)) {
      return { label: "打开官方平台", href: resource.website, external: true };
    }

    if (mapUrl) {
      const label = resource.isTool ? "地图找附近" : "高德地图导航";
      return { label, href: mapUrl, external: true };
    }

    if (resource.website) {
      return { label: "打开官方平台", href: resource.website, external: true };
    }

    return null;
  }

  function isPerkActive(perk) {
    return (
      state.facilities.has(perk.facility) &&
      state.facilities.size === 1 &&
      state.category === "all" &&
      !state.search
    );
  }

  function applyValuePerk(perk) {
    state.category = "all";
    state.group = "all";
    state.search = "";
    state.facilities.clear();
    state.facilities.add(perk.facility);
    state.page = 1;
    document.getElementById("searchInput").value = "";
    document.getElementById("searchClear").hidden = true;
    renderCategoryFilters();
    renderFacilityFilters();
    renderValuePerks();
    updateMobileChrome();
    renderCards();
    track("filter_change", { field: "value_perk", value: perk.id });
  }

  let valuePerksBound = false;
  function renderValuePerks() {
    const perks = typeof VALUE_PERKS !== "undefined" ? VALUE_PERKS : [];
    if (!perks.length) return;
    document.querySelectorAll("[data-value-perks]").forEach((el) => {
      el.innerHTML = perks
        .map(
          (p) =>
            `<button type="button" class="value-perk ${isPerkActive(p) ? "is-active" : ""}" data-facility="${p.facility}" title="${p.desc}">${p.label}</button>`
        )
        .join("");
    });
    if (!valuePerksBound) {
      valuePerksBound = true;
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".value-perk");
        if (!btn) return;
        const perk = perks.find((p) => p.facility === btn.dataset.facility);
        if (perk) applyValuePerk(perk);
      });
    }
  }

  function renderFilterToolbar() {
    const el = document.getElementById("filterToolbar");
    if (!el || getDesign()) return;
    // 默认首页：去掉设施标签行与「综合/距离/筛选」行，最大化列表展示
    el.innerHTML = "";
    el.hidden = true;
    closeToolbarDrop();
  }

  function renderSortDropPanel() {
    const panel = document.getElementById("sortDropPanel");
    if (!panel) return;
    panel.innerHTML = SORT_OPTIONS.map((o) => {
      const active = state.sortMode === o.id;
      return `<button type="button" class="sort-drop-item${active ? " is-active" : ""}" role="option" aria-selected="${active}" data-sort="${o.id}">${o.label}${active ? '<span class="sort-drop-check" aria-hidden="true">✓</span>' : ""}</button>`;
    }).join("");
    panel.querySelectorAll("[data-sort]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setSortMode(btn.dataset.sort);
        closeToolbarDrop();
      });
    });
  }

  function updateToolbarDropTop() {
    const sticky = document.querySelector(".discover-sticky");
    if (!sticky) return;
    const bottom = sticky.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty("--toolbar-drop-top", `${bottom}px`);
  }

  function openToolbarDrop(kind) {
    if (isFilterDesktop()) {
      if (kind === "filter") expandSidebar(true);
      return;
    }
    updateToolbarDropTop();
    const layer = document.getElementById("toolbarDropLayer");
    const sortPanel = document.getElementById("sortDropPanel");
    const filterPanel = document.getElementById("filterDropPanel");
    if (!layer || !sortPanel || !filterPanel) return;

    toolbarDropKind = kind;
    if (kind === "sort") {
      renderSortDropPanel();
      sortPanel.hidden = false;
      filterPanel.hidden = true;
    } else {
      updateFilterConfirmCount();
      sortPanel.hidden = true;
      filterPanel.hidden = false;
    }
    layer.hidden = false;
    document.body.classList.add("toolbar-drop-open");
    syncToolbarDropUi();
  }

  function closeToolbarDrop() {
    const layer = document.getElementById("toolbarDropLayer");
    const sortPanel = document.getElementById("sortDropPanel");
    const filterPanel = document.getElementById("filterDropPanel");
    if (layer) layer.hidden = true;
    if (sortPanel) sortPanel.hidden = true;
    if (filterPanel) filterPanel.hidden = true;
    document.body.classList.remove("toolbar-drop-open");
    toolbarDropKind = null;
    syncToolbarDropUi();
  }

  function syncToolbarDropUi() {
    document.querySelectorAll(".ft-chip--sort-trigger").forEach((btn) => {
      btn.classList.toggle("is-open", toolbarDropKind === "sort");
      btn.setAttribute("aria-expanded", String(toolbarDropKind === "sort"));
    });
    document.querySelectorAll("#filterOpenBtn.ft-chip--filter").forEach((btn) => {
      btn.classList.toggle("is-open", toolbarDropKind === "filter");
    });
  }

  function toggleSortDropdown() {
    if (toolbarDropKind === "sort") closeToolbarDrop();
    else openToolbarDrop("sort");
  }

  function toggleFilterDropdown() {
    if (toolbarDropKind === "filter") closeToolbarDrop();
    else openToolbarDrop("filter");
  }

  function renderQuickScenes() {
    const el = document.getElementById("quickScenes");
    if (!el || typeof QUICK_SCENES === "undefined") return;
    el.innerHTML = QUICK_SCENES.map(
      (s) =>
        `<button type="button" class="quick-scene ${isQuickSceneActive(s) ? "is-active" : ""}" data-category="${s.category}" data-search="${s.search}">${s.label}</button>`
    ).join("");
    el.querySelectorAll(".quick-scene").forEach((btn) => {
      btn.addEventListener("click", () => {
        const scene = QUICK_SCENES.find(
          (s) => s.category === btn.dataset.category && s.search === btn.dataset.search
        );
        state.category = scene?.category || btn.dataset.category;
        state.group = "all";
        state.search = scene?.search || btn.dataset.search || "";
        state.page = 1;
        state.facilities.clear();
        document.getElementById("searchInput").value = state.search;
        document.getElementById("searchClear").hidden = !state.search;
        renderCategoryFilters();
        renderValuePerks();
        updateMobileChrome();
        renderCards();
        track("filter_change", {
          field: "quick_scene",
          value: state.search || state.category,
        });
        document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderHeroStats() {
    const el = document.getElementById("heroStats");
    if (!el) return;
    const pool = scopedResources();
    const perks = typeof VALUE_PERKS !== "undefined" ? VALUE_PERKS : [];
    if (perks.length) {
      el.innerHTML = perks
        .map((p) => {
          const n = pool.filter((r) => hasFacility(r, p.facility)).length;
          return `<div class="stat-item stat-item--perk"><strong>${n}</strong><span>${p.short}</span></div>`;
        })
        .join("");
      return;
    }
    const prefectures =
      typeof PREFECTURE_CITIES !== "undefined"
        ? PREFECTURE_CITIES
        : ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"];
    const readingCount = pool.filter((r) => r.category === "reading").length;
    const libraryCount = pool.filter((r) => r.category === "library").length;
    const parkCount = pool.filter((r) => r.category === "park").length;
    const studyCount = readingCount + libraryCount;
    const items =
      state.city === "全部"
        ? [
            { n: RESOURCES.length, label: isChinaScope() ? "全国收录" : "全省收录" },
            { n: prefectures.length, label: "覆盖地市" },
            { n: parkCount, label: "公园遛娃" },
            { n: studyCount, label: "免费自习" },
          ]
        : [
            { n: pool.length, label: `${state.city}可查` },
            { n: parkCount, label: "公园遛娃" },
            { n: studyCount, label: "免费自习" },
            {
              n: pool.filter((r) => r.category === "parking").length,
              label: "停车相关",
            },
          ];
    el.innerHTML = items
      .map(
        (i) =>
          `<div class="stat-item"><strong>${i.n}</strong><span>${i.label}</span></div>`
      )
      .join("");
  }

  function updateDistrictVisibility() {
    const block = document.getElementById("districtBlock");
    if (block) block.hidden = state.city !== "杭州";
  }

  function renderCityFilter() {
    const sel = document.getElementById("cityFilter");
    if (!sel) return;
    const picker =
      typeof CITY_PICKER !== "undefined"
        ? CITY_PICKER
        : CITIES.filter((c) => c !== "全省" && c !== "全国");
    sel.innerHTML = picker
      .map((c) => `<option value="${c}">${c === "全部" ? (isChinaScope() ? "全国" : "浙江全省") : c}</option>`)
      .join("");
    sel.value = picker.includes(state.city) ? state.city : "全部";
    sel.onchange = () => {
      applyCitySelection(sel.value);
    };
    updateDistrictVisibility();
  }

  function renderCategoryFilters() {
    const el = document.getElementById("categoryFilters");
    const counts = countByCategory();
    const cats = visibleCategories();
    el.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" class="chip ${state.category === c.id ? "active" : ""}" data-category="${c.id}">
          ${c.icon} ${c.label} <span style="opacity:0.7">(${counts[c.id] || 0})</span>
        </button>`
      )
      .join("");
    el.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        state.page = 1;
        state.facilities.clear();
        track("filter_change", { field: "category", value: state.category });
        renderCategoryFilters();
        renderValuePerks();
        renderCards();
      });
    });
  }

  function renderFacilityFilters() {
    const el = document.getElementById("facilityFilters");
    el.innerHTML = FACILITY_FILTERS.map(
      (f) =>
        `<button type="button" class="chip chip-sm ${state.facilities.has(f.id) ? "active" : ""}" data-facility="${f.id}">${f.label}</button>`
    ).join("");
    el.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.facility;
        if (state.facilities.has(id)) state.facilities.delete(id);
        else state.facilities.add(id);
        state.page = 1;
        renderFacilityFilters();
        renderValuePerks();
        renderCards();
      });
    });
  }

  function renderDistrictFilter() {
    const sel = document.getElementById("districtFilter");
    sel.innerHTML = DISTRICTS.map(
      (d) => `<option value="${d}" ${state.district === d ? "selected" : ""}>${d}</option>`
    ).join("");
    sel.addEventListener("change", () => {
      state.district = sel.value;
      state.page = 1;
      track("filter_change", { field: "district", value: state.district });
      renderCards();
    });
  }

  function categoryLabel(resource) {
    if (resource.subType) return resource.subType;
    return CATEGORY_LABELS[resource.category] || resource.category;
  }

  function costBadge(resource) {
    if (!resource.costType) return "";
    const label = COST_TYPE_LABELS[resource.costType] || resource.costType;
    const cls = resource.costType === "free" ? "cost-free" : resource.costType === "tool" ? "cost-tool" : "cost-cond";
    return `<span class="badge-cost ${cls}">${label}</span>`;
  }

  function renderCard(resource) {
    const mode = getDesign()?.cardMode || "premium";
    if (mode === "row") return renderRowCard(resource);
    if (mode === "tile") return renderTileCard(resource);
    if (mode === "compact") return renderCompactCard(resource);
    if (mode === "minimal") return renderMinimalCard(resource);
    return renderPremiumCard(resource);
  }

  function renderPremiumCard(resource) {
    const distKm = resourceDistanceKm(resource);
    const coord = resourceCoord(resource);
    const approx = coord && (coord.p === "d" || coord.p === "c");
    const distLabel = formatDistance(distKm, approx);

    const facilities = Object.keys(FACILITY_LABELS)
      .filter((f) => hasFacility(resource, f))
      .map(
        (f) =>
          `<span class="facility-tag ${facilityClass(resource, f)}">${FACILITY_LABELS[f]}</span>`
      )
      .join("");

    const cat = resource.category || "all";

    return `
      <article class="card card-premium ${resource.featured ? "card-featured" : ""} ${resource.isTool ? "card-tool" : ""}" data-id="${resource.id}" tabindex="0" role="button" aria-label="查看${resource.name}详情">
        <div class="card-accent card-accent--${cat}" aria-hidden="true"></div>
        <div class="card-inner">
          <div class="card-top">
            <span class="card-category ${cat}">${categoryLabel(resource)}</span>
            <div class="card-badges">
              ${distLabel ? `<span class="badge-distance" title="直线距离">${distLabel}</span>` : ""}
              ${costBadge(resource)}
              ${resource.featured ? '<span class="badge-star" title="推荐">★</span>' : ""}
              ${resource.seasonal ? '<span class="badge-seasonal">夏季</span>' : ""}
            </div>
          </div>
          <h3>${resource.name}</h3>
          <p class="card-address">${resource.address}</p>
          <p class="card-hours">${resource.hours}</p>
          <div class="facility-tags">${facilities || '<span class="facility-tag">查看详情</span>'}</div>
          <div class="card-meta">
            <span class="card-district">${resourceCity(resource)}${resource.district && resource.district !== resourceCity(resource) ? " · " + resource.district : ""}</span>
          </div>
          <span class="card-chevron" aria-hidden="true">›</span>
        </div>
      </article>
    `;
  }

  function renderRowCard(resource) {
    const distKm = resourceDistanceKm(resource);
    const coord = resourceCoord(resource);
    const distLabel = formatDistance(distKm, coord && (coord.p === "d" || coord.p === "c"));
    const catShort = categoryLabel(resource).replace(/[^\u4e00-\u9fa5]/g, "").slice(0, 2) || "点";
    return `
      <article class="card card-row" data-id="${resource.id}" tabindex="0" role="button" aria-label="${resource.name}">
        ${distLabel ? `<span class="card-row__dist">${distLabel}</span>` : `<span class="card-row__cat">${catShort}</span>`}
        <div class="card-row__body">
          <h3>${resource.name}</h3>
          <p class="card-row__addr">${resource.address || ""}</p>
          <p class="card-row__meta">${categoryLabel(resource)} · ${resourceCity(resource)}</p>
        </div>
        <span class="card-row__go">›</span>
      </article>`;
  }

  function renderTileCard(resource) {
    const cat = resource.category || "all";
    return `
      <article class="card card-tile" data-id="${resource.id}" tabindex="0" role="button" aria-label="${resource.name}">
        <div class="card-tile__icon">${RESOURCE_CATEGORIES.find((c) => c.id === cat)?.icon || "◎"}</div>
        <h3>${resource.name}</h3>
        <p class="card-tile__addr">${resource.address || ""}</p>
        <p class="card-tile__meta">${categoryLabel(resource)} · ${resourceCity(resource)}</p>
      </article>`;
  }

  function renderCompactCard(resource) {
    return `
      <article class="card card-compact" data-id="${resource.id}" tabindex="0" role="button" aria-label="${resource.name}">
        <h3>${resource.name}</h3>
        <p class="card-compact__addr">${resource.address || ""}</p>
        <p class="card-compact__meta">${categoryLabel(resource)} · ${resourceCity(resource)}${resource.hours ? " · " + resource.hours : ""}</p>
      </article>`;
  }

  function renderMinimalCard(resource) {
    const distKm = resourceDistanceKm(resource);
    const distLabel = formatDistance(distKm, false);
    return `
      <article class="card card-minimal" data-id="${resource.id}" tabindex="0" role="button" aria-label="${resource.name}">
        <div class="card-minimal__main">
          <span class="card-minimal__title">${resource.name}</span>
          <span class="card-minimal__sub">${resource.address || categoryLabel(resource)}</span>
        </div>
        <span class="card-minimal__meta">${distLabel || resourceCity(resource)}</span>
      </article>`;
  }

  function bindCardClicks(grid) {
    grid.querySelectorAll(".card").forEach((card) => {
      const open = () => openModal(card.dataset.id);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function renderGroupedCards(filtered, grid) {
    const buckets = new Map();
    filtered.forEach((r) => {
      const k = r.category || "other";
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k).push(r);
    });
    const order = RESOURCE_CATEGORIES.map((c) => c.id).filter((id) => buckets.has(id));
    grid.innerHTML = order
      .map((cat) => {
        const items = buckets.get(cat) || [];
        const label = CATEGORY_LABELS[cat] || cat;
        return `<section class="design-group-section">
          <h3 class="design-group-heading">${label}</h3>
          <div class="design-group-items">${items.slice(0, 36).map(renderCompactCard).join("")}</div>
        </section>`;
      })
      .join("");
    bindCardClicks(grid);
    if (typeof window.markCardsEnter === "function") window.markCardsEnter();
  }

  function renderPagination(total, totalPages) {
    const el = document.getElementById("pagination");
    if (totalPages <= 1) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.innerHTML = `
      <button type="button" class="page-btn" data-page="prev" ${state.page <= 1 ? "disabled" : ""}>上一页</button>
      <span class="page-info">${state.page} / ${totalPages}</span>
      <button type="button" class="page-btn" data-page="next" ${state.page >= totalPages ? "disabled" : ""}>下一页</button>
    `;
    el.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.page === "prev" && state.page > 1) state.page--;
        if (btn.dataset.page === "next" && state.page < totalPages) state.page++;
        renderCards();
        document.getElementById("resources").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderCards() {
    const filtered = filterResources();
    const grid = document.getElementById("cardGrid");
    const empty = document.getElementById("emptyState");
    const countEl = document.getElementById("resultCount");
    const pageSize = getPageSize();
    const design = getDesign();

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    countEl.textContent = resultCountLabel(filtered.length);
    if (typeof window.animateResultCount === "function") window.animateResultCount();
    if (typeof window.syncPremiumUrl === "function") window.syncPremiumUrl(state);
    renderPagination(filtered.length, totalPages);
    updateMobileChrome();
    updateContentHeader();
    updateDistanceHint();
    if (design) {
      if (typeof DesignEngine !== "undefined") DesignEngine.remount();
    } else {
      renderFilterToolbar();
    }

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }

    empty.hidden = true;

    if (design?.groupList) {
      renderGroupedCards(filtered, grid);
      return;
    }

    grid.innerHTML = pageItems.map(renderCard).join("");
    bindCardClicks(grid);
    if (typeof window.markCardsEnter === "function") window.markCardsEnter();
  }

  function formatFeatureLabel(text) {
    const map = {
      蹭网: "免费WiFi",
      蹭网自习: "免费WiFi · 可自习",
      蹭空调: "有空调",
      蹭水: "可饮水",
      蹭电: "可充电",
    };
    return map[text] || text;
  }

  function openModal(id) {
    const r = RESOURCES.find((x) => x.id === id);
    if (!r) return;

    track("resource_view", { id: r.id, name: r.name, category: r.category });

    const modal = document.getElementById("detailModal");
    document.getElementById("modalTitle").textContent = r.fullName || r.name;

    const facilityRows = Object.entries(FACILITY_LABELS)
      .map(([key, label]) => {
        const val = r.facilities[key];
        let text = "无";
        if (val === true) text = "有";
        if (val === "partial") text = "部分提供";
        return `<div class="modal-row"><label>${label}</label><p>${text}</p></div>`;
      })
      .join("");

    const features = (r.features || []).map((f) => `<li>${formatFeatureLabel(f)}</li>`).join("");
    const mapQuery =
      typeof MapNav !== "undefined" ? MapNav.buildQuery(r, state.city) : null;
    const distKm = resourceDistanceKm(r);
    const coord = resourceCoord(r);
    const distLabel = formatDistance(distKm, coord && (coord.p === "d" || coord.p === "c"));

    document.getElementById("modalBody").innerHTML = `
      ${distLabel ? `<div class="modal-row"><label>直线距离</label><p>${distLabel}</p></div>` : ""}
      <div class="modal-row"><label>地市</label><p>${resourceCity(r)}</p></div>
      ${r.district ? `<div class="modal-row"><label>区县</label><p>${r.district}</p></div>` : ""}
      <div class="modal-row"><label>类型</label><p>${categoryLabel(r)}</p></div>
      ${r.costType ? `<div class="modal-row"><label>费用</label><p>${COST_TYPE_LABELS[r.costType] || r.costType}</p></div>` : ""}
      ${r.fullName && r.fullName !== r.name ? `<div class="modal-row"><label>全称</label><p>${r.fullName}</p></div>` : ""}
      <div class="modal-row"><label>地址</label><p>${r.address}</p></div>
      ${mapQuery ? `<div class="modal-row"><label>地图搜索</label><p class="map-query-preview">${mapQuery}</p></div>` : ""}
      <div class="modal-row"><label>开放时间</label><p>${r.hours}</p></div>
      ${r.phone ? `<div class="modal-row"><label>电话</label><p>${r.phone}</p></div>` : ""}
      ${r.transport ? `<div class="modal-row"><label>交通</label><p>${r.transport}</p></div>` : ""}
      ${r.seasonalNote ? `<div class="modal-row"><label>季节说明</label><p>${r.seasonalNote}</p></div>` : ""}
      ${facilityRows}
      ${features ? `<div class="modal-row"><label>特色</label><ul class="modal-features">${features}</ul></div>` : ""}
      ${r.note ? `<div class="modal-row"><label>备注</label><p>${r.note}</p></div>` : ""}
    `;

    const footer = document.getElementById("modalFooter");
    const primary = getPrimaryAction(r);
    const mapUrl = getResourceMapUrl(r);

    const buttons = [];
    if (primary) {
      buttons.push(
        `<a href="${primary.href}" target="_blank" rel="noopener" class="btn-primary" data-track="nav_click" data-id="${r.id}" data-name="${r.name}">${primary.label}</a>`
      );
    }
    buttons.push(`<button type="button" class="btn-outline" id="modalCopyAddress">复制导航词</button>`);
    if (r.website && primary?.href !== r.website) {
      buttons.push(
        `<a href="${r.website}" target="_blank" rel="noopener" class="btn-outline" data-track="website_click" data-id="${r.id}">官方平台</a>`
      );
    }
    if (mapUrl && primary?.href !== mapUrl) {
      buttons.push(
        `<a href="${mapUrl}" target="_blank" rel="noopener" class="btn-outline" data-track="nav_click" data-id="${r.id}">高德地图导航</a>`
      );
    }

    footer.innerHTML = buttons.join("");

    footer.querySelectorAll("[data-track]").forEach((el) => {
      el.addEventListener("click", () => {
        track(el.dataset.track, { id: el.dataset.id, name: el.dataset.name || r.name });
      });
    });
    footer.querySelector("#modalCopyAddress")?.addEventListener("click", () => {
      const text =
        typeof MapNav !== "undefined"
          ? MapNav.copyText(r, state.city)
          : `${resourceCity(r)} ${r.address}`;
      navigator.clipboard?.writeText(text).then(
        () => {
          track("copy_address", { id: r.id, name: r.name });
          alert("导航关键词已复制，可粘贴到地图 App 搜索");
        },
        () => alert(text)
      );
    });

    openOverlay("detailModal");
  }

  function closeDetailModal() {
    closeOverlay("detailModal");
  }

  function syncCityQuickLabel() {
    const label = state.city === "全部" ? scopeLabelAll() : state.city;
    ["cityQuickValue", "cityQuickValueMobile"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = label;
    });
    updateCityLocateStatus();
  }

  function updateCityLocateStatus() {
    const el = document.getElementById("cityLocateStatus");
    if (!el) return;
    if (state.userLocation) {
      el.textContent =
        state.city === "全部"
          ? "已定位，可选城市或切「距离」排序"
          : `已定位到「${state.city}」附近`;
      return;
    }
    el.textContent = "开启定位后自动匹配城市";
  }

  function cityPillHtml(city, label) {
    const text = label || city;
    return `<button type="button" class="city-pill ${state.city === city ? "active" : ""}" data-city="${city}">${text}</button>`;
  }

  function bindCityPills(root) {
    root.querySelectorAll(".city-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyCitySelection(btn.dataset.city);
        closeOverlay("citySheet");
      });
    });
  }

  function countActiveFilters() {
    let n = 0;
    if (state.category !== "all") n++;
    if (state.city !== "全部") n++;
    if (state.district !== "全部") n++;
    if (state.facilities.size) n += state.facilities.size;
    if (state.featuredOnly) n++;
    if (state.freeOnly) n++;
    if (state.yearRoundOnly) n++;
    return n;
  }

  function updateFilterBadge() {
    const badge = document.getElementById("filterBadge");
    const filterBtn = document.getElementById("filterOpenBtn");
    if (!badge) return;
    const n = countActiveFilters();
    badge.textContent = n;
    badge.hidden = n === 0;
    if (filterBtn) filterBtn.classList.toggle("is-active", n > 0);
  }

  function updateFilterConfirmCount() {
    const el = document.getElementById("filterConfirmCount");
    if (!el) return;
    const n = filterResources().length;
    el.textContent = n ? `（${n}）` : "";
  }

  function updateSortTabs() {
    document.querySelectorAll(".sort-tab[data-sort]").forEach((tab) => {
      const active = tab.dataset.sort === state.sortMode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute?.("aria-selected", String(active));
    });
    document.querySelectorAll(".ft-chip--sort-trigger").forEach((btn) => {
      const label = sortModeLabel();
      const geoHint = !state.userLocation && state.sortMode === "distance";
      btn.classList.toggle("ft-chip--geo", geoHint);
      if (btn.childNodes.length >= 2) {
        btn.childNodes[0].textContent = label;
      } else {
        btn.innerHTML = `${label}<span class="ft-caret" aria-hidden="true">▾</span>`;
      }
    });
  }

  function setSortMode(mode) {
    if (mode === "distance" && !state.userLocation) {
      runGeoLocate(true).then(() => {
        if (state.userLocation) {
          state.sortMode = "distance";
          updateSortTabs();
          renderCards();
        }
      });
      return;
    }
    state.sortMode = mode;
    updateSortTabs();
    updateContentHeader();
    state.page = 1;
    renderCards();
  }

  function renderActiveFilters() {
    const el = document.getElementById("activeFilters");
    if (!el) return;
    const chips = [];

    const addChip = (key, label, clear) => {
      chips.push(
        `<span class="filter-chip" data-clear="${key}">${label}<button type="button" aria-label="清除">×</button></span>`
      );
    };

    if (state.city !== "全部") addChip("city", state.city);
    if (state.district !== "全部") addChip("district", state.district);
    if (state.category !== "all") {
      const c = RESOURCE_CATEGORIES.find((x) => x.id === state.category);
      addChip("category", c?.label || state.category);
    }
    state.facilities.forEach((f) => {
      const item = FACILITY_FILTERS.find((x) => x.id === f);
      addChip(`facility:${f}`, item?.label || f);
    });
    if (state.featuredOnly) addChip("featured", "推荐");
    if (state.freeOnly) addChip("free", "完全免费");
    if (state.yearRoundOnly) addChip("yearRound", "全年开放");
    if (state.search) addChip("search", `「${state.search}」`);

    if (!chips.length) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }

    el.hidden = false;
    el.innerHTML = chips.join("");
    el.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.querySelector("button")?.addEventListener("click", (e) => {
        e.stopPropagation();
        clearFilterKey(chip.dataset.clear);
      });
      chip.addEventListener("click", () => clearFilterKey(chip.dataset.clear));
    });
  }

  function clearFilterKey(key) {
    if (key === "city") applyCitySelection("全部");
    else if (key === "district") {
      state.district = "全部";
      document.getElementById("districtFilter").value = "全部";
    } else if (key === "category") {
      state.category = "all";
      renderCategoryFilters();
      renderValuePerks();
    } else if (key.startsWith("facility:")) {
      state.facilities.delete(key.slice(9));
      renderFacilityFilters();
      renderValuePerks();
    } else if (key === "featured") {
      state.featuredOnly = false;
      document.getElementById("featuredOnly").checked = false;
    } else if (key === "free") {
      state.freeOnly = false;
      document.getElementById("freeOnly").checked = false;
    } else if (key === "yearRound") {
      state.yearRoundOnly = false;
      document.getElementById("yearRoundOnly").checked = false;
    } else if (key === "search") {
      state.search = "";
      document.getElementById("searchInput").value = "";
      document.getElementById("searchClear").hidden = true;
    }
    state.page = 1;
    renderCards();
  }

  function updateMobileChrome() {
    syncCityQuickLabel();
    updateFilterBadge();
    updateSortTabs();
    renderActiveFilters();
    renderCityGrid();
    updateFilterConfirmCount();
  }

  function renderCityGrid() {
    const scope = document.getElementById("cityScopeGrid");
    const hot = document.getElementById("cityHotGrid");
    const grid = document.getElementById("cityGrid");
    const china = isChinaScope();
    const hotList = hotCityList();
    const prefectures =
      typeof PREFECTURE_CITIES !== "undefined"
        ? PREFECTURE_CITIES
        : hotList.concat(
            CITIES.filter(
              (c) => c !== "全部" && c !== "全省" && c !== "全国" && !hotList.includes(c)
            )
          );

    if (scope) {
      let html = cityPillHtml("全部", china ? "全国" : "浙江全省");
      if (china) html += cityPillHtml("全国", "全国工具");
      else html += cityPillHtml("全省", "全省政策");
      scope.innerHTML = html;
      bindCityPills(scope);
    }
    if (hot) {
      hot.innerHTML = hotList.map((c) => cityPillHtml(c)).join("");
      bindCityPills(hot);
    }
    if (!grid) return;

    if (typeof PROVINCE_MAP !== "undefined" && china) {
      grid.innerHTML = Object.entries(PROVINCE_MAP)
        .map(
          ([prov, cities]) => `
        <div class="city-province-block">
          <h4 class="city-province-title">${prov}</h4>
          <div class="city-province-grid">${cities.map((c) => cityPillHtml(c)).join("")}</div>
        </div>`
        )
        .join("");
      bindCityPills(grid);
      return;
    }

    const rest = prefectures.filter((c) => !hotList.includes(c));
    grid.innerHTML = rest.map((c) => cityPillHtml(c)).join("");
    bindCityPills(grid);
  }

  function isFilterDesktop() {
    return FILTER_DESKTOP_MQ.matches;
  }

  function placeFilterPanel() {
    const inner = document.getElementById("sidebarInner");
    const sidebar = document.getElementById("sidebar");
    const dropMount = document.getElementById("filterDropMount");
    if (!inner || !sidebar) return;
    if (isFilterDesktop()) {
      sidebar.appendChild(inner);
    } else if (dropMount) {
      dropMount.appendChild(inner);
    }
  }

  function openFilterSheet() {
    if (isFilterDesktop()) {
      expandSidebar(true);
      return;
    }
    toggleFilterDropdown();
  }

  function closeFilterSheet() {
    closeToolbarDrop();
  }

  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("sheet-open");
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    document.body.classList.remove("sheet-open");
  }

  function expandSidebar(scroll) {
    if (!isFilterDesktop()) {
      openFilterSheet();
      return;
    }
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");
    if (!sidebar) return;
    sidebar.classList.remove("sidebar--collapsed");
    if (toggle) {
      toggle.textContent = "收起";
      toggle.setAttribute("aria-expanded", "true");
    }
    if (scroll) {
      sidebar.classList.add("sidebar--highlight");
      sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => sidebar.classList.remove("sidebar--highlight"), 700);
    }
  }

  function openCitySheet() {
    renderCityGrid();
    openOverlay("citySheet");
  }

  function initMobileChrome() {
    placeFilterPanel();
    FILTER_DESKTOP_MQ.addEventListener("change", () => {
      placeFilterPanel();
      closeToolbarDrop();
    });

    document.getElementById("toolbarDropBackdrop")?.addEventListener("click", closeToolbarDrop);
    document.getElementById("filterDropClose")?.addEventListener("click", closeToolbarDrop);
    document.getElementById("filterDropResetBtn")?.addEventListener("click", () => {
      resetFilters();
      updateFilterConfirmCount();
    });
    document.getElementById("filterDropConfirmBtn")?.addEventListener("click", closeToolbarDrop);

    document.getElementById("filterSheetClose")?.addEventListener("click", closeFilterSheet);
    document.getElementById("filterSheetBackdrop")?.addEventListener("click", closeFilterSheet);
    document.getElementById("filterResetBtn")?.addEventListener("click", () => {
      resetFilters();
      updateFilterConfirmCount();
    });
    document.getElementById("filterConfirmBtn")?.addEventListener("click", closeFilterSheet);

    document.getElementById("sortComprehensive")?.addEventListener("click", () => {
      setSortMode("comprehensive");
    });
    document.getElementById("sortDistance")?.addEventListener("click", () => {
      setSortMode("distance");
    });

    window.addEventListener("resize", () => {
      if (toolbarDropKind) updateToolbarDropTop();
    });

    document.getElementById("sidebarToggle")?.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      const toggle = document.getElementById("sidebarToggle");
      if (!sidebar || !toggle) return;
      const collapsed = sidebar.classList.toggle("sidebar--collapsed");
      toggle.textContent = collapsed ? "展开" : "收起";
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });

    document.getElementById("cityQuickBtn")?.addEventListener("click", openCitySheet);
    document.getElementById("cityQuickBtnMobile")?.addEventListener("click", openCitySheet);
    document.getElementById("citySheetClose")?.addEventListener("click", () => closeOverlay("citySheet"));
    document.getElementById("citySheetBackdrop")?.addEventListener("click", () => closeOverlay("citySheet"));
    document.getElementById("citySheetLocateBtn")?.addEventListener("click", () => runGeoLocate(true));

    document.getElementById("modalClose")?.addEventListener("click", closeDetailModal);
    document.getElementById("detailBackdrop")?.addEventListener("click", closeDetailModal);
  }

  function resetFilters() {
    state.group = "all";
    state.category = "all";
    state.subType = "all";
    state.facilities.clear();
    state.city = "全部";
    state.district = "全部";
    state.search = "";
    state.featuredOnly = false;
    state.freeOnly = false;
    state.yearRoundOnly = false;
    state.page = 1;
    document.getElementById("searchInput").value = "";
    document.getElementById("searchClear").hidden = true;
    document.getElementById("featuredOnly").checked = false;
    document.getElementById("freeOnly").checked = false;
    document.getElementById("yearRoundOnly").checked = false;
    document.getElementById("districtFilter").value = "全部";
    document.getElementById("cityFilter").value = "全部";
    renderCategoryFilters();
    renderFacilityFilters();
    updateDistrictVisibility();
    renderHeroStats();
    renderValuePerks();
    renderCards();
    renderQuickScenes();
  }

  function applyCitySelection(city) {
    const picker =
      typeof CITY_PICKER !== "undefined"
        ? CITY_PICKER
        : CITIES.filter((c) => c !== "全省" && c !== "全国");
    if (!picker.includes(city)) return;
    state.city = city;
    if (city !== "全部" && city !== "杭州") {
      state.district = "全部";
      const districtSel = document.getElementById("districtFilter");
      if (districtSel) districtSel.value = "全部";
    }
    const citySel = document.getElementById("cityFilter");
    if (citySel) citySel.value = city;
    syncCityQuickLabel();
    updateDistrictVisibility();
    state.page = 1;
    track("filter_change", { field: "city", value: state.city });
    if (state.userLocation) enableNearbySort();
    renderCategoryFilters();
    renderHeroStats();
    renderValuePerks();
    renderCards();
  }

  function showGeoBanner(_message, _tone) {
    const el = document.getElementById("geoBanner");
    if (el) el.hidden = true;
  }

  async function runGeoLocate(manual) {
    if (typeof GeoCity === "undefined") return;
    const geoBtns = [
      document.getElementById("citySheetLocateBtn"),
      document.getElementById("geoLocateBtnDesktop"),
    ].filter(Boolean);
    geoBtns.forEach((btn) => {
      btn.disabled = true;
      if (btn.id === "geoLocateBtnDesktop") btn.textContent = "定位中…";
      else if (btn.id === "citySheetLocateBtn") btn.textContent = "定位中…";
    });
    if (manual) {
      /* 定位过程不展示横幅，节省首屏空间 */
    }

    try {
      const pos = await GeoCity.requestLocation();
      state.userLocation = { lat: pos.lat, lng: pos.lng };
      saveUserLocation(pos.lat, pos.lng);
      updateCityLocateStatus();
      enableNearbySort();

      const result = GeoCity.resolveCity(pos.lat, pos.lng);
      const shouldPickCity =
        result.ok &&
        (manual || state.city === "全部" || state.city === result.city);

      if (shouldPickCity) {
        sessionStorage.setItem("hz_geo_city_v2", result.city);
        if (state.city !== result.city) {
          applyCitySelection(result.city);
        } else {
          renderCards();
        }
        showGeoBanner(`已定位「${result.city}」，按距离由近到远展示`, "success");
        track("geo_locate", { ok: true, city: result.city, manual: !!manual, km: result.distanceKm });
      } else if (result.ok) {
        track("geo_locate", { ok: true, city: result.city, manual: !!manual, km: result.distanceKm });
        renderCards();
      } else {
        showGeoBanner("您当前不在国内范围，仍按距离由近到远展示", "warn");
        track("geo_locate", { ok: false, reason: "outside" });
        renderCards();
      }

      document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      const denied = err && err.code === 1;
      showGeoBanner(
        denied
          ? "定位未授权：请在城市面板点「定位」并允许访问"
          : "定位失败，请重试或检查系统定位是否开启",
        "warn"
      );
      track("geo_locate", { ok: false, reason: denied ? "denied" : "error" });
    } finally {
      geoBtns.forEach((btn) => {
        btn.disabled = false;
        if (btn.id === "geoLocateBtnDesktop") btn.textContent = "📍 定位";
        else if (btn.id === "citySheetLocateBtn") btn.textContent = "定位";
      });
    }
  }

  function saveUserLocation(lat, lng) {
    const payload = JSON.stringify({ lat, lng, at: Date.now() });
    try {
      localStorage.setItem(GEO_POS_KEY, payload);
    } catch {
      /* ignore */
    }
    try {
      sessionStorage.setItem(GEO_POS_KEY, payload);
    } catch {
      /* ignore */
    }
  }

  function restoreUserLocation() {
    let raw = null;
    try {
      raw = localStorage.getItem(GEO_POS_KEY) || sessionStorage.getItem(GEO_POS_KEY);
    } catch {
      raw = sessionStorage.getItem(GEO_POS_KEY);
    }
    if (!raw) return false;
    try {
      const p = JSON.parse(raw);
      if (!p?.lat || !p?.lng) return false;
      if (Date.now() - (p.at || 0) > GEO_POS_TTL_MS) {
        localStorage.removeItem(GEO_POS_KEY);
        sessionStorage.removeItem(GEO_POS_KEY);
        return false;
      }
      state.userLocation = { lat: p.lat, lng: p.lng };
      return true;
    } catch {
      localStorage.removeItem(GEO_POS_KEY);
      sessionStorage.removeItem(GEO_POS_KEY);
      return false;
    }
  }

  function updateDistanceHint() {
    const el = document.getElementById("geoBanner");
    if (el) el.hidden = true;
  }

  function initGeo() {
    updateCityLocateStatus();

    const btnDesktop = document.getElementById("geoLocateBtnDesktop");
    if (btnDesktop) btnDesktop.addEventListener("click", () => runGeoLocate(true));

    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const params = new URLSearchParams(location.search);

    if (state.userLocation) {
      if (!params.get("city")) {
        if (!syncCityFromLocation()) {
          const cached = sessionStorage.getItem("hz_geo_city_v2");
          if (state.city === "全部" && cached && CITIES.includes(cached)) {
            applyCitySelection(cached);
          }
        }
      }
      applyLocationPriority();
      renderCards();
      return;
    }

    if (cfg.autoLocateOnLoad !== false) {
      runGeoLocate(false);
      return;
    }

    updateDistanceHint();
  }

  function initSearch() {
    const input = document.getElementById("searchInput");
    const clear = document.getElementById("searchClear");
    let timer;
    input.addEventListener("input", () => {
      clear.hidden = !input.value;
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.search = input.value.trim();
        state.page = 1;
        const results = filterResources().length;
        if (state.search) track("search", { query: state.search, results });
        renderCards();
      }, 200);
    });
    clear.addEventListener("click", () => {
      input.value = "";
      state.search = "";
      state.page = 1;
      clear.hidden = true;
      renderCards();
      input.focus();
    });
  }

  const ONBOARD_KEY = "zheli_onboard_v1";
  const ONBOARD_STEPS =
    window.__COPY_ONBOARD__ && window.__COPY_ONBOARD__.length
      ? window.__COPY_ONBOARD__
      : [
    {
      icon: "📍",
      title: "先选城市",
      desc: "允许定位后按距离排序；也可手动选全国或 72 个城市。",
    },
    {
      icon: "❄️",
      title: "点设施标签",
      desc: "免费WiFi、有空调、可饮水、可充电 — 一点筛出图书馆、纳凉点、驿家等。",
    },
    {
      icon: "🏷️",
      title: "或点场景标签",
      desc: "遛娃、免费自习、找停车、公厕、纳凉…按大家常搜的顺序排在下面。",
    },
    {
      icon: "🗺️",
      title: "导航过去",
      desc: "点卡片查看详情，再点「高德地图导航」即可出发。",
    },
  ];

  function initOnboarding() {
    const overlay = document.getElementById("onboardOverlay");
    if (!overlay) return;
    try {
      if (localStorage.getItem(ONBOARD_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    let step = 0;
    const iconEl = document.getElementById("onboardIcon");
    const titleEl = document.getElementById("onboardTitle");
    const descEl = document.getElementById("onboardDesc");
    const progressEl = document.getElementById("onboardProgress");
    const nextBtn = document.getElementById("onboardNext");
    const skipBtn = document.getElementById("onboardSkip");

    function renderStep() {
      const s = ONBOARD_STEPS[step];
      if (iconEl) iconEl.textContent = s.icon;
      if (titleEl) titleEl.textContent = s.title;
      if (descEl) descEl.textContent = s.desc;
      if (progressEl) {
        progressEl.innerHTML = ONBOARD_STEPS.map(
          (_, i) => `<span class="onboard-dot ${i === step ? "is-active" : ""}"></span>`
        ).join("");
      }
      if (nextBtn) {
        nextBtn.textContent = step === ONBOARD_STEPS.length - 1 ? "开始使用" : "下一步";
      }
    }

    function finish() {
      overlay.hidden = true;
      document.body.classList.remove("sheet-open");
      try {
        localStorage.setItem(ONBOARD_KEY, "1");
      } catch {
        /* ignore */
      }
      track("onboard_complete", { step });
    }

    function open() {
      overlay.hidden = false;
      document.body.classList.add("sheet-open");
      renderStep();
      track("onboard_open", {});
    }

    nextBtn?.addEventListener("click", () => {
      if (step >= ONBOARD_STEPS.length - 1) {
        finish();
        return;
      }
      step += 1;
      renderStep();
    });
    skipBtn?.addEventListener("click", finish);

    window.setTimeout(open, 600);
  }

  function applyQuickScene(scene) {
    state.category = scene?.category || "all";
    state.group = "all";
    state.search = scene?.search || "";
    state.page = 1;
    state.facilities.clear();
    const input = document.getElementById("searchInput");
    if (input) input.value = state.search;
    const clear = document.getElementById("searchClear");
    if (clear) clear.hidden = !state.search;
    renderCategoryFilters();
    renderValuePerks();
    updateMobileChrome();
    renderCards();
    track("filter_change", {
      field: "quick_scene",
      value: state.search || state.category,
    });
  }

  function setGroup(groupId) {
    state.group = groupId;
    state.category = "all";
    state.page = 1;
    state.facilities.clear();
    track("filter_change", { field: "group", value: groupId });
    renderCategoryFilters();
    renderValuePerks();
    renderCards();
  }

  function setCategory(catId) {
    state.category = catId;
    state.page = 1;
    state.facilities.clear();
    track("filter_change", { field: "category", value: catId });
    renderCategoryFilters();
    renderValuePerks();
    renderCards();
  }

  function toggleFacility(id) {
    if (state.facilities.has(id)) state.facilities.delete(id);
    else state.facilities.add(id);
    state.page = 1;
    renderFacilityFilters();
    renderValuePerks();
    renderCards();
  }

  function countGroup(groupId) {
    const pool = scopedResources();
    return pool.filter((r) => CATEGORY_TO_GROUP[r.category] === groupId).length;
  }

  function wizardStep() {
    if (state.city === "全部") return 1;
    if (state.category === "all" && !state.search && state.facilities.size === 0) return 2;
    return 3;
  }

  function wizardTip() {
    const s = wizardStep();
    if (s === 1) return "第一步：点左上角 📍 选择城市，或允许定位";
    if (s === 2) return "第二步：点选一个办事场景（遛娃 / 自习 / 纳凉…）";
    return "第三步：浏览匹配结果，点卡片导航";
  }

  function init() {
    if (!document.getElementById("cardGrid")) return;

    const designInit = getDesign();
    applyUrlParams();
    if (restoreUserLocation()) {
      state.sortMode = "distance";
    } else if (designInit?.defaultSort === "distance") {
      state.sortMode = "distance";
    }
    if (designInit && !designInit.layout?.stats) {
      document.getElementById("heroStats")?.replaceChildren();
    } else if (!designInit) {
      renderHeroStats();
    }
    if (!designInit) {
      renderFilterToolbar();
    }
    renderCityFilter();
    renderCategoryFilters();
    renderFacilityFilters();
    renderDistrictFilter();
    if (state.freeOnly) document.getElementById("freeOnly").checked = true;
    if (state.city !== "全部") {
      const citySel = document.getElementById("cityFilter");
      if (citySel) citySel.value = state.city;
    }
    if (state.category !== "all") renderCategoryFilters();
    initMobileChrome();
    initGeo();
    if (typeof DesignEngine !== "undefined") {
      DesignEngine.afterInit({
        state,
        CATEGORY_GROUPS,
        QUICK_SCENES,
        VALUE_PERKS,
        FACILITY_FILTERS,
        visibleCategories,
        isSceneActive: isQuickSceneActive,
        countGroup,
        setGroup,
        setCategory,
        toggleFacility,
        applyQuickScene,
        wizardStep,
        wizardTip,
        runGeoLocate,
        setSortMode,
        filterBadgeHtml: () => {
          const n = countActiveFilters();
          return `筛选${n ? `<span class="filter-badge">${n}</span>` : ""}`;
        },
        openFilterSheet: () => openFilterSheet(),
        toggleSortDropdown,
        sortModeLabel,
      });
    }
    renderCards();
    initSearch();
    initOnboarding();

    document.getElementById("resetFilters")?.addEventListener("click", resetFilters);
    document.getElementById("emptyReset")?.addEventListener("click", resetFilters);
    document.getElementById("featuredOnly")?.addEventListener("change", (e) => {
      state.featuredOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
    document.getElementById("freeOnly")?.addEventListener("change", (e) => {
      state.freeOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
    document.getElementById("yearRoundOnly")?.addEventListener("change", (e) => {
      state.yearRoundOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
