/**
 * 10 套整站 UX — 淘宝/美团单行筛选栏（搜索下、列表上、一行展示）
 * 预览: ?design=d01 … d10 · labs/ab-design.html
 */
const DESIGN_VARIANTS = {
  d01: {
    id: "d01",
    name: "标准单行",
    dimension: "基准",
    reference: "美团首页",
    theme: "v01",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    filterRow: "standard",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "desktop" },
    description: "设施+场景+排序，单行横滑（美团基准）",
  },
  d02: {
    id: "d02",
    name: "搜索优先",
    dimension: "交互",
    reference: "淘宝搜索",
    theme: "v01",
    pageSize: 40,
    cardMode: "row",
    defaultSort: "comprehensive",
    filterRow: "scenes-sort",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "仅场景+排序单行，搜索占主，行列表",
  },
  d03: {
    id: "d03",
    name: "分类 Tab",
    dimension: "结构",
    reference: "美团品类",
    theme: "v10",
    pageSize: 48,
    cardMode: "tile",
    defaultSort: "comprehensive",
    filterRow: "categories",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "大类 Tab 单行 + 双列卡片",
  },
  d04: {
    id: "d04",
    name: "场景前置",
    dimension: "筛选",
    reference: "淘宝场景",
    theme: "v04",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    filterRow: "scenes-perks",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "场景 Chip 在前 + 设施 + 排序，单行",
  },
  d05: {
    id: "d05",
    name: "设施筛选",
    dimension: "筛选",
    reference: "Airbnb",
    theme: "v09",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    filterRow: "facilities",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "sheet" },
    description: "设施多选 + 排序，单行",
  },
  d06: {
    id: "d06",
    name: "附近优先",
    dimension: "交互",
    reference: "高德附近",
    theme: "v03",
    pageSize: 40,
    cardMode: "row",
    defaultSort: "distance",
    filterRow: "nearby",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "距离排序+设施，单行，无定位文案",
  },
  d07: {
    id: "d07",
    name: "双列密网格",
    dimension: "结构",
    reference: "美团团购",
    theme: "v10",
    pageSize: 48,
    cardMode: "tile",
    defaultSort: "comprehensive",
    filterRow: "categories-perks",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "分类+设施同一行，双列卡片",
  },
  d08: {
    id: "d08",
    name: "分区目录",
    dimension: "结构",
    reference: "App Store",
    theme: "v02",
    pageSize: 999,
    cardMode: "compact",
    groupList: true,
    defaultSort: "comprehensive",
    filterRow: "groups",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "大类单行 + 分区列表无分页",
  },
  d09: {
    id: "d09",
    name: "高密度",
    dimension: "交互",
    reference: "淘宝紧凑",
    theme: "v09",
    pageSize: 60,
    cardMode: "minimal",
    defaultSort: "comprehensive",
    filterRow: "merged",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "hidden" },
    description: "类型+设施合并单行 + 极简列表",
  },
  d10: {
    id: "d10",
    name: "办事引导",
    dimension: "筛选",
    reference: "政务办事",
    theme: "v02",
    pageSize: 48,
    cardMode: "premium",
    defaultSort: "comprehensive",
    filterRow: "guide",
    layout: { heroMode: "none", stats: false, contentHeader: "count", sidebar: "desktop" },
    description: "引导步骤内联单行 + 场景 Chip",
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
