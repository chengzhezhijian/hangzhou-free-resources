/**
 * 全站品牌壳层 — 首页与子页共用同一 site-header / glass-nav HTML
 */
(function () {
  const BRAND_NAME = "全国惠民地图";
  const TAGLINE = "政府免费便民 · 搜完即走";

  /** 与 index.html 一致的 CSS 加载顺序（head 内） */
  const CSS_CHAIN = [
    "css/style.css",
    "css/design-system.css",
    "css/themes/variants.css",
    "css/copy-variants.css",
    "css/design-layouts.css",
    "css/premium-ui.css",
  ];

  const HEAD_SCRIPTS = ["js/theme-switch.js", "js/design-variants.js", "js/copy-variants.js"];

  function cityPillHtml(btnId, valueId, extraClass, hiddenAttrs) {
    const extra = extraClass ? ` ${extraClass}` : "";
    const attrs = hiddenAttrs || "";
    return `<button type="button" class="loc-pill${extra}" id="${btnId}" aria-haspopup="dialog" aria-label="选择城市"${attrs}>
          <span class="loc-pill-icon" aria-hidden="true">📍</span>
          <span class="loc-pill-city" id="${valueId}">选择城市</span>
          <span class="loc-pill-caret" aria-hidden="true">▾</span>
        </button>`;
  }

  /** 与 index.html glass-nav__row 字节级一致 */
  function glassNavRowHtml(brandName, opts) {
    const options = opts || {};
    const hidden = options.cityHidden ? ' tabindex="-1" aria-hidden="true"' : "";
    return `<div class="glass-nav__row">
        ${cityPillHtml("cityQuickBtn", "cityQuickValue", "", hidden)}
        <a href="index.html" class="glass-nav__brand" id="glassNavBrand">
          <span class="brand-mark" aria-hidden="true">惠</span>
          <span class="nav-brand-mini">${brandName}</span>
        </a>
      </div>`;
  }

  function glassNavHtml(brandName, opts) {
    return `<header class="glass-nav">${glassNavRowHtml(brandName, opts)}</header>`;
  }

  /** 与 index.html site-header 内 header-inner 字节级一致 */
  function siteHeaderInnerHtml(opts) {
    const options = opts || {};
    const desktopHidden = options.subpage ? ' tabindex="-1" aria-hidden="true"' : "";
    return `<div class="header-inner">
      <div class="header-leading">
        ${cityPillHtml("cityQuickBtnDesktop", "cityQuickValueDesktop", "loc-pill--header", desktopHidden)}
        <a href="index.html" class="brand" id="brandHome">
          <span class="brand-mark brand-icon" aria-hidden="true">惠</span>
          <div class="brand-text">
            <h1>${BRAND_NAME}</h1>
            <p class="brand-sub">${TAGLINE}</p>
          </div>
        </a>
      </div>
      <nav class="header-nav" aria-label="桌面导航">
        <a href="index.html" data-nav-page="map">发现</a>
        <a href="guide.html" data-nav-page="guide">场景</a>
        <a href="tools.html" data-nav-page="tools">工具</a>
        <a href="about.html" data-nav-page="about">说明</a>
        <a href="feedback.html" data-nav-page="feedback">反馈</a>
      </nav>
    </div>`;
  }

  window.BrandShell = {
    BRAND_NAME,
    TAGLINE,
    CSS_CHAIN,
    HEAD_SCRIPTS,
    cityPillHtml,
    glassNavRowHtml,
    glassNavHtml,
    siteHeaderInnerHtml,
  };
})();
