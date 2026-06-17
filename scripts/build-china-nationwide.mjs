#!/usr/bin/env node
/**
 * 生成全国扩展资源（各省代表城市 + 丰富模板点位）
 * 用法: node scripts/build-china-nationwide.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "js", "data-china-nationwide.js");
const META_OUT = path.join(__dirname, "..", "js", "data-china-config.js");

/** 已有细粒度数据的浙江城市（跳过模板生成避免重复） */
const ZJ_DETAILED = new Set([
  "杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水",
]);

const LIB_FAC = { wifi: true, water: "partial", ac: true, study: true, charge: true, open24: false };
const READ_FAC = { wifi: "partial", water: "partial", ac: true, study: true, charge: "partial", open24: false };
const STATION_FAC = { wifi: "partial", water: true, ac: "partial", charge: "partial", open24: "partial" };

/** 省 → 城市列表（含中心坐标、政务入口） */
const REGIONS = [
  { province: "北京", cities: [{ name: "北京", lat: 39.9042, lng: 116.4074, gov: "https://www.beijing.gov.cn/" }] },
  { province: "天津", cities: [{ name: "天津", lat: 39.3434, lng: 117.3616, gov: "https://www.tj.gov.cn/" }] },
  { province: "河北", cities: [
    { name: "石家庄", lat: 38.0428, lng: 114.5149, gov: "https://www.sjz.gov.cn/" },
    { name: "唐山", lat: 39.6309, lng: 118.1802, gov: "https://www.tangshan.gov.cn/" },
    { name: "保定", lat: 38.8739, lng: 115.4648, gov: "https://www.baoding.gov.cn/" },
    { name: "邯郸", lat: 36.6256, lng: 114.5391, gov: "https://www.hd.gov.cn/" },
    { name: "秦皇岛", lat: 39.9354, lng: 119.6, gov: "https://www.qhd.gov.cn/" },
  ]},
  { province: "山西", cities: [
    { name: "太原", lat: 37.8706, lng: 112.5489, gov: "https://www.taiyuan.gov.cn/" },
    { name: "大同", lat: 40.0768, lng: 113.3001, gov: "https://www.dt.gov.cn/" },
    { name: "临汾", lat: 36.088, lng: 111.519, gov: "https://www.linfen.gov.cn/" },
  ]},
  { province: "内蒙古", cities: [
    { name: "呼和浩特", lat: 40.8414, lng: 111.7519, gov: "https://www.huhhot.gov.cn/" },
    { name: "包头", lat: 40.6574, lng: 109.8403, gov: "https://www.baotou.gov.cn/" },
  ]},
  { province: "辽宁", cities: [
    { name: "沈阳", lat: 41.8057, lng: 123.4315, gov: "https://www.shenyang.gov.cn/" },
    { name: "大连", lat: 38.914, lng: 121.6147, gov: "https://www.dl.gov.cn/" },
    { name: "鞍山", lat: 41.1087, lng: 122.9945, gov: "https://www.anshan.gov.cn/" },
    { name: "抚顺", lat: 41.88, lng: 123.957, gov: "https://www.fushun.gov.cn/" },
  ]},
  { province: "吉林", cities: [
    { name: "长春", lat: 43.8171, lng: 125.3235, gov: "https://www.changchun.gov.cn/" },
    { name: "吉林", lat: 43.8378, lng: 126.5496, gov: "https://www.jlcity.gov.cn/" },
  ]},
  { province: "黑龙江", cities: [
    { name: "哈尔滨", lat: 45.8038, lng: 126.5349, gov: "https://www.harbin.gov.cn/" },
    { name: "齐齐哈尔", lat: 47.3543, lng: 123.9182, gov: "https://www.qqhr.gov.cn/" },
  ]},
  { province: "上海", cities: [{ name: "上海", lat: 31.2304, lng: 121.4737, gov: "https://www.shanghai.gov.cn/" }] },
  { province: "江苏", cities: [
    { name: "南京", lat: 32.0603, lng: 118.7969, gov: "https://www.nanjing.gov.cn/" },
    { name: "苏州", lat: 31.2989, lng: 120.5853, gov: "https://www.suzhou.gov.cn/" },
    { name: "无锡", lat: 31.4912, lng: 120.3124, gov: "https://www.wuxi.gov.cn/" },
    { name: "常州", lat: 31.8107, lng: 119.974, gov: "https://www.changzhou.gov.cn/" },
    { name: "南通", lat: 31.9802, lng: 120.8943, gov: "https://www.nantong.gov.cn/" },
    { name: "徐州", lat: 34.2044, lng: 117.2858, gov: "https://www.xz.gov.cn/" },
    { name: "扬州", lat: 32.3932, lng: 119.4127, gov: "https://www.yangzhou.gov.cn/" },
  ]},
  { province: "浙江", cities: [
    { name: "杭州", lat: 30.2741, lng: 120.1551, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "宁波", lat: 29.8683, lng: 121.544, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "温州", lat: 28.0006, lng: 120.6994, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "嘉兴", lat: 30.7461, lng: 120.7555, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "湖州", lat: 30.8931, lng: 120.0881, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "绍兴", lat: 30.0023, lng: 120.582, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "金华", lat: 29.0789, lng: 119.6478, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "衢州", lat: 28.9417, lng: 118.8743, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "舟山", lat: 29.9853, lng: 122.2072, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "台州", lat: 28.6564, lng: 121.4208, gov: "https://www.zjzwfw.gov.cn/" },
    { name: "丽水", lat: 28.4517, lng: 119.9229, gov: "https://www.zjzwfw.gov.cn/" },
  ]},
  { province: "安徽", cities: [
    { name: "合肥", lat: 31.8206, lng: 117.2272, gov: "https://www.hefei.gov.cn/" },
    { name: "芜湖", lat: 31.3529, lng: 118.4329, gov: "https://www.wuhu.gov.cn/" },
    { name: "蚌埠", lat: 32.9164, lng: 117.3893, gov: "https://www.bengbu.gov.cn/" },
    { name: "马鞍山", lat: 31.6704, lng: 118.5061, gov: "https://www.mas.gov.cn/" },
  ]},
  { province: "福建", cities: [
    { name: "福州", lat: 26.0745, lng: 119.2965, gov: "https://www.fuzhou.gov.cn/" },
    { name: "厦门", lat: 24.4798, lng: 118.0894, gov: "https://www.xm.gov.cn/" },
    { name: "泉州", lat: 24.8741, lng: 118.6757, gov: "https://www.quanzhou.gov.cn/" },
    { name: "漳州", lat: 24.513, lng: 117.6471, gov: "https://www.zhangzhou.gov.cn/" },
    { name: "莆田", lat: 25.454, lng: 119.008, gov: "https://www.putian.gov.cn/" },
  ]},
  { province: "江西", cities: [
    { name: "南昌", lat: 28.682, lng: 115.8579, gov: "https://www.nc.gov.cn/" },
    { name: "赣州", lat: 25.8311, lng: 114.935, gov: "https://www.ganzhou.gov.cn/" },
    { name: "九江", lat: 29.7051, lng: 116.0019, gov: "https://www.jiujiang.gov.cn/" },
    { name: "上饶", lat: 28.455, lng: 117.943, gov: "https://www.zgsr.gov.cn/" },
  ]},
  { province: "山东", cities: [
    { name: "济南", lat: 36.6512, lng: 117.1201, gov: "https://www.jinan.gov.cn/" },
    { name: "青岛", lat: 36.0671, lng: 120.3826, gov: "https://www.qingdao.gov.cn/" },
    { name: "烟台", lat: 37.4638, lng: 121.4479, gov: "https://www.yantai.gov.cn/" },
    { name: "潍坊", lat: 36.7069, lng: 119.1619, gov: "https://www.weifang.gov.cn/" },
    { name: "临沂", lat: 35.1047, lng: 118.3564, gov: "https://www.linyi.gov.cn/" },
  ]},
  { province: "河南", cities: [
    { name: "郑州", lat: 34.7466, lng: 113.6254, gov: "https://www.zhengzhou.gov.cn/" },
    { name: "洛阳", lat: 34.6197, lng: 112.454, gov: "https://www.ly.gov.cn/" },
    { name: "开封", lat: 34.7971, lng: 114.3074, gov: "https://www.kaifeng.gov.cn/" },
    { name: "新乡", lat: 35.303, lng: 113.926, gov: "https://www.xinxiang.gov.cn/" },
  ]},
  { province: "湖北", cities: [
    { name: "武汉", lat: 30.5928, lng: 114.3055, gov: "https://www.wuhan.gov.cn/" },
    { name: "宜昌", lat: 30.6919, lng: 111.2865, gov: "https://www.yichang.gov.cn/" },
    { name: "襄阳", lat: 32.0089, lng: 112.1226, gov: "https://www.xiangyang.gov.cn/" },
    { name: "荆州", lat: 30.334, lng: 112.241, gov: "https://www.jingzhou.gov.cn/" },
  ]},
  { province: "湖南", cities: [
    { name: "长沙", lat: 28.2282, lng: 112.9388, gov: "https://www.changsha.gov.cn/" },
    { name: "株洲", lat: 27.8274, lng: 113.1339, gov: "https://www.zhuzhou.gov.cn/" },
    { name: "岳阳", lat: 29.357, lng: 113.129, gov: "https://www.yueyang.gov.cn/" },
    { name: "湘潭", lat: 27.829, lng: 112.944, gov: "https://www.xiangtan.gov.cn/" },
  ]},
  { province: "广东", cities: [
    { name: "广州", lat: 23.1291, lng: 113.2644, gov: "https://www.gz.gov.cn/" },
    { name: "深圳", lat: 22.5431, lng: 114.0579, gov: "https://www.sz.gov.cn/" },
    { name: "珠海", lat: 22.2707, lng: 113.5767, gov: "https://www.zhuhai.gov.cn/" },
    { name: "佛山", lat: 23.0218, lng: 113.1219, gov: "https://www.foshan.gov.cn/" },
    { name: "东莞", lat: 23.0207, lng: 113.7518, gov: "https://www.dg.gov.cn/" },
    { name: "惠州", lat: 23.111, lng: 114.416, gov: "https://www.huizhou.gov.cn/" },
    { name: "中山", lat: 22.517, lng: 113.392, gov: "https://www.zs.gov.cn/" },
  ]},
  { province: "广西", cities: [
    { name: "南宁", lat: 22.817, lng: 108.3665, gov: "https://www.nanning.gov.cn/" },
    { name: "桂林", lat: 25.2736, lng: 110.29, gov: "https://www.guilin.gov.cn/" },
    { name: "柳州", lat: 24.326, lng: 109.428, gov: "https://www.liuzhou.gov.cn/" },
    { name: "北海", lat: 21.481, lng: 109.12, gov: "https://www.beihai.gov.cn/" },
  ]},
  { province: "海南", cities: [
    { name: "海口", lat: 20.044, lng: 110.1999, gov: "https://www.haikou.gov.cn/" },
    { name: "三亚", lat: 18.2528, lng: 109.5119, gov: "https://www.sanya.gov.cn/" },
  ]},
  { province: "重庆", cities: [{ name: "重庆", lat: 29.563, lng: 106.5516, gov: "https://www.cq.gov.cn/" }] },
  { province: "四川", cities: [
    { name: "成都", lat: 30.5728, lng: 104.0668, gov: "https://www.chengdu.gov.cn/" },
    { name: "绵阳", lat: 31.4675, lng: 104.6796, gov: "https://www.my.gov.cn/" },
    { name: "德阳", lat: 31.127, lng: 104.398, gov: "https://www.deyang.gov.cn/" },
    { name: "乐山", lat: 29.552, lng: 103.766, gov: "https://www.leshan.gov.cn/" },
  ]},
  { province: "贵州", cities: [
    { name: "贵阳", lat: 26.647, lng: 106.6302, gov: "https://www.guiyang.gov.cn/" },
    { name: "遵义", lat: 27.7257, lng: 106.9274, gov: "https://www.zunyi.gov.cn/" },
    { name: "六盘水", lat: 26.592, lng: 104.83, gov: "https://www.gzlps.gov.cn/" },
  ]},
  { province: "云南", cities: [
    { name: "昆明", lat: 25.0389, lng: 102.7183, gov: "https://www.km.gov.cn/" },
    { name: "大理", lat: 25.6065, lng: 100.2676, gov: "https://www.dali.gov.cn/" },
    { name: "曲靖", lat: 25.49, lng: 103.796, gov: "https://www.qj.gov.cn/" },
    { name: "丽江", lat: 26.855, lng: 100.227, gov: "https://www.lijiang.gov.cn/" },
  ]},
  { province: "西藏", cities: [{ name: "拉萨", lat: 29.652, lng: 91.1721, gov: "http://www.lasa.gov.cn/" }] },
  { province: "陕西", cities: [
    { name: "西安", lat: 34.3416, lng: 108.9398, gov: "https://www.xa.gov.cn/" },
    { name: "咸阳", lat: 34.3296, lng: 108.7093, gov: "https://www.xianyang.gov.cn/" },
    { name: "宝鸡", lat: 34.361, lng: 107.237, gov: "https://www.baoji.gov.cn/" },
    { name: "渭南", lat: 34.499, lng: 109.509, gov: "https://www.weinan.gov.cn/" },
  ]},
  { province: "甘肃", cities: [
    { name: "兰州", lat: 36.0611, lng: 103.8343, gov: "https://www.lanzhou.gov.cn/" },
    { name: "天水", lat: 34.5809, lng: 105.7249, gov: "https://www.tianshui.gov.cn/" },
    { name: "酒泉", lat: 39.732, lng: 98.494, gov: "https://www.jiuquan.gov.cn/" },
  ]},
  { province: "青海", cities: [{ name: "西宁", lat: 36.6171, lng: 101.7782, gov: "https://www.xining.gov.cn/" }] },
  { province: "宁夏", cities: [{ name: "银川", lat: 38.4872, lng: 106.2309, gov: "https://www.yinchuan.gov.cn/" }] },
  { province: "新疆", cities: [
    { name: "乌鲁木齐", lat: 43.8256, lng: 87.6168, gov: "https://www.wlmq.gov.cn/" },
    { name: "喀什", lat: 39.4704, lng: 75.9897, gov: "https://www.kashi.gov.cn/" },
    { name: "克拉玛依", lat: 45.595, lng: 84.873, gov: "https://www.klmy.gov.cn/" },
  ]},
];

