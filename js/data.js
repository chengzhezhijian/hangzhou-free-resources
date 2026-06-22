/**
 * 全国惠民地图 · 数据与配置（含浙江细粒度扩展）
 * 来源：政府公开信息整理，出行前请核实当日开放状态
 */
const RESOURCE_CATEGORIES = [
  { id: "all", label: "全部", icon: "◎" },
  { id: "library", label: "图书馆", icon: "📚", group: "culture" },
  { id: "reading", label: "城市书房", icon: "📖", group: "culture" },
  { id: "museum", label: "博物馆", icon: "🏛", group: "culture" },
  { id: "station", label: "爱心驿家", icon: "♥", group: "comfort" },
  { id: "bunker", label: "防空洞纳凉", icon: "🧊", group: "comfort" },
  { id: "metro", label: "地铁纳凉", icon: "🚇", group: "comfort" },
  { id: "community", label: "党群中心", icon: "🏠", group: "comfort" },
  { id: "parking", label: "停车", icon: "🅿", group: "travel" },
  { id: "park", label: "公园", icon: "🌳", group: "outdoor" },
  { id: "sports", label: "体育场馆", icon: "⚽", group: "outdoor" },
  { id: "camping", label: "露营点", icon: "⛺", group: "outdoor" },
  { id: "toilet", label: "公厕", icon: "🚻", group: "amenity" },
  { id: "charging", label: "充电", icon: "🔌", group: "amenity" },
  { id: "wifi_pub", label: "公共WiFi", icon: "📶", group: "amenity" },
  { id: "policy", label: "免费政策", icon: "📋", group: "policy" },
  { id: "gov_service", label: "政务服务", icon: "🏢", group: "policy" },
  { id: "court", label: "法院", icon: "🏛", group: "policy" },
  { id: "legal", label: "法律咨询", icon: "⚖", group: "policy" },
  { id: "training", label: "职业培训", icon: "🎓", group: "policy" },
];

/** 核心卖点：高频设施（对应设施筛选 id） */
const VALUE_PERKS = [
  { id: "wifi", label: "📶 免费WiFi", short: "WiFi", facility: "wifi", desc: "图书馆、城市书房免费无线网络" },
  { id: "ac", label: "❄️ 有空调", short: "空调", facility: "ac", desc: "纳凉点、图书馆、驿家空调" },
  { id: "water", label: "💧 可饮水", short: "饮水", facility: "water", desc: "爱心驿家、党群中心饮水" },
  { id: "charge", label: "🔌 可充电", short: "充电", facility: "charge", desc: "充电站、驿家插座" },
];

/** 筛选 chips 展示顺序：高频需求优先（all 始终首位） */
const CATEGORY_DISPLAY_ORDER = [
  "all",
  "park",
  "reading",
  "library",
  "parking",
  "toilet",
  "bunker",
  "metro",
  "charging",
  "station",
  "community",
  "museum",
  "sports",
  "camping",
  "wifi_pub",
  "policy",
  "gov_service",
  "court",
  "legal",
  "training",
];

/** 顶部快捷场景（按用户需求频次排序） */
const QUICK_SCENES = [
  { label: "🌳 遛娃", category: "park", search: "" },
  { label: "📖 免费自习", category: "reading", search: "" },
  { label: "🅿️ 找停车", category: "parking", search: "" },
  { label: "🚻 公厕", category: "toilet", search: "" },
  { label: "🧊 纳凉", category: "all", search: "纳凉" },
  { label: "🔌 充电", category: "charging", search: "" },
];

const CATEGORY_GROUPS = [
  { id: "all", label: "全部大类" },
  { id: "culture", label: "文化阅读" },
  { id: "comfort", label: "避暑饮水" },
  { id: "travel", label: "出行停车" },
  { id: "outdoor", label: "户外休闲" },
  { id: "amenity", label: "便民设施" },
  { id: "policy", label: "政策指南" },
];

const COST_TYPE_LABELS = {
  free: "完全免费",
  conditional: "有条件免费",
  tool: "官方查询工具",
};

