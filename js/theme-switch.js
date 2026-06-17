/**
 * 主题切换 — URL ?theme=v01 或 localStorage themeLab
 */
(function () {
  const VALID = /^v(0[1-9]|10)$/;
  const params = new URLSearchParams(location.search);
  let theme = params.get("theme");
  if (!theme && document.documentElement.dataset.theme) {
    theme = document.documentElement.dataset.theme;
  }
  if (!theme) theme = localStorage.getItem("themeLab") || "v01";
  if (!VALID.test(theme)) theme = "v01";

  document.documentElement.dataset.theme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    fetch(`css/themes/themes.json?v=58`)
      .then((r) => r.json())
      .then((data) => {
        const t = data.themes.find((x) => x.id === theme);
        if (t?.colors?.themeColor) meta.content = t.colors.themeColor;
      })
      .catch(() => {});
  }

  if (params.get("theme")) {
    localStorage.setItem("themeLab", theme);
  }

  window.__applyThemeFont = function applyThemeFont(url) {
    if (!url || url === "none") return;
    const id = "theme-font-link";
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== url) link.href = url;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const style = getComputedStyle(document.documentElement);
    const fontUrl = style.getPropertyValue("--theme-font-url").trim().replace(/^["']|["']$/g, "");
    if (fontUrl && fontUrl !== "none") window.__applyThemeFont(fontUrl);
  });
})();