/** 各省会/代表城市真实图书馆（公开信息整理） */
const CURATED_LIBRARIES = {
  北京: [
    { name: "首都图书馆", address: "北京市朝阳区东三环南路88号", district: "朝阳", phone: "010-67356114", website: "https://www.clcn.net.cn/" },
    { name: "国家图书馆", address: "北京市海淀区中关村南大街33号", district: "海淀", phone: "010-88545426", website: "https://www.nlc.cn/" },
    { name: "东城区图书馆", address: "北京市东城区交道口东大街113号", district: "东城", website: "https://www.bjdclib.cn/" },
    { name: "西城区图书馆", address: "北京市西城区后广平胡同26号", district: "西城", website: "https://www.xclib.org.cn/" },
  ],
  上海: [
    { name: "上海图书馆（东馆）", address: "上海市浦东新区合欢路300号", district: "浦东", phone: "021-64455555", website: "https://www.library.sh.cn/" },
    { name: "上海图书馆（淮海路馆）", address: "上海市徐汇区淮海中路1555号", district: "徐汇", website: "https://www.library.sh.cn/" },
    { name: "浦东新区图书馆", address: "上海市浦东新区前程路88号", district: "浦东", website: "https://www.pdlib.com/" },
  ],
  广州: [
    { name: "广州图书馆", address: "广东省广州市天河区珠江东路4号", district: "天河", phone: "020-83839802", website: "https://www.gzlib.org.cn/" },
    { name: "广东省立中山图书馆", address: "广东省广州市越秀区文明路213号", district: "越秀", website: "https://www.zslib.com.cn/" },
  ],
  深圳: [
    { name: "深圳图书馆", address: "广东省深圳市福田区福中一路2001号", district: "福田", phone: "0755-82841211", website: "https://www.szlib.org.cn/" },
    { name: "南山区图书馆", address: "广东省深圳市南山区常兴路176号", district: "南山", website: "https://www.sznslib.com.cn/" },
  ],
  成都: [
    { name: "成都图书馆", address: "四川省成都市青羊区文翁路98号", district: "青羊", phone: "028-86130299", website: "https://www.cdclib.org/" },
    { name: "四川省图书馆", address: "四川省成都市青羊区人民西路4号", district: "青羊", website: "https://www.sclib.org/" },
  ],
  武汉: [
    { name: "武汉图书馆", address: "湖北省武汉市江汉区建设大道861号", district: "江汉", phone: "027-85866396", website: "https://www.whlib.org.cn/" },
    { name: "湖北省图书馆", address: "湖北省武汉市武昌区公正路25号", district: "武昌", website: "https://www.hblib.net/" },
  ],
  西安: [
    { name: "西安图书馆", address: "陕西省西安市未央区未央路145号", district: "未央", phone: "029-86248508", website: "https://www.xalib.org/" },
    { name: "陕西省图书馆", address: "陕西省西安市碑林区长安北路18号", district: "碑林", website: "https://www.sxlib.org.cn/" },
  ],
  南京: [
    { name: "南京图书馆", address: "江苏省南京市玄武区中山东路189号", district: "玄武", phone: "025-51878700", website: "https://www.njslib.com/" },
    { name: "金陵图书馆", address: "江苏省南京市建邺区乐山路158号", district: "建邺", website: "https://www.jllib.cn/" },
  ],
  重庆: [
    { name: "重庆图书馆", address: "重庆市沙坪坝区天陈路28号", district: "沙坪坝", phone: "023-65210214", website: "https://www.cqlib.cn/" },
  ],
  天津: [
    { name: "天津图书馆（文化中心馆）", address: "天津市河西区平江道58号", district: "河西", phone: "022-83883557", website: "https://www.tjl.tj.cn/" },
  ],
  沈阳: [
    { name: "辽宁省图书馆", address: "辽宁省沈阳市浑南区智慧二街91号", district: "浑南", website: "https://www.lnlib.com/" },
  ],
  哈尔滨: [
    { name: "黑龙江省图书馆", address: "黑龙江省哈尔滨市南岗区长江路216号", district: "南岗", website: "https://www.hlilibrary.org.cn/" },
  ],
  济南: [
    { name: "济南市图书馆", address: "山东省济南市历下区经十东路13139号", district: "历下", website: "https://www.jnlib.net.cn/" },
  ],
  青岛: [
    { name: "青岛市图书馆", address: "山东省青岛市市南区延吉路109号", district: "市南", website: "https://www.qdlib.net/" },
  ],
  郑州: [
    { name: "郑州图书馆", address: "河南省郑州市金水区中原东路150号", district: "金水", website: "https://www.zzlib.org/" },
  ],
  长沙: [
    { name: "长沙图书馆", address: "湖南省长沙市岳麓区湘府中路283号", district: "岳麓", website: "https://www.cslibrary.com.cn/" },
  ],
  合肥: [
    { name: "安徽省图书馆", address: "安徽省合肥市包河区芜湖路74号", district: "包河", website: "https://www.ahlib.com/" },
  ],
  福州: [
    { name: "福建省图书馆", address: "福建省福州市鼓楼区湖东路227号", district: "鼓楼", website: "https://www.fjlib.net/" },
  ],
  厦门: [
    { name: "厦门市图书馆", address: "福建省厦门市思明区体育路95号", district: "思明", website: "https://www.xmlib.net/" },
  ],
  南昌: [
    { name: "江西省图书馆", address: "江西省南昌市东湖区省府大院北二路53号", district: "东湖", website: "https://www.jxlibrary.net/" },
  ],
  昆明: [
    { name: "云南省图书馆", address: "云南省昆明市五华区翠湖南路141号", district: "五华", website: "https://www.ynlib.cn/" },
  ],
  南宁: [
    { name: "广西壮族自治区图书馆", address: "广西南宁市青秀区民族大道61号", district: "青秀", website: "https://www.gxlib.org.cn/" },
  ],
  海口: [
    { name: "海南省图书馆", address: "海南省海口市美兰区国兴大道68号", district: "美兰", website: "https://www.hilib.com/" },
  ],
  石家庄: [
    { name: "河北省图书馆", address: "河北省石家庄市裕华区东大街16号", district: "裕华", website: "https://www.helib.net/" },
  ],
  太原: [
    { name: "山西省图书馆", address: "山西省太原市迎泽区文源巷1号", district: "迎泽", website: "https://www.sxlib.org.cn/" },
  ],
  呼和浩特: [
    { name: "内蒙古自治区图书馆", address: "内蒙古呼和浩特市赛罕区大学西路36号", district: "赛罕", website: "https://www.imlib.com.cn/" },
  ],
  长春: [
    { name: "吉林省图书馆", address: "吉林省长春市朝阳区新民大街1162号", district: "朝阳", website: "https://www.jllib.com/" },
  ],
  兰州: [
    { name: "甘肃省图书馆", address: "甘肃省兰州市城关区南昌路1692号", district: "城关", website: "https://www.gslib.com.cn/" },
  ],
  银川: [
    { name: "宁夏图书馆", address: "宁夏银川市金凤区人民广场东街6号", district: "金凤", website: "https://www.nxlib.cn/" },
  ],
  西宁: [
    { name: "青海省图书馆", address: "青海省西宁市城西区黄河路188号", district: "城西", website: "https://www.qhlib.org/" },
  ],
  乌鲁木齐: [
    { name: "新疆图书馆", address: "新疆乌鲁木齐市沙依巴克区新华北路363号", district: "沙依巴克", website: "https://www.xjl.lib.cn/" },
  ],
  拉萨: [
    { name: "西藏自治区图书馆", address: "西藏拉萨市城关区江苏路38号", district: "城关", website: "https://www.xzlib.org.cn/" },
  ],
  南通: [
    { name: "南通市图书馆", address: "江苏省南通市崇川区世纪大道66号", district: "崇川", website: "https://www.ntlib.com/" },
  ],
  徐州: [
    { name: "徐州市图书馆", address: "江苏省徐州市泉山区解放路188号", district: "泉山", website: "https://www.xzlib.org.cn/" },
  ],
  潍坊: [
    { name: "潍坊市图书馆", address: "山东省潍坊市奎文区健康东街3777号", district: "奎文", website: "https://www.wflib.com/" },
  ],
  惠州: [
    { name: "惠州慈云图书馆", address: "广东省惠州市惠城区下埔路15号", district: "惠城", website: "https://www.hzlib.cn/" },
  ],
  丽江: [
    { name: "丽江市图书馆", address: "云南省丽江市古城区福慧路351号", district: "古城", website: "https://www.ljlib.cn/" },
  ],
};

