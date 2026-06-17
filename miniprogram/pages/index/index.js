const { filterResources, sortResources, distKm, formatDistance, facilityTags } = require("../../utils/filter.js");
const { requestLocation } = require("../../utils/geo.js");

const PAGE_SIZE = 40;

Page({
  data: {
    loading: true,
    cities: ["全部"],
    cityIndex: 0,
    cityLabel: "全国",
    city: "全部",
    search: "",
    perks: [],
    scenes: [],
    facilities: [],
    facilitiesMap: {},
    sceneActive: -1,
    sortMode: "comprehensive",
    items: [],
    resultCount: 0,
    hasMore: false,
    page: 1,
  },

  _resources: [],
  _meta: null,
  _filtered: [],
  _userLocation: null,

  onLoad(options) {
    this._pendingOptions = options || {};
    this.bootstrap();
  },

  bootstrap() {
    const app = getApp();
    app.ensureData().then(() => {
      const { resources, meta } = app.globalData;
      this._resources = resources;
      this._meta = meta;
      const cities = meta.cities || ["全部"];
      const cityLabel = meta.siteScope === "china" ? "全国" : "浙江全省";

      this.setData({
        loading: false,
        cities,
        cityLabel,
        perks: meta.valuePerks || [],
        scenes: meta.quickScenes || [],
      });

      this.applyUrlParams(this._pendingOptions);
      this.refreshList(true);
    }).catch(() => {
      wx.showModal({
        title: "加载失败",
        content: "点位数据加载失败，请重启小程序",
        showCancel: false,
      });
    });
  },

  applyUrlParams(options) {
    if (options.city) {
      const idx = this.data.cities.indexOf(decodeURIComponent(options.city));
      if (idx >= 0) {
        this.setData({
          cityIndex: idx,
          city: this.data.cities[idx],
          cityLabel: this.data.cities[idx] === "全部" ? (this._meta.siteScope === "china" ? "全国" : "浙江全省") : this.data.cities[idx],
        });
      }
    }
    if (options.category) {
      this._initCategory = decodeURIComponent(options.category);
    }
    if (options.search) {
      this.setData({ search: decodeURIComponent(options.search) });
    }
  },

  filterState() {
    return {
      city: this.data.city,
      category: this._initCategory || "all",
      group: "all",
      district: "全部",
      search: this.data.search,
      facilities: this.data.facilities,
      featuredOnly: false,
      freeOnly: false,
      yearRoundOnly: false,
    };
  },

  refreshList(resetPage) {
    if (resetPage) this.setData({ page: 1 });
    let list = filterResources(this._resources, this.filterState(), this._meta);
    list = sortResources(list, this.data.sortMode, this._userLocation);

    const catMap = {};
    (this._meta.resourceCategories || []).forEach((c) => {
      catMap[c.id] = c.label;
    });

    this._filtered = list;
    const page = resetPage ? 1 : this.data.page;
    const slice = list.slice(0, page * PAGE_SIZE);

    this.setData({
      resultCount: list.length,
      items: slice.map((r) => this.toCard(r, catMap)),
      hasMore: slice.length < list.length,
      page,
    });
  },

  toCard(r, catMap) {
    const dist = this._userLocation ? formatDistance(distKm(r, this._userLocation)) : "";
    const city = r.city || "";
    const dis = r.district && r.district !== city ? ` · ${r.district}` : "";
    return {
      id: r.id,
      name: r.name,
      address: r.address || "",
      catLabel: catMap[r.category] || r.category,
      dist,
      tags: facilityTags(r).slice(0, 4),
      cityMeta: `${city}${dis}`,
    };
  },

  loadMore() {
    const page = this.data.page + 1;
    const catMap = {};
    (this._meta.resourceCategories || []).forEach((c) => {
      catMap[c.id] = c.label;
    });
    const slice = this._filtered.slice(0, page * PAGE_SIZE);
    this.setData({
      page,
      items: slice.map((r) => this.toCard(r, catMap)),
      hasMore: slice.length < this._filtered.length,
    });
  },

  onCityChange(e) {
    const idx = Number(e.detail.value);
    const city = this.data.cities[idx];
    const cityLabel = city === "全部" ? (this._meta.siteScope === "china" ? "全国" : "浙江全省") : city;
    this.setData({ cityIndex: idx, city, cityLabel, sceneActive: -1 });
    this._initCategory = "all";
    this.refreshList(true);
  },

  onSearchInput(e) {
    this.setData({ search: e.detail.value });
  },

  applyFilters() {
    this.refreshList(true);
  },

  clearSearch() {
    this.setData({ search: "" });
    this.refreshList(true);
  },

  toggleFacility(e) {
    const id = e.currentTarget.dataset.id;
    const set = new Set(this.data.facilities);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    const facilities = [...set];
    const facilitiesMap = {};
    facilities.forEach((f) => {
      facilitiesMap[f] = true;
    });
    this.setData({ facilities, facilitiesMap, sceneActive: -1 });
    this._initCategory = "all";
    this.refreshList(true);
  },

  applyScene(e) {
    const index = Number(e.currentTarget.dataset.index);
    const scene = this.data.scenes[index];
    if (!scene) return;
    this.setData({
      sceneActive: index,
      search: scene.search || "",
      facilities: [],
      facilitiesMap: {},
    });
    this._initCategory = scene.category === "all" ? "all" : scene.category;
    this.refreshList(true);
  },

  setSort(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode === "distance" && !this._userLocation) {
      this.onLocate(true);
      return;
    }
    this.setData({ sortMode: mode });
    this.refreshList(true);
  },

  onLocate(forSort) {
    requestLocation(this._meta.cityCenters)
      .then((loc) => {
        this._userLocation = loc;
        getApp().globalData.userLocation = loc;
        const idx = this.data.cities.indexOf(loc.city);
        if (idx >= 0) {
          this.setData({
            cityIndex: idx,
            city: loc.city,
            cityLabel: loc.city,
            sortMode: forSort === true || this.data.sortMode === "distance" ? "distance" : this.data.sortMode,
          });
        } else {
          this.setData({ sortMode: "distance" });
        }
        wx.showToast({ title: `已定位 ${loc.city}`, icon: "success" });
        this.refreshList(true);
      })
      .catch(() => {
        wx.showModal({
          title: "需要定位权限",
          content: "请在设置中允许「位置信息」，以便按距离排序",
          confirmText: "去设置",
          success: (res) => {
            if (res.confirm) wx.openSetting();
          },
        });
      });
  },

  resetFilters() {
    this.setData({
      search: "",
      facilities: [],
      facilitiesMap: {},
      sceneActive: -1,
      sortMode: "comprehensive",
    });
    this._initCategory = "all";
    this.refreshList(true);
  },

  openDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  onShareAppMessage() {
    return {
      title: "全国惠民地图 · 免费自习纳凉 WiFi 在哪找",
      path: "/pages/index/index",
    };
  },
});
