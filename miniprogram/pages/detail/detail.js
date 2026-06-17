const { distKm, formatDistance, facilityTags } = require("../../utils/filter.js");
const { openNavigation } = require("../../utils/nav.js");

Page({
  data: {
    loading: true,
    item: null,
  },

  _resource: null,

  onLoad(options) {
    const id = options.id;
    getApp()
      .ensureData()
      .then(({ resources, meta, userLocation }) => {
        const r = resources.find((x) => x.id === id);
        if (!r) {
          wx.showToast({ title: "未找到该点位", icon: "none" });
          setTimeout(() => wx.navigateBack(), 1500);
          return;
        }
        this._resource = r;
        const catMap = {};
        (meta.resourceCategories || []).forEach((c) => {
          catMap[c.id] = c.label;
        });
        const city = r.city || "";
        const dis = r.district && r.district !== city ? ` · ${r.district}` : "";
        const dist = userLocation ? formatDistance(distKm(r, userLocation)) : "";
        this.setData({
          loading: false,
          item: {
            name: r.name,
            address: r.address || "",
            hours: r.hours || "",
            note: r.note || "",
            catLabel: catMap[r.category] || r.category,
            tags: facilityTags(r),
            cityMeta: `${city}${dis}`,
            dist,
          },
        });
        wx.setNavigationBarTitle({ title: r.name.slice(0, 12) });
      });
  },

  onNavigate() {
    if (this._resource) openNavigation(this._resource);
  },

  onCopy() {
    const r = this._resource;
    if (!r) return;
    const text = [r.name, r.city, r.address].filter(Boolean).join(" ");
    wx.setClipboardData({
      data: text,
      success: () => wx.showToast({ title: "已复制", icon: "success" }),
    });
  },

  onShareAppMessage() {
    const r = this._resource;
    return {
      title: r ? r.name : "全国惠民地图",
      path: r ? `/pages/detail/detail?id=${r.id}` : "/pages/index/index",
    };
  },
});