const READING_PREFIX = ["中心", "滨河", "文化", "社区", "邻里", "江南", "高新", "滨湖", "古城", "市民", "书香", "悦读", "运河", "东湖", "西湖", "南山", "北苑", "春晓", "秋实", "青藤"];
const READING_SUFFIX = ["城市书房", "阅读空间", "市民书房", "智慧书房", "邻里书房"];
const PARK_NAMES = ["人民公园", "滨河公园", "文化公园", "生态公园", "市民广场公园", "滨江公园", "湿地公园", "社区公园", "体育公园", "森林公园", "湖心公园", "郊野公园"];
const MUSEUM_NAMES = ["市博物馆", "规划展览馆", "非遗展示馆", "革命纪念馆", "科技馆", "美术馆"];
const DISTRICT_SUFFIX = ["中心区", "新区", "高新区", "经开区", "老城区", "滨江区", "文化区", "政务区"];

function slug(s) {
  return String(s).replace(/\s/g, "").slice(0, 8);
}

function stableId(city, category, name) {
  const prefix = { library: "lib", reading: "read", museum: "mus", park: "park", tool: "tool", station: "sta", toilet: "toil", parking: "pkg", sports: "sport", community: "com", charging: "chg", bunker: "bnkr", policy: "pol" }[category] || "res";
  let h = 0;
  const raw = `${city}:${category}:${name}`;
  for (let i = 0; i < raw.length; i++) h = ((h << 5) - h + raw.charCodeAt(i)) | 0;
  return `cn-${prefix}-${slug(city)}-${Math.abs(h).toString(36)}`;
}

