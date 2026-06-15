(function () {
  const PAGE_SIZE = 48;

  function track(name, props) {
    if (typeof window.trackEvent === "function") window.trackEvent(name, props);
  }

  function applyUrlParams() {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const q = params.get("q");
    const group = params.get("group");
    if (group) state.group = group;
    if (category) state.category = category;
    if (q) {
      state.search = q;
      const input = document.getElementById("searchInput");
      if (input) input.value = q;
      const clear = document.getElementById("searchClear");
      if (clear) clear.hidden = !q;
    }
    if (params.get("free") === "1") state.freeOnly = true;
    if (params.toString()) {
      track("landing_params", Object.fromEntries(params.entries()));
    }
  }

  const state = {
    group: "all",
    category: "all",
    subType: "all",
    facilities: new Set(),
    district: "全部",
    search: "",
    featuredOnly: false,
    freeOnly: false,
    yearRoundOnly: false,
    page: 1,
  };

  const CATEGORY_LABELS = Object.fromEntries(
    RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
  );

  const CATEGORY_TO_GROUP = Object.fromEntries(
    RESOURCE_CATEGORIES.filter((c) => c.group).map((c) => [c.id, c.group])
  );

  const FACILITY_LABELS = {
    wifi: "WiFi",
    water: "饮水",
    ac: "空调",
    study: "自习",
    charge: "充电",
    open24: "24h",
  };

  function hasFacility(resource, facilityId) {
    const val = resource.facilities[facilityId];
    return val === true || val === "partial";
  }

  function facilityClass(resource, facilityId) {
    const val = resource.facilities[facilityId];
    if (val === true) return "on";
    if (val === "partial") return "partial";
    return "";
  }

  function visibleCategories() {
    if (state.group === "all") return RESOURCE_CATEGORIES;
    return RESOURCE_CATEGORIES.filter(
      (c) => c.id === "all" || c.group === state.group
    );
  }

  function filterResources() {
    return RESOURCES.filter((r) => {
      if (state.category !== "all" && r.category !== state.category) return false;
      if (state.category === "all" && state.group !== "all") {
        const g = CATEGORY_TO_GROUP[r.category];
        if (g !== state.group) return false;
      }
      if (state.category === "reading" && state.subType !== "all" && r.subType !== state.subType) return false;
      if (state.district !== "全部" && r.district !== state.district && r.district !== "杭州") return false;
      if (state.featuredOnly && !r.featured) return false;
      if (state.freeOnly && r.costType && r.costType !== "free") return false;
      if (state.yearRoundOnly && r.seasonal) return false;
      for (const f of state.facilities) {
        if (!hasFacility(r, f)) return false;
      }
      if (state.search) {
        const q = state.search.toLowerCase();
        const hay = [
          r.name,
          r.fullName,
          r.subType,
          r.address,
          r.district,
          r.transport,
          r.note,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function countByCategory() {
    const filtered = state.group === "all"
      ? RESOURCES
      : RESOURCES.filter((r) => CATEGORY_TO_GROUP[r.category] === state.group);
    const counts = {};
    RESOURCE_CATEGORIES.forEach((c) => {
      if (state.group !== "all" && c.id !== "all" && c.group !== state.group) {
        counts[c.id] = 0;
        return;
      }
      counts[c.id] =
        c.id === "all"
          ? filtered.length
          : RESOURCES.filter((r) => r.category === c.id).length;
    });
    return counts;
  }

  function renderHeroStats() {
    const counts = countByCategory();
    const el = document.getElementById("heroStats");
    const items = [
      { n: counts.reading || 0, label: "城市书房" },
      { n: counts.parking || 0, label: "停车" },
      { n: counts.park || 0, label: "公园" },
      { n: counts.sports || 0, label: "体育" },
      { n: RESOURCES.length, label: "总收录" },
    ];
    el.innerHTML = items
      .map(
        (i) =>
          `<div class="stat-item"><strong>${i.n}</strong><span>${i.label}</span></div>`
      )
      .join("");
  }

  function updateSubTypeVisibility() {
    const block = document.getElementById("subTypeBlock");
    block.hidden = state.category !== "reading";
  }

  function renderGroupFilter() {
    const sel = document.getElementById("groupFilter");
    sel.innerHTML = CATEGORY_GROUPS.map(
      (g) =>
        `<option value="${g.id}" ${state.group === g.id ? "selected" : ""}>${g.label}</option>`
    ).join("");
    sel.onchange = () => {
      state.group = sel.value;
      state.category = "all";
      state.page = 1;
      track("filter_change", { field: "group", value: state.group });
      renderCategoryFilters();
      updateSubTypeVisibility();
      renderCards();
    };
  }

  function renderSubTypeFilter() {
    const sel = document.getElementById("subTypeFilter");
    sel.innerHTML = READING_SUBTYPES.map(
      (s) =>
        `<option value="${s.id}" ${state.subType === s.id ? "selected" : ""}>${s.label}</option>`
    ).join("");
    sel.onchange = () => {
      state.subType = sel.value;
      state.page = 1;
      renderCards();
    };
    updateSubTypeVisibility();
  }

  function renderCategoryFilters() {
    const el = document.getElementById("categoryFilters");
    const counts = countByCategory();
    const cats = visibleCategories();
    el.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" class="chip ${state.category === c.id ? "active" : ""}" data-category="${c.id}">
          ${c.icon} ${c.label} <span style="opacity:0.7">(${counts[c.id] || 0})</span>
        </button>`
      )
      .join("");
    el.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        state.page = 1;
        track("filter_change", { field: "category", value: state.category });
        renderCategoryFilters();
        updateSubTypeVisibility();
        renderCards();
      });
    });
  }

  function renderFacilityFilters() {
    const el = document.getElementById("facilityFilters");
    el.innerHTML = FACILITY_FILTERS.map(
      (f) =>
        `<button type="button" class="chip chip-sm ${state.facilities.has(f.id) ? "active" : ""}" data-facility="${f.id}">${f.label}</button>`
    ).join("");
    el.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.facility;
        if (state.facilities.has(id)) state.facilities.delete(id);
        else state.facilities.add(id);
        state.page = 1;
        renderFacilityFilters();
        renderCards();
      });
    });
  }

  function renderDistrictFilter() {
    const sel = document.getElementById("districtFilter");
    sel.innerHTML = DISTRICTS.map(
      (d) => `<option value="${d}" ${state.district === d ? "selected" : ""}>${d}</option>`
    ).join("");
    sel.addEventListener("change", () => {
      state.district = sel.value;
      state.page = 1;
      renderCards();
    });
  }

  function categoryLabel(resource) {
    if (resource.subType) return resource.subType;
    return CATEGORY_LABELS[resource.category] || resource.category;
  }

  function costBadge(resource) {
    if (!resource.costType) return "";
    const label = COST_TYPE_LABELS[resource.costType] || resource.costType;
    const cls = resource.costType === "free" ? "cost-free" : resource.costType === "tool" ? "cost-tool" : "cost-cond";
    return `<span class="badge-cost ${cls}">${label}</span>`;
  }

  function renderCard(resource) {
    const facilities = Object.keys(FACILITY_LABELS)
      .filter((f) => hasFacility(resource, f))
      .map(
        (f) =>
          `<span class="facility-tag ${facilityClass(resource, f)}">${FACILITY_LABELS[f]}</span>`
      )
      .join("");

    return `
      <article class="card ${resource.featured ? "card-featured" : ""} ${resource.isTool ? "card-tool" : ""}" data-id="${resource.id}" tabindex="0" role="button" aria-label="查看${resource.name}详情">
        <div class="card-top">
          <span class="card-category ${resource.category}">${categoryLabel(resource)}</span>
          <div class="card-badges">
            ${costBadge(resource)}
            ${resource.featured ? '<span class="badge-star" title="推荐">★</span>' : ""}
            ${resource.seasonal ? '<span class="badge-seasonal">夏季</span>' : ""}
          </div>
        </div>
        <h3>${resource.name}</h3>
        <p class="card-address">${resource.address}</p>
        <p class="card-hours">${resource.hours}</p>
        <div class="facility-tags">${facilities || '<span class="facility-tag">查看详情</span>'}</div>
        <span class="card-district">${resource.district}</span>
      </article>
    `;
  }

  function renderPagination(total, totalPages) {
    const el = document.getElementById("pagination");
    if (totalPages <= 1) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.innerHTML = `
      <button type="button" class="page-btn" data-page="prev" ${state.page <= 1 ? "disabled" : ""}>上一页</button>
      <span class="page-info">${state.page} / ${totalPages}</span>
      <button type="button" class="page-btn" data-page="next" ${state.page >= totalPages ? "disabled" : ""}>下一页</button>
    `;
    el.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.page === "prev" && state.page > 1) state.page--;
        if (btn.dataset.page === "next" && state.page < totalPages) state.page++;
        renderCards();
        document.getElementById("resources").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderCards() {
    const filtered = filterResources();
    const grid = document.getElementById("cardGrid");
    const empty = document.getElementById("emptyState");
    const countEl = document.getElementById("resultCount");

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    countEl.textContent = `共 ${filtered.length} 处`;

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    grid.innerHTML = pageItems.map(renderCard).join("");

    grid.querySelectorAll(".card").forEach((card) => {
      const open = () => openModal(card.dataset.id);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function openModal(id) {
    const r = RESOURCES.find((x) => x.id === id);
    if (!r) return;

    track("resource_view", { id: r.id, name: r.name, category: r.category });

    const modal = document.getElementById("detailModal");
    document.getElementById("modalTitle").textContent = r.fullName || r.name;

    const facilityRows = Object.entries(FACILITY_LABELS)
      .map(([key, label]) => {
        const val = r.facilities[key];
        let text = "无";
        if (val === true) text = "有";
        if (val === "partial") text = "部分提供";
        return `<div class="modal-row"><label>${label}</label><p>${text}</p></div>`;
      })
      .join("");

    const features = (r.features || []).map((f) => `<li>${f}</li>`).join("");

    document.getElementById("modalBody").innerHTML = `
      <div class="modal-row"><label>类型</label><p>${categoryLabel(r)}</p></div>
      ${r.costType ? `<div class="modal-row"><label>费用</label><p>${COST_TYPE_LABELS[r.costType] || r.costType}</p></div>` : ""}
      ${r.fullName && r.fullName !== r.name ? `<div class="modal-row"><label>全称</label><p>${r.fullName}</p></div>` : ""}
      <div class="modal-row"><label>地址</label><p>${r.address}</p></div>
      <div class="modal-row"><label>开放时间</label><p>${r.hours}</p></div>
      ${r.phone ? `<div class="modal-row"><label>电话</label><p>${r.phone}</p></div>` : ""}
      ${r.transport ? `<div class="modal-row"><label>交通</label><p>${r.transport}</p></div>` : ""}
      ${r.seasonalNote ? `<div class="modal-row"><label>季节说明</label><p>${r.seasonalNote}</p></div>` : ""}
      ${facilityRows}
      ${features ? `<div class="modal-row"><label>特色</label><ul class="modal-features">${features}</ul></div>` : ""}
      ${r.note ? `<div class="modal-row"><label>备注</label><p>${r.note}</p></div>` : ""}
    `;

    const footer = document.getElementById("modalFooter");
    const primaryLabel = r.isTool ? "打开官方平台" : "高德地图导航";
    const primaryHref = r.isTool && r.website ? r.website : r.mapUrl;
    const primaryClass = r.isTool ? "btn-primary" : "btn-primary";

    footer.innerHTML = `
      <a href="${primaryHref}" target="_blank" rel="noopener" class="${primaryClass}" data-track="nav_click" data-id="${r.id}" data-name="${r.name}">${primaryLabel}</a>
      <button type="button" class="btn-outline" id="modalCopyAddress">复制地址</button>
      ${!r.isTool && r.website ? `<a href="${r.website}" target="_blank" rel="noopener" class="btn-outline" data-track="website_click" data-id="${r.id}">更多信息</a>` : ""}
      ${r.isTool && r.mapUrl ? `<a href="${r.mapUrl}" target="_blank" rel="noopener" class="btn-outline" data-track="nav_click" data-id="${r.id}">高德地图</a>` : ""}
    `;

    footer.querySelectorAll("[data-track]").forEach((el) => {
      el.addEventListener("click", () => {
        track(el.dataset.track, { id: el.dataset.id, name: el.dataset.name || r.name });
      });
    });
    footer.querySelector("#modalCopyAddress")?.addEventListener("click", () => {
      const text = `杭州 ${r.address}`;
      navigator.clipboard?.writeText(text).then(
        () => {
          track("copy_address", { id: r.id, name: r.name });
          alert("地址已复制，可粘贴到地图 App 搜索");
        },
        () => alert(text)
      );
    });

    modal.showModal();
  }

  function renderGuide() {
    document.getElementById("guideGrid").innerHTML = SCENE_GUIDES.map(
      (g) => `
        <div class="guide-card">
          <h4>${g.need}</h4>
          <div class="pick">首选：${g.pick}</div>
          <div class="alt">备选：${g.alt}</div>
        </div>
      `
    ).join("");
  }

  function renderTools() {
    document.getElementById("toolsGrid").innerHTML = EXTERNAL_TOOLS.map(
      (t) => `
        <a href="${t.url}" target="_blank" rel="noopener" class="tool-card" data-tool="${t.name}">
          <h4>${t.name}</h4>
          <p>${t.desc}</p>
          <span class="tool-tag">${t.tag}</span>
        </a>
      `
    ).join("");
    document.getElementById("toolsGrid").querySelectorAll(".tool-card").forEach((a) => {
      a.addEventListener("click", () => track("tool_click", { tool: a.dataset.tool }));
    });
  }

  function initFeedback() {
    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const modal = document.getElementById("feedbackModal");
    const form = document.getElementById("feedbackForm");
    const hint = document.getElementById("feedbackHint");

    if (cfg.feedbackUrl) {
      hint.innerHTML = `也可直接填写 <a href="${cfg.feedbackUrl}" target="_blank" rel="noopener">在线问卷</a>`;
    } else if (cfg.feedbackEmail) {
      hint.textContent = `或通过页内表单，我们将发送至 ${cfg.feedbackEmail}`;
    } else {
      hint.textContent = "请在 js/site-config.js 配置 feedbackUrl 或 feedbackEmail";
    }

    const open = () => {
      track("feedback_open");
      if (cfg.feedbackUrl) {
        window.open(cfg.feedbackUrl, "_blank", "noopener");
        return;
      }
      modal.showModal();
    };

    document.getElementById("feedbackOpen").addEventListener("click", open);
    document.getElementById("feedbackFab").addEventListener("click", open);
    document.getElementById("feedbackClose").addEventListener("click", () => modal.close());
    document.getElementById("feedbackCancel").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const type = data.get("type");
      const content = data.get("content");
      const contact = data.get("contact") || "未留";
      const body = `类型：${type}\n内容：${content}\n联系方式：${contact}\n页面：${location.href}`;
      track("feedback_submit", { type, hasContact: contact !== "未留" });

      if (cfg.feedbackEmail) {
        location.href = `mailto:${cfg.feedbackEmail}?subject=${encodeURIComponent("杭城免费资源地图反馈")}&body=${encodeURIComponent(body)}`;
      } else {
        navigator.clipboard?.writeText(body).then(
          () => alert("反馈内容已复制，请发送至你的反馈渠道（配置 feedbackEmail 或 feedbackUrl）"),
          () => alert(body)
        );
      }
      form.reset();
      modal.close();
    });
  }

  function resetFilters() {
    state.group = "all";
    state.category = "all";
    state.subType = "all";
    state.facilities.clear();
    state.district = "全部";
    state.search = "";
    state.featuredOnly = false;
    state.freeOnly = false;
    state.yearRoundOnly = false;
    state.page = 1;
    document.getElementById("searchInput").value = "";
    document.getElementById("searchClear").hidden = true;
    document.getElementById("featuredOnly").checked = false;
    document.getElementById("freeOnly").checked = false;
    document.getElementById("yearRoundOnly").checked = false;
    document.getElementById("districtFilter").value = "全部";
    document.getElementById("groupFilter").value = "all";
    document.getElementById("subTypeFilter").value = "all";
    renderCategoryFilters();
    renderFacilityFilters();
    updateSubTypeVisibility();
    renderCards();
  }

  function initSearch() {
    const input = document.getElementById("searchInput");
    const clear = document.getElementById("searchClear");
    let timer;
    input.addEventListener("input", () => {
      clear.hidden = !input.value;
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.search = input.value.trim();
        state.page = 1;
        const results = filterResources().length;
        if (state.search) track("search", { query: state.search, results });
        renderCards();
      }, 200);
    });
    clear.addEventListener("click", () => {
      input.value = "";
      state.search = "";
      state.page = 1;
      clear.hidden = true;
      renderCards();
      input.focus();
    });
  }

  function init() {
    applyUrlParams();
    renderHeroStats();
    renderGroupFilter();
    renderCategoryFilters();
    renderFacilityFilters();
    renderDistrictFilter();
    renderSubTypeFilter();
    if (state.freeOnly) document.getElementById("freeOnly").checked = true;
    if (state.group !== "all") document.getElementById("groupFilter").value = state.group;
    if (state.category === "reading") updateSubTypeVisibility();
    renderCards();
    renderGuide();
    renderTools();
    initSearch();
    initFeedback();

    document.getElementById("resetFilters").addEventListener("click", resetFilters);
    document.getElementById("emptyReset").addEventListener("click", resetFilters);
    document.getElementById("featuredOnly").addEventListener("change", (e) => {
      state.featuredOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
    document.getElementById("freeOnly").addEventListener("change", (e) => {
      state.freeOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
    document.getElementById("yearRoundOnly").addEventListener("change", (e) => {
      state.yearRoundOnly = e.target.checked;
      state.page = 1;
      renderCards();
    });
    document.getElementById("modalClose").addEventListener("click", () => {
      document.getElementById("detailModal").close();
    });
    document.getElementById("detailModal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) e.currentTarget.close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
