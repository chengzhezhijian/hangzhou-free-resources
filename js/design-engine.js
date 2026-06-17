/**
 * 整站设计引擎 — 紧凑筛选 UI / 布局 / 信息层级
 */
const DesignEngine = (function () {
  let api = null;

  function chipBar(items, { activeFn, onClick, cls = "design-chip" }) {
    return `<div class="design-chip-bar" role="toolbar">${items
      .map(
        (item) =>
          `<button type="button" class="${cls} ${activeFn(item) ? "is-active" : ""}" data-key="${item.key}">${item.label}</button>`
      )
      .join("")}</div>`;
  }

  function bindChips(container, onClick) {
    container.querySelectorAll(".design-chip, .design-chip--fac").forEach((btn) => {
      btn.addEventListener("click", () => onClick(btn));
    });
  }

  function mountPerksChips(target) {
    if (!api || !target) return;
    target.innerHTML = chipBar(
      api.VALUE_PERKS.map((p) => ({ key: p.id, label: p.short || p.label })),
      {
        activeFn: (item) => api.state.facilities.has(item.key),
        onClick: null,
      }
    );
    bindChips(target, (btn) => api.toggleFacility(btn.dataset.key));
  }

  function mountSceneChips(target) {
    if (!api || !target) return;
    target.innerHTML = chipBar(
      api.QUICK_SCENES.map((s) => ({ key: `${s.category}|${s.search}`, label: s.label })),
      {
        activeFn: (item) => {
          const [cat, q] = item.key.split("|");
          return api.isSceneActive({ category: cat, search: q });
        },
        onClick: null,
      }
    );
    bindChips(target, (btn) => {
      const [cat, q] = btn.dataset.key.split("|");
      api.applyQuickScene({ category: cat, search: q });
    });
  }

  function mountGroupChips(target) {
    if (!api || !target) return;
    const groups = [{ key: "all", label: "全部" }, ...api.CATEGORY_GROUPS.filter((g) => g.id !== "all").map((g) => ({ key: g.id, label: g.label }))];
    target.innerHTML = chipBar(groups, {
      activeFn: (item) => api.state.group === item.key,
      onClick: null,
    });
    bindChips(target, (btn) => api.setGroup(btn.dataset.key));
  }

  function mountFacilityChips(target) {
    if (!api || !target) return;
    target.innerHTML = `<div class="design-chip-bar">${api.FACILITY_FILTERS.map(
      (f) =>
        `<button type="button" class="design-chip design-chip--fac ${api.state.facilities.has(f.id) ? "is-active" : ""}" data-key="${f.id}">${f.label}</button>`
    ).join("")}</div>`;
    bindChips(target, (btn) => api.toggleFacility(btn.dataset.key));
  }

  function mountTabChips(target) {
    if (!api || !target) return;
    const tabs = [{ key: "all", label: "全部" }, ...api.visibleCategories().filter((c) => c.id !== "all").slice(0, 8).map((c) => ({ key: c.id, label: `${c.icon} ${c.label}` }))];
    target.innerHTML = chipBar(tabs, {
      activeFn: (item) => api.state.category === item.key,
      onClick: null,
    });
    bindChips(target, (btn) => api.setCategory(btn.dataset.key));
  }

  function mountMergedChips(target) {
    if (!api || !target) return;
    const cats = api.visibleCategories().slice(0, 6);
    target.innerHTML = `<div class="design-chip-bar design-chip-bar--wrap">
      ${cats.map((c) => `<button type="button" class="design-chip ${api.state.category === c.id ? "is-active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("")}
      ${api.FACILITY_FILTERS.slice(0, 4).map((f) => `<button type="button" class="design-chip design-chip--fac ${api.state.facilities.has(f.id) ? "is-active" : ""}" data-fid="${f.id}">${f.label}</button>`).join("")}
    </div>`;
    target.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => api.setCategory(btn.dataset.cat));
    });
    target.querySelectorAll("[data-fid]").forEach((btn) => {
      btn.addEventListener("click", () => api.toggleFacility(btn.dataset.fid));
    });
  }

  function mountPrimary(design) {
    const primary = document.getElementById("designPrimaryMount");
    const secondary = document.getElementById("designSecondaryMount");
    if (!primary || !design) return;

    primary.hidden = false;
    primary.innerHTML = "";
    if (secondary) {
      secondary.hidden = true;
      secondary.innerHTML = "";
    }

    if (design.filterPrimary === "perks") return;

    if (design.filterPrimary === "search") {
      primary.innerHTML = `<p class="design-filter-label">搜索点位名称、地址或需求</p>`;
      document.getElementById("searchInput")?.classList.add("design-search-focus");
      return;
    }

    if (design.filterPrimary === "groups") {
      mountGroupChips(primary);
      return;
    }

    if (design.filterPrimary === "scenes") {
      mountSceneChips(primary);
      return;
    }

    if (design.filterPrimary === "facilities") {
      mountFacilityChips(primary);
      return;
    }

    if (design.filterPrimary === "locate") {
      primary.innerHTML = `
        <div class="design-locate-row">
          <button type="button" class="design-chip design-chip--locate" id="designLocateBtn">📍 开启定位</button>
          <span class="design-locate-hint">按距离排序，优先附近</span>
        </div>`;
      document.getElementById("designLocateBtn")?.addEventListener("click", () => {
        api?.runGeoLocate?.(true);
      });
      return;
    }

    if (design.filterPrimary === "tabs") {
      mountTabChips(primary);
      return;
    }

    if (design.filterPrimary === "merged") {
      mountMergedChips(primary);
      return;
    }

    if (design.filterPrimary === "wizard" && api) {
      const step = api.wizardStep();
      primary.innerHTML = `
        <div class="design-wizard-row">
          <span class="design-wizard-step ${step >= 1 ? "is-done" : ""} ${step === 1 ? "is-current" : ""}">① 城市</span>
          <span class="design-wizard-sep">›</span>
          <span class="design-wizard-step ${step >= 2 ? "is-done" : ""} ${step === 2 ? "is-current" : ""}">② 场景</span>
          <span class="design-wizard-sep">›</span>
          <span class="design-wizard-step ${step >= 3 ? "is-done" : ""} ${step === 3 ? "is-current" : ""}">③ 结果</span>
        </div>
        <p class="design-wizard-tip">${api.wizardTip()}</p>`;
      if (secondary && step === 2) {
        secondary.hidden = false;
        mountSceneChips(secondary);
      }
    }
  }

  function mountSecondary(design) {
    const secondary = document.getElementById("designSecondaryMount");
    if (!secondary || !design?.filterSecondary || !api) return;

    secondary.hidden = false;
    if (design.filterSecondary === "perks") mountPerksChips(secondary);
    else if (design.filterSecondary === "scenes") mountSceneChips(secondary);
  }

  function applyLayoutClass(design) {
    if (!design) return;
    document.body.classList.add("has-design-variant", `design--${design.id}`);
    const L = design.layout || {};
    const heroMode = L.heroMode || (L.hero === false ? "none" : "compact");

    document.body.classList.toggle("design-hide-hero", heroMode === "none");
    document.body.classList.toggle("design-hero-compact", heroMode === "compact");
    document.body.classList.toggle("design-hide-stats", true);
    document.body.classList.toggle("design-hide-perks", !L.perks);
    document.body.classList.toggle("design-hide-scenes", !L.quickScenes);
    document.body.classList.toggle("design-hide-sort", !L.sortTabs);
    document.body.classList.toggle("design-hide-content-head", !L.contentHeader);
    document.body.classList.toggle("design-sidebar-hidden", L.sidebar === "hidden");
    document.body.classList.toggle("design-sidebar-sheet", L.sidebar === "sheet");
    document.body.classList.toggle("design-group-list", !!design.groupList);
    document.body.classList.toggle("design-card-tile", design.cardMode === "tile");
    document.body.classList.toggle("design-card-row", design.cardMode === "row" || design.cardMode === "minimal");
    document.body.classList.toggle("design-card-dense", design.cardMode === "row" || design.cardMode === "minimal" || design.cardMode === "compact");
  }

  return {
    afterInit(appApi) {
      api = appApi;
      const design = typeof getDesignVariant === "function" ? getDesignVariant() : null;
      if (!design) return;
      applyLayoutClass(design);
      mountPrimary(design);
      mountSecondary(design);
      appApi.onRefresh = () => {
        mountPrimary(design);
        mountSecondary(design);
      };
    },
    remount() {
      const design = typeof getDesignVariant === "function" ? getDesignVariant() : null;
      if (!design) return;
      mountPrimary(design);
      mountSecondary(design);
    },
  };
})();

if (typeof window !== "undefined") {
  window.DesignEngine = DesignEngine;
}
