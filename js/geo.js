/**
 * 浙江省内地市定位（浏览器 Geolocation + 最近城市中心）
 */
const GeoCity = (function () {
  /** 浙江大致范围 */
  const ZJ_BOUNDS = { minLng: 118.0, maxLng: 123.2, minLat: 27.0, maxLat: 31.3 };

  /** 11 地市行政中心 + 大致矩形范围 [minLng, maxLng, minLat, maxLat] */
  const CITY_REGIONS = {
    杭州: { center: { lat: 30.2741, lng: 120.1551 }, bbox: [118.9, 120.5, 29.75, 30.65] },
    宁波: { center: { lat: 29.8683, lng: 121.544 }, bbox: [121.0, 122.35, 29.35, 30.35] },
    温州: { center: { lat: 28.0006, lng: 120.6994 }, bbox: [119.45, 121.55, 27.45, 28.55] },
    嘉兴: { center: { lat: 30.7461, lng: 120.7555 }, bbox: [120.25, 121.45, 30.25, 31.05] },
    湖州: { center: { lat: 30.8931, lng: 120.0881 }, bbox: [119.45, 120.65, 30.45, 31.25] },
    绍兴: { center: { lat: 30.0023, lng: 120.582 }, bbox: [119.85, 121.25, 29.55, 30.25] },
    金华: { center: { lat: 29.0789, lng: 119.6478 }, bbox: [119.15, 120.65, 28.75, 29.65] },
    衢州: { center: { lat: 28.9417, lng: 118.8743 }, bbox: [118.15, 119.55, 28.45, 29.55] },
    舟山: { center: { lat: 29.9853, lng: 122.2072 }, bbox: [121.75, 123.05, 29.65, 30.45] },
    台州: { center: { lat: 28.6564, lng: 121.4208 }, bbox: [120.35, 122.05, 28.25, 29.55] },
    丽水: { center: { lat: 28.4517, lng: 119.9229 }, bbox: [118.75, 120.55, 27.25, 28.85] },
  };

  function inBBox(lng, lat, bbox) {
    return lng >= bbox[0] && lng <= bbox[1] && lat >= bbox[2] && lat <= bbox[3];
  }

  function nearestAmong(lat, lng, names) {
    let city = names[0];
    let minKm = Infinity;
    for (const name of names) {
      const region = CITY_REGIONS[name];
      const km = distanceKm(lat, lng, region.center.lat, region.center.lng);
      if (km < minKm) {
        minKm = km;
        city = name;
      }
    }
    return { city, distanceKm: Math.round(minKm) };
  }

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

    const matched = [];
    for (const [name, region] of Object.entries(CITY_REGIONS)) {
      if (inBBox(lng, lat, region.bbox)) {
        matched.push(name);
      }
    }

    if (matched.length === 1) {
      return { ok: true, city: matched[0], method: "bbox" };
    }

    if (matched.length > 1) {
      const { city, distanceKm: km } = nearestAmong(lat, lng, matched);
      return { ok: true, city, distanceKm: km, method: "bbox-nearest" };
    }

    let city = "杭州";
    let minKm = Infinity;
    for (const [name, region] of Object.entries(CITY_REGIONS)) {
      const km = distanceKm(lat, lng, region.center.lat, region.center.lng);
      if (km < minKm) {
        minKm = km;
        city = name;
      }
    }

    return { ok: true, city, distanceKm: Math.round(minKm), method: "nearest" };
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

  return { resolveCity, requestLocation, distanceKm, CITY_REGIONS };
})();
