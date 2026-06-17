/**
 * 整站设计引擎 — 淘宝/美团单行筛选栏
 */
const DesignEngine = (function () {
  let api = null;

  const SORT_LABELS = {
    comprehensive: "综合排序",
    distance: "距离最近",
    rating: "评分最高",
  };

  function sortLabel() {
    return api.sortModeLabel?.() || SORT_LABELS[api.state.sortMode] || "综合排序";
  }

  function chip(cls, label, active, attrs = "") {
    return `<button type="button" class="ft-chip ${cls}${active ? " is-active" : ""}" ${attrs}>${label}</button>`;
  }

  function divider() {
    return `<span class="ft-divider" aria-hidden="true"></span>`;
  }

  function sortChips() {
    const geo = !api.state.userLocation && api.state.sortMode === "distance";
    return (
      `<button type="button" class="ft-chip ft-chip--sort-trigger${geo ? " ft-chip--geo" : ""}" id="sortTriggerBtn" aria-haspopup="listbox" aria-expanded="false">${sortLabel()}<span class="ft-caret" aria-hidden="true">▾</span></button>` +
      `<button type="button" class="ft-chip ft-chip--filter" id="filterOpenBtn">${api.filterBadgeHtml()}</button>`
    );
  }

  function perkChips() {
    return (api.VALUE_PERKS || [])
      .map((p) =>
        chip(
          "ft-chip--perk",
          p.short || p.label,
          api.state.facilities.has(p.facility),
          `data-facility="${p.facility}"`
        )
      )
      .join("");
  }

  function sceneChips() {
    return (api.QUICK_SCENES || [])
      .map((s) =>
        chip(
          "ft-chip--scene",
          s.label.replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+/, ""),
          api.isSceneActive(s),
          `data-scene="${s.category}|${s.search || ""}"`
        )
      )
      .join("");
  }

  function groupChips() {
    const groups = [{ id: "all", label: "全部" }, ...api.CATEGORY_GROUPS.filter((g) => g.id !== "all")];
    return groups
      .map((g) => chip("ft-chip--group", g.label, api.state.group === g.id, `data-group="${g.id}"`))
      .join("");
  }

  function categoryChips() {
    const cats = [{ id: "all", label: "全部" }, ...api.visibleCategories().filter((c) => c.id !== "all").slice(0, 8)];
    return cats
      .map((c) =>
        chip("ft-chip--cat", `${c.icon || ""} ${c.label}`.trim(), api.state.category === c.id, `data-cat="${c.id}"`)
      )
      .join("");
  }

  function facilityChips() {
    return (api.FACILITY_FILTERS || [])
      .map((f) =>
        chip(
          "ft-chip--fac",
          f.label.replace(/免费|有|可/g, ""),
          api.state.facilities.has(f.id),
          `data-facility="${f.id}"`
        )
      )
      .join("");
  }

  function mergedChips() {
    const cats = api.visibleCategories().slice(0, 5);
    const facs = (api.FACILITY_FILTERS || []).slice(0, 4);
    return (
      cats.map((c) => chip("ft-chip--cat", c.label, api.state.category === c.id, `data-cat="${c.id}"`)).join("") +
      facs
        .map((f) =>
          chip("ft-chip--fac", f.label.slice(0, 4), api.state.facilities.has(f.id), `data-facility="${f.id}"`)
        )
        .join("")
    );
  }

  function guideRow() {
    const step = api.wizardStep();
    let row =
      chip("ft-chip--step", "①城市", step === 1, "") +
      chip("ft-chip--step", "②场景", step === 2, "") +
      chip("ft-chip--step", "③结果", step === 3, "");
    if (step === 2) row += sceneChips();
    else row += sortChips();
    return row;
  }

  function buildRow(mode) {
    switch (mode) {
      case "standard":
        return perkChips() + divider() + sceneChips() + divider() + sortChips();
      case "scenes-sort":
        return sceneChips() + divider() + sortChips();
      case "scenes-perks":
        return sceneChips() + perkChips() + divider() + sortChips();
      case "categories":
        return categoryChips() + divider() + sortChips();
      case "categories-perks":
        return categoryChips() + perkChips() + divider() + sortChips();
      case "facilities":
        return facilityChips() + divider() + sortChips();
      case "nearby":
        return chip("ft-chip--locate", "📍", false, 'id="designLocateBtn"') + perkChips() + divider() + sortChips();
      case "groups":
        return groupChips() + divider() + sortChips();
      case "merged":
        return mergedChips() + divider() + sortChips();
      case "guide":
        return guideRow();
      default:
        return perkChips() + divider() + sceneChips() + divider() + sortChips();
    }
  }

  function bindToolbar(root) {
    root.querySelectorAll(".ft-chip--perk[data-facility], .ft-chip--fac[data-facility]").forEach((btn) => {
      btn.addEventListener("click", () => api.toggleFacility(btn.dataset.facility));
    });
    root.querySelectorAll("[data-scene]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [cat, q] = btn.dataset.scene.split("|");
        api.applyQuickScene({ category: cat, search: q });
      });
    });
    root.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => api.setCategory(btn.dataset.cat));
    });
    root.querySelectorAll("[data-group]").forEach((btn) => {
      btn.addEventListener("click", () => api.setGroup(btn.dataset.group));
    });
    root.querySelector("#sortTriggerBtn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      api.toggleSortDropdown?.();
    });
    document.getElementById("designLocateBtn")?.addEventListener("click", () => api.runGeoLocate?.(true));
    root.querySelector("#filterOpenBtn")?.addEventListener("click", () => api.openFilterSheet?.());
  }

  function mountFilterRow(design) {
    const el = document.getElementById("filterToolbar");
    if (!el || !design || !api) return;
    el.innerHTML = `<div class="filter-toolbar__scroll">${buildRow(design.filterRow)}</div>`;
    bindToolbar(el);
  }

  function applyLayoutClass(design) {
    if (!design) return;
    document.body.classList.add("has-design-variant", "filter-toolbar-layout", `design--${design.id}`);
    const L = design.layout || {};
    document.body.classList.toggle("design-hide-hero", L.heroMode === "none");
    document.body.classList.toggle("design-content-count-only", L.contentHeader === "count");
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
      mountFilterRow(design);
      appApi.onRefresh = () => mountFilterRow(design);
    },
    remount() {
      const design = typeof getDesignVariant === "function" ? getDesignVariant() : null;
      if (design) mountFilterRow(design);
    },
  };
})();

if (typeof window !== "undefined") {
  window.DesignEngine = DesignEngine;
}
