/**
 * 10 套整站 UX — UED 重构：简洁、信息密度高、主次字号分明
 * 预览: ?design=d01 … d10 · labs/ab-design.html
 */
const DESIGN_VARIANTS = {
  d01: {
    id: "d01",
    name: "标准发现",
    dimension: "结构",
    reference: "Apple Maps",
    theme: "v01",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "compact",
      stats: false,
      perks: true,
      quickScenes: true,
      sortTabs: true,
      contentHeader: true,
      sidebar: "desktop",
    },
    filterPrimary: "perks",
    description: "紧凑标题 + 搜索 + 设施 Chip + 场景 + 完整卡片",
  },
  d02: {
    id: "d02",
    name: "搜索直达",
    dimension: "交互",
    reference: "Spotlight",
    theme: "v01",
    pageSize: 40,
    cardMode: "row",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "none",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: true,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "search",
    filterSecondary: "scenes",
    description: "搜索为主，场景 Chip 辅筛，行列表含地址",
  },
  d03: {
    id: "d03",
    name: "分类浏览",
    dimension: "结构",
    reference: "支付宝市民中心",
    theme: "v02",
    pageSize: 48,
    cardMode: "tile",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "compact",
      stats: false,
      perks: false,
      quickScenes: true,
      sortTabs: true,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "groups",
    description: "大类横滑 Chip + 双列卡片含地址",
  },
  d04: {
    id: "d04",
    name: "场景优先",
    dimension: "筛选",
    reference: "小红书",
    theme: "v04",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "compact",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: true,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "scenes",
    filterSecondary: "perks",
    description: "场景 Chip 主筛 + 设施辅筛 + 标准卡片",
  },
  d05: {
    id: "d05",
    name: "设施组合",
    dimension: "筛选",
    reference: "Airbnb",
    theme: "v09",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "none",
      stats: false,
      perks: false,
      quickScenes: true,
      sortTabs: true,
      contentHeader: true,
      sidebar: "sheet",
    },
    filterPrimary: "facilities",
    description: "设施 Chip 多选 + 场景辅行 + 标准卡片",
  },
  d06: {
    id: "d06",
    name: "附近发现",
    dimension: "交互",
    reference: "高德附近",
    theme: "v03",
    pageSize: 40,
    cardMode: "row",
    defaultSort: "distance",
    layout: {
      heroMode: "none",
      stats: false,
      perks: true,
      quickScenes: false,
      sortTabs: false,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "locate",
    description: "定位 Chip + 设施辅筛，行列表突出距离与地址",
  },
  d07: {
    id: "d07",
    name: "双列探索",
    dimension: "结构",
    reference: "美团",
    theme: "v10",
    pageSize: 48,
    cardMode: "tile",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "none",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: false,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "tabs",
    filterSecondary: "perks",
    description: "分类 Tab + 设施辅筛 + 双列密卡片",
  },
  d08: {
    id: "d08",
    name: "分区索引",
    dimension: "结构",
    reference: "App Store",
    theme: "v02",
    pageSize: 999,
    cardMode: "compact",
    groupList: true,
    defaultSort: "comprehensive",
    layout: {
      heroMode: "compact",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: false,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "groups",
    description: "大类 Chip + 按类型分区列表，无分页",
  },
  d09: {
    id: "d09",
    name: "高密度列表",
    dimension: "交互",
    reference: "系统设置",
    theme: "v09",
    pageSize: 60,
    cardMode: "minimal",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "none",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: false,
      contentHeader: true,
      sidebar: "hidden",
    },
    filterPrimary: "merged",
    description: "合并 Chip 栏 + 单行高密度列表",
  },
  d10: {
    id: "d10",
    name: "办事引导",
    dimension: "筛选",
    reference: "政务大厅",
    theme: "v02",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: {
      heroMode: "compact",
      stats: false,
      perks: false,
      quickScenes: false,
      sortTabs: true,
      contentHeader: true,
      sidebar: "desktop",
    },
    filterPrimary: "wizard",
    description: "三步引导条 + 场景 Chip + 标准卡片",
  },
};

function getDesignVariant() {
  const id = document.documentElement.dataset.design;
  return id && DESIGN_VARIANTS[id] ? DESIGN_VARIANTS[id] : null;
}

(function applyDesignEarly() {
  const VALID = /^d(0[1-9]|10)$/;
  const id = new URLSearchParams(location.search).get("design");
  if (!id || !VALID.test(id) || !DESIGN_VARIANTS[id]) return;
  document.documentElement.dataset.design = id;
  const d = DESIGN_VARIANTS[id];
  if (d.theme) document.documentElement.dataset.theme = d.theme;
  try {
    if (new URLSearchParams(location.search).get("design")) {
      localStorage.setItem("designLab", id);
    }
  } catch {
    /* ignore */
  }
})();

if (typeof window !== "undefined") {
  window.DESIGN_VARIANTS = DESIGN_VARIANTS;
  window.getDesignVariant = getDesignVariant;
}