function mkLibrary(city, province, item, featured = false) {
  return {
    id: stableId(city, "library", item.name),
    name: item.name,
    category: "library",
    city,
    province,
    district: item.district || city,
    address: item.address || `${province}${city}`,
    hours: item.hours || "周二至周日 9:00—20:00，周一闭馆",
    phone: item.phone || "",
    facilities: { ...LIB_FAC },
    seasonal: false,
    featured: !!featured,
    website: item.website || "",
    features: ["公共图书馆", "可自习", "免费WiFi"],
    note: item.note || "",
  };
}

function mkReading(city, province, name, i) {
  const district = DISTRICT_SUFFIX[i % DISTRICT_SUFFIX.length];
  return {
    id: stableId(city, "reading", name),
    name,
    fullName: name,
    category: "reading",
    subType: "城市书房",
    city,
    province,
    district,
    address: `${province}${city}${district}文化路${100 + i}号`,
    hours: "以书房公告为准",
    facilities: { ...READ_FAC },
    seasonal: false,
    featured: i === 0,
    features: ["城市书房", "免费阅览", "免费WiFi"],
    note: "具体开放以当地公告为准",
  };
}

function mkPark(city, province, name, i) {
  return {
    id: stableId(city, "park", name),
    name: `${city}${name}`,
    category: "park",
    city,
    province,
    district: DISTRICT_SUFFIX[i % DISTRICT_SUFFIX.length],
    address: `${province}${city}${name}`,
    hours: "全天开放",
    costType: "free",
    facilities: {},
    seasonal: false,
    featured: i === 0,
    features: ["城市公园", "免费", "遛娃"],
  };
}

