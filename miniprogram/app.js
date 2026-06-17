App({
  globalData: {
    resources: null,
    meta: null,
    dataReady: false,
    userLocation: null,
  },

  onLaunch() {
    this.loadDataPackage();
  },

  loadDataPackage() {
    return new Promise((resolve, reject) => {
      if (this.globalData.dataReady) {
        resolve();
        return;
      }
      wx.loadSubpackage({
        name: "data",
        success: () => {
          try {
            const resources = require("./packageData/data/resources.js");
            const meta = require("./packageData/data/meta.js");
            this.globalData.resources = resources;
            this.globalData.meta = meta;
            this.globalData.dataReady = true;
            resolve();
          } catch (e) {
            reject(e);
          }
        },
        fail: reject,
      });
    });
  },

  ensureData() {
    if (this.globalData.dataReady) {
      return Promise.resolve(this.globalData);
    }
    return this.loadDataPackage().then(() => this.globalData);
  },
});
