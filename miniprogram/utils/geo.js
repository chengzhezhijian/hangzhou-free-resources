function resolveCity(lat, lng, cityCenters) {
  const bounds = { minLng: 73.5, maxLng: 135.1, minLat: 18.1, maxLat: 53.6 };
  if (
    lng < bounds.minLng ||
    lng > bounds.maxLng ||
    lat < bounds.minLat ||
    lat > bounds.maxLat
  ) {
    return { ok: false };
  }
  let city = "北京";
  let minKm = Infinity;
  Object.entries(cityCenters || {}).forEach(([name, meta]) => {
    if (name === "全部" || name === "全国") return;
    const km = haversine(lat, lng, meta.lat, meta.lng);
    if (km < minKm) {
      minKm = km;
      city = name;
    }
  });
  return { ok: true, city, lat, lng };
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function requestLocation(cityCenters) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        const hit = resolveCity(res.latitude, res.longitude, cityCenters);
        if (hit.ok) {
          resolve({ lat: res.latitude, lng: res.longitude, city: hit.city });
        } else {
          reject(new Error("不在中国范围内"));
        }
      },
      fail: reject,
    });
  });
}

module.exports = { resolveCity, requestLocation };