const FACILITY_FILTERS = [
  { id: "wifi", label: "免费WiFi" },
  { id: "ac", label: "有空调" },
  { id: "water", label: "可饮水" },
  { id: "charge", label: "可充电" },
  { id: "study", label: "可自习" },
  { id: "open24", label: "24小时" },
];

let CITIES = [
  "全部",
  "全省",
  "杭州",
  "宁波",
  "温州",
  "嘉兴",
  "湖州",
  "绍兴",
  "金华",
  "衢州",
  "舟山",
  "台州",
  "丽水",
];

/** 城市选择器选项（不含易混淆的「全省/全国」政策工具项） */
let CITY_PICKER = CITIES.filter((c) => c !== "全省" && c !== "全国");

/** 地级市列表（不含「全部」） */
let PREFECTURE_CITIES = CITY_PICKER.filter((c) => c !== "全部");

/** 杭州区县（仅在地市=杭州时使用） */
const DISTRICTS = [
  "全部", "上城", "拱墅", "西湖", "滨江", "萧山", "余杭", "富阳", "临平", "钱塘", "临安", "桐庐", "淳安", "建德",
];

const READING_SUBTYPES = [
  { id: "all", label: "全部子类" },
  { id: "邻里阅读空间", label: "邻里阅读空间" },
  { id: "杭州书房", label: "杭州书房" },
  { id: "城市书房", label: "城市书房" },
  { id: "地铁书房", label: "地铁书房" },
];

const SCENE_GUIDES = [
  { need: "想连 WiFi 安静自习", pick: "图书馆自修区 / 城市书房", alt: "筛「免费WiFi」或点「免费自习」，全国可查", category: "reading" },
  { need: "夏天想找空调纳凉", pick: "纳凉点 / 地铁纳凉 / 防空洞", alt: "点「纳凉」或筛「有空调」，7–8 月开放为主", category: "all", search: "纳凉" },
  { need: "手机快没电、想喝杯水", pick: "爱心驿家 / 党群中心", alt: "筛「可充电」「可饮水」，设施因站而异", category: "station" },
  { need: "带娃出门散步", pick: "城市公园 / 绿道", alt: "全省多数公园免费开放", category: "park" },
  { need: "想省停车费", pick: "当地政务 / 停车查询工具", alt: "点「找停车」或当地政务服务", category: "parking" },
  { need: "急找厕所", pick: "地图公厕工具 + 当地政务", alt: "选城市后可筛具体点位", category: "toilet" },
  { need: "手机或电车要充电", pick: "充电站 / 爱心驿家", alt: "筛「可充电」或点充电标签", category: "charging" },
  { need: "想免费运动", pick: "公共体育馆 / 校园场地", alt: "节假日部分场馆免费，各地公告为准", category: "sports" },
  { need: "刚到一座城市", pick: "点左上角选城市或开启定位", alt: "全国代表点位 + 当地官方查询工具" },
];

