Component({
  properties: {
    current: { type: String, value: "index" },
  },
  methods: {
    go(e) {
      const page = e.currentTarget.dataset.page;
      if (page === this.properties.current) return;
      const map = {
        index: "/pages/index/index",
        guide: "/pages/guide/guide",
        about: "/pages/about/about",
      };
      wx.redirectTo({ url: map[page] });
    },
  },
});
