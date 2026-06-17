/**
 * 10 套整站 UX 设计方案 — 结构 / 交互 / 筛选体系各不相同
 * 预览: ?design=d01 … d10 · labs/ab-design.html
 */
const DESIGN_VARIANTS = {
  d01: {
    id: "d01",
    name: "经典信息流",
    dimension: "结构",
    reference: "Apple Maps Feed",
    theme: "v01",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: {
      hero: true,
      stats: true,
      perks: true,
      quickScenes: true,
      sortTabs: true,
      contentHeader: true,
      sidebar: "desktop",
    },
    filterPrimary: "perks",
    description: "Hero+四设施标签+场景+分段排序+卡片 Feed（当前基线）",
  },
  d02: {
    id: "d02",
    name: "搜索首屏",
    dimension: "交互",
    reference: "Spotlight / Google",
    theme: "v01",
    pageSize: 24,
    cardMode: "row",
    defaultSort: "comprehensive",
    layout: { hero: false, stats: false, perks: false, quickScenes: false, sortTabs: false, contentHeader: false, sidebar: "hidden" },
    filterPrimary: "search",
    description: "巨型搜索框独占首屏，单行紧凑列表，筛选全进 Sheet",
  },
  d03: {
    id: "d03",
    name: "大类宫格",
    dimension: "结构",
    reference: "支付宝市民中心",
    theme: "v02",
    pageSize: 36,
    cardMode: "tile",
    defaultSort: "comprehensive",
    layout: { hero: false, stats: false, perks: false, quickScenes: false, sortTabs: true, contentHeader: true, sidebar: "hidden" },
    filterPrimary: "groups",
    description: "6 大类宫格点选（文化/避暑/出行…），双列卡片",
  },
  d04: {
    id: "d04",
    name: "场景磁贴",
    dimension: "筛选",
    reference: "小红书发现",
    theme: "v04",
    pageSize: 32,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: { hero: true, stats: false, perks: false, quickScenes: false, sortTabs: false, contentHeader: true, sidebar: "hidden" },
    filterPrimary: "scenes",
    description: "2 列大场景磁贴为主筛选，弱化设施标签",
  },
  d05: {
    id: "d05",
    name: "设施矩阵",
    dimension: "筛选",
    reference: "Airbnb 设施筛选",
    theme: "v09",
    pageSize: 40,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: { hero: false, stats: true, perks: false, quickScenes: true, sortTabs: true, contentHeader: true, sidebar: "sheet" },
    filterPrimary: "facilities",
    description: "2×2 大按钮多选设施，场景降为次要行",
  },
  d06: {
    id: "d06",
    name: "附近优先",
    dimension: "交互",
    reference: "高德附近",
    theme: "v03",
    pageSize: 30,
    cardMode: "row",
    defaultSort: "distance",
    layout: { hero: false, stats: false, perks: true, quickScenes: false, sortTabs: false, contentHeader: true, sidebar: "hidden" },
    filterPrimary: "locate",
    description: "定位条+距离排序默认，列表左侧突出距离",
  },
  d07: {
    id: "d07",
    name: "探索双列",
    dimension: "结构",
    reference: "Pinterest / 美团",
    theme: "v10",
    pageSize: 40,
    cardMode: "tile",
    defaultSort: "comprehensive",
    layout: { hero: false, stats: false, perks: false, quickScenes: false, sortTabs: true, contentHeader: false, sidebar: "hidden" },
    filterPrimary: "tabs",
    description: "顶部分类 Tab 横滑 + 双列密卡片网格",
  },
  d08: {
    id: "d08",
    name: "分区目录",
    dimension: "结构",
    reference: "App Store 分类",
    theme: "v02",
    pageSize: 999,
    cardMode: "compact",
    groupList: true,
    defaultSort: "comprehensive",
    layout: { hero: false, stats: false, perks: false, quickScenes: false, sortTabs: false, contentHeader: true, sidebar: "hidden" },
    filterPrimary: "groups",
    description: "按类型分区折叠展示，无分页，目录式浏览",
  },
  d09: {
    id: "d09",
    name: "极简条目",
    dimension: "交互",
    reference: "系统设置列表",
    theme: "v09",
    pageSize: 50,
    cardMode: "minimal",
    defaultSort: "comprehensive",
    layout: { hero: false, stats: false, perks: false, quickScenes: false, sortTabs: false, contentHeader: false, sidebar: "hidden" },
    filterPrimary: "merged",
    description: "单行条目列表 + 合并类型/设施 Chip 栏",
  },
  d10: {
    id: "d10",
    name: "办事向导",
    dimension: "筛选",
    reference: "政务办事大厅",
    theme: "v02",
    pageSize: 36,
    cardMode: "premium",
    defaultSort: "comprehensive",
    layout: { hero: true, stats: true, perks: false, quickScenes: true, sortTabs: true, contentHeader: true, sidebar: "desktop" },
    filterPrimary: "wizard",
    description: "三步向导：选城市→选场景→选设施，分步解锁列表",
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