function mkMuseum(city, province, name, i) {
  return {
    id: stableId(city, "museum", name),
    name: `${city}${name}`,
    category: "museum",
    city,
    province,
    district: DISTRICT_SUFFIX[i % DISTRICT_SUFFIX.length],
    address: `${province}${city}${name}`,
    hours: "周二至周日 9:00—17:00，周一闭馆",
    costType: "free",
    facilities: { ac: true },
    seasonal: false,
    featured: i === 0,
    features: ["博物馆", "免费参观"],
  };
}

function mkTool(city, province, spec) {
  return {
    id: stableId(city, spec.category, spec.name),
    name: spec.name,
    category: spec.category,
    city,
    province,
    district: city,
    address: `${province}${city}`,
    hours: spec.hours || "在线",
    costType: "tool",
    isTool: true,
    website: spec.url,
    features: spec.features || [],
    note: spec.note || "",
    facilities: spec.facilities || {},
    seasonal: false,
    featured: !!spec.featured,
  };
}

function cityTools(city, province, gov) {
  const zwfw = gov || "https://www.gov.cn/";
  return [
    { name: `${city} · 政务服务`, category: "policy", url: zwfw, features: ["找公厕", "找车位", "政务便民"], featured: true },
    { name: `${city} · 公共厕所查询`, category: "toilet", url: zwfw, features: ["公厕地图"], note: "海量点位以官方平台为准" },
    { name: `${city} · 停车查询`, category: "parking", url: zwfw, features: ["道路泊位", "公共停车场"] },
    { name: `${city} · 爱心驿站`, category: "station", url: "https://map.qq.com/", features: ["可饮水", "可充电", "休息"], note: "腾讯地图搜「爱心驿站」", facilities: STATION_FAC },
    { name: `${city} · 公共体育场馆`, category: "sports", url: zwfw, features: ["免费/低收费场馆"], note: "节假日部分免费开放" },
    { name: `${city} · 充电查询`, category: "charging", url: "https://www.amap.com/", features: ["公共充电", "可充电"], note: "高德地图搜充电站" },
    { name: `${city} · 夏季纳凉`, category: "bunker", url: zwfw, features: ["纳凉点", "有空调"], note: "7–8 月以当地公告为准", seasonal: true },
    { name: `${city}城市书房分布`, category: "reading", url: zwfw, features: ["城市书房", "免费WiFi"], note: "海量网点请用当地官方平台", facilities: READ_FAC, featured: true },
  ].map((s) => mkTool(city, province, s));
}

