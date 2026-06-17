/**
 * 整站设计引擎 — 挂载各方案的筛选 UI / 布局
 */
const DesignEngine = (function () {
  let api = null;

  function mountPrimary(design) {
    const primary = document.getElementById("designPrimaryMount");
    const secondary = document.getElementById("designSecondaryMount");
    if (!primary || !design || design.filterPrimary === "perks") return;

    primary.hidden = false;
    primary.innerHTML = "";

    if (design.filterPrimary === "search") {
      primary.innerHTML = `<p class="design-search-hint">输入关键词或选城市，回车搜索</p>`;
      const input = document.getElementById("searchInput");
      if (input) input.classList.add("design-search-hero");
      return;
    }

    if (design.filterPrimary === "groups" && api) {
      const groups = api.CATEGORY_GROUPS.filter((g) => g.id !== "all");
      primary.innerHTML = `<div class="design-group-grid">${groups
        .map(
          (g) =>
            `<button type="button" class="design-group-tile ${api.state.group === g.id ? "is-active" : ""}" data-group="${g.id}">
              <span class="design-group-tile__label">${g.label}</span>
              <span class="design-group-tile__count">${api.countGroup(g.id)}</span>
            </button>`
        )
        .join("")}</div>`;
      primary.querySelectorAll(".design-group-tile").forEach((btn) => {
        btn.addEventListener("click", () => api.setGroup(btn.dataset.group));
      });
      return;
    }

    if (design.filterPrimary === "scenes" && api) {
      primary.innerHTML = `<div class="design-scene-grid">${api.QUICK_SCENES.map(
        (s) =>
          `<button type="button" class="design-scene-tile ${api.isSceneActive(s) ? "is-active" : ""}" data-cat="${s.category}" data-q="${s.search}">
            <span class="design-scene-tile__label">${s.label}</span>
          </button>`
      ).join("")}</div>`;
      primary.querySelectorAll(".design-scene-tile").forEach((btn) => {
        btn.addEventListener("click", () =>
          api.applyQuickScene({ category: btn.dataset.cat, search: btn.dataset.q })
        );
      });
      return;
    }

    if (design.filterPrimary === "facilities" && api) {
      primary.innerHTML = `<div class="design-facility-grid">${api.FACILITY_FILTERS.map(
        (f) =>
          `<button type="button" class="design-facility-tile ${api.state.facilities.has(f.id) ? "is-active" : ""}" data-fid="${f.id}">
            ${f.label}
          </button>`
      ).join("")}</div>`;
      primary.querySelectorAll(".design-facility-tile").forEach((btn) => {
        btn.addEventListener("click", () => api.toggleFacility(btn.dataset.fid));
      });
      return;
    }

    if (design.filterPrimary === "locate") {
      primary.innerHTML = `
        <div class="design-locate-bar">
          <button type="button" class="design-locate-btn" id="designLocateBtn">📍 开启定位 · 按距离排序</button>
          <p class="design-locate-tip">附近图书馆、纳凉点、驿家优先展示</p>
        </div>`;
      document.getElementById("designLocateBtn")?.addEventListener("click", () => {
        api?.runGeoLocate?.(true);
      });
      return;
    }

    if (design.filterPrimary === "tabs" && api) {
      const tabs = api.visibleCategories().filter((c) => c.id !== "all").slice(0, 8);
      primary.innerHTML = `<div class="design-tab-bar">${tabs
        .map(
          (c) =>
            `<button type="button" class="design-tab ${api.state.category === c.id ? "is-active" : ""}" data-cat="${c.id}">${c.icon} ${c.label}</button>`
        )
        .join("")}</div>`;
      primary.querySelectorAll(".design-tab").forEach((btn) => {
        btn.addEventListener("click", () => api.setCategory(btn.dataset.cat));
      });
      return;
    }

    if (design.filterPrimary === "merged" && api) {
      const cats = api.visibleCategories().slice(0, 6);
      primary.innerHTML = `<div class="design-merged-bar">
        ${cats
          .map(
            (c) =>
              `<button type="button" class="design-merged-chip ${api.state.category === c.id ? "is-active" : ""}" data-cat="${c.id}">${c.label}</button>`
          )
          .join("")}
        ${api.FACILITY_FILTERS.slice(0, 4)
          .map(
            (f) =>
              `<button type="button" class="design-merged-chip design-merged-chip--fac ${api.state.facilities.has(f.id) ? "is-active" : ""}" data-fid="${f.id}">${f.label}</button>`
          )
          .join("")}
      </div>`;
      primary.querySelectorAll("[data-cat]").forEach((btn) => {
        btn.addEventListener("click", () => api.setCategory(btn.dataset.cat));
      });
      primary.querySelectorAll("[data-fid]").forEach((btn) => {
        btn.addEventListener("click", () => api.toggleFacility(btn.dataset.fid));
      });
      return;
    }

    if (design.filterPrimary === "wizard" && api) {
      const step = api.wizardStep();
      const steps = [
        { n: 1, label: "选城市" },
        { n: 2, label: "选场景" },
        { n: 3, label: "看结果" },
      ];
      primary.innerHTML = `
        <div class="design-wizard">
          <div class="design-wizard-steps">${steps
            .map(
              (s) =>
                `<span class="design-wizard-step ${step >= s.n ? "is-done" : ""} ${step === s.n ? "is-current" : ""}">${s.n}. ${s.label}</span>`
            )
            .join("")}</div>
          <p class="design-wizard-tip">${api.wizardTip()}</p>
        </div>`;
      if (secondary && step === 2) {
        secondary.hidden = false;
        secondary.innerHTML = `<div class="design-scene-grid design-scene-grid--sm">${api.QUICK_SCENES.map(
          (s) =>
            `<button type="button" class="design-scene-tile ${api.isSceneActive(s) ? "is-active" : ""}" data-cat="${s.category}" data-q="${s.search}">${s.label}</button>`
        ).join("")}</div>`;
        secondary.querySelectorAll(".design-scene-tile").forEach((btn) => {
          btn.addEventListener("click", () =>
            api.applyQuickScene({ category: btn.dataset.cat, search: btn.dataset.q })
          );
        });
      }
    }
  }

  function applyLayoutClass(design) {
    if (!design) return;
    document.body.classList.add("has-design-variant", `design--${design.id}`);
    const L = design.layout || {};
    document.body.classList.toggle("design-hide-hero", !L.hero);
    document.body.classList.toggle("design-hide-stats", !L.stats);
    document.body.classList.toggle("design-hide-perks", !L.perks);
    document.body.classList.toggle("design-hide-scenes", !L.quickScenes);
    document.body.classList.toggle("design-hide-sort", !L.sortTabs);
    document.body.classList.toggle("design-hide-content-head", !L.contentHeader);
    document.body.classList.toggle("design-sidebar-hidden", L.sidebar === "hidden");
    document.body.classList.toggle("design-sidebar-sheet", L.sidebar === "sheet");
    document.body.classList.toggle("design-group-list", !!design.groupList);
    document.body.classList.toggle("design-card-tile", design.cardMode === "tile");
    document.body.classList.toggle("design-card-row", design.cardMode === "row" || design.cardMode === "minimal");
  }

  return {
    afterInit(appApi) {
      api = appApi;
      const design = typeof getDesignVariant === "function" ? getDesignVariant() : null;
      if (!design) return;
      applyLayoutClass(design);
      mountPrimary(design);
      appApi.onRefresh = () => mountPrimary(design);
    },
    remount() {
      const design = typeof getDesignVariant === "function" ? getDesignVariant() : null;
      if (design) mountPrimary(design);
    },
  };
})();

if (typeof window !== "undefined") {
  window.DesignEngine = DesignEngine;
}
