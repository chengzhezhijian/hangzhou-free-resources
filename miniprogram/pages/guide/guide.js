Page({
  data: {
    loading: true,
    guides: [],
  },

  onLoad() {
    getApp()
      .ensureData()
      .then(({ meta }) => {
        const guides = (meta.sceneGuides || []).map((g, i) => ({
          id: String(i),
          icon: "◎",
          title: g.need || g.title,
          desc: g.pick || g.desc || "",
          category: g.category,
          search: g.search || "",
        }));
        this.setData({ loading: false, guides });
      });
  },

  goScene(e) {
    const item = this.data.guides[e.currentTarget.dataset.index];
    if (!item) return;
    const q = [];
    if (item.category && item.category !== "all") q.push(`category=${encodeURIComponent(item.category)}`);
    if (item.search) q.push(`search=${encodeURIComponent(item.search)}`);
    wx.redirectTo({ url: `/pages/index/index?${q.join("&")}` });
  },

  onShareAppMessage() {
    return { title: "全国惠民地图 · 场景指南", path: "/pages/guide/guide" };
  },
});
