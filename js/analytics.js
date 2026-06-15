/**
 * 轻量埋点 — 支持百度统计 + 本地调试日志
 * 全局：window.trackEvent(name, props)
 */
(function () {
  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const DEBUG = cfg.analyticsDebug !== false;

  function trackEvent(name, props) {
    const payload = { event: name, ...props, ts: Date.now() };
    if (DEBUG) console.info("[analytics]", payload);

    if (typeof _hmt !== "undefined") {
      _hmt.push(["_trackEvent", name, JSON.stringify(props || {})]);
    }

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