const EXTERNAL_TOOLS = [
  {
    name: "国家政务服务平台",
    desc: "全国政务办事、跨省通办、便民查询",
    url: "https://www.gov.cn/",
    scope: "全国",
    tag: "政务",
  },
  {
    name: "腾讯地图 · 全国爱心驿站",
    desc: "全国驿站，可筛饮水/充电/24小时",
    url: "https://map.qq.com/",
    scope: "全国",
    tag: "饮水充电",
  },
  {
    name: "高德地图 · 公厕与充电",
    desc: "全国公厕、充电站地图查询",
    url: "https://www.amap.com/",
    scope: "全国",
    tag: "便民",
  },
  {
    name: "国家图书馆",
    desc: "全国图书馆行业信息与咨询",
    url: "https://www.nlc.cn/",
    scope: "全国",
    tag: "免费WiFi",
  },
  {
    name: "浙里办",
    desc: "浙江找公厕、找车位、政务便民",
    url: "https://www.zjzwfw.gov.cn/",
    scope: "全省",
    tag: "政务",
  },
  {
    name: "浙里文化圈",
    desc: "全省公共文化场馆与活动预约",
    url: "https://www.zjwhyy.com/",
    scope: "全省",
    tag: "文化",
  },
  {
    name: "腾讯地图 · 爱心驿站",
    desc: "全国驿站地图，可筛饮水机/空调/24小时",
    url: "https://map.qq.com/",
    scope: "全省",
    tag: "驿家",
  },
  {
    name: "杭州图书馆",
    desc: "全市四级图书馆服务网点查询",
    url: "https://www.hzlib.net/fwwd/",
    scope: "杭州",
    tag: "图书馆",
  },
  {
    name: "宁波图书馆",
    desc: "市、县区图书馆与城市书房查询",
    url: "https://www.nblib.cn/",
    scope: "宁波",
    tag: "图书馆",
  },
  {
    name: "温州图书馆",
    desc: "市、县区图书馆与城市书房查询",
    url: "https://www.wzlib.cn/",
    scope: "温州",
    tag: "图书馆",
  },
  {
    name: "嘉兴图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "https://www.jxlib.com/lib/",
    scope: "嘉兴",
    tag: "图书馆",
  },
  {
    name: "湖州图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "http://www.hztsg.com/",
    scope: "湖州",
    tag: "图书馆",
  },
  {
    name: "绍兴图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "http://www.sxlib.com/",
    scope: "绍兴",
    tag: "图书馆",
  },
  {
    name: "金华图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "http://www.jhstsg.cn/",
    scope: "金华",
    tag: "图书馆",
  },
  {
    name: "衢州图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "https://www.qzlib.cn/",
    scope: "衢州",
    tag: "图书馆",
  },
  {
    name: "舟山图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "https://www.zsodl.cn/",
    scope: "舟山",
    tag: "图书馆",
  },
  {
    name: "台州图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "http://www.tzlib.cn/",
    scope: "台州",
    tag: "图书馆",
  },
  {
    name: "丽水图书馆",
    desc: "市、县区图书馆服务网点查询",
    url: "https://www.lslibrary.com.cn/lishui",
    scope: "丽水",
    tag: "图书馆",
  },
  { name: "首都图书馆", desc: "北京市公共图书馆服务", url: "https://www.clcn.net.cn/", scope: "北京", tag: "图书馆" },
  { name: "上海图书馆", desc: "上海市公共图书馆服务", url: "https://www.library.sh.cn/", scope: "上海", tag: "图书馆" },
  { name: "广州图书馆", desc: "广州市公共图书馆服务", url: "https://www.gzlib.org.cn/", scope: "广州", tag: "图书馆" },
  { name: "深圳图书馆", desc: "深圳市公共图书馆服务", url: "https://www.szlib.org.cn/", scope: "深圳", tag: "图书馆" },
  { name: "成都图书馆", desc: "成都市公共图书馆服务", url: "https://www.cdclib.org/", scope: "成都", tag: "图书馆" },
  { name: "武汉图书馆", desc: "武汉市公共图书馆服务", url: "https://www.whlib.org.cn/", scope: "武汉", tag: "图书馆" },
  { name: "西安图书馆", desc: "西安市公共图书馆服务", url: "https://www.xalib.org/", scope: "西安", tag: "图书馆" },
  { name: "南京图书馆", desc: "南京市公共图书馆服务", url: "https://www.njslib.com/", scope: "南京", tag: "图书馆" },
  { name: "重庆图书馆", desc: "重庆市公共图书馆服务", url: "https://www.cqlib.cn/", scope: "重庆", tag: "图书馆" },
  {
    name: "杭州网博物馆攻略",
    desc: "52 家市属博物馆错时开放表",
    url: "https://jrsh.hangzhou.com.cn/read/content/2023-07/29/content_8589412.htm",
    scope: "杭州",
    tag: "博物馆",
  },
  {
    name: "杭州国防动员",
    desc: "微信公众号 · 防空洞纳凉公告",
    url: "https://www.hangzhou.gov.cn/",
    scope: "杭州",
    tag: "纳凉",
  },
  {
    name: "一键借阅",
    desc: "杭州地区公共图书馆通借通还",
    url: "https://www.hzlib.net/tg/5708.htm",
    scope: "杭州",
    tag: "借阅",
  },
  {
    name: "邻里阅读空间名录",
    desc: "杭州图书馆官网 · 184 家通借通还网点",
    url: "https://www.zjhzlib.cn/dzfwtjth.htm",
    scope: "杭州",
    tag: "书房",
  },
  {
    name: "邻里停",
    desc: "杭州机关企事业单位 1.7 万+ 共享泊位",
    url: "https://www.zjzwfw.gov.cn/",
    scope: "杭州",
    tag: "停车",
  },
  {
    name: "杭州体育在线",
    desc: "384+ 场馆、945 个校园免费室外场地预约",
    url: "https://ori.hangzhou.com.cn/ornews/content/2024-05/24/content_8734095.htm",
    scope: "杭州",
    tag: "体育",
  },
  {
    name: "杭州市城市公园名录",
    desc: "2026 年版，全市 747 个城市公园",
    url: "http://www.zj.xinhuanet.com/20260508/b261af240c0a48f49a0a0975007a01f6/c.html",
    scope: "杭州",
    tag: "公园",
  },
];

