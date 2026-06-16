/**
 * Premium 交互层 — 滚动紧凑、URL 同步、轻反馈、列表动效
 */
(function () {
  if (!document.body.classList.contains("app-ui")) return;

  function hapticLight() {
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
  }

  function initScrollCompact() {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.body.classList.toggle("is-scrolled", window.scrollY > 72);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function buildShareUrl(state) {
    if (typeof CITIES === "undefined") return location.pathname;
    const params = new URLSearchParams();
    if (state.city && state.city !== "全部") params.set("city", state.city);
    if (state.category && state.category !== "all") params.set("category", state.category);
    if (state.search) params.set("q", state.search);
    if (state.freeOnly) params.set("free", "1");
    const qs = params.toString();
    return qs ? `${location.pathname}?${qs}` : location.pathname;
  }

  window.syncPremiumUrl = function syncPremiumUrl(appState) {
    if (!appState || !history.replaceState) return;
    const url = buildShareUrl(appState);
    history.replaceState(null, "", url);
  };

  function initSearchDebounce() {
    const input = document.getElementById("searchInput");
    const box = input?.closest(".search-box");
    if (!input || !box) return;

    let timer;
    input.addEventListener("input", () => {
      box.classList.add("is-loading");
      clearTimeout(timer);
      timer = window.setTimeout(() => box.classList.remove("is-loading"), 280);
    });
  }

  function initChipHaptics() {
    document.addEventListener(
      "click",
      (e) => {
        const t = e.target.closest(".value-perk, .quick-scene, .sort-tab, .city-pill, .page-btn");
        if (t) hapticLight();
      },
      { passive: true }
    );
  }

  window.animateResultCount = function animateResultCount() {
    const el = document.getElementById("resultCount");
    if (!el) return;
    el.classList.remove("is-updated");
    void el.offsetWidth;
    el.classList.add("is-updated");
  };

  window.showCardSkeletons = function showCardSkeletons(count) {
    const grid = document.getElementById("cardGrid");
    if (!grid) return;
    const n = Math.min(count || 4, 6);
    grid.innerHTML = Array.from({ length: n }, () => '<div class="card-skeleton" aria-hidden="true"></div>').join("");
  };

  window.markCardsEnter = function markCardsEnter() {
    document.querySelectorAll("#cardGrid .card-premium").forEach((el, i) => {
      el.classList.add("card-enter");
      el.style.animationDelay = `${Math.min(i * 0.03, 0.24)}s`;
    });
  };

  function init() {
    initScrollCompact();
    initSearchDebounce();
    initChipHaptics();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
