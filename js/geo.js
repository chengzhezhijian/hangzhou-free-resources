/**
 * 浙江省内地市定位（浏览器 Geolocation + 最近城市中心）
 */
const GeoCity = (function () {
  /** 浙江大致范围 */
  const ZJ_BOUNDS = { minLng: 118.0, maxLng: 123.2, minLat: 27.0, maxLat: 31.3 };

  /** 11 地市行政中心近似坐标 */
  const CITY_CENTERS = {
    杭州: { lat: 30.2741, lng: 120.1551 },
    宁波: { lat: 29.8683, lng: 121.544 },
    温州: { lat: 28.0006, lng: 120.6994 },
    嘉兴: { lat: 30.7461, lng: 120.7555 },
    湖州: { lat: 30.8931, lng: 120.0881 },
    绍兴: { lat: 30.0023, lng: 120.582 },
    金华: { lat: 29.0789, lng: 119.6478 },
    衢州: { lat: 28.9417, lng: 118.8743 },
    舟山: { lat: 29.9853, lng: 122.2072 },
    台州: { lat: 28.6564, lng: 121.4208 },
    丽水: { lat: 28.4517, lng: 119.9229 },
  };

  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function distanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function inZhejiang(lat, lng) {
    return (
      lng >= ZJ_BOUNDS.minLng &&
      lng <= ZJ_BOUNDS.maxLng &&
      lat >= ZJ_BOUNDS.minLat &&
      lat <= ZJ_BOUNDS.maxLat
    );
  }

  function resolveCity(lat, lng) {
    if (!inZhejiang(lat, lng)) {
      return { ok: false, reason: "outside" };
    }

    let city = "杭州";
    let minKm = Infinity;
    for (const [name, center] of Object.entries(CITY_CENTERS)) {
      const km = distanceKm(lat, lng, center.lat, center.lng);
      if (km < minKm) {
        minKm = km;
        city = name;
      }
    }

    return { ok: true, city, distanceKm: Math.round(minKm) };
  }

  function requestLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Object.assign(new Error("浏览器不支持定位"), { code: 0 }));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }),
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 }
      );
    });
  }

  return { resolveCity, requestLocation, CITY_CENTERS };
})();