function mapLink(address, city, name) {
  const c = city || "杭州";
  const prefix = c === "全省" ? "浙江" : c.endsWith("市") ? c : `${c}市`;
  const keyword = (name || address || "").trim();
  const parts = [
    `keyword=${encodeURIComponent(keyword)}`,
    `view=list`,
    `callnative=1`,
    `src=zhelihuimin`,
  ];
  if (c !== "全省") parts.push(`city=${encodeURIComponent(prefix)}`);
  return `https://uri.amap.com/search?${parts.join("&")}`;
}

function normalizeResource(r) {
  if (!r.city) r.city = "杭州";
  if (typeof MapNav !== "undefined") {
    r.mapUrl = MapNav.buildUrl(r) || r.mapUrl || mapLink(r.address, r.city, r.name);
  } else if (!r.mapUrl) {
    r.mapUrl = mapLink(r.address, r.city, r.name);
  }
  return r;
}

const RESOURCES = [
  // —— 图书馆 ——
  {
    id: "lib-hz-main",
    name: "杭州图书馆（市民中心馆）",
    category: "library",
    district: "上城",
    address: "上城区解放东路18号市民中心J楼",
    hours: "自修区 周一至周日 8:00—21:30；借阅区 周二至周日 9:00—21:00",
    phone: "0571-86535111",
    transport: "地铁4/7号线市民中心站、9号线新业路站",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["自修区周一闭馆日仍开放", "读者证/短信/微信认证上网", "电子阅览每日约2小时"],
    website: "https://www.zjhzlib.cn/",
    note: "杭州公共图书馆中心馆，全年首选自习点",
  },
  {
    id: "lib-hz-life",
    name: "杭州图书馆生活主题分馆",
    category: "library",
    district: "上城",
    address: "上城区浣纱路254号",
    hours: "周二至周日 1层 9:00—21:00，2-4层 9:00—17:30",
    phone: "",
    transport: "近浙一医院",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["生活主题藏书"],
    website: "https://www.zjhzlib.cn/",
  },
  {
    id: "lib-hz-child",
    name: "杭州图书馆少儿分馆",
    category: "library",
    district: "西湖",
    address: "西湖区曙光路75号",
    hours: "周二至周日 9:00—17:00，周一闭馆",
    phone: "",
    transport: "近浙江图书馆",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["少儿阅览"],
    website: "https://www.zjhzlib.cn/",
  },
  {
    id: "lib-shangcheng",
    name: "上城区图书馆",
    category: "library",
    district: "上城",
    address: "上城区太平门直街458号文化中心6楼",
    hours: "周二至周日 9:00—21:00，周一闭馆",
    phone: "0571-86753385",
    transport: "公交太平门直街站",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["国家一级馆", "杭州书房22家、邻里阅读空间22家"],
    website: "https://www.hzlib.net/fwwd/5772.htm",
  },
  {
    id: "lib-xihu",
    name: "西湖区图书馆",
    category: "library",
    district: "西湖",
    address: "西湖区古墩路413-1号",
    hours: "周二至周日 9:00—20:30，周一闭馆",
    phone: "0571-87987713",
    transport: "地铁2号线文新站",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["读者自修区", "盲文借阅区"],
    website: "https://www.hzlib.net/fwwd/687.htm",
  },
  {
    id: "lib-gongshu",
    name: "拱墅区图书馆",
    category: "library",
    district: "拱墅",
    address: "拱墅区祥符街道北城街55号（人防大厦B座）",
    hours: "周二至周日 9:00—20:30，周一闭馆",
    phone: "0571-88162811",
    transport: "地铁5号线拱宸桥东站",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["运河书房", "休闲书吧", "视障阅览室"],
    website: "https://www.gongshu.gov.cn/",
  },
  {
    id: "lib-gongshu-wulin",
    name: "拱墅区图书馆武林馆",
    category: "library",
    district: "拱墅",
    address: "拱墅区潮王路8-1号",
    hours: "周二至周日 9:00—20:30，周一闭馆",
    phone: "0571-88162811",
    transport: "近浙江工业大学",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["原下城区图书馆"],
  },
  {
    id: "lib-binjiang",
    name: "滨江区图书馆",
    category: "library",
    district: "滨江",
    address: "滨江区泰安路200号文化中心6楼",
    hours: "周二至周日 9:00—21:00，周一闭馆",
    phone: "0571-86535229",
    transport: "滨江文化中心",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["通借通还"],
    website: "https://www.hzlib.net/",
  },
  {
    id: "lib-xiaoshan",
    name: "萧山图书馆",
    category: "library",
    district: "萧山",
    address: "萧山区市心中路958号",
    hours: "周二至周日 8:30—20:30，周一闭馆",
    phone: "0571-83862200",
    transport: "市心中路",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["一键借阅"],
    website: "https://www.xslib.com.cn/",
  },
  {
    id: "lib-yuhang",
    name: "余杭区图书馆",
    category: "library",
    district: "余杭",
    address: "余杭区瓶窑镇崇北街9号",
    hours: "工作日 8:20—17:00",
    phone: "0571-88728960",
    transport: "瓶窑镇",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["区总馆"],
  },
  {
    id: "lib-linping",
    name: "临平区图书馆",
    category: "library",
    district: "临平",
    address: "临平区南苑街道人民大道",
    hours: "周二至周日 8:30—17:00，周一闭馆",
    phone: "0571-86244040",
    transport: "临平城区",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: ["通借通还"],
  },
  {
    id: "lib-fuyang",
    name: "富阳区图书馆",
    category: "library",
    district: "富阳",
    address: "富阳区富春街道桂花路",
    hours: "周二至周日 8:30—17:00，周一闭馆",
    phone: "0571-63349709",
    transport: "富阳城区",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: [],
  },
  {
    id: "lib-linan",
    name: "临安区图书馆",
    category: "library",
    district: "临安",
    address: "临安区锦城街道衣锦街",
    hours: "以馆方公告为准",
    phone: "",
    transport: "临安城区",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false },
    seasonal: false,
    features: [],
  },
  {
    id: "lib-canal",
    name: "杭州图书馆运河主题分馆",
    category: "library",
    district: "拱墅",
    address: "拱墅区半山街道炼铁路178号一号高炉一楼",
    hours: "周二至周日 10:30—19:30，周一闭馆",
    phone: "",
    transport: "大运河公园",
    facilities: { wifi: true, water: "partial", ac: true, study: true, charge: false, open24: false },
    seasonal: false,
    features: ["运河主题", "通借通还"],
    website: "https://www.zjhzlib.cn/fwwd/6908.htm",
  },

  // —— 博物馆 ——
  {
    id: "mus-zhejiang",
    name: "浙江省博物馆（之江馆区）",
    category: "museum",
    district: "西湖",
    address: "西湖区之江文化中心",
    hours: "周二至周日 9:00—17:00（16:30停止入馆），周一闭馆",
    phone: "",
    transport: "地铁6号线枫桦西路站",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["免费", "个人免预约", "展陈面积3万+㎡"],
    website: "https://www.zhejiangmuseum.com/",
  },
  {
    id: "mus-wetland",
    name: "中国湿地博物馆",
    category: "museum",
    district: "西湖",
    address: "西湖区天目山路402号",
    hours: "9:00—16:30，周一闭馆",
    phone: "",
    transport: "地铁3号线东岳站",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["免费", "个人免预约", "避暑逛展"],
  },
  {
    id: "mus-anime",
    name: "中国动漫博物馆",
    category: "museum",
    district: "萧山",
    address: "萧山区白马湖路",
    hours: "周三至周日 9:30—16:30，周一二闭馆",
    phone: "",
    transport: "白马湖",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["免费", "无需预约"],
  },
  {
    id: "mus-natural",
    name: "浙江自然博物院（杭州馆）",
    category: "museum",
    district: "西湖",
    address: "西湖区西湖文化广场",
    hours: "9:00—16:00，周一休馆",
    phone: "",
    transport: "西湖文化广场",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["免费", "周末节假日需预约"],
  },
  {
    id: "mus-science",
    name: "浙江省科技馆",
    category: "museum",
    district: "西湖",
    address: "西湖区西湖文化广场",
    hours: "周三至周日 9:00—16:30，周一二闭馆",
    phone: "",
    transport: "西湖文化广场",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["免费", "周末节假日需预约"],
  },
  {
    id: "mus-craft",
    name: "杭州工艺美术博物馆",
    category: "museum",
    district: "拱墅",
    address: "拱墅区小河路334号",
    hours: "9:00—16:30，周二闭馆",
    phone: "",
    transport: "桥西历史街区",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["含刀剪剑/伞/扇博物馆", "免费"],
  },
  {
    id: "mus-feiyi",
    name: "浙江省非物质文化遗产馆",
    category: "museum",
    district: "西湖",
    address: "西湖区之江文化中心",
    hours: "周二至周日 9:00—17:00，周一闭馆",
    phone: "",
    transport: "地铁6号线枫桦西路站",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["免费", "刷身份证/社保卡入馆"],
  },
  {
    id: "mus-hangzhou",
    name: "杭州博物馆",
    category: "museum",
    district: "上城",
    address: "上城区粮道山18号",
    hours: "周二闭馆，周三至周日 9:00—16:30",
    phone: "",
    transport: "吴山广场",
    facilities: { wifi: "partial", water: "partial", ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["免费", "微信公众号预约"],
  },

  // —— 爱心驿家 ——
  {
    id: "sta-zhigong",
    name: "杭州市职工服务中心爱心驿家",
    category: "station",
    district: "上城",
    address: "上城区岳王路",
    hours: "以现场公告为准",
    phone: "",
    transport: "地铁1号线定安路站，近湖滨商圈",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    featured: true,
    features: ["旗舰站点约2000㎡", "职工书屋、妈咪小屋、心理咨询"],
    note: "全市约749—905家驿家，更多请用腾讯地图搜「爱心驿站」",
  },
  {
    id: "sta-gongshu-24h",
    name: "拱墅区湖墅南路智能驿家",
    category: "station",
    district: "拱墅",
    address: "拱墅区湖墅南路",
    hours: "24小时",
    phone: "",
    transport: "公交湖墅南路沿线",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: true },
    seasonal: false,
    featured: true,
    features: ["微信扫码进门", "智能门禁"],
  },
  {
    id: "sta-xizhan-driver",
    name: "杭州西站司机之家",
    category: "station",
    district: "余杭",
    address: "余杭区杭州西站",
    hours: "24小时",
    phone: "",
    transport: "地铁19号线杭州西站",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: true },
    seasonal: false,
    features: ["360㎡", "微波炉、AED、24小时热水卫生间"],
  },
  {
    id: "sta-xizhan-outdoor",
    name: "杭州西站户外劳动者之家",
    category: "station",
    district: "余杭",
    address: "余杭区杭州西站（东、西两处）",
    hours: "以现场为准",
    phone: "",
    transport: "地铁19号线杭州西站",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["休息、饮水、应急药品"],
  },
  {
    id: "sta-xizhan-traveler",
    name: "杭州西站旅客之家",
    category: "station",
    district: "余杭",
    address: "余杭区杭州西站",
    hours: "24小时响应",
    phone: "",
    transport: "地铁19号线杭州西站",
    facilities: { wifi: true, water: true, ac: true, study: false, charge: true, open24: true },
    seasonal: false,
    features: ["过夜休息区", "躺椅、毛毯、洗漱用品"],
  },
  {
    id: "sta-qinglin",
    name: "清林爱心公益小哥驿站",
    category: "station",
    district: "上城",
    address: "上城区日信国际广场",
    hours: "以现场为准",
    phone: "",
    transport: "望江街道",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["冰柜、微波炉、充电线"],
  },
  {
    id: "sta-yunzhou",
    name: "西湖区云州国际爱心驿家",
    category: "station",
    district: "西湖",
    address: "西湖区云州国际",
    hours: "以现场为准",
    phone: "",
    transport: "云州国际商圈",
    facilities: { wifi: "partial", water: true, ac: true, study: false, charge: true, open24: false },
    seasonal: false,
    features: ["小哥食堂", "招聘/租房服务屏"],
  },

  // —— 防空洞纳凉 ——
  {
    id: "bunker-sipailou",
    name: "四牌楼避暑纳凉点",
    category: "bunker",
    district: "上城",
    address: "上城区四牌楼38号",
    hours: "夏季 8:30—17:30（通常7—8月）",
    phone: "",
    transport: "沿十五奎巷步行",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: true, open24: false },
    seasonal: true,
    seasonalNote: "每年约7月1日—8月31日开放",
    featured: true,
    features: ["室内约25℃", "桶装水、共享书屋、IPTV", "面积最大、人气最旺"],
    note: "关注「杭州国防动员」公众号获取当年公告",
  },
  {
    id: "bunker-baimamiao",
    name: "白马庙巷避暑纳凉点",
    category: "bunker",
    district: "上城",
    address: "上城区白马庙巷48号对面",
    hours: "夏季 8:30—17:30",
    phone: "",
    transport: "白马庙巷",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: false, open24: false },
    seasonal: true,
    seasonalNote: "每年约7月1日—8月31日开放",
    features: ["老牌纳凉点"],
  },
  {
    id: "bunker-mantoushan",
    name: "馒头山路27号避暑纳凉点",
    category: "bunker",
    district: "上城",
    address: "上城区馒头山路27号",
    hours: "夏季 8:30—17:30",
    phone: "",
    transport: "馒头山路",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: false, open24: false },
    seasonal: true,
    seasonalNote: "每年约7月1日—8月31日开放",
    features: ["老牌纳凉点"],
  },
  {
    id: "bunker-mianfang",
    name: "棉纺工地坑道",
    category: "bunker",
    district: "西湖",
    address: "西湖区宝石山四弄",
    hours: "夏季 8:30—17:30",
    phone: "",
    transport: "宝石山",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: false, open24: false },
    seasonal: true,
    seasonalNote: "2025年新增",
    features: ["新增点位"],
  },
  {
    id: "bunker-xishan",
    name: "西山坑道纳凉点",
    category: "bunker",
    district: "萧山",
    address: "萧山区萧金路2号",
    hours: "夏季 8:30—17:30",
    phone: "",
    transport: "萧金路",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: false, open24: false },
    seasonal: true,
    seasonalNote: "2025年新增",
    featured: true,
    features: ["网红打卡点"],
  },
  {
    id: "bunker-guanshan",
    name: "鹳山防空洞",
    category: "bunker",
    district: "富阳",
    address: "富阳区鹳山公园入口左侧",
    hours: "夏季 8:30—17:30",
    phone: "",
    transport: "鹳山公园",
    facilities: { wifi: true, water: true, ac: true, study: true, charge: false, open24: false },
    seasonal: true,
    seasonalNote: "2025年新增",
    features: ["富阳首个防空洞纳凉点"],
  },

  // —— 社区党群 ——
  {
    id: "com-donghe",
    name: "东河社区党群服务中心（纳凉点）",
    category: "community",
    district: "拱墅",
    address: "拱墅区潮鸣街道东河社区",
    hours: "工作时间内，夏季开放",
    phone: "",
    transport: "潮鸣街道",
    facilities: { wifi: true, water: true, ac: true, study: false, charge: true, open24: false },
    seasonal: true,
    seasonalNote: "夏季纳凉点",
    features: ["凉茶、防暑药品、充电宝"],
    note: "各街道夏季临时开放，关注街道公众号",
  },
];

