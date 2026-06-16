/**
 * 场景 / 工具等静态子页面渲染
 */
(function () {
  const PAGE = document.body.dataset.page;

  function track(name, props) {
    if (typeof window.trackEvent === "function") window.trackEvent(name, props);
  }

  function mapLink(category, search) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("q", search);
    const qs = params.toString();
    return qs ? `index.html?${qs}` : "index.html";
  }

  function renderGuide() {
    const el = document.getElementById("guideGrid");
    if (!el || typeof SCENE_GUIDES === "undefined") return;
    el.innerHTML = SCENE_GUIDES.map((g) => {
      const href = g.category ? mapLink(g.category, g.search) : "index.html";
      const cta = g.category
        ? `<a href="${href}" class="guide-card-action">去查点位 →</a>`
        : `<a href="index.html" class="guide-card-action">打开地图 →</a>`;
      return `
        <article class="guide-card">
          <h4>${g.need}</h4>
          <div class="pick">👉 ${g.pick}</div>
          <div class="alt">备选：${g.alt}</div>
          ${cta}
        </article>
      `;
    }).join("");
    el.querySelectorAll(".guide-card-action").forEach((a) => {
      a.addEventListener("click", () => track("guide_to_map", { href: a.getAttribute("href") }));
    });
  }

  function toolCardHtml(t) {
    const scope = t.scope || "全省";
    return `
      <a href="${t.url}" target="_blank" rel="noopener" class="tool-card" data-tool="${t.name}" data-scope="${scope}">
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
        <span class="tool-tag">${t.tag || scope}</span>
      </a>
    `;
  }

  function renderTools() {
    const el = document.getElementById("toolsGrid");
    if (!el || typeof EXTERNAL_TOOLS === "undefined") return;

    const scopes = ["全省"];
    if (typeof CITIES !== "undefined") {
      CITIES.forEach((c) => {
        if (c !== "全部" && c !== "全省" && !scopes.includes(c)) scopes.push(c);
      });
    }

    const sections = scopes
      .map((scope) => ({
        scope,
        tools: EXTERNAL_TOOLS.filter((t) => (t.scope || "全省") === scope),
      }))
      .filter((s) => s.tools.length);

    el.innerHTML = sections
      .map(
        (s) => `
        <section class="tools-section">
          <h3 class="tools-section-title">${s.scope === "全省" ? "全省通用" : s.scope}</h3>
          <div class="tools-section-grid">
            ${s.tools.map(toolCardHtml).join("")}
          </div>
        </section>
      `
      )
      .join("");

    el.querySelectorAll(".tool-card").forEach((a) => {
      a.addEventListener("click", () =>
        track("tool_click", { tool: a.dataset.tool, scope: a.dataset.scope })
      );
    });
  }

  function init() {
    if (PAGE === "guide") renderGuide();
    if (PAGE === "tools") renderTools();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
