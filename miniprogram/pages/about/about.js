Page({
  openFeedback() {
    wx.setClipboardData({
      data: "https://wj.qq.com/s2/27038162/ce58/",
      success: () =>
        wx.showModal({
          title: "反馈链接已复制",
          content: "请在浏览器打开腾讯问卷提交反馈（小程序内问卷需配置业务域名）",
          showCancel: false,
        }),
    });
  },

  onShareAppMessage() {
    return { title: "全国惠民地图", path: "/pages/index/index" };
  },
});
