(function () {
  const PAGE_SIZE = 48;

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
    if (city && CITIES.includes(city)) state.city = city;
    if (params.get("free") === "1") state.freeOnly = true;
    if (params.toString()) {
      track("landing_params", Object.fromEntries(params.entries()));
    }
  }

  const GEO_POS_KEY = "hz_geo_pos_v1";
  const GEO_POS_TTL_MS = 24 * 60 * 60 * 1000;

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
  };

  const CATEGORY_LABELS = Object.fromEntries(
    RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
  );

  const CATEGORY_TO_GROUP = Object.fromEntries(
    RESOURCE_CATEGORIES.filter((c) => c.group).map((c) => [c.id, c.group])
  );

  const FACILITY_LABELS = {
    wifi: "WiFi",
    water: "饮水",
    ac: "空调",
    study: "自习",
    charge: "充电",
    open24: "24h",
  };

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
    if (state.group === "all") return RESOURCE_CATEGORIES;
    return RESOURCE_CATEGORIES.filter(
      (c) => c.id === "all" || c.group === state.group
    );
  }

  function resourceCity(r) {
    return r.city || "杭州";
  }

  function matchesCityFilter(r) {
    if (state.city === "全部") return true;
    if (state.city === "全省") return resourceCity(r) === "全省";
    return resourceCity(r) === state.city || resourceCity(r) === "全省";
  }

  function scopedResources() {
    return RESOURCES.filter(matchesCityFilter);
  }

  function resourceCoord(resource) {
    const c =
      typeof RESOURCE_COORDS !== "undefined" ? RESOURCE_COORDS[resource.id] : null;
    return c ? { lat: c.lat, lng: c.lng, p: c.p } : null;
  }

  function resourceDistanceKm(resource) {
    if (!state.userLocation || typeof GeoCity === "undefined") return null;
    const c = resourceCoord(resource);
    if (!c) return null;
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
      if (state.search) {
        const q = state.search.toLowerCase();
        const hay = [
          r.name,
          r.fullName,
          r.subType,
          r.city,
          r.address,
          r.district,
          r.transport,
          r.note,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return sortByDistance(list);
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

  function resultCountLabel(total) {
    const sortHint = state.userLocation ? " · 近→远" : "";
    if (state.city === "全部") return `共 ${total} 处${sortHint}`;
    if (state.city === "全省") return `共 ${total} 处（全省通用）${sortHint}`;
    const local = RESOURCES.filter((r) => resourceCity(r) === state.city).length;
    const shared = RESOURCES.filter((r) => resourceCity(r) === "全省").length;
    return `共 ${total} 处（${state.city} ${local} + 全省 ${shared}）${sortHint}`;
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

  const QUICK_SCENES = [
    { label: "📖 免费自习", category: "reading", search: "" },
    { label: "🅿️ 找停车", category: "parking", search: "" },
    { label: "🧊 纳凉", category: "bunker", search: "" },
    { label: "🚻 公厕", category: "toilet", search: "" },
    { label: "🔌 充电", category: "charging", search: "" },
    { label: "🌳 遛娃", category: "park", search: "" },
  ];

  function renderHeroStats() {
    const counts = countByCategory();
    const el = document.getElementById("heroStats");
    if (!el) return;
    const coveredCities = new Set(
      RESOURCES.map((r) => resourceCity(r)).filter((c) => c !== "全省")
    ).size;
    const hangzhouCount = RESOURCES.filter((r) => resourceCity(r) === "杭州").length;
    const items = [
      { n: RESOURCES.length, label: "免费点位" },
      { n: hangzhouCount, label: "杭州可查" },
      { n: counts.reading || 0, label: "书房自习" },
      { n: coveredCities, label: "覆盖地市" },
    ];
    el.innerHTML = items
      .map(
        (i) =>
          `<div class="stat-item"><strong>${i.n}</strong><span>${i.label}</span></div>`
      )
      .join("");
  }

  function renderQuickScenes() {
    const el = document.getElementById("quickScenes");
    if (!el) return;
    el.innerHTML = QUICK_SCENES.map(
      (s) =>
        `<button type="button" class="quick-scene ${state.category === s.category ? "is-active" : ""}" data-category="${s.category}" data-search="${s.search}">${s.label}</button>`
    ).join("");
    el.querySelectorAll(".quick-scene").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        state.group = "all";
        state.search = btn.dataset.search || "";
        state.page = 1;
        document.getElementById("searchInput").value = state.search;
        document.getElementById("searchClear").hidden = !state.search;
        document.getElementById("groupFilter").value = "all";
        renderCategoryFilters();
        updateSubTypeVisibility();
        updateMobileChrome();
        renderCards();
        track("filter_change", { field: "quick_scene", value: state.category });
        document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function updateDistrictVisibility() {
    const block = document.getElementById("districtBlock");
    if (block) block.hidden = state.city !== "全部" && state.city !== "杭州";
  }

  function renderCityFilter() {
    const sel = document.getElementById("cityFilter");
    if (!sel) return;
    sel.innerHTML = CITIES.map(
      (c) => `<option value="${c}" ${state.city === c ? "selected" : ""}>${c}</option>`
    ).join("");
    sel.onchange = () => {
      state.city = sel.value;
      if (state.city !== "全部" && state.city !== "杭州") {
        state.district = "全部";
        document.getElementById("districtFilter").value = "全部";
      }
      state.page = 1;
      track("filter_change", { field: "city", value: state.city });
      updateDistrictVisibility();
      renderCategoryFilters();
      renderCards();
    };
    updateDistrictVisibility();
  }

  function updateSubTypeVisibility() {
    const block = document.getElementById("subTypeBlock");
    block.hidden = state.category !== "reading";
  }

  function renderGroupFilter() {
    const sel = document.getElementById("groupFilter");
    sel.innerHTML = CATEGORY_GROUPS.map(
      (g) =>
        `<option value="${g.id}" ${state.group === g.id ? "selected" : ""}>${g.label}</option>`
    ).join("");
    sel.onchange = () => {
      state.group = sel.value;
      state.category = "all";
      state.page = 1;
      track("filter_change", { field: "group", value: state.group });
      renderCategoryFilters();
      updateSubTypeVisibility();
      renderCards();
    };
  }

  function renderSubTypeFilter() {
    const sel = document.getElementById("subTypeFilter");
    sel.innerHTML = READING_SUBTYPES.map(
      (s) =>
        `<option value="${s.id}" ${state.subType === s.id ? "selected" : ""}>${s.label}</option>`
    ).join("");
    sel.onchange = () => {
      state.subType = sel.value;
      state.page = 1;
      renderCards();
    };
    updateSubTypeVisibility();
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
        track("filter_change", { field: "category", value: state.category });
        renderCategoryFilters();
        updateSubTypeVisibility();
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

    return `
      <article class="card ${resource.featured ? "card-featured" : ""} ${resource.isTool ? "card-tool" : ""}" data-id="${resource.id}" tabindex="0" role="button" aria-label="查看${resource.name}详情">
        <div class="card-top">
          <span class="card-category ${resource.category}">${categoryLabel(resource)}</span>
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
      </article>
    `;
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

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    countEl.textContent = resultCountLabel(filtered.length);
    renderPagination(filtered.length, totalPages);
    updateMobileChrome();
    updateDistanceHint();
    renderQuickScenes();

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    grid.innerHTML = pageItems.map(renderCard).join("");

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

    const features = (r.features || []).map((f) => `<li>${f}</li>`).join("");
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
    const el = document.getElementById("cityQuickValue");
    if (el) el.textContent = state.city;
  }

  function countActiveFilters() {
    let n = 0;
    if (state.group !== "all") n++;
    if (state.category !== "all") n++;
    if (state.subType !== "all") n++;
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
    if (!badge) return;
    const n = countActiveFilters();
    badge.textContent = n;
    badge.hidden = n === 0;
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
    if (state.group !== "all") {
      const g = CATEGORY_GROUPS.find((x) => x.id === state.group);
      addChip("group", g?.label || state.group);
    }
    if (state.category !== "all") {
      const c = RESOURCE_CATEGORIES.find((x) => x.id === state.category);
      addChip("category", c?.label || state.category);
    }
    if (state.subType !== "all") addChip("subType", state.subType);
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
    } else if (key === "group") {
      state.group = "all";
      document.getElementById("groupFilter").value = "all";
      renderCategoryFilters();
      updateSubTypeVisibility();
    } else if (key === "category") {
      state.category = "all";
      renderCategoryFilters();
      updateSubTypeVisibility();
    } else if (key === "subType") {
      state.subType = "all";
      document.getElementById("subTypeFilter").value = "all";
    } else if (key.startsWith("facility:")) {
      state.facilities.delete(key.slice(9));
      renderFacilityFilters();
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
    renderActiveFilters();
    renderCityGrid();
  }

  function renderCityGrid() {
    const grid = document.getElementById("cityGrid");
    if (!grid) return;
    grid.innerHTML = CITIES.map(
      (c) =>
        `<button type="button" class="city-pill ${state.city === c ? "active" : ""}" data-city="${c}">${c}</button>`
    ).join("");
    grid.querySelectorAll(".city-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyCitySelection(btn.dataset.city);
        closeOverlay("citySheet");
      });
    });
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

  function initMobileChrome() {
    const citySheet = document.getElementById("citySheet");

    document.getElementById("filterOpenBtn")?.addEventListener("click", () => {
      expandSidebar(true);
    });

    document.getElementById("sidebarToggle")?.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      const toggle = document.getElementById("sidebarToggle");
      if (!sidebar || !toggle) return;
      const collapsed = sidebar.classList.toggle("sidebar--collapsed");
      toggle.textContent = collapsed ? "展开" : "收起";
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });

    document.getElementById("cityQuickBtn")?.addEventListener("click", () => {
      renderCityGrid();
      openOverlay("citySheet");
    });
    document.getElementById("citySheetClose")?.addEventListener("click", () => closeOverlay("citySheet"));
    document.getElementById("citySheetBackdrop")?.addEventListener("click", () => closeOverlay("citySheet"));

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
    document.getElementById("groupFilter").value = "all";
    document.getElementById("subTypeFilter").value = "all";
    renderCategoryFilters();
    renderFacilityFilters();
    updateSubTypeVisibility();
    updateDistrictVisibility();
    renderCards();
    renderQuickScenes();
  }

  function applyCitySelection(city) {
    if (!CITIES.includes(city)) return;
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
    renderCards();
  }

  function showGeoBanner(message, tone) {
    const el = document.getElementById("geoBanner");
    if (!el) return;
    el.textContent = message;
    el.className = `geo-banner geo-banner--${tone || "info"}`;
    el.hidden = false;
  }

  async function runGeoLocate(manual) {
    if (typeof GeoCity === "undefined") return;
    const geoBtns = [
      document.getElementById("geoLocateBtn"),
      document.getElementById("geoLocateBtnDesktop"),
    ].filter(Boolean);
    geoBtns.forEach((btn) => {
      btn.disabled = true;
      if (btn.id === "geoLocateBtnDesktop") btn.textContent = "定位中…";
    });
    if (manual) showGeoBanner("正在获取您的位置…", "info");

    try {
      const pos = await GeoCity.requestLocation();
      state.userLocation = { lat: pos.lat, lng: pos.lng };
      saveUserLocation(pos.lat, pos.lng);

      const result = GeoCity.resolveCity(pos.lat, pos.lng);
      const shouldPickCity =
        result.ok &&
        (manual || state.city === "全部" || state.city === result.city);

      if (shouldPickCity) {
        applyCitySelection(result.city);
        sessionStorage.setItem("hz_geo_city_v2", result.city);
        showGeoBanner(`已定位「${result.city}」，按距离由近到远`, "success");
        track("geo_locate", { ok: true, city: result.city, manual: !!manual, km: result.distanceKm });
      } else if (result.ok) {
        showGeoBanner(`已获取位置，按距离由近到远（当前筛选：${state.city}）`, "success");
        track("geo_locate", { ok: true, city: result.city, manual: !!manual, km: result.distanceKm });
        renderCards();
      } else {
        showGeoBanner("您当前不在浙江省内，结果仍按距离排序", "warn");
        track("geo_locate", { ok: false, reason: "outside" });
        renderCards();
      }

      document.getElementById("resources")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      const denied = err && err.code === 1;
      showGeoBanner(
        denied
          ? "定位未授权：点 📍 允许定位后，列表会显示距离"
          : "定位失败，请点 📍 重试或检查系统定位是否开启",
        "warn"
      );
      track("geo_locate", { ok: false, reason: denied ? "denied" : "error" });
    } finally {
      geoBtns.forEach((btn) => {
        btn.disabled = false;
        if (btn.id === "geoLocateBtnDesktop") btn.textContent = "📍 定位";
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
    const btn = document.getElementById("geoLocateBtn");
    if (btn) btn.classList.toggle("toolbar-btn--active", !!state.userLocation);
    if (state.userLocation) return;
    const el = document.getElementById("geoBanner");
    if (!el || el.hidden) {
      showGeoBanner("点 📍 开启定位，列表将显示距离并由近到远排序", "info");
    }
  }

  function initGeo() {
    restoreUserLocation();

    const btn = document.getElementById("geoLocateBtn");
    const btnDesktop = document.getElementById("geoLocateBtnDesktop");
    if (btn) btn.addEventListener("click", () => runGeoLocate(true));
    if (btnDesktop) btnDesktop.addEventListener("click", () => runGeoLocate(true));

    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const params = new URLSearchParams(location.search);
    const cached = sessionStorage.getItem("hz_geo_city_v2");

    if (!params.get("city") && state.city === "全部" && cached && CITIES.includes(cached)) {
      applyCitySelection(cached);
    }

    if (state.userLocation) {
      showGeoBanner(`已获取位置，结果按距离由近到远`, "success");
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

  function init() {
    if (!document.getElementById("cardGrid")) return;

    applyUrlParams();
    restoreUserLocation();
    renderHeroStats();
    renderQuickScenes();
    renderGroupFilter();
    renderCityFilter();
    renderCategoryFilters();
    renderFacilityFilters();
    renderDistrictFilter();
    renderSubTypeFilter();
    if (state.freeOnly) document.getElementById("freeOnly").checked = true;
    if (state.city !== "全部") document.getElementById("cityFilter").value = state.city;
    if (state.group !== "all") document.getElementById("groupFilter").value = state.group;
    if (state.category !== "all") renderCategoryFilters();
    if (state.category === "reading") updateSubTypeVisibility();
    initGeo();
    renderCards();
    initSearch();
    initMobileChrome();

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