// 地铁纳凉站 — 按线路批量生成
const METRO_COOLING_LINES = [
  { line: "1号线", stations: ["湘湖", "城站", "七堡", "云水", "下沙江滨", "杭州大会展中心", "港城大道", "南阳", "向阳路"] },
  { line: "2号线", stations: ["朝阳", "潘水", "人民路", "钱江路", "古翠路", "学院路", "文新", "良渚"] },
  { line: "3号线", stations: ["华鹤街", "汽轮广场", "新天地街", "黄龙洞", "黄龙体育中心", "古荡新村", "文一西路"] },
  { line: "4号线", stations: ["金家渡", "桃源街", "池华街", "好运街", "储运路", "笕桥老街", "华中南路", "新塘", "景芳", "钱江路", "南星桥", "水澄桥", "复兴路"] },
  { line: "5号线", stations: ["南湖东", "绿汀路", "葛巷", "蒋村", "三坝", "大运河", "拱宸桥东", "善贤", "杭氧", "打铁关", "宝善桥", "候潮门", "长河", "江晖路", "滨康路", "姑娘桥"] },
  { line: "6号线", stations: ["桂花西路", "公望街", "阳陂湖", "高桥", "富阳客运中心", "野生动物园东", "西浦路", "三堡", "昙花庵路"] },
  { line: "7号线", stations: ["坎山", "新街", "盈中", "永盛路", "新兴路", "吴山广场", "塘新线", "江东二路"] },
  { line: "9号线", stations: ["乔司南", "乔司", "翁梅", "九睦路", "红普南路", "六堡", "三堡", "钱江路", "新业路", "荷禹路"] },
  { line: "10号线", stations: ["花园岗", "金德路"] },
  { line: "16号线", stations: ["禹航路"] },
  { line: "19号线", stations: ["海创园", "荆长路"] },
];

