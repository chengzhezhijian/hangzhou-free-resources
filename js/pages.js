/**
 * 场景 / 工具 / 说明等静态子页面渲染（文案与统计随 RESOURCES 动态适配）
 */
(function () {
  const PAGE = document.body.dataset.page;

  function stats() {
    return typeof SiteStats !== "undefined" ? SiteStats.compute() : null;
  }

  function track(name, props) {
    if (typeof window.trackEvent === "function") window.trackEvent(name, props);
  }

  function mapLink(category, search) {
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (search) params.set("q", search);
    const qs = params.toString();
    return qs ? `index.html?${qs}` : "index.html";
  }

  function countBadge(n) {
    if (n == null || n <= 0) return "";
    const s = typeof SiteStats !== "undefined" ? SiteStats.formatCount(n) : String(n);
    return `<span class="guide-card-count">${s} 处可查</span>`;
  }

  function renderGuide() {
    const el = document.getElementById("guideGrid");
    if (!el || typeof SCENE_GUIDES === "undefined") return;
    const st = stats();
    el.innerHTML = SCENE_GUIDES.map((g, i) => {
      const href = g.category ? mapLink(g.category, g.search) : "index.html";
      const cta = g.category
        ? `<a href="${href}" class="guide-card-action">去查点位 →</a>`
        : `<a href="index.html" class="guide-card-action">打开地图 →</a>`;
      const n = st?.guideCounts?.[i]?.count;
      return `
        <article class="guide-card">
          <div class="guide-card-head">
            <h4>${g.need}</h4>
            ${countBadge(n)}
          </div>
          <div class="pick">👉 ${g.pick}</div>
          <div class="alt">备选：${g.alt}</div>
          ${cta}
        </article>
      `;
    }).join("");
    el.querySelectorAll(".guide-card-action").forEach((a) => {
      a.addEventListener("click", () => track("guide_to_map", { href: a.getAttribute("href") }));
    });

    const desc = document.getElementById("guidePageDesc");
    if (desc && st) {
      desc.textContent = `先选城市，点「去查点位」直达首页筛选。${st.cityCount} 城均可查，杭州 ${st.hangzhou}+ 条细录最全。`;
    }

    const chips = document.getElementById("guideSceneChips");
    if (chips && st?.sceneCounts?.length) {
      chips.innerHTML = st.sceneCounts
        .map(
          (s) =>
            `<a href="${mapLink(s.category, s.search)}" class="guide-scene-chip">${s.label}<em>${SiteStats.formatCount(s.count)}</em></a>`
        )
        .join("");
    }
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

  const SITE_CAPABILITIES = [
    {
      name: "地图导航",
      desc: "详情页一键跳转高德，步行/驾车路线即查",
      href: "index.html",
      tag: "站内",
    },
    {
      name: "距离排序",
      desc: "授权定位后按近→远排列，优先看身边资源",
      href: "index.html",
      tag: "站内",
    },
    {
      name: "城市筛选",
      desc: "左上角选城或定位，列表仅展示当地 + 全省工具",
      href: "index.html",
      tag: "站内",
    },
    {
      name: "场景 / 类型 / 设施",
      desc: "遛娃、自习、纳凉等场景标签 + 6 项设施筛选",
      href: "index.html",
      tag: "站内",
    },
  ];

  function renderTools() {
    const el = document.getElementById("toolsGrid");
    if (!el || typeof EXTERNAL_TOOLS === "undefined") return;
    const st = stats();

    const desc = document.getElementById("toolsPageDesc");
    if (desc && st) {
      desc.textContent = `地图收录 ${st.formatCount(st.total)} 代表点位；公厕、书房等海量动态数据请跳转下方 ${st.externalToolCount} 个官方平台。`;
    }

    const scopes = ["全国", "全省"];
    if (typeof CITIES !== "undefined") {
      CITIES.forEach((c) => {
        if (c !== "全部" && c !== "全省" && c !== "全国" && !scopes.includes(c)) scopes.push(c);
      });
    }

    const externalSections = scopes
      .map((scope) => ({
        scope,
        tools: EXTERNAL_TOOLS.filter((t) => (t.scope || "全国") === scope),
      }))
      .filter((s) => s.tools.length);

    const capabilitySection = `
      <section class="tools-section tools-section--site">
        <h3 class="tools-section-title">站内能力</h3>
        <p class="tools-section-desc">无需跳转，在发现页即可使用</p>
        <div class="tools-section-grid">
          ${SITE_CAPABILITIES.map(
            (c) => `
            <a href="${c.href}" class="tool-card tool-card--site">
              <h4>${c.name}</h4>
              <p>${c.desc}</p>
              <span class="tool-tag">${c.tag}</span>
            </a>`
          ).join("")}
        </div>
      </section>`;

    el.innerHTML =
      capabilitySection +
      externalSections
        .map(
          (s) => `
        <section class="tools-section">
          <h3 class="tools-section-title">${s.scope === "全国" ? "全国通用" : s.scope === "全省" ? "浙江省" : s.scope}</h3>
          <div class="tools-section-grid">
            ${s.tools.map(toolCardHtml).join("")}
          </div>
        </section>
      `
        )
        .join("");

    el.querySelectorAll(".tool-card[data-tool]").forEach((a) => {
      a.addEventListener("click", () =>
        track("tool_click", { tool: a.dataset.tool, scope: a.dataset.scope })
      );
    });
  }

  function renderAbout() {
    const st = stats();
    if (!st) return;

    const desc = document.getElementById("aboutPageDesc");
    if (desc) {
      desc.textContent = `全国 ${st.cityCount} 城政府免费场地：自习、纳凉、WiFi、饮水、充电、政务办事。首页点场景标签或设施筛选即搜。`;
    }

    const grid = document.getElementById("aboutGrid");
    if (grid) {
      const perkCards = st.perkStats
        .map(
          (p) => `
        <div class="about-card about-card--highlight">
          <h4>${p.label}</h4>
          <p>全国 ${SiteStats.formatCount(p.count)} 处标注「${p.short}」。首页点同名标签或场景「${p.short === "WiFi" ? "免费自习" : p.short === "空调" ? "纳凉" : p.short}」即可筛选。</p>
        </div>`
        )
        .join("");

      const categoryLines = st.topCategories
        .map((c) => `${c.label} ${SiteStats.formatCount(c.count)}`)
        .join(" · ");

      grid.innerHTML =
        perkCards +
        `
        <div class="about-card">
          <h4>📍 覆盖范围</h4>
          <p>${st.coverageLine}。浙江 11 地市细录 + 全国 ${st.cityCount - st.zjCount}+ 城代表点位与官方查询入口。</p>
        </div>
        <div class="about-card">
          <h4>🗺 怎么用</h4>
          <p>① 左上角选城市或开启定位 → ② 点场景标签（遛娃 / 自习 / 纳凉…）或类型 / 设施筛选 → ③ 卡片详情里高德导航。支持综合 / 距离 / 评分排序。</p>
        </div>
        <div class="about-card">
          <h4>📋 数据来源</h4>
          <p>政府公开信息、各地政务平台与官方地图整理。${categoryLines} 等 ${(typeof RESOURCE_CATEGORIES !== "undefined" ? RESOURCE_CATEGORIES : []).filter((c) => c.id !== "all").length} 类资源持续扩充中。</p>
        </div>
        <div class="about-card">
          <h4>数据说明</h4>
          <p>共 ${st.total.toLocaleString("zh-CN")} 条：杭州 ${st.hangzhou}+ 细录，其他 ${st.cityCount - 1} 城为代表点位 + 官方查询工具。海量动态数据请用「工具」页当地政务平台。</p>
        </div>
        <div class="about-card">
          <h4>免责声明</h4>
          <p>信息来源于政府公开资料，设施以场馆当日公告为准，出行前请核实。</p>
        </div>`;
    }

    const footer = document.getElementById("aboutFooter");
    if (footer) {
      const d = new Date();
      const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      footer.textContent = `数据整理：${date} · 全国版 · ${st.formatCount(st.total)} 条 / ${st.cityCount} 城`;
    }
  }

  function renderFeedback() {
    const st = stats();
    const desc = document.getElementById("feedbackPageDesc");
    if (desc && st) {
      desc.textContent = `你的一条反馈，能帮到下一个在 ${st.cityCount} 城找免费资源的人`;
    }
    const channels = document.getElementById("feedbackChannels");
    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    if (channels) {
      const items = [];
      if (cfg.feedbackUrl) {
        items.push(
          `<a href="${cfg.feedbackUrl}" target="_blank" rel="noopener" class="feedback-channel-card">
            <strong>腾讯问卷</strong>
            <span>30 秒提交纠错，推荐</span>
          </a>`
        );
      }
      items.push(
        `<button type="button" class="feedback-channel-card feedback-channel-card--alt" id="feedbackFormOpen">
          <strong>页内表单</strong>
          <span>填写类型与内容，可复制发送</span>
        </button>`
      );
      channels.innerHTML = items.join("");
    }
  }

  function init() {
    if (PAGE === "guide") renderGuide();
    if (PAGE === "tools") renderTools();
    if (PAGE === "about") renderAbout();
    if (PAGE === "feedback") renderFeedback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
