/** 高德 POI 拉取配置：城市列表 + 检索任务 */

/** 浙江 11 市（优先扩展） */
export const ZHEJIANG_CITIES = [
  { name: "杭州", slug: "hz" },
  { name: "宁波", slug: "nb" },
  { name: "温州", slug: "wz" },
  { name: "嘉兴", slug: "jx" },
  { name: "湖州", slug: "hu" },
  { name: "绍兴", slug: "sx" },
  { name: "金华", slug: "jh" },
  { name: "衢州", slug: "qz" },
  { name: "舟山", slug: "zs" },
  { name: "台州", slug: "tz" },
  { name: "丽水", slug: "ls" },
];

/** 代表城市（每日轮转一批，控制配额） */
export const ROTATION_CITIES = [
  { name: "北京", slug: "bj" },
  { name: "上海", slug: "sh" },
  { name: "广州", slug: "gz" },
  { name: "深圳", slug: "sz" },
  { name: "成都", slug: "cd" },
  { name: "武汉", slug: "wh" },
  { name: "南京", slug: "nj" },
  { name: "苏州", slug: "su" },
];

/** POI 检索任务模板 */
export const FETCH_TASKS = [
  { keywords: "市民之家", category: "gov_service", maxPages: 8 },
  { keywords: "政务服务中心", category: "gov_service", maxPages: 8 },
  { keywords: "人力资源和社会保障局", category: "gov_service", maxPages: 5 },
  { keywords: "人民法院", category: "court", maxPages: 8 },
  { keywords: "劳动人事争议仲裁", category: "court", maxPages: 4 },
  { keywords: "公共厕所", category: "toilet", maxPages: 12 },
  { keywords: "充电站", category: "charging", maxPages: 10 },
  { keywords: "公共图书馆", category: "library", maxPages: 5 },
  { keywords: "城市书房", category: "reading", maxPages: 8 },
  { keywords: "人民公园", category: "park", maxPages: 8 },
  { keywords: "体育场馆", category: "sports", maxPages: 6 },
  { keywords: "党群服务中心", category: "community", maxPages: 6 },
];

/** 每日增量默认只拉前 N 页；AMAP_FULL_SYNC=1 时拉满 */
export const DAILY_MAX_PAGES = 2;

/** 非杭州城市页数上限（全量同步时） */
export const NON_HZ_PAGE_CAP = 5;

export function citiesForRun(options = {}) {
  const { fullSync = false, includeRotation = true } = options;
  const zj = [...ZHEJIANG_CITIES];
  if (!includeRotation) return zj;

  const dayIndex = new Date().getUTCDay();
  const rot = ROTATION_CITIES[dayIndex % ROTATION_CITIES.length];
  return fullSync ? [...zj, ...ROTATION_CITIES] : [...zj, rot];
}

export function pageLimit(cityName, task, fullSync) {
  if (fullSync) {
    if (cityName === "杭州") return task.maxPages;
    return Math.min(task.maxPages, NON_HZ_PAGE_CAP);
  }
  if (cityName === "杭州") return Math.min(task.maxPages, DAILY_MAX_PAGES + 2);
  return DAILY_MAX_PAGES;
}

export const CATEGORY_FACILITIES = {
  gov_service: { wifi: "partial", water: "partial", ac: true },
  court: { wifi: "partial", water: "partial", ac: true },
  toilet: { water: "partial" },
  charging: { charge: true },
  library: { wifi: true, water: "partial", ac: true, study: true, charge: true },
  reading: { wifi: "partial", ac: true, study: true, charge: "partial" },
  park: { water: "partial" },
  sports: { water: "partial", ac: "partial" },
  community: { wifi: "partial", water: true, ac: "partial", charge: "partial" },
};
