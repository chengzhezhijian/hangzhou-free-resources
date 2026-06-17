function openNavigation(resource) {
  if (resource.lat != null && resource.lng != null) {
    wx.openLocation({
      latitude: resource.lat,
      longitude: resource.lng,
      name: resource.name,
      address: resource.address || "",
      scale: 16,
    });
    return;
  }
  const addr = [resource.city, resource.address].filter(Boolean).join(" ");
  if (addr) {
    wx.setClipboardData({
      data: `${resource.name} ${addr}`,
      success: () => wx.showToast({ title: "地址已复制", icon: "success" }),
    });
    return;
  }
  wx.showToast({ title: "暂无导航信息", icon: "none" });
}

module.exports = { openNavigation };
