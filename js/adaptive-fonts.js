/**
 * 全站自适应字号 — 发现页与子页共用
 */
(function () {
  const LOC_PILL_FONT_MIN = 10;
  const LOC_PILL_FONT_MAX = 13;
  const NAV_BRAND_FONT_MIN = 13.5;
  const NAV_BRAND_FONT_MAX = 16.8;
  const DETAIL_TITLE_FONT_MIN = 14;
  const DETAIL_TITLE_FONT_MAX = 18;
  const SHEET_ACTION_FONT_MIN = 11;
  const SHEET_ACTION_FONT_MAX = 16;

  const registered = [];

  function fitElementFontSize(el, maxWidth, minPx, maxPx) {
    if (!el || maxWidth <= 0) return maxPx;
    let lo = minPx;
    let hi = maxPx;
    let best = minPx;
    const prevSize = el.style.fontSize;
    const prevWhiteSpace = el.style.whiteSpace;
    el.style.whiteSpace = "nowrap";
    while (hi - lo > 0.25) {
      const mid = (lo + hi) / 2;
      el.style.fontSize = `${mid}px`;
      if (el.scrollWidth <= maxWidth) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    el.style.fontSize = prevSize;
    el.style.whiteSpace = prevWhiteSpace;
    return best;
  }

  function syncLocPillFonts() {
    document.querySelectorAll(".loc-pill").forEach((pill) => {
      if (getComputedStyle(pill).display === "none" || pill.clientWidth <= 0) return;
      const cityEl = pill.querySelector(".loc-pill-city");
      if (!cityEl) return;
      const style = getComputedStyle(pill);
      const iconW = pill.querySelector(".loc-pill-icon")?.offsetWidth || 0;
      const caretW = pill.querySelector(".loc-pill-caret")?.offsetWidth || 0;
      const padX =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + iconW + caretW + 8;
      const px = fitElementFontSize(cityEl, pill.clientWidth - padX, LOC_PILL_FONT_MIN, LOC_PILL_FONT_MAX);
      pill.style.setProperty("--loc-pill-font-size", `${px}px`);
    });
  }

  function syncNavBrandFont() {
    const row = document.querySelector(".glass-nav__row");
    const brand = row?.querySelector(".nav-brand-mini");
    if (!brand || getComputedStyle(brand).display === "none" || !row?.clientWidth) return;
    const pillW = row.querySelector(".loc-pill")?.offsetWidth || 0;
    const gap = parseFloat(getComputedStyle(row).gap) || 10;
    const avail = row.clientWidth - pillW - gap - 4;
    if (avail <= 0) return;
    const px = fitElementFontSize(brand, avail, NAV_BRAND_FONT_MIN, NAV_BRAND_FONT_MAX);
    brand.style.setProperty("--nav-brand-font-size", `${px}px`);
  }

  function syncSheetActionFonts(root) {
    if (!root) return;
    root.querySelectorAll(".btn-primary, .btn-secondary, .btn-outline, .btn-locate").forEach((btn) => {
      if (btn.clientWidth <= 0) return;
      const padX = btn.classList.contains("btn-locate") ? 16 : 24;
      const px = fitElementFontSize(btn, btn.clientWidth - padX, SHEET_ACTION_FONT_MIN, SHEET_ACTION_FONT_MAX);
      btn.style.setProperty("--sheet-action-font-size", `${px}px`);
    });
  }

  function syncDetailSheetFonts() {
    const modal = document.getElementById("detailModal");
    if (!modal || modal.hidden) return;
    const title = document.getElementById("modalTitle");
    const header = modal.querySelector(".modal-header");
    if (title && header?.clientWidth) {
      const closeW = modal.querySelector(".modal-close")?.offsetWidth || 40;
      const px = fitElementFontSize(title, header.clientWidth - closeW - 28, DETAIL_TITLE_FONT_MIN, DETAIL_TITLE_FONT_MAX);
      title.style.setProperty("--detail-title-font-size", `${px}px`);
    }
    syncSheetActionFonts(modal.querySelector(".modal-footer"));
  }

  function syncFilterDropFooters() {
    document.querySelectorAll(".filter-drop-footer, .sheet-footer").forEach((footer) => {
      if (footer.closest("[hidden]")) return;
      syncSheetActionFonts(footer);
    });
  }

  function syncFeedbackSheetFonts() {
    const modal = document.getElementById("feedbackModal");
    if (!modal) return;
    syncSheetActionFonts(modal.querySelector(".modal-footer, .feedback-form-footer"));
    syncSheetActionFonts(modal.querySelector(".feedback-actions"));
  }

  function syncEmptyStateFonts() {
    const empty = document.getElementById("emptyState");
    if (!empty || empty.hidden) return;
    syncSheetActionFonts(empty);
  }

  function syncAdaptiveFonts() {
    syncLocPillFonts();
    syncNavBrandFont();
    syncDetailSheetFonts();
    syncFilterDropFooters();
    syncFeedbackSheetFonts();
    syncEmptyStateFonts();
    registered.forEach((fn) => {
      try {
        fn();
      } catch (_) {
        /* ignore optional syncers */
      }
    });
  }

  function scheduleAdaptiveFonts() {
    syncAdaptiveFonts();
    window.requestAnimationFrame(() => syncAdaptiveFonts());
  }

  let resizeTimer;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(scheduleAdaptiveFonts, 120);
  }

  window.AdaptiveFonts = {
    fitElementFontSize,
    syncSheetActionFonts,
    register(fn) {
      if (typeof fn === "function") registered.push(fn);
    },
    sync: syncAdaptiveFonts,
    schedule: scheduleAdaptiveFonts,
  };

  window.addEventListener("resize", onResize);
})();
