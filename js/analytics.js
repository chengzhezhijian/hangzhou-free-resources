/**
 * 轻量埋点 — 百度统计（中文事件分类）+ 本地调试日志
 * 全局：window.trackEvent(name, props)
 *
 * 百度后台查看：报告 → 访问分析 → 事件跟踪
 */
(function () {
  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const DEBUG = cfg.analyticsDebug !== false;

  /** 事件名 → 百度事件类别 / 动作（中文，便于后台阅读） */
  const BAIDU_EVENT_MAP = {
    page_view: { category: "页面", action: "访问" },
    landing_params: { category: "来源", action: "带参落地" },
    search: { category: "搜索", action: "关键词" },
    filter_change: { category: "筛选", action: "切换条件" },
    resource_view: { category: "资源", action: "查看详情" },
    nav_click: { category: "资源", action: "高德导航" },
    copy_address: { category: "资源", action: "复制地址" },
    website_click: { category: "资源", action: "更多信息" },
    tool_click: { category: "工具", action: "打开外链" },
    feedback_open: { category: "反馈", action: "打开问卷" },
    feedback_submit: { category: "反馈", action: "提交表单" },
    geo_locate: { category: "定位", action: "地市识别" },
  };

  function buildLabel(name, props) {
    const p = props || {};
    switch (name) {
      case "search":
        return `${p.query || ""}（${p.results ?? 0}条结果）`;
      case "filter_change":
        return `${p.field || ""}=${p.value ?? ""}`;
      case "resource_view":
        return p.name || p.id || "";
      case "nav_click":
      case "copy_address":
      case "website_click":
        return p.name || p.id || "";
      case "tool_click":
        return p.tool || "";
      case "feedback_submit":
        return `${p.type || ""}${p.hasContact ? "·留联系方式" : ""}`;
      case "landing_params":
        return Object.entries(p)
          .filter(([k]) => k !== "ts")
          .map(([k, v]) => `${k}=${v}`)
          .join("&");
      case "geo_locate":
        return p.city ? `${p.city}${p.km ? `·${p.km}km` : ""}` : p.reason || "";
      case "page_view":
        return p.path || location.pathname;
      default:
        return (
          Object.entries(p)
            .map(([k, v]) => `${k}=${v}`)
            .join("|") || name
        );
    }
  }

  function pushBaiduEvent(name, props) {
    if (typeof _hmt === "undefined") return;
    const mapped = BAIDU_EVENT_MAP[name] || { category: "用户行为", action: name };
    const label = String(buildLabel(name, props)).slice(0, 200);
    const value = props?.results ?? props?.value ?? 0;
    _hmt.push(["_trackEvent", mapped.category, mapped.action, label, value]);
  }

  function trackEvent(name, props) {
    const payload = { event: name, ...props, ts: Date.now() };
    if (DEBUG) console.info("[analytics]", payload);

    pushBaiduEvent(name, props);

    try {
      const key = "hz_analytics_log";
      const log = JSON.parse(localStorage.getItem(key) || "[]");
      log.push(payload);
      if (log.length > 200) log.splice(0, log.length - 200);
      localStorage.setItem(key, JSON.stringify(log));
    } catch (_) {
      /* ignore quota */
    }
  }

  function loadBaidu() {
    const id = cfg.baiduTongjiId;
    if (!id) return;
    if (document.querySelector('script[src*="hm.baidu.com/hm.js"]')) return;
    window._hmt = window._hmt || [];
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://hm.baidu.com/hm.js?${id}`;
    document.head.appendChild(s);
  }

  window.trackEvent = trackEvent;

  loadBaidu();
  document.addEventListener("DOMContentLoaded", () => {
    trackEvent("page_view", { path: location.pathname });
  });
})();