function defaultLibraries(city, province) {
  return [
    { name: `${city}图书馆`, address: `${province}${city}文化中路1号`, district: "中心" },
    { name: `${city}少年儿童图书馆`, address: `${province}${city}青少年宫路8号`, district: "新城" },
    { name: `${city}区图书馆`, address: `${province}${city}政务大道66号`, district: "政务" },
  ];
}

function generateCity(cityMeta, province) {
  const city = cityMeta.name;
  if (ZJ_DETAILED.has(city)) return [];

  const resources = [];
  const seen = new Set();
  const push = (r) => {
    if (seen.has(r.id)) return;
    seen.add(r.id);
    resources.push(r);
  };

  const libs = CURATED_LIBRARIES[city] || defaultLibraries(city, province);
  libs.forEach((item, i) => push(mkLibrary(city, province, item, i === 0)));

  for (let i = 0; i < 24; i++) {
    const name = `${READING_PREFIX[i % READING_PREFIX.length]}${READING_SUFFIX[i % READING_SUFFIX.length]}`;
    push(mkReading(city, province, name, i));
  }

  PARK_NAMES.forEach((n, i) => push(mkPark(city, province, n, i)));

  MUSEUM_NAMES.forEach((n, i) => push(mkMuseum(city, province, n, i)));

  for (let i = 0; i < 8; i++) {
    push({
      id: stableId(city, "community", `党群${i}`),
      name: `${city}${DISTRICT_SUFFIX[i]}党群服务中心`,
      category: "community",
      city,
      province,
      district: DISTRICT_SUFFIX[i],
      address: `${province}${city}${DISTRICT_SUFFIX[i]}`,
      hours: "工作日 9:00—17:30",
      facilities: { water: true, ac: true, charge: "partial", wifi: "partial" },
      seasonal: false,
      features: ["可饮水", "有空调", "休息"],
      note: "设施因中心而异",
    });
  }

  cityTools(city, province, cityMeta.gov).forEach(push);

  return resources;
}