METRO_COOLING_LINES.forEach(({ line, stations }) => {
  stations.forEach((station) => {
    RESOURCES.push({
      id: `metro-${line}-${station}`,
      name: `${station}站`,
      category: "metro",
      city: "杭州",
      district: "杭州",
      address: `杭州地铁${line} ${station}站站厅层`,
      hours: "地铁运营时间内；夏季纳凉点",
      phone: "",
      transport: `地铁${line}`,
      facilities: { wifi: "partial", water: false, ac: true, study: false, charge: false, open24: false },
      seasonal: true,
      seasonalNote: "夏季开放，站厅指定区域",
      features: ["防暑药品可向工作人员取用", "遵守文明纳凉公约"],
      note: "请勿占通道、勿躺卧",
    });
  });
});

// 合并城市书房 / 邻里阅读空间（data-study-spaces.js）
if (typeof STUDY_SPACES !== "undefined") {
  RESOURCES.push(
    ...STUDY_SPACES.map((r) => ({ ...r, city: r.city || "杭州" }))
  );
}
// 合并停车、公园、公厕、体育等扩展资源（data-extra-resources.js）
if (typeof EXTRA_RESOURCES !== "undefined") {
  RESOURCES.push(...EXTRA_RESOURCES);
}

// 合并浙江省其他地市（全省工具 + 各地市扩展）
if (typeof ZHEJIANG_CITY_RESOURCES !== "undefined") {
  RESOURCES.push(...ZHEJIANG_CITY_RESOURCES);
}
if (typeof ZHEJIANG_EXPANDED_RESOURCES !== "undefined") {
  RESOURCES.push(...ZHEJIANG_EXPANDED_RESOURCES);
}
if (typeof CHINA_NATIONWIDE_RESOURCES !== "undefined") {
  RESOURCES.push(...CHINA_NATIONWIDE_RESOURCES);
}
if (typeof AMAP_HANGZHOU_RESOURCES !== "undefined") {
  RESOURCES.push(...AMAP_HANGZHOU_RESOURCES);
}

if (typeof NATIONWIDE_CITIES !== "undefined" && typeof SITE_SCOPE !== "undefined" && SITE_SCOPE === "china") {
  CITIES = NATIONWIDE_CITIES.slice();
  CITY_PICKER = CITIES.filter((c) => c !== "全国");
  PREFECTURE_CITIES = CITY_PICKER.filter((c) => c !== "全部");
}

RESOURCES.forEach(normalizeResource);
