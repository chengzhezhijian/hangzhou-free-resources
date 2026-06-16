/**
 * 全站公共布局：导航高亮、品牌链接、反馈入口
 */
(function () {
  const PAGE = document.body.dataset.page || "map";

  function track(name, props) {
    if (typeof window.trackEvent === "function") window.trackEvent(name, props);
  }

  function initNav() {
    document.querySelectorAll("[data-nav-page]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.navPage === PAGE);
    });
  }

  function initBrand() {
    const brand = document.getElementById("brandHome");
    if (!brand) return;
    if (PAGE === "map") {
      brand.setAttribute("href", "index.html");
      brand.addEventListener("click", (e) => {
        if (location.pathname.endsWith("index.html") || /\/$/.test(location.pathname) || !location.pathname.split("/").pop().includes(".")) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    } else {
      brand.setAttribute("href", "index.html");
    }
  }

  function feedbackPageContext() {
    const params = new URLSearchParams(location.search);
    const parts = [`页面：${location.pathname.split("/").pop() || "index.html"}`];
    if (params.toString()) parts.push(`参数：${params.toString()}`);
    return parts.join("\n");
  }

  function initFeedback() {
    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const brand = cfg.siteBrandName || "全国蹭享地图";
    const modal = document.getElementById("feedbackModal");
    const form = document.getElementById("feedbackForm");
    const hint = document.getElementById("feedbackHint");

    if (hint) {
      if (cfg.feedbackUrl?.includes("wj.qq.com")) {
        hint.innerHTML = `通过 <a href="${cfg.feedbackUrl}" target="_blank" rel="noopener">腾讯问卷</a> 提交反馈`;
      } else if (cfg.feedbackEmail) {
        hint.textContent = `也可使用下方表单，我们将发送至 ${cfg.feedbackEmail}`;
      } else {
        hint.textContent = `欢迎为「${brand}」提交纠错与建议`;
      }
    }

    const url = cfg.feedbackUrl;
    if (url) {
      ["feedbackOpen", "feedbackFab"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.href = url;
      });
    }

    const open = (e) => {
      if (!url && modal) {
        e?.preventDefault();
        modal.showModal();
        document.body.classList.add("sheet-open");
        return;
      }
      track("feedback_open");
    };

    document.getElementById("feedbackOpen")?.addEventListener("click", open);
    document.getElementById("feedbackFab")?.addEventListener("click", open);
    document.getElementById("feedbackClose")?.addEventListener("click", () => modal?.close());
    document.getElementById("feedbackCancel")?.addEventListener("click", () => modal?.close());
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
    modal?.addEventListener("close", () => document.body.classList.remove("sheet-open"));

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const type = data.get("type");
      const content = data.get("content");
      const contact = data.get("contact") || "未留";
      const body = `类型：${type}\n内容：${content}\n联系方式：${contact}\n${feedbackPageContext()}`;
      track("feedback_submit", { type, hasContact: contact !== "未留" });

      if (cfg.feedbackEmail) {
        location.href = `mailto:${cfg.feedbackEmail}?subject=${encodeURIComponent(`${brand}用户反馈`)}&body=${encodeURIComponent(body)}`;
      } else {
        navigator.clipboard?.writeText(body).then(
          () => alert("反馈内容已复制，请粘贴到反馈渠道发送"),
          () => alert("反馈内容复制失败，请手动填写反馈表单")
        );
      }
      form.reset();
      modal?.close();
    });
  }

  function initBrandSub() {
    const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const tagline = cfg.siteTagline || "浙江免费便民 · 搜完即走";
    document.querySelectorAll(".brand-sub").forEach((el) => {
      el.textContent = tagline;
    });
  }

  function init() {
    initNav();
    initBrand();
    initBrandSub();
    initFeedback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