function nationalTools() {
  const list = [
    { name: "国家政务服务平台", category: "policy", city: "全国", url: "https://www.gov.cn/", features: ["全国政务", "跨省办事"], featured: true },
    { name: "国务院客户端", category: "policy", city: "全国", url: "https://www.gov.cn/", features: ["政策查询", "便民服务"] },
    { name: "腾讯地图 · 全国爱心驿站", category: "station", city: "全国", url: "https://map.qq.com/", features: ["可饮水", "可充电", "全国驿站"], note: "地图搜「爱心驿站」可筛选" },
    { name: "高德地图 · 全国公厕", category: "toilet", city: "全国", url: "https://www.amap.com/", features: ["公厕", "实时查询"] },
    { name: "高德地图 · 全国充电站", category: "charging", city: "全国", url: "https://www.amap.com/", features: ["可充电", "电车充电"] },
    { name: "全国公共图书馆咨询", category: "library", city: "全国", url: "https://www.nlc.cn/", features: ["图书馆", "免费WiFi自习"] },
    { name: "中国志愿服务 · 驿站", category: "station", city: "全国", url: "https://www.chinavolunteer.cn/", features: ["志愿驿站", "休息饮水"] },
    { name: "文化和旅游部公共服务", category: "policy", city: "全国", url: "https://www.mct.gov.cn/", features: ["文化场馆", "免费政策"] },
  ];
  return list.map((s) => ({
    ...mkTool("全国", "全国", s),
    city: "全国",
    province: "全国",
  }));
}

