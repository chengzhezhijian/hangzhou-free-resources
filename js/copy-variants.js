/**
 * 10 套首页文案 / 定位变体 — AB 实验用
 * 预览: ?copy=h01 … h10 · labs/ab-homepage.html
 */
const COPY_VARIANTS = {
  h01: {
    id: "h01",
    name: "政务官方",
    dimension: "信任感 · 政府背书",
    theme: "v02",
    brand: {
      icon: "惠",
      name: "全国惠民地图",
      tagline: "政府公开信息 · 72城免费场地",
      navMini: "惠民地图",
    },
    hero: {
      badge: "政府公益 · 信息来源于公开资料",
      titleHtml: "全国免费公共服务<br />官方场地一站查",
      sub: "图书馆 · 纳凉点 · 爱心驿家 · 政务工具",
    },
    searchPlaceholder: "搜图书馆、纳凉点、政务大厅…",
    contentTitle: { default: "政府免费场地 · 按设施筛选", nearby: "附近官方场地 · 按距离" },
    emptyText: "试试筛选「免费WiFi」或切换城市查看当地收录",
    footer: "全国惠民地图 · 公益整理，请以场馆当日公告为准",
    tabDiscover: "首页",
    meta: {
      title: "全国惠民地图 · 政府免费公共服务",
      description: "全国政府免费场地：图书馆、纳凉点、爱心驿家。72城可查，高德导航。",
    },
    onboard: [
      { icon: "🏛", title: "政府免费资源", desc: "收录各地图书馆、纳凉点、驿家等公开信息，杭州最全。" },
      { icon: "📍", title: "选择所在城市", desc: "支持全国概览或 72 个代表城市，也可一键定位。" },
      { icon: "📶", title: "按设施筛选", desc: "免费WiFi、空调、饮水、充电 — 标签一点即筛。" },
      { icon: "🗺", title: "高德导航出发", desc: "点卡片看详情，再点导航即可。" },
    ],
  },

  h02: {
    id: "h02",
    name: "效率极简",
    dimension: "效率 · 三步闭环",
    theme: "v01",
    brand: {
      icon: "→",
      name: "免费地图",
      tagline: "选城 · 搜 · 导航",
      navMini: "免费地图",
    },
    hero: {
      badge: null,
      titleHtml: "选城市<br />搜你要的<br />点导航",
      sub: "不用翻公众号，不用挨个问",
    },
    searchPlaceholder: "自习 / 纳凉 / WiFi / 停车",
    contentTitle: { default: "结果列表", nearby: "附近 · 距离优先" },
    emptyText: "换个关键词或点上方场景标签",
    footer: "免费地图 · 搜完即走",
    tabDiscover: "搜",
    meta: {
      title: "免费地图 · 选城搜索导航",
      description: "三步找全国免费场地：选城市、搜需求、高德导航。",
    },
    onboard: [
      { icon: "1️⃣", title: "选城市", desc: "左上角 📍 全国或具体城市。" },
      { icon: "2️⃣", title: "搜或点标签", desc: "输入关键词，或点 WiFi / 纳凉等标签。" },
      { icon: "3️⃣", title: "导航", desc: "点卡片 → 高德地图。" },
    ],
  },

  h03: {
    id: "h03",
    name: "场景问答",
    dimension: "场景 · 问题导向",
    theme: "v03",
    brand: {
      icon: "？",
      name: "这儿能去哪",
      tagline: "我这种情况 · 去哪最合适",
      navMini: "这儿能去哪",
    },
    hero: {
      badge: "场景指南",
      titleHtml: "我这种情况<br />去哪儿？",
      sub: "下方场景标签 = 大家常问的问题",
    },
    searchPlaceholder: "或直接搜：自习、公厕、充电…",
    contentTitle: { default: "为你匹配的点位", nearby: "离你最近的答案" },
    emptyText: "去「场景」页看看其他情况，或放宽筛选",
    footer: "这儿能去哪 · 场景化免费资源查询",
    tabDiscover: "问答",
    meta: {
      title: "这儿能去哪 · 免费场景指南",
      description: "想自习、纳凉、充电、遛娃？按场景选城市，立刻查点位。",
    },
    onboard: [
      { icon: "💡", title: "先想场景", desc: "遛娃、自习、纳凉、停车…你属于哪种？" },
      { icon: "🏷", title: "点场景标签", desc: "首页下方一排就是高频问题。" },
      { icon: "📍", title: "再选城市", desc: "定位或手动选，结果更准。" },
      { icon: "✓", title: "去查点位", desc: "列表里点卡片，导航过去。" },
    ],
  },

  h04: {
    id: "h04",
    name: "零花费",
    dimension: "省钱 · 完全免费",
    theme: "v10",
    brand: {
      icon: "¥",
      name: "零花地图",
      tagline: "0 元 · 72城免费空间",
      navMini: "零花地图",
    },
    hero: {
      badge: "全部免费向市民开放",
      titleHtml: "不花钱也能<br />自习 · 纳凉 · 充电",
      sub: "政府提供的免费场地，不办卡不充值",
    },
    searchPlaceholder: "搜免费 WiFi、免费停车…",
    contentTitle: { default: "完全免费 · 可筛选", nearby: "附近免费点位" },
    emptyText: "勾选「仅看完全免费」试试，或换座城市",
    footer: "零花地图 · 帮你省下不该花的钱",
    tabDiscover: "免费",
    meta: {
      title: "零花地图 · 全国免费场地",
      description: "0元自习、0元纳凉、0元WiFi。全国72城政府免费空间合集。",
    },
    onboard: [
      { icon: "💰", title: "真的免费", desc: "图书馆、书房、纳凉点…政府公益为主。" },
      { icon: "✅", title: "可筛「完全免费」", desc: "更多筛选里可只看无门槛场地。" },
      { icon: "📶", title: "WiFi 也能筛", desc: "点「免费WiFi」标签，少跑冤枉路。" },
      { icon: "🗺", title: "导航直达", desc: "详情页一键高德。" },
    ],
  },

  h05: {
    id: "h05",
    name: "遛娃家长",
    dimension: "亲子 · 周末出行",
    theme: "v08",
    brand: {
      icon: "娃",
      name: "遛娃地图",
      tagline: "公园 · 纳凉 · 免费WiFi",
      navMini: "遛娃地图",
    },
    hero: {
      badge: "家长常用",
      titleHtml: "带娃出门<br />哪儿免费待？",
      sub: "公园绿道 · 有空调的图书馆 · 能充电的驿家",
    },
    searchPlaceholder: "搜公园、纳凉、书房…",
    contentTitle: { default: "适合带娃的免费去处", nearby: "附近 · 带娃友好" },
    emptyText: "点「遛娃」场景标签，或筛「公园」",
    footer: "遛娃地图 · 免费亲子出行参考",
    tabDiscover: "遛娃",
    meta: {
      title: "遛娃地图 · 免费公园纳凉书房",
      description: "带娃免费逛公园、吹空调、看书。72城点位+导航。",
    },
    onboard: [
      { icon: "🌳", title: "先点「遛娃」", desc: "首页场景第一个标签就是公园。" },
      { icon: "🧊", title: "夏天加「纳凉」", desc: "图书馆、地铁纳凉点也能筛。" },
      { icon: "📍", title: "选你所在城市", desc: "杭州数据最全，其他城为代表点位。" },
      { icon: "👶", title: "出发", desc: "详情看开放时间，导航过去。" },
    ],
  },

  h06: {
    id: "h06",
    name: "打工人自习",
    dimension: "自习 · 远程办公",
    theme: "v07",
    brand: {
      icon: "读",
      name: "免费自习地图",
      tagline: "图书馆 · 城市书房 · WiFi",
      navMini: "自习地图",
    },
    hero: {
      badge: "咖啡馆平替",
      titleHtml: "免费自习<br />哪儿有 WiFi？",
      sub: "图书馆、城市书房、邻里阅读 — 安静还能吹空调",
    },
    searchPlaceholder: "搜自习、书房、图书馆…",
    contentTitle: { default: "可自习的免费场地", nearby: "附近自习点 · 按距离" },
    emptyText: "点「免费自习」或「免费WiFi」标签",
    footer: "免费自习地图 · 备考 / 远程办公参考",
    tabDiscover: "自习",
    meta: {
      title: "免费自习地图 · 全国城市书房",
      description: "免费WiFi+自习座位：图书馆、城市书房全国查询。",
    },
    onboard: [
      { icon: "📖", title: "点「免费自习」", desc: "场景标签直达城市书房。" },
      { icon: "📶", title: "筛 WiFi", desc: "确认有网络再出门。" },
      { icon: "🕐", title: "看开放时间", desc: "详情里有 hours，以当日为准。" },
      { icon: "💺", title: "占座规则", desc: "各地不同，到场再看公告。" },
    ],
  },

  h07: {
    id: "h07",
    name: "夏日纳凉",
    dimension: "季节 · 防暑降温",
    theme: "v08",
    brand: {
      icon: "凉",
      name: "纳凉地图",
      tagline: "7–8 月 · 免费空调场地",
      navMini: "纳凉地图",
    },
    hero: {
      badge: "夏季高频",
      titleHtml: "夏天哪儿<br />有免费空调？",
      sub: "纳凉点 · 图书馆 · 地铁 · 防空洞",
    },
    searchPlaceholder: "搜纳凉、图书馆、地铁…",
    contentTitle: { default: "纳凉 · 有空调场地", nearby: "附近纳凉点" },
    emptyText: "点「纳凉」场景或筛「有空调」",
    footer: "纳凉地图 · 夏季开放以当地公告为准",
    tabDiscover: "纳凉",
    meta: {
      title: "纳凉地图 · 全国免费空调场地",
      description: "夏天免费纳凉：图书馆、地铁、防空洞。72城可查。",
    },
    onboard: [
      { icon: "🧊", title: "点「纳凉」", desc: "一键搜纳凉相关点位。" },
      { icon: "❄", title: "筛「有空调」", desc: "图书馆、驿家通常有空调。" },
      { icon: "📅", title: "注意季节", desc: "部分纳凉点仅 7–8 月开放。" },
      { icon: "💧", title: "饮水充电", desc: "驿家可同时筛饮水/充电。" },
    ],
  },

  h08: {
    id: "h08",
    name: "新城市指南",
    dimension: "异地 · 落脚安顿",
    theme: "v03",
    brand: {
      icon: "城",
      name: "城市落脚图",
      tagline: "刚到一座城 · 免费资源在哪",
      navMini: "落脚图",
    },
    hero: {
      badge: "72 城覆盖",
      titleHtml: "初到一座城<br />先查免费资源",
      sub: "定位选城 → 图书馆 / 驿家 / 政务工具",
    },
    searchPlaceholder: "搜这座城能做什么…",
    contentTitle: { default: "本城免费资源", nearby: "离你最近的便民点" },
    emptyText: "先点 📍 选对城市，或开定位",
    footer: "城市落脚图 · 异地办事参考",
    tabDiscover: "落脚",
    meta: {
      title: "城市落脚图 · 新城市免费资源",
      description: "刚到新城市？查免费图书馆、驿家、政务工具。定位即用。",
    },
    onboard: [
      { icon: "✈", title: "允许定位", desc: "自动匹配最近城市，按距离排序。" },
      { icon: "🏙", title: "或手动选城", desc: "热门城市 + 按省份浏览。" },
      { icon: "🔧", title: "看「工具」", desc: "全国政务、爱心驿站地图入口。" },
      { icon: "📚", title: "先找图书馆", desc: "最稳的免费WiFi+空调组合。" },
    ],
  },

  h09: {
    id: "h09",
    name: "银发关怀",
    dimension: "适老 · 大字清晰",
    theme: "v09",
    brand: {
      icon: "便",
      name: "便民地图",
      tagline: "大字好读 · 免费好找",
      navMini: "便民地图",
    },
    hero: {
      badge: "操作简单",
      titleHtml: "免费场地<br />一看就懂",
      sub: "点大标签筛选：WiFi、空调、饮水、充电",
    },
    searchPlaceholder: "输入：纳凉、厕所、充电…",
    contentTitle: { default: "附近免费场地", nearby: "离您最近" },
    emptyText: "请点上方彩色大按钮试试",
    footer: "便民地图 · 出行请以官方公告为准",
    tabDiscover: "首页",
    meta: {
      title: "便民地图 · 免费场地简单查",
      description: "大字清晰、操作简单。全国免费纳凉、WiFi、公厕查询。",
    },
    onboard: [
      { icon: "👆", title: "点彩色按钮", desc: "免费WiFi、有空调…点一下就能筛。" },
      { icon: "📍", title: "选城市", desc: "点左上角位置按钮。" },
      { icon: "👀", title: "看详情", desc: "点列表里任意一条。" },
      { icon: "🚗", title: "点导航", desc: "用高德地图带路。" },
    ],
    typography: { heroScale: 1.12, bodyScale: 1.08, chipScale: 1.06 },
  },

  h10: {
    id: "h10",
    name: "青年社区",
    dimension: "社群 · 公共共享",
    theme: "v05",
    brand: {
      icon: "共",
      name: "公共共享图",
      tagline: "城市的免费空间 · 本该被看见",
      navMini: "共享图",
    },
    hero: {
      badge: "公益非商业",
      titleHtml: "共享这座城的<br />免费公共空间",
      sub: "书房、公园、驿家 — 属于所有人的资源",
    },
    searchPlaceholder: "发现身边的免费空间…",
    contentTitle: { default: "公共免费空间", nearby: "身边的共享空间" },
    emptyText: "换个标签，也许就发现了",
    footer: "公共共享图 · 信息共建，欢迎反馈纠错",
    tabDiscover: "发现",
    meta: {
      title: "公共共享图 · 城市免费空间",
      description: "发现全国免费公共空间的共享地图。书房、公园、驿家。",
    },
    onboard: [
      { icon: "🤝", title: "公共资源", desc: "政府开放的免费空间，人人可用。" },
      { icon: "✦", title: "发现标签", desc: "WiFi、空调、饮水、充电 — 按需探索。" },
      { icon: "💬", title: "一起完善", desc: "信息不准？点反馈帮我们更新。" },
      { icon: "🌍", title: "72 城", desc: "从全国到具体城市，逐步细化。" },
    ],
  },
};

function getActiveCopyVariant() {
  const id = document.documentElement.dataset.copy;
  return id && COPY_VARIANTS[id] ? COPY_VARIANTS[id] : null;
}

if (typeof window !== "undefined") {
  window.COPY_VARIANTS = COPY_VARIANTS;
  window.getActiveCopyVariant = getActiveCopyVariant;

  (function applyCopyEarly() {
    const VALID = /^h(0[1-9]|10)$/;
    const copyId = new URLSearchParams(location.search).get("copy");
    if (!copyId || !VALID.test(copyId) || !COPY_VARIANTS[copyId]) return;
    document.documentElement.dataset.copy = copyId;
    const v = COPY_VARIANTS[copyId];
    if (v.theme) document.documentElement.dataset.theme = v.theme;
    try {
      if (new URLSearchParams(location.search).get("copy")) {
        localStorage.setItem("copyLab", copyId);
      }
    } catch {
      /* ignore */
    }
  })();
}
