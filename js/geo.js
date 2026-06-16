/**
 * 全国城市定位（浏览器 Geolocation + 最近城市中心）
 */
const GeoCity = (function () {
  const CHINA_BOUNDS = { minLng: 73.5, maxLng: 135.1, minLat: 18.1, maxLat: 53.6 };

  function buildRegions() {
    const regions = {};
    if (typeof CITY_CENTERS !== "undefined") {
      for (const [name, meta] of Object.entries(CITY_CENTERS)) {
        regions[name] = { center: { lat: meta.lat, lng: meta.lng }, province: meta.province };
      }
    }
    const legacy = {
      杭州: { center: { lat: 30.2741, lng: 120.1551 } },
      宁波: { center: { lat: 29.8683, lng: 121.544 } },
      温州: { center: { lat: 28.0006, lng: 120.6994 } },
      嘉兴: { center: { lat: 30.7461, lng: 120.7555 } },
      湖州: { center: { lat: 30.8931, lng: 120.0881 } },
      绍兴: { center: { lat: 30.0023, lng: 120.582 } },
      金华: { center: { lat: 29.0789, lng: 119.6478 } },
      衢州: { center: { lat: 28.9417, lng: 118.8743 } },
      舟山: { center: { lat: 29.9853, lng: 122.2072 } },
      台州: { center: { lat: 28.6564, lng: 121.4208 } },
      丽水: { center: { lat: 28.4517, lng: 119.9229 } },
    };
    for (const [name, r] of Object.entries(legacy)) {
      if (!regions[name]) regions[name] = r;
    }
    return regions;
  }

  const CITY_REGIONS = buildRegions();

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

  function inChina(lat, lng) {
    return (
      lng >= CHINA_BOUNDS.minLng &&
      lng <= CHINA_BOUNDS.maxLng &&
      lat >= CHINA_BOUNDS.minLat &&
      lat <= CHINA_BOUNDS.maxLat
    );
  }

  function resolveCity(lat, lng) {
    if (!inChina(lat, lng)) {
      return { ok: false, reason: "outside" };
    }

    let city = "北京";
    let minKm = Infinity;
    for (const [name, region] of Object.entries(CITY_REGIONS)) {
      if (name === "全部" || name === "全国") continue;
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

  return { resolveCity, requestLocation, distanceKm, CITY_REGIONS, inChina };
})();
