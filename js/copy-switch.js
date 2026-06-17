/**
 * 文案变体 DOM 注入 — 需在 site-config.js 之后加载
 */
(function () {
  function applyCopyVariant() {
    const id = document.documentElement.dataset.copy;
    if (!id || typeof COPY_VARIANTS === "undefined") return;
    const v = COPY_VARIANTS[id];
    if (!v) return;

    if (typeof SITE_CONFIG !== "undefined") {
      SITE_CONFIG.siteBrandName = v.brand.name;
      SITE_CONFIG.siteTagline = v.brand.tagline;
    }

    document.body.classList.add("has-copy-variant", `copy--${id}`);

    document.querySelectorAll(".brand-icon").forEach((el) => {
      el.textContent = v.brand.icon;
    });
    document.querySelectorAll(".brand-text h1").forEach((el) => {
      el.textContent = v.brand.name;
    });
    document.querySelectorAll(".nav-brand-mini").forEach((el) => {
      el.textContent = v.brand.navMini || v.brand.name;
    });

    const badge = document.getElementById("heroBadge");
    if (badge) {
      if (v.hero.badge) {
        badge.textContent = v.hero.badge;
        badge.hidden = false;
      } else {
        badge.hidden = true;
      }
    }

    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.innerHTML = v.hero.titleHtml;
    const heroSub = document.getElementById("heroSub");
    if (heroSub) heroSub.textContent = v.hero.sub;

    const search = document.getElementById("searchInput");
    if (search) search.placeholder = v.searchPlaceholder;

    const contentTitle = document.getElementById("contentTitle");
    if (contentTitle) contentTitle.textContent = v.contentTitle.default;

    const emptyP = document.querySelector("#emptyState p");
    if (emptyP) emptyP.textContent = v.emptyText;

    document.querySelectorAll(".site-footer p").forEach((el) => {
      el.textContent = v.footer;
    });

    const discoverTab = document.querySelector('.bottom-nav-item[data-nav-page="map"] span:last-child');
    if (discoverTab) discoverTab.textContent = v.tabDiscover;

    if (v.meta?.title) document.title = v.meta.title;
    if (v.meta?.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = v.meta.description;
    }

    window.__COPY_ONBOARD__ = v.onboard;
    window.__COPY_CONTENT_TITLE__ = v.contentTitle;
    window.__COPY_EMPTY__ = v.emptyText;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCopyVariant);
  } else {
    applyCopyVariant();
  }
})();