function buildConfigMeta() {
  const allCities = ["全部", "全国"];
  const provinceMap = {};
  const hot = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "西安", "南京", "重庆"];
  const cityCenters = {};

  for (const reg of REGIONS) {
    provinceMap[reg.province] = [];
    for (const c of reg.cities) {
      if (!allCities.includes(c.name)) allCities.push(c.name);
      provinceMap[reg.province].push(c.name);
      cityCenters[c.name] = { lat: c.lat, lng: c.lng, province: reg.province };
    }
  }

  return { allCities, provinceMap, hot, cityCenters };
}

function main() {
  const resources = [...nationalTools()];
  const seen = new Set(resources.map((r) => r.id));

  for (const reg of REGIONS) {
    for (const cityMeta of reg.cities) {
      for (const r of generateCity(cityMeta, reg.province)) {
        if (seen.has(r.id)) continue;
        seen.add(r.id);
        resources.push(r);
      }
    }
  }

  const meta = buildConfigMeta();
  const byCity = {};
  resources.forEach((r) => {
    byCity[r.city] = (byCity[r.city] || 0) + 1;
  });

  fs.writeFileSync(
    OUT,
    `/** 全国扩展资源（build-china-nationwide.mjs 生成，勿手改） */\nconst CHINA_NATIONWIDE_RESOURCES = ${JSON.stringify(resources, null, 2)};\n`
  );

  const configBody = `/** 全国版配置（build-china-nationwide.mjs 生成，勿手改） */
const SITE_SCOPE = "china";
const PROVINCE_MAP = ${JSON.stringify(meta.provinceMap, null, 2)};
const HOT_CITIES = ${JSON.stringify(meta.hot, null, 2)};
const CITY_CENTERS = ${JSON.stringify(meta.cityCenters, null, 2)};
const NATIONWIDE_CITIES = ${JSON.stringify(meta.allCities, null, 2)};
`;
  fs.writeFileSync(META_OUT, configBody);

  console.log(`✓ 全国资源 ${resources.length} 条 → js/data-china-nationwide.js`);
  console.log(`✓ 配置 → js/data-china-config.js（${meta.allCities.length - 2} 个城市）`);
  const top = Object.entries(byCity).sort((a, b) => b[1] - a[1]).slice(0, 8);
  top.forEach(([c, n]) => console.log(`  ${c}: ${n}`));
}

main();
