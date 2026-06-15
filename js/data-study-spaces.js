/**
 * 城市书房 / 邻里阅读空间 / 地铁书房
 * 来源：杭州图书馆官网通借通还名录、各区服务网点
 */
const STUDY_SPACES = [
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-1",
    "name": "笕未来",
    "fullName": "笕未来·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区笕桥街道花园兜街177号笕桥街道党群服务中心二楼暖心阅读公益基地",
    "hours": "周一闭馆周二到周日 9:30-17:00",
    "phone": "13456997785",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E7%AC%95%E6%A1%A5%E8%A1%97%E9%81%93%E8%8A%B1%E5%9B%AD%E5%85%9C%E8%A1%97177%E5%8F%B7%E7%AC%95%E6%A1%A5%E8%A1%97%E9%81%93%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC%E6%9A%96%E5%BF%83%E9%98%85%E8%AF%BB%E5%85%AC%E7%9B%8A%E5%9F%BA%E5%9C%B0"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-2",
    "name": "金都华府",
    "fullName": "金都华府·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区候潮路8号金都华府17幢米粒生活图书馆",
    "hours": "周一闭馆周二至周日 10:30-20:30",
    "phone": "0571-8528958915669996288",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%80%99%E6%BD%AE%E8%B7%AF8%E5%8F%B7%E9%87%91%E9%83%BD%E5%8D%8E%E5%BA%9C17%E5%B9%A2%E7%B1%B3%E7%B2%92%E7%94%9F%E6%B4%BB%E5%9B%BE%E4%B9%A6%E9%A6%86"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-3",
    "name": "青年路社区",
    "fullName": "青年路社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区湖滨街道青年路社区见仁里6号湖滨幸福邻里坊",
    "hours": "周一至周日 9:00-17:30",
    "phone": "0571-85061617",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E6%B9%96%E6%BB%A8%E8%A1%97%E9%81%93%E9%9D%92%E5%B9%B4%E8%B7%AF%E7%A4%BE%E5%8C%BA%E8%A7%81%E4%BB%81%E9%87%8C6%E5%8F%B7%E6%B9%96%E6%BB%A8%E5%B9%B8%E7%A6%8F%E9%82%BB%E9%87%8C%E5%9D%8A"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-4",
    "name": "宋都凯旋苑",
    "fullName": "宋都凯旋苑·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区采荷街道绿茗社区凯旋路68号宋都凯旋苑8幢底层·谷雨邻里中心",
    "hours": "周一闭馆周二至周五 14:00-20:00周六至周日 10:00-18:00",
    "phone": "13018905662",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%87%87%E8%8D%B7%E8%A1%97%E9%81%93%E7%BB%BF%E8%8C%97%E7%A4%BE%E5%8C%BA%E5%87%AF%E6%97%8B%E8%B7%AF68%E5%8F%B7%E5%AE%8B%E9%83%BD%E5%87%AF%E6%97%8B%E8%8B%918%E5%B9%A2%E5%BA%95%E5%B1%82%C2%B7%E8%B0%B7%E9%9B%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-5",
    "name": "三卫南苑",
    "fullName": "三卫南苑·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区九堡街道三卫家园南苑9幢1单元1楼·谷雨邻里中心",
    "hours": "周一闭馆周二至周五 14:00-20:00周六至周日 10:00-18:00",
    "phone": "13018905662",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B9%9D%E5%A0%A1%E8%A1%97%E9%81%93%E4%B8%89%E5%8D%AB%E5%AE%B6%E5%9B%AD%E5%8D%97%E8%8B%919%E5%B9%A21%E5%8D%95%E5%85%831%E6%A5%BC%C2%B7%E8%B0%B7%E9%9B%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-6",
    "name": "远洋香奈",
    "fullName": "远洋香奈·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区丁兰街道东林桥社区会林路与杭玻街交叉口南100米远洋香奈西门右侧·谷雨邻里中心",
    "hours": "周一至周五 14:00-20:00周六 10:00-18:00",
    "phone": "13018905662",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B8%81%E5%85%B0%E8%A1%97%E9%81%93%E4%B8%9C%E6%9E%97%E6%A1%A5%E7%A4%BE%E5%8C%BA%E4%BC%9A%E6%9E%97%E8%B7%AF%E4%B8%8E%E6%9D%AD%E7%8E%BB%E8%A1%97%E4%BA%A4%E5%8F%89%E5%8F%A3%E5%8D%97100%E7%B1%B3%E8%BF%9C%E6%B4%8B%E9%A6%99%E5%A5%88%E8%A5%BF%E9%97%A8%E5%8F%B3%E4%BE%A7%C2%B7%E8%B0%B7%E9%9B%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-7",
    "name": "红梅社区",
    "fullName": "红梅社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区顾家畈路111号红梅社区三区20幢幸福邻里坊二楼",
    "hours": "周二至周日 9:00-20:00；周一闭馆，法定节假日开放时间另行通知",
    "phone": "0571-86054578",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%A1%BE%E5%AE%B6%E7%95%88%E8%B7%AF111%E5%8F%B7%E7%BA%A2%E6%A2%85%E7%A4%BE%E5%8C%BA%E4%B8%89%E5%8C%BA20%E5%B9%A2%E5%B9%B8%E7%A6%8F%E9%82%BB%E9%87%8C%E5%9D%8A%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-8",
    "name": "郡原相江公寓",
    "fullName": "郡原相江公寓·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区海益路与旺杨街交叉路口往东约100米(郡原相江公寓)相江公寓心苑6幢102室·谷雨邻里中心",
    "hours": "周一闭馆周二至周五 14:00-20:00周六至周日 10:00-18:00",
    "phone": "13018905662",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E6%B5%B7%E7%9B%8A%E8%B7%AF%E4%B8%8E%E6%97%BA%E6%9D%A8%E8%A1%97%E4%BA%A4%E5%8F%89%E8%B7%AF%E5%8F%A3%E5%BE%80%E4%B8%9C%E7%BA%A6100%E7%B1%B3%28%E9%83%A1%E5%8E%9F%E7%9B%B8%E6%B1%9F%E5%85%AC%E5%AF%93%29%E7%9B%B8%E6%B1%9F%E5%85%AC%E5%AF%93%E5%BF%83%E8%8B%916%E5%B9%A2102%E5%AE%A4%C2%B7%E8%B0%B7%E9%9B%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-9",
    "name": "春晓书房",
    "fullName": "春晓书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区闸弄口街道春晖社区三里亭苑二区15-1幢东侧",
    "hours": "周二至周日 9:00-18:00",
    "phone": "17826802085",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%97%B8%E5%BC%84%E5%8F%A3%E8%A1%97%E9%81%93%E6%98%A5%E6%99%96%E7%A4%BE%E5%8C%BA%E4%B8%89%E9%87%8C%E4%BA%AD%E8%8B%91%E4%BA%8C%E5%8C%BA15-1%E5%B9%A2%E4%B8%9C%E4%BE%A7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-10",
    "name": "有间书房",
    "fullName": "有间书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区闸弄口街道濮家井路26号闸弄口街道文体中心书房",
    "hours": "周二至周六09:30-17:30",
    "phone": "13738143194",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%97%B8%E5%BC%84%E5%8F%A3%E8%A1%97%E9%81%93%E6%BF%AE%E5%AE%B6%E4%BA%95%E8%B7%AF26%E5%8F%B7%E9%97%B8%E5%BC%84%E5%8F%A3%E8%A1%97%E9%81%93%E6%96%87%E4%BD%93%E4%B8%AD%E5%BF%83%E4%B9%A6%E6%88%BF"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-11",
    "name": "水湘社区",
    "fullName": "水湘社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区四季青街道水湘人家西苑5幢底层",
    "hours": "周一至周五上午8:30-11:30下午13:30-17:00周六至周日 9:00-17:00",
    "phone": "15957155891",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%9B%9B%E5%AD%A3%E9%9D%92%E8%A1%97%E9%81%93%E6%B0%B4%E6%B9%98%E4%BA%BA%E5%AE%B6%E8%A5%BF%E8%8B%915%E5%B9%A2%E5%BA%95%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-12",
    "name": "建华社区",
    "fullName": "建华社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区彭埠街道建华路建华小区建华家苑7幢底商2号",
    "hours": "周一至周五 9:00-17:00",
    "phone": "15268118236",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%BD%AD%E5%9F%A0%E8%A1%97%E9%81%93%E5%BB%BA%E5%8D%8E%E8%B7%AF%E5%BB%BA%E5%8D%8E%E5%B0%8F%E5%8C%BA%E5%BB%BA%E5%8D%8E%E5%AE%B6%E8%8B%917%E5%B9%A2%E5%BA%95%E5%95%862%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-13",
    "name": "蕙兰社区",
    "fullName": "蕙兰社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区丁兰街道华丰中路北城铭苑东南2门旁",
    "hours": "周二至周六8:30-11:30，13:30-17:00周日、周一闭馆",
    "phone": "15088684521",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B8%81%E5%85%B0%E8%A1%97%E9%81%93%E5%8D%8E%E4%B8%B0%E4%B8%AD%E8%B7%AF%E5%8C%97%E5%9F%8E%E9%93%AD%E8%8B%91%E4%B8%9C%E5%8D%972%E9%97%A8%E6%97%81"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-14",
    "name": "魅力城社区",
    "fullName": "魅力城社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区九堡街道九昌路魅力城社区服务中心",
    "hours": "周一到周五 8:30-19:00",
    "phone": "0571-86432021",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B9%9D%E5%A0%A1%E8%A1%97%E9%81%93%E4%B9%9D%E6%98%8C%E8%B7%AF%E9%AD%85%E5%8A%9B%E5%9F%8E%E7%A4%BE%E5%8C%BA%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-15",
    "name": "杨柳郡社区",
    "fullName": "杨柳郡社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区彭埠街道杨柳郡一期邻里中心",
    "hours": "周二至周日 9:00-12:00，14:00-20:00",
    "phone": "15158085965",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%BD%AD%E5%9F%A0%E8%A1%97%E9%81%93%E6%9D%A8%E6%9F%B3%E9%83%A1%E4%B8%80%E6%9C%9F%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-16",
    "name": "吴山路社区",
    "fullName": "吴山路社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区湖滨街道崔家巷4号",
    "hours": "周一至周五 9:00-17:00法定节假日闭馆",
    "phone": "0571-87022447",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E6%B9%96%E6%BB%A8%E8%A1%97%E9%81%93%E5%B4%94%E5%AE%B6%E5%B7%B74%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-17",
    "name": "运新社区",
    "fullName": "运新社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区运新花苑9幢1楼",
    "hours": "周一至周六上午9:00-11:00 下午2:00-5:00节假日闭馆",
    "phone": "0571-8681110813456907946",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E8%BF%90%E6%96%B0%E8%8A%B1%E8%8B%919%E5%B9%A21%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-18",
    "name": "小营巷社区",
    "fullName": "小营巷社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区皮市巷86号小营街道小营巷社区",
    "hours": "周一至周五8:30-11:30、14:00-17:00周六9:00-11:00、14:00-16:00周日及法定节假日闭馆，特殊情况提前另行通知",
    "phone": "0571-87044618",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E7%9A%AE%E5%B8%82%E5%B7%B786%E5%8F%B7%E5%B0%8F%E8%90%A5%E8%A1%97%E9%81%93%E5%B0%8F%E8%90%A5%E5%B7%B7%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-19",
    "name": "和娃娃童读馆",
    "fullName": "和娃娃童读馆·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区南星街道白塔人家云弄54号",
    "hours": "周二至周五 16:00-20:00周六、周日 10:00-18:00周一闭馆",
    "phone": "15158180702",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%8D%97%E6%98%9F%E8%A1%97%E9%81%93%E7%99%BD%E5%A1%94%E4%BA%BA%E5%AE%B6%E4%BA%91%E5%BC%8454%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-20",
    "name": "闸弄口街道",
    "fullName": "闸弄口街道·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区闸弄口街道铭苑路66号党群服务中心内",
    "hours": "周一至周五9:00-11:30，13:30-17:00",
    "phone": "18257175619",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%97%B8%E5%BC%84%E5%8F%A3%E8%A1%97%E9%81%93%E9%93%AD%E8%8B%91%E8%B7%AF66%E5%8F%B7%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E5%86%85"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-21",
    "name": "平如里一如书房",
    "fullName": "平如里一如书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区江城路336-338号2楼",
    "hours": "周一到周日9:00-11:30，14:00-17:30",
    "phone": "0571-86074993",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E6%B1%9F%E5%9F%8E%E8%B7%AF336-338%E5%8F%B72%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-22",
    "name": "勤丰社区",
    "fullName": "勤丰社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区丁兰路880-1号3楼",
    "hours": "周一至周五9:00-11:00，14：00-17:00双休日法定节假日9:00-17:00",
    "phone": "0571-86045095",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B8%81%E5%85%B0%E8%B7%AF880-1%E5%8F%B73%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-23",
    "name": "望江街道宋韵中医文化书房",
    "fullName": "望江街道宋韵中医文化书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区望江街道映霞街160号3楼",
    "hours": "周一到周五 8:00-17:00",
    "phone": "0571-87177026",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E6%9C%9B%E6%B1%9F%E8%A1%97%E9%81%93%E6%98%A0%E9%9C%9E%E8%A1%97160%E5%8F%B73%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-24",
    "name": "红五月社区",
    "fullName": "红五月社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区红艮弄13号红五月未来社区邻里中心",
    "hours": "周一至周五 8:30–16:30",
    "phone": "13071888330",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E7%BA%A2%E8%89%AE%E5%BC%8413%E5%8F%B7%E7%BA%A2%E4%BA%94%E6%9C%88%E6%9C%AA%E6%9D%A5%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-25",
    "name": "西牌楼社区",
    "fullName": "西牌楼社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区建国南苑8幢2单元底层",
    "hours": "周一至周六 9:00-17:00周日及法定节假日闭馆，特殊情况提前另行通知",
    "phone": "15088678149",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%BB%BA%E5%9B%BD%E5%8D%97%E8%8B%918%E5%B9%A22%E5%8D%95%E5%85%83%E5%BA%95%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-26",
    "name": "景芳社区",
    "fullName": "景芳社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区严家路331-1号",
    "hours": "周一至周日 8:30-19:00",
    "phone": "0571-86032192",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E4%B8%A5%E5%AE%B6%E8%B7%AF331-1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-27",
    "name": "钱塘社区",
    "fullName": "钱塘社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "上城",
    "address": "杭州市上城区钱江路1500号",
    "hours": "周一至周日 9:00-17:00",
    "phone": "0571-87995167",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%8A%E5%9F%8E%E5%8C%BA%E9%92%B1%E6%B1%9F%E8%B7%AF1500%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-28",
    "name": "景荣社区慧满",
    "fullName": "景荣社区慧满·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区石桥街道紫荆商街10-16号",
    "hours": "周一至周五 9:00-16:00周六、周日 9:00-17:00",
    "phone": "18767139501",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E7%9F%B3%E6%A1%A5%E8%A1%97%E9%81%93%E7%B4%AB%E8%8D%86%E5%95%86%E8%A1%9710-16%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-29",
    "name": "王马社区",
    "fullName": "王马社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区太平桥横街16号",
    "hours": "周一至周日 8:30-16:30",
    "phone": "15067171780",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%A4%AA%E5%B9%B3%E6%A1%A5%E6%A8%AA%E8%A1%9716%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-30",
    "name": "社区书苑",
    "fullName": "社区书苑·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区上祥路327号",
    "hours": "周二至周日8:30-11:30,13:30-17:00法定节假日闭馆",
    "phone": "0571-88042618",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E4%B8%8A%E7%A5%A5%E8%B7%AF327%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-31",
    "name": "东新园社区",
    "fullName": "东新园社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区长浜路348号",
    "hours": "周一至周五 9:00-17:00 法定节假日闭馆",
    "phone": "15067153315",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E9%95%BF%E6%B5%9C%E8%B7%AF348%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-32",
    "name": "和睦书阁",
    "fullName": "和睦书阁·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区和睦新村20-1幢底层",
    "hours": "周一至周日 9:00-17:00法定节假日闭馆",
    "phone": "13858113876",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%92%8C%E7%9D%A6%E6%96%B0%E6%9D%9120-1%E5%B9%A2%E5%BA%95%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-33",
    "name": "仓基新村社区",
    "fullName": "仓基新村社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区仓基新村66幢",
    "hours": "周一至周五08:30-12:0013:00-17:0018:00-20:00",
    "phone": "0571-58103094",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E4%BB%93%E5%9F%BA%E6%96%B0%E6%9D%9166%E5%B9%A2"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-34",
    "name": "长征桥社区",
    "fullName": "长征桥社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区和睦路449-1号",
    "hours": "周二至周日白天 9:00-17:00周二至周五晚上18:00-20:00法定节假日闭馆",
    "phone": "0571-88105260",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%92%8C%E7%9D%A6%E8%B7%AF449-1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-35",
    "name": "朝晖街道",
    "fullName": "朝晖街道·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区上塘路169号",
    "hours": "周二至周日 9:00-20:30",
    "phone": "0571-89508139",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E4%B8%8A%E5%A1%98%E8%B7%AF169%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-36",
    "name": "大关街道",
    "fullName": "大关街道·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区德胜新村43幢B座",
    "hours": "周二至周日 8:30-11:30;13:00-17:30;18:30-20:30;周一闭馆",
    "phone": "18358171810",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%BE%B7%E8%83%9C%E6%96%B0%E6%9D%9143%E5%B9%A2B%E5%BA%A7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-37",
    "name": "吉如社区",
    "fullName": "吉如社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区吉如社区新安天苑小区16幢1单元2楼",
    "hours": "周二至周日 8:30-11:3013:30-17:00",
    "phone": "18857103168",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%90%89%E5%A6%82%E7%A4%BE%E5%8C%BA%E6%96%B0%E5%AE%89%E5%A4%A9%E8%8B%91%E5%B0%8F%E5%8C%BA16%E5%B9%A21%E5%8D%95%E5%85%832%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-38",
    "name": "金星社区",
    "fullName": "金星社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区桃源街300号桃源金星党群服务中心3楼",
    "hours": "周一至周六 9:00-20:00 周日闭馆",
    "phone": "15968871123",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E6%A1%83%E6%BA%90%E8%A1%97300%E5%8F%B7%E6%A1%83%E6%BA%90%E9%87%91%E6%98%9F%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%833%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-39",
    "name": "石塘社区",
    "fullName": "石塘社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区夏莲支路188号一老一小融合场地",
    "hours": "周一至周五 9:00-18:00",
    "phone": "19128917103",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E5%A4%8F%E8%8E%B2%E6%94%AF%E8%B7%AF188%E5%8F%B7%E4%B8%80%E8%80%81%E4%B8%80%E5%B0%8F%E8%9E%8D%E5%90%88%E5%9C%BA%E5%9C%B0"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-40",
    "name": "仙林社区",
    "fullName": "仙林社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "拱墅",
    "address": "杭州市拱墅区中山北路100号",
    "hours": "周一至周五9:00-12:00 ，14:00-17:00法定节假日闭馆",
    "phone": "0571-28916786",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%8B%B1%E5%A2%85%E5%8C%BA%E4%B8%AD%E5%B1%B1%E5%8C%97%E8%B7%AF100%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-41",
    "name": "江口社区",
    "fullName": "江口社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区转塘家园南区18幢2单元102室·谷雨邻里中心",
    "hours": "周一至周五 14:00-20:00，周六 10:00～18:00，周日闭馆",
    "phone": "13018905662",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E8%BD%AC%E5%A1%98%E5%AE%B6%E5%9B%AD%E5%8D%97%E5%8C%BA18%E5%B9%A22%E5%8D%95%E5%85%83102%E5%AE%A4%C2%B7%E8%B0%B7%E9%9B%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-42",
    "name": "翰墨香林苑",
    "fullName": "翰墨香林苑·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区留下街道留和路568号翰墨香林社区翰墨香林苑15幢102室",
    "hours": "周一至周五8:30-16:30，周六、周日9:00-12:00（节假日不开放）",
    "phone": "0571-85220266",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E7%95%99%E4%B8%8B%E8%A1%97%E9%81%93%E7%95%99%E5%92%8C%E8%B7%AF568%E5%8F%B7%E7%BF%B0%E5%A2%A8%E9%A6%99%E6%9E%97%E7%A4%BE%E5%8C%BA%E7%BF%B0%E5%A2%A8%E9%A6%99%E6%9E%97%E8%8B%9115%E5%B9%A2102%E5%AE%A4"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-43",
    "name": "府苑新村",
    "fullName": "府苑新村·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区蒋村街道府苑社区府苑新村47幢边邻里中心内文悦清舍",
    "hours": "周一至周日 9:00-21:00",
    "phone": "0571-88252915",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E8%92%8B%E6%9D%91%E8%A1%97%E9%81%93%E5%BA%9C%E8%8B%91%E7%A4%BE%E5%8C%BA%E5%BA%9C%E8%8B%91%E6%96%B0%E6%9D%9147%E5%B9%A2%E8%BE%B9%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83%E5%86%85%E6%96%87%E6%82%A6%E6%B8%85%E8%88%8D"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-44",
    "name": "春天花园",
    "fullName": "春天花园·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区古墩路578号春天花园西门旁二楼商铺天然书房（近文新D口）",
    "hours": "周一周三周五13:30-20:30周二周四16:30-20:30周六日8:30-17:30",
    "phone": "0571-88220122 18989474619 13208019753",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E5%8F%A4%E5%A2%A9%E8%B7%AF578%E5%8F%B7%E6%98%A5%E5%A4%A9%E8%8A%B1%E5%9B%AD%E8%A5%BF%E9%97%A8%E6%97%81%E4%BA%8C%E6%A5%BC%E5%95%86%E9%93%BA%E5%A4%A9%E7%84%B6%E4%B9%A6%E6%88%BF%EF%BC%88%E8%BF%91%E6%96%87%E6%96%B0D%E5%8F%A3%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-45",
    "name": "文新清风书苑",
    "fullName": "文新清风书苑·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区五联弄31号文新街道综合文化站三楼",
    "hours": "周一、周二、周四至周日 9:00-20:00周三闭馆",
    "phone": "0571-89715671",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%BA%94%E8%81%94%E5%BC%8431%E5%8F%B7%E6%96%87%E6%96%B0%E8%A1%97%E9%81%93%E7%BB%BC%E5%90%88%E6%96%87%E5%8C%96%E7%AB%99%E4%B8%89%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-46",
    "name": "政苑社区",
    "fullName": "政苑社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区丰潭路政苑小区服务中心一楼",
    "hours": "周一至周日 8:30-17:00",
    "phone": "0571-89966418",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%B8%B0%E6%BD%AD%E8%B7%AF%E6%94%BF%E8%8B%91%E5%B0%8F%E5%8C%BA%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-47",
    "name": "保亭社区",
    "fullName": "保亭社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区翠苑街道栖隐阁2-104",
    "hours": "周一至周日 8:00-18:30",
    "phone": "0571-88067350",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E7%BF%A0%E8%8B%91%E8%A1%97%E9%81%93%E6%A0%96%E9%9A%90%E9%98%812-104"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-48",
    "name": "下杨村",
    "fullName": "下杨村·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区双铺镇下杨村文化礼堂",
    "hours": "周一至周六 9:00-16:30",
    "phone": "13857102528",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E5%8F%8C%E9%93%BA%E9%95%87%E4%B8%8B%E6%9D%A8%E6%9D%91%E6%96%87%E5%8C%96%E7%A4%BC%E5%A0%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-49",
    "name": "云湖社区",
    "fullName": "云湖社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区五云西路1号",
    "hours": "周一至周日 9:00-16:30",
    "phone": "13616559316",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%BA%94%E4%BA%91%E8%A5%BF%E8%B7%AF1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-50",
    "name": "友谊社区",
    "fullName": "友谊社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区铁路新村15栋社区文化家园",
    "hours": "周一至周五 9:00-17:00周六、周日闭馆",
    "phone": "0571-87991195",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E9%93%81%E8%B7%AF%E6%96%B0%E6%9D%9115%E6%A0%8B%E7%A4%BE%E5%8C%BA%E6%96%87%E5%8C%96%E5%AE%B6%E5%9B%AD"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-51",
    "name": "上保社区",
    "fullName": "上保社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区体育场路559-1号",
    "hours": "每日9：00-17:30（夜校开课期间除外）",
    "phone": "88115109",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%BD%93%E8%82%B2%E5%9C%BA%E8%B7%AF559-1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-52",
    "name": "枫桦社区",
    "fullName": "枫桦社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区安埠街66号",
    "hours": "周一至周五 09:00-18:00（节假日不开放）",
    "phone": "13429167757",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E5%AE%89%E5%9F%A0%E8%A1%9766%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-53",
    "name": "嘉绿苑社区",
    "fullName": "嘉绿苑社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区文二西路95号（南都银座底商嘉绿苑未来社区成长坊二楼）",
    "hours": "周一至周五 8:00-20:00周六、周日 9:00-18:00（周二、节假日不开放）",
    "phone": "15797688403",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E6%96%87%E4%BA%8C%E8%A5%BF%E8%B7%AF95%E5%8F%B7%EF%BC%88%E5%8D%97%E9%83%BD%E9%93%B6%E5%BA%A7%E5%BA%95%E5%95%86%E5%98%89%E7%BB%BF%E8%8B%91%E6%9C%AA%E6%9D%A5%E7%A4%BE%E5%8C%BA%E6%88%90%E9%95%BF%E5%9D%8A%E4%BA%8C%E6%A5%BC%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-54",
    "name": "河滨社区",
    "fullName": "河滨社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区五常港路333号中杭府3号楼",
    "hours": "周一至周日 9:00-17:00",
    "phone": "0571-86931612",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%BA%94%E5%B8%B8%E6%B8%AF%E8%B7%AF333%E5%8F%B7%E4%B8%AD%E6%9D%AD%E5%BA%9C3%E5%8F%B7%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-55",
    "name": "龙池村",
    "fullName": "龙池村·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区双浦镇龙池村88号",
    "hours": "周一至周六上午8:30-11:30下午13:00-16:30",
    "phone": "15314652583",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E5%8F%8C%E6%B5%A6%E9%95%87%E9%BE%99%E6%B1%A0%E6%9D%9188%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-56",
    "name": "五幸社区",
    "fullName": "五幸社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区三墩镇庄墩路147号民生综合体二层",
    "hours": "周二至周六9:00-11:30，14:00-17:00",
    "phone": "18268033448",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%B8%89%E5%A2%A9%E9%95%87%E5%BA%84%E5%A2%A9%E8%B7%AF147%E5%8F%B7%E6%B0%91%E7%94%9F%E7%BB%BC%E5%90%88%E4%BD%93%E4%BA%8C%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-57",
    "name": "西穆坞社区",
    "fullName": "西穆坞社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区西穆坞社区杨梅山路216号玉屏居小区内社区民生综合体",
    "hours": "周一至周五 8:30-20:00周六至周日 14:00-20:00",
    "phone": "15868820393",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E8%A5%BF%E7%A9%86%E5%9D%9E%E7%A4%BE%E5%8C%BA%E6%9D%A8%E6%A2%85%E5%B1%B1%E8%B7%AF216%E5%8F%B7%E7%8E%89%E5%B1%8F%E5%B1%85%E5%B0%8F%E5%8C%BA%E5%86%85%E7%A4%BE%E5%8C%BA%E6%B0%91%E7%94%9F%E7%BB%BC%E5%90%88%E4%BD%93"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-58",
    "name": "西溪街道",
    "fullName": "西溪街道·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "西湖",
    "address": "杭州市西湖区马塍路10号5楼",
    "hours": "周一至周五 8:30-20:00周六、周日 9:00-17:00（节假日不开放）",
    "phone": "0571-58122550",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%A5%BF%E6%B9%96%E5%8C%BA%E9%A9%AC%E5%A1%8D%E8%B7%AF10%E5%8F%B75%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-59",
    "name": "新浦社区",
    "fullName": "新浦社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区新浦社区钱塘福苑小区66号商铺二楼",
    "hours": "周一闭馆周二至周五 13:00-20:30周六至周日 09:00-18:00",
    "phone": "15801996354",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E6%96%B0%E6%B5%A6%E7%A4%BE%E5%8C%BA%E9%92%B1%E5%A1%98%E7%A6%8F%E8%8B%91%E5%B0%8F%E5%8C%BA66%E5%8F%B7%E5%95%86%E9%93%BA%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-60",
    "name": "晶都社区",
    "fullName": "晶都社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区平达弄120号晶都社区党群服务中心1楼、3楼",
    "hours": "周一至周日 8:00-20:00",
    "phone": "0571-86888970",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E5%B9%B3%E8%BE%BE%E5%BC%84120%E5%8F%B7%E6%99%B6%E9%83%BD%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%831%E6%A5%BC%E3%80%813%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-61",
    "name": "闻涛社区",
    "fullName": "闻涛社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区长河街道咏渡巷59号（锦绣江南小区东门向南走100米，社区消防站旁）",
    "hours": "周一至周日 8:30-16:30",
    "phone": "0571-86802775",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E9%95%BF%E6%B2%B3%E8%A1%97%E9%81%93%E5%92%8F%E6%B8%A1%E5%B7%B759%E5%8F%B7%EF%BC%88%E9%94%A6%E7%BB%A3%E6%B1%9F%E5%8D%97%E5%B0%8F%E5%8C%BA%E4%B8%9C%E9%97%A8%E5%90%91%E5%8D%97%E8%B5%B0100%E7%B1%B3%EF%BC%8C%E7%A4%BE%E5%8C%BA%E6%B6%88%E9%98%B2%E7%AB%99%E6%97%81%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-62",
    "name": "岩大房社区",
    "fullName": "岩大房社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区火炬小区东南面党群服务中心",
    "hours": "周一闭馆周二至周五 13:00-20:30周六至周日 8:00-18:00",
    "phone": "15239180413",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E7%81%AB%E7%82%AC%E5%B0%8F%E5%8C%BA%E4%B8%9C%E5%8D%97%E9%9D%A2%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-63",
    "name": "新州书房",
    "fullName": "新州书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区西兴路1583号新州花苑8幢1楼",
    "hours": "周日闭馆周一到周五 14:00-20:00周六 10:00-20:00暑期：周六日闭馆",
    "phone": "0571-86602366",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E8%A5%BF%E5%85%B4%E8%B7%AF1583%E5%8F%B7%E6%96%B0%E5%B7%9E%E8%8A%B1%E8%8B%918%E5%B9%A21%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-64",
    "name": "红色书吧",
    "fullName": "红色书吧·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区西兴街道缤纷街615号高新区（滨江）党群服务中心一楼书吧",
    "hours": "周一至周日 9:00-22:00",
    "phone": "18067902017",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E8%A5%BF%E5%85%B4%E8%A1%97%E9%81%93%E7%BC%A4%E7%BA%B7%E8%A1%97615%E5%8F%B7%E9%AB%98%E6%96%B0%E5%8C%BA%EF%BC%88%E6%BB%A8%E6%B1%9F%EF%BC%89%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%B8%80%E6%A5%BC%E4%B9%A6%E5%90%A7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-65",
    "name": "冠二社区",
    "fullName": "冠二社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区浦沿街道冠新佳苑西区7号楼二楼",
    "hours": "周二-周日8:00-17:00周一闭馆",
    "phone": "19106561829",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E6%B5%A6%E6%B2%BF%E8%A1%97%E9%81%93%E5%86%A0%E6%96%B0%E4%BD%B3%E8%8B%91%E8%A5%BF%E5%8C%BA7%E5%8F%B7%E6%A5%BC%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-66",
    "name": "冠山硅谷书房",
    "fullName": "冠山硅谷书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区冠山小区38幢一楼",
    "hours": "周二至周日 9:00-20:00（周一闭馆）",
    "phone": "18058788731",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E5%86%A0%E5%B1%B1%E5%B0%8F%E5%8C%BA38%E5%B9%A2%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-67",
    "name": "马湖社区",
    "fullName": "马湖社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区西兴街道白马湖小区白鹤苑29幢三楼",
    "hours": "周二至周五 13:00-21:00周六至周日 9:00-21:00（周一闭馆）",
    "phone": "18258265561",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E8%A5%BF%E5%85%B4%E8%A1%97%E9%81%93%E7%99%BD%E9%A9%AC%E6%B9%96%E5%B0%8F%E5%8C%BA%E7%99%BD%E9%B9%A4%E8%8B%9129%E5%B9%A2%E4%B8%89%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-68",
    "name": "钱潮望涛社区",
    "fullName": "钱潮望涛社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区长河街道闻涛诚苑86号商铺",
    "hours": "周一至周日 8:00-20:00",
    "phone": "87004735",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E9%95%BF%E6%B2%B3%E8%A1%97%E9%81%93%E9%97%BB%E6%B6%9B%E8%AF%9A%E8%8B%9186%E5%8F%B7%E5%95%86%E9%93%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-69",
    "name": "杨家墩社区",
    "fullName": "杨家墩社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区浦沿街道杨家墩悦府商铺22号",
    "hours": "周一至周日 10:00-18:00",
    "phone": "19706873325",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E6%B5%A6%E6%B2%BF%E8%A1%97%E9%81%93%E6%9D%A8%E5%AE%B6%E5%A2%A9%E6%82%A6%E5%BA%9C%E5%95%86%E9%93%BA22%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-70",
    "name": "月明社区",
    "fullName": "月明社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "杭州市滨江区长河街道月明路436号三楼青少活动中心内",
    "hours": "周一至周五 9：00-20:00周六至周天10:00-17:00",
    "phone": "18858111165",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E9%95%BF%E6%B2%B3%E8%A1%97%E9%81%93%E6%9C%88%E6%98%8E%E8%B7%AF436%E5%8F%B7%E4%B8%89%E6%A5%BC%E9%9D%92%E5%B0%91%E6%B4%BB%E5%8A%A8%E4%B8%AD%E5%BF%83%E5%86%85"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-71",
    "name": "长一社区",
    "fullName": "长一社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "滨江",
    "address": "滨江区长河街道长虹南苑二期南门34号商铺",
    "hours": "周二至周五 14:00-20:00周六至周日 10:00-18:00（周一闭馆）",
    "phone": "19965785031",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%BB%A8%E6%B1%9F%E5%8C%BA%E9%95%BF%E6%B2%B3%E8%A1%97%E9%81%93%E9%95%BF%E8%99%B9%E5%8D%97%E8%8B%91%E4%BA%8C%E6%9C%9F%E5%8D%97%E9%97%A834%E5%8F%B7%E5%95%86%E9%93%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-72",
    "name": "鸿宁泊林春天",
    "fullName": "鸿宁泊林春天·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区宁围街道鸿宁社区鸿宁路40号泊林春天9-1",
    "hours": "周一至周五13:30-20:30周六10:00-20:00",
    "phone": "15024325196",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%AE%81%E5%9B%B4%E8%A1%97%E9%81%93%E9%B8%BF%E5%AE%81%E7%A4%BE%E5%8C%BA%E9%B8%BF%E5%AE%81%E8%B7%AF40%E5%8F%B7%E6%B3%8A%E6%9E%97%E6%98%A5%E5%A4%A99-1"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-73",
    "name": "柏峰珑悦府",
    "fullName": "柏峰珑悦府·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区盈丰街道文明路与利丰路交叉口珑悦府",
    "hours": "周一至周五13:30-20:30周六10:00-20:00",
    "phone": "15024325196",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E7%9B%88%E4%B8%B0%E8%A1%97%E9%81%93%E6%96%87%E6%98%8E%E8%B7%AF%E4%B8%8E%E5%88%A9%E4%B8%B0%E8%B7%AF%E4%BA%A4%E5%8F%89%E5%8F%A3%E7%8F%91%E6%82%A6%E5%BA%9C"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-74",
    "name": "江南之星",
    "fullName": "江南之星·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "浙江省杭州市萧山区北干街道博奥路江南之星东门1109号商铺",
    "hours": "周一至周五13:30-20:30周六10:00-20:00",
    "phone": "15024325196",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%B5%99%E6%B1%9F%E7%9C%81%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%8C%97%E5%B9%B2%E8%A1%97%E9%81%93%E5%8D%9A%E5%A5%A5%E8%B7%AF%E6%B1%9F%E5%8D%97%E4%B9%8B%E6%98%9F%E4%B8%9C%E9%97%A81109%E5%8F%B7%E5%95%86%E9%93%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-75",
    "name": "顺发恒园",
    "fullName": "顺发恒园·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区北干街道顺发恒园18幢1单元1楼架空层",
    "hours": "周一至周五13:30-20:30周六10:00-20:00",
    "phone": "18967193778",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%8C%97%E5%B9%B2%E8%A1%97%E9%81%93%E9%A1%BA%E5%8F%91%E6%81%92%E5%9B%AD18%E5%B9%A21%E5%8D%95%E5%85%831%E6%A5%BC%E6%9E%B6%E7%A9%BA%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-76",
    "name": "施家桥社区",
    "fullName": "施家桥社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区施家桥社区新时代文明实践站 萧山区北干街道山阴路913号2楼",
    "hours": "周一至周五 8:30-17:00",
    "phone": "82631018",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E6%96%BD%E5%AE%B6%E6%A1%A5%E7%A4%BE%E5%8C%BA%E6%96%B0%E6%97%B6%E4%BB%A3%E6%96%87%E6%98%8E%E5%AE%9E%E8%B7%B5%E7%AB%99%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%8C%97%E5%B9%B2%E8%A1%97%E9%81%93%E5%B1%B1%E9%98%B4%E8%B7%AF913%E5%8F%B72%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-77",
    "name": "河上镇",
    "fullName": "河上镇·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区河上镇井泉街101号",
    "hours": "周二至周日 8:30-16:30",
    "phone": "15868149011",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E6%B2%B3%E4%B8%8A%E9%95%87%E4%BA%95%E6%B3%89%E8%A1%97101%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-78",
    "name": "靖美社区",
    "fullName": "靖美社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区靖江街道官界路726号靖美社区党群服务中心 一楼",
    "hours": "周一至周日 8:30-11:3013:30-16:30",
    "phone": "82911353",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E9%9D%96%E6%B1%9F%E8%A1%97%E9%81%93%E5%AE%98%E7%95%8C%E8%B7%AF726%E5%8F%B7%E9%9D%96%E7%BE%8E%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%20%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-79",
    "name": "运河里社区",
    "fullName": "运河里社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区临浦镇运河里社区东藩北路110号",
    "hours": "周一至周日 8:30-11:3013:30-16:30",
    "phone": "82450550",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E4%B8%B4%E6%B5%A6%E9%95%87%E8%BF%90%E6%B2%B3%E9%87%8C%E7%A4%BE%E5%8C%BA%E4%B8%9C%E8%97%A9%E5%8C%97%E8%B7%AF110%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-80",
    "name": "开欣社区",
    "fullName": "开欣社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区建设一路1871-1873号开欣社区党群服务中心二楼",
    "hours": "周一至周五 8:30-17:00",
    "phone": "82350511",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%BB%BA%E8%AE%BE%E4%B8%80%E8%B7%AF1871-1873%E5%8F%B7%E5%BC%80%E6%AC%A3%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-81",
    "name": "望海潮书享Zone",
    "fullName": "望海潮书享Zone·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州萧山建设一路望海潮项目5号楼二单元1楼",
    "hours": "周一至周日 7:00-21:30",
    "phone": "18768107808",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E8%90%A7%E5%B1%B1%E5%BB%BA%E8%AE%BE%E4%B8%80%E8%B7%AF%E6%9C%9B%E6%B5%B7%E6%BD%AE%E9%A1%B9%E7%9B%AE5%E5%8F%B7%E6%A5%BC%E4%BA%8C%E5%8D%95%E5%85%831%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-82",
    "name": "湖山幸福荟",
    "fullName": "湖山幸福荟·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区蜀山街道蜀山路584号湖山幸福荟",
    "hours": "周二至周日 8:30-20:30",
    "phone": "19548158296",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E8%9C%80%E5%B1%B1%E8%A1%97%E9%81%93%E8%9C%80%E5%B1%B1%E8%B7%AF584%E5%8F%B7%E6%B9%96%E5%B1%B1%E5%B9%B8%E7%A6%8F%E8%8D%9F"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-83",
    "name": "民湘社区",
    "fullName": "民湘社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "萧山",
    "address": "杭州市萧山区义桥镇民湘社区党群服务中心一楼（东旭街7-6）",
    "hours": "周一至周日 8:30-16:30",
    "phone": "82457509",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E4%B9%89%E6%A1%A5%E9%95%87%E6%B0%91%E6%B9%98%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%B8%80%E6%A5%BC%EF%BC%88%E4%B8%9C%E6%97%AD%E8%A1%977-6%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-84",
    "name": "竹韵社区",
    "fullName": "竹韵社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区闲林街道竹韵社区党群服务中心",
    "hours": "周二至周日 9:00-17:00",
    "phone": "18267145515",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E9%97%B2%E6%9E%97%E8%A1%97%E9%81%93%E7%AB%B9%E9%9F%B5%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-85",
    "name": "翡翠社区",
    "fullName": "翡翠社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区闲林街道翡翠社区",
    "hours": "周一至周五 10:00-20:00 周六至周日 9:30-17:30",
    "phone": "19906611930",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E9%97%B2%E6%9E%97%E8%A1%97%E9%81%93%E7%BF%A1%E7%BF%A0%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-86",
    "name": "横溪社区",
    "fullName": "横溪社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区横溪社区镜鉴未来府5-1号横溪社区便民服务站1楼",
    "hours": "上午 8:30-12:00下午 13:30-17:00晚上 18:30-20:30",
    "phone": "0571-89050036",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E6%A8%AA%E6%BA%AA%E7%A4%BE%E5%8C%BA%E9%95%9C%E9%89%B4%E6%9C%AA%E6%9D%A5%E5%BA%9C5-1%E5%8F%B7%E6%A8%AA%E6%BA%AA%E7%A4%BE%E5%8C%BA%E4%BE%BF%E6%B0%91%E6%9C%8D%E5%8A%A1%E7%AB%991%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-87",
    "name": "云上书舍",
    "fullName": "云上书舍·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区五常街道五常街道地信路1号云上书舍",
    "hours": "周一至周五 9:00-17:00周六至周日 9:00-19:00",
    "phone": "18867511119",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E4%BA%94%E5%B8%B8%E8%A1%97%E9%81%93%E4%BA%94%E5%B8%B8%E8%A1%97%E9%81%93%E5%9C%B0%E4%BF%A1%E8%B7%AF1%E5%8F%B7%E4%BA%91%E4%B8%8A%E4%B9%A6%E8%88%8D"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-88",
    "name": "朝夕书房",
    "fullName": "朝夕书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区瓶窑镇港渠路99号幸福乡里共同体1楼北区",
    "hours": "周一至周六 8:30-17:30",
    "phone": "15168491990",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E7%93%B6%E7%AA%91%E9%95%87%E6%B8%AF%E6%B8%A0%E8%B7%AF99%E5%8F%B7%E5%B9%B8%E7%A6%8F%E4%B9%A1%E9%87%8C%E5%85%B1%E5%90%8C%E4%BD%931%E6%A5%BC%E5%8C%97%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-89",
    "name": "良渚文化艺术中心村民书房",
    "fullName": "良渚文化艺术中心村民书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区古墩路良渚文化艺术中心",
    "hours": "周一至周日 9:00-21:00",
    "phone": "13581655940",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E5%8F%A4%E5%A2%A9%E8%B7%AF%E8%89%AF%E6%B8%9A%E6%96%87%E5%8C%96%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-90",
    "name": "毓溪书舍",
    "fullName": "毓溪书舍·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区余杭街道毓溪社区邻里中心",
    "hours": "周一至周六 8:30-20:00（周日闭馆）",
    "phone": "15990019787",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E4%BD%99%E6%9D%AD%E8%A1%97%E9%81%93%E6%AF%93%E6%BA%AA%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-91",
    "name": "甄家湾社区",
    "fullName": "甄家湾社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区闲林街道爵士风情雅兰苑2幢101室",
    "hours": "周二至周日8:30-18:30",
    "phone": "13588102381",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E9%97%B2%E6%9E%97%E8%A1%97%E9%81%93%E7%88%B5%E5%A3%AB%E9%A3%8E%E6%83%85%E9%9B%85%E5%85%B0%E8%8B%912%E5%B9%A2101%E5%AE%A4"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-92",
    "name": "龙潭社区",
    "fullName": "龙潭社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区仓前街道葛巷路与舒心路交叉口悦见未来雅庭小区",
    "hours": "周一至周日 上午9:00-11:30 下午13:00-17:00 晚上18:30-21:30",
    "phone": "13958113725",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E4%BB%93%E5%89%8D%E8%A1%97%E9%81%93%E8%91%9B%E5%B7%B7%E8%B7%AF%E4%B8%8E%E8%88%92%E5%BF%83%E8%B7%AF%E4%BA%A4%E5%8F%89%E5%8F%A3%E6%82%A6%E8%A7%81%E6%9C%AA%E6%9D%A5%E9%9B%85%E5%BA%AD%E5%B0%8F%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-93",
    "name": "泰邻乐",
    "fullName": "泰邻乐·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区花鼓桥街18号",
    "hours": "周二至周日 9:00-20:00",
    "phone": "0571-89099579",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E8%8A%B1%E9%BC%93%E6%A1%A5%E8%A1%9718%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-94",
    "name": "景山书舍",
    "fullName": "景山书舍·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区五常街道荆山湾路180号",
    "hours": "周二至周日 9:00-17:00",
    "phone": "19106820410",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E4%BA%94%E5%B8%B8%E8%A1%97%E9%81%93%E8%8D%86%E5%B1%B1%E6%B9%BE%E8%B7%AF180%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-95",
    "name": "虫洞创意空间",
    "fullName": "虫洞创意空间·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区良渚街道莫干山路3111号",
    "hours": "周一至周日 8:30-18:00",
    "phone": "13957157916",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E8%89%AF%E6%B8%9A%E8%A1%97%E9%81%93%E8%8E%AB%E5%B9%B2%E5%B1%B1%E8%B7%AF3111%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-96",
    "name": "和邻里",
    "fullName": "和邻里·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区仁和街道怡然街54号",
    "hours": "周二至周五 10:30-12:0013:30-19:30 周六至周日 9:00-12:00；13:30-19:30",
    "phone": "15700063272",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E4%BB%81%E5%92%8C%E8%A1%97%E9%81%93%E6%80%A1%E7%84%B6%E8%A1%9754%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-97",
    "name": "亭市书社",
    "fullName": "亭市书社·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "余杭",
    "address": "杭州市余杭区瓶窑镇新窑坝路1号（瓶窑老街）",
    "hours": "每天 9:00-17:00",
    "phone": "13588323772",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%BD%99%E6%9D%AD%E5%8C%BA%E7%93%B6%E7%AA%91%E9%95%87%E6%96%B0%E7%AA%91%E5%9D%9D%E8%B7%AF1%E5%8F%B7%EF%BC%88%E7%93%B6%E7%AA%91%E8%80%81%E8%A1%97%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-98",
    "name": "曹家浜社区",
    "fullName": "曹家浜社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区尚贤路1－28号崇贤街道曹家浜社区",
    "hours": "周二至周五 9:00-17:30周六至周日 9:00-20:30（周一闭馆）",
    "phone": "0571-86272166",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E5%B0%9A%E8%B4%A4%E8%B7%AF1%EF%BC%8D28%E5%8F%B7%E5%B4%87%E8%B4%A4%E8%A1%97%E9%81%93%E6%9B%B9%E5%AE%B6%E6%B5%9C%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-99",
    "name": "映荷社区",
    "fullName": "映荷社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区顺达路103号东湖街道映荷社区",
    "hours": "周一至周五 9:00-17:00",
    "phone": "17805806570",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E9%A1%BA%E8%BE%BE%E8%B7%AF103%E5%8F%B7%E4%B8%9C%E6%B9%96%E8%A1%97%E9%81%93%E6%98%A0%E8%8D%B7%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-100",
    "name": "崇文社区",
    "fullName": "崇文社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区星海南路6-3号崇贤街道佳源名城崇文未来社区邻里中心",
    "hours": "周二到周日 9:00—20:00周一闭馆",
    "phone": "0571-86273206",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%98%9F%E6%B5%B7%E5%8D%97%E8%B7%AF6-3%E5%8F%B7%E5%B4%87%E8%B4%A4%E8%A1%97%E9%81%93%E4%BD%B3%E6%BA%90%E5%90%8D%E5%9F%8E%E5%B4%87%E6%96%87%E6%9C%AA%E6%9D%A5%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": true
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间",
      "24小时公益自习室"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-101",
    "name": "茅山社区",
    "fullName": "茅山社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区星河路93号东湖街道茅山社区金都夏宫东门",
    "hours": "周一至周日24小时开放",
    "phone": "0571-89161225",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%98%9F%E6%B2%B3%E8%B7%AF93%E5%8F%B7%E4%B8%9C%E6%B9%96%E8%A1%97%E9%81%93%E8%8C%85%E5%B1%B1%E7%A4%BE%E5%8C%BA%E9%87%91%E9%83%BD%E5%A4%8F%E5%AE%AB%E4%B8%9C%E9%97%A8"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-102",
    "name": "汀兰社区",
    "fullName": "汀兰社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区乔司街道汀城街与良熟路交叉路口（赞成首府6号楼沿街商铺），目前在装修改造中。",
    "hours": "周一到周日 8:00-16:30",
    "phone": "0571-86101273",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E4%B9%94%E5%8F%B8%E8%A1%97%E9%81%93%E6%B1%80%E5%9F%8E%E8%A1%97%E4%B8%8E%E8%89%AF%E7%86%9F%E8%B7%AF%E4%BA%A4%E5%8F%89%E8%B7%AF%E5%8F%A3%EF%BC%88%E8%B5%9E%E6%88%90%E9%A6%96%E5%BA%9C6%E5%8F%B7%E6%A5%BC%E6%B2%BF%E8%A1%97%E5%95%86%E9%93%BA%EF%BC%89%EF%BC%8C%E7%9B%AE%E5%89%8D%E5%9C%A8%E8%A3%85%E4%BF%AE%E6%94%B9%E9%80%A0%E4%B8%AD%E3%80%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-103",
    "name": "河南埭社区",
    "fullName": "河南埭社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区河南埭路17-1",
    "hours": "周二至周日 8:00-18:00 周一闭馆",
    "phone": "15158160801",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%B2%B3%E5%8D%97%E5%9F%AD%E8%B7%AF17-1"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-104",
    "name": "华城社区",
    "fullName": "华城社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区鼎盛街138号-146号",
    "hours": "周一至周日8:00-19:00",
    "phone": "15068102022",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E9%BC%8E%E7%9B%9B%E8%A1%97138%E5%8F%B7-146%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-105",
    "name": "运旺社区",
    "fullName": "运旺社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区运河街道运旺社区东湖北路705-9号",
    "hours": "周二至周四 8:30-17:00 周五至周日 8:30-20:00周一闭馆",
    "phone": "0571-86210310",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E8%BF%90%E6%B2%B3%E8%A1%97%E9%81%93%E8%BF%90%E6%97%BA%E7%A4%BE%E5%8C%BA%E4%B8%9C%E6%B9%96%E5%8C%97%E8%B7%AF705-9%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-106",
    "name": "邱山社区",
    "fullName": "邱山社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "目前在杭州市临平区景园路68号（后续将搬迁至杭州市临平区沿山路13-15号）",
    "hours": "周一至周日8:30-16:30",
    "phone": "13732248074",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E7%9B%AE%E5%89%8D%E5%9C%A8%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%99%AF%E5%9B%AD%E8%B7%AF68%E5%8F%B7%EF%BC%88%E5%90%8E%E7%BB%AD%E5%B0%86%E6%90%AC%E8%BF%81%E8%87%B3%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%B2%BF%E5%B1%B1%E8%B7%AF13-15%E5%8F%B7%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-107",
    "name": "新洲社区",
    "fullName": "新洲社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区东湖街道顺风路2号-101、105，上坤山语四季",
    "hours": "春夏8:30-11:30 14:00-17:00秋冬8:30-11:30 13:30-16:30周一闭馆",
    "phone": "15356750727",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E4%B8%9C%E6%B9%96%E8%A1%97%E9%81%93%E9%A1%BA%E9%A3%8E%E8%B7%AF2%E5%8F%B7-101%E3%80%81105%EF%BC%8C%E4%B8%8A%E5%9D%A4%E5%B1%B1%E8%AF%AD%E5%9B%9B%E5%AD%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-108",
    "name": "红丰社区",
    "fullName": "红丰社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区超峰东路181号",
    "hours": "周二至周日8:00-17:00",
    "phone": "15268509334",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E8%B6%85%E5%B3%B0%E4%B8%9C%E8%B7%AF181%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-109",
    "name": "安乐社区",
    "fullName": "安乐社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区滨沁公寓商铺2-5，2-6",
    "hours": "春夏 8:30-11:30 14:00-17:30秋冬 8:30-11:30 13:30-17:00周日闭馆",
    "phone": "0571-86260081",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E6%BB%A8%E6%B2%81%E5%85%AC%E5%AF%93%E5%95%86%E9%93%BA2-5%EF%BC%8C2-6"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-110",
    "name": "南星社区",
    "fullName": "南星社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临平",
    "address": "杭州市临平区南星社区文化家园三楼星福客厅",
    "hours": "周一至周日8:30-17:30",
    "phone": "13732281219",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%B9%B3%E5%8C%BA%E5%8D%97%E6%98%9F%E7%A4%BE%E5%8C%BA%E6%96%87%E5%8C%96%E5%AE%B6%E5%9B%AD%E4%B8%89%E6%A5%BC%E6%98%9F%E7%A6%8F%E5%AE%A2%E5%8E%85"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-111",
    "name": "新沙社区",
    "fullName": "新沙社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区下沙街道新沙社区党群服务中心二楼",
    "hours": "周一至周五上午:8:30-11:30下午:13:30-17:00晚上:18:30-20:00周末、节假日 上午:8:30-11:30下午:13:30-17:00",
    "phone": "0571-88357653",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%8B%E6%B2%99%E8%A1%97%E9%81%93%E6%96%B0%E6%B2%99%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-112",
    "name": "向涛社区",
    "fullName": "向涛社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区义蓬街道向涛社区党群服务中心内",
    "hours": "周一至周日上午8:30-11:30 下午13:30-17:00",
    "phone": "15356170996",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E5%90%91%E6%B6%9B%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E5%86%85"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-113",
    "name": "义隆书房",
    "fullName": "义隆书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区义蓬街道义隆社区党群服务中心4楼",
    "hours": "周一至周日 上午 8:30-11:30 下午13:30-17:00",
    "phone": "0571-82193763",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E4%B9%89%E9%9A%86%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%834%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-114",
    "name": "朗琴社区",
    "fullName": "朗琴社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区白杨街道朗琴社区朗诗国际街区3幢2楼",
    "hours": "周一至周五上午 8:30-11:30下午 14:00-17:30晚上 17:30-20:00周六至周日 上午9:00-11:30下午14:00-17:00",
    "phone": "0571-8883863713396571981",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E7%99%BD%E6%9D%A8%E8%A1%97%E9%81%93%E6%9C%97%E7%90%B4%E7%A4%BE%E5%8C%BA%E6%9C%97%E8%AF%97%E5%9B%BD%E9%99%85%E8%A1%97%E5%8C%BA3%E5%B9%A22%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-115",
    "name": "临江书房",
    "fullName": "临江书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区临江街道临江佳苑社区北门东侧二楼",
    "hours": "周二至周日 8:30-17:30（周一闭馆）",
    "phone": "13758290917",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%B4%E6%B1%9F%E8%A1%97%E9%81%93%E4%B8%B4%E6%B1%9F%E4%BD%B3%E8%8B%91%E7%A4%BE%E5%8C%BA%E5%8C%97%E9%97%A8%E4%B8%9C%E4%BE%A7%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-116",
    "name": "东沙湖社区",
    "fullName": "东沙湖社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区河庄街道青西一路1298号",
    "hours": "周二至周日 8:30-11:30 13:30-20:00（周一闭馆）",
    "phone": "0571-82101530",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E6%B2%B3%E5%BA%84%E8%A1%97%E9%81%93%E9%9D%92%E8%A5%BF%E4%B8%80%E8%B7%AF1298%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-117",
    "name": "田城社区",
    "fullName": "田城社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区云上澜苑邻里中心二楼（云上澜苑38幢）",
    "hours": "周一至周六 8:30-16:30（周日闭馆）",
    "phone": "13588474022",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%BA%91%E4%B8%8A%E6%BE%9C%E8%8B%91%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC%EF%BC%88%E4%BA%91%E4%B8%8A%E6%BE%9C%E8%8B%9138%E5%B9%A2%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-118",
    "name": "新韵书房",
    "fullName": "新韵书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区临江街道经四路3258号-3266号",
    "hours": "周一至周日 8:30-20:00",
    "phone": "0571-86618556",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%B4%E6%B1%9F%E8%A1%97%E9%81%93%E7%BB%8F%E5%9B%9B%E8%B7%AF3258%E5%8F%B7-3266%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-119",
    "name": "东方社区",
    "fullName": "东方社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区下沙街道福城路6号",
    "hours": "周二至周日 9:00-17:00（周一闭馆）",
    "phone": "0571-86839996",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%8B%E6%B2%99%E8%A1%97%E9%81%93%E7%A6%8F%E5%9F%8E%E8%B7%AF6%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-120",
    "name": "新湾街道",
    "fullName": "新湾街道·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区新湾街道钱塘区湾街道新四路与横一路交叉口",
    "hours": "周二至周日 8:30-11:30，13:30-20:00（周一闭馆）",
    "phone": "18758575691",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E6%96%B0%E6%B9%BE%E8%A1%97%E9%81%93%E9%92%B1%E5%A1%98%E5%8C%BA%E6%B9%BE%E8%A1%97%E9%81%93%E6%96%B0%E5%9B%9B%E8%B7%AF%E4%B8%8E%E6%A8%AA%E4%B8%80%E8%B7%AF%E4%BA%A4%E5%8F%89%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-121",
    "name": "义和善乐书房",
    "fullName": "义和善乐书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区义蓬街道义和路1号义和社区党群服务中心",
    "hours": "周一至周日8:30-11:30 13:30-17:00",
    "phone": "0571-82984028",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E4%B9%89%E5%92%8C%E8%B7%AF1%E5%8F%B7%E4%B9%89%E5%92%8C%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-122",
    "name": "云上书房",
    "fullName": "云上书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "钱塘",
    "address": "杭州市钱塘区白杨街道银海街33号",
    "hours": "周二至周日 8:30-11:30；14:00-17:30 （周一闭馆）",
    "phone": "0571-87217566",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E9%92%B1%E5%A1%98%E5%8C%BA%E7%99%BD%E6%9D%A8%E8%A1%97%E9%81%93%E9%93%B6%E6%B5%B7%E8%A1%9733%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-123",
    "name": "秦忆社区",
    "fullName": "秦忆社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区富春街道香槟路237号",
    "hours": "周一至周日 8:30-17:00",
    "phone": "13805768921",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E5%AF%8C%E6%98%A5%E8%A1%97%E9%81%93%E9%A6%99%E6%A7%9F%E8%B7%AF237%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-124",
    "name": "江滨社区",
    "fullName": "江滨社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区富春街道西堤南路121号",
    "hours": "周一至周日 8:30-17:00",
    "phone": "13187120723",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E5%AF%8C%E6%98%A5%E8%A1%97%E9%81%93%E8%A5%BF%E5%A0%A4%E5%8D%97%E8%B7%AF121%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-125",
    "name": "梓树社区",
    "fullName": "梓树社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区银湖街道梓树村",
    "hours": "周一至周日 8:30-17:00",
    "phone": "18758121580",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E9%93%B6%E6%B9%96%E8%A1%97%E9%81%93%E6%A2%93%E6%A0%91%E6%9D%91"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-126",
    "name": "瞳心艺术学校",
    "fullName": "瞳心艺术学校·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区富春街道金桥北路161-29",
    "hours": "周二至周日 9:00-20:00",
    "phone": "13867494966",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E5%AF%8C%E6%98%A5%E8%A1%97%E9%81%93%E9%87%91%E6%A1%A5%E5%8C%97%E8%B7%AF161-29"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-127",
    "name": "山水社区",
    "fullName": "山水社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区鹿山街道江波街518号逸品春江12号楼",
    "hours": "周一至周日 8:30-17:00",
    "phone": "13187120723",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E9%B9%BF%E5%B1%B1%E8%A1%97%E9%81%93%E6%B1%9F%E6%B3%A2%E8%A1%97518%E5%8F%B7%E9%80%B8%E5%93%81%E6%98%A5%E6%B1%9F12%E5%8F%B7%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-128",
    "name": "茶野咖啡书吧",
    "fullName": "茶野咖啡书吧·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区富春街道拔山村温州厂上88号",
    "hours": "周一至周日 8:30-20:30",
    "phone": "13989839696",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E5%AF%8C%E6%98%A5%E8%A1%97%E9%81%93%E6%8B%94%E5%B1%B1%E6%9D%91%E6%B8%A9%E5%B7%9E%E5%8E%82%E4%B8%8A88%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-129",
    "name": "春雨社区",
    "fullName": "春雨社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区春江街道大桥南路济宸府11号楼",
    "hours": "周一至周日 8:00-17:00",
    "phone": "15068859912",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E6%98%A5%E6%B1%9F%E8%A1%97%E9%81%93%E5%A4%A7%E6%A1%A5%E5%8D%97%E8%B7%AF%E6%B5%8E%E5%AE%B8%E5%BA%9C11%E5%8F%B7%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-130",
    "name": "三予书院",
    "fullName": "三予书院·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区洞桥镇三溪村枫林咽泉景区",
    "hours": "周一至周日 8:30-20:30",
    "phone": "13989837024",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E6%B4%9E%E6%A1%A5%E9%95%87%E4%B8%89%E6%BA%AA%E6%9D%91%E6%9E%AB%E6%9E%97%E5%92%BD%E6%B3%89%E6%99%AF%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-131",
    "name": "守仁书屋",
    "fullName": "守仁书屋·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区富春街道文豪路45号",
    "hours": "周一至周日 9:30-20:30",
    "phone": "13646867513",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E5%AF%8C%E6%98%A5%E8%A1%97%E9%81%93%E6%96%87%E8%B1%AA%E8%B7%AF45%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-132",
    "name": "新民社区",
    "fullName": "新民社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区江滨东大道21号",
    "hours": "周一至周日 8:30-11:00 14:00-17:00 18:00-20:30",
    "phone": "15158128020",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E6%B1%9F%E6%BB%A8%E4%B8%9C%E5%A4%A7%E9%81%9321%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-133",
    "name": "富春石榴红",
    "fullName": "富春石榴红·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区春秋北路369号",
    "hours": "周一闭馆 周二至周五 12:00-20:00 周六至周日（寒暑假） 9:00-20:00",
    "phone": "15258878266",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E6%98%A5%E7%A7%8B%E5%8C%97%E8%B7%AF369%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-134",
    "name": "众享空间",
    "fullName": "众享空间·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "富阳",
    "address": "杭州市富阳区桂花西路187号",
    "hours": "周一至周日 8:00-11:30 13:30-17:00 18:30-20:30",
    "phone": "13625717001",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%AF%8C%E9%98%B3%E5%8C%BA%E6%A1%82%E8%8A%B1%E8%A5%BF%E8%B7%AF187%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-135",
    "name": "春天华府",
    "fullName": "春天华府·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区春天华府小区学习会所一楼",
    "hours": "周二至周日 8:30-17:00",
    "phone": "13968022669",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E6%98%A5%E5%A4%A9%E5%8D%8E%E5%BA%9C%E5%B0%8F%E5%8C%BA%E5%AD%A6%E4%B9%A0%E4%BC%9A%E6%89%80%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-136",
    "name": "青山鹤岭",
    "fullName": "青山鹤岭·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区青山湖街道青山鹤岭小区19幢",
    "hours": "周二至周日 8:30-20:30",
    "phone": "13386537124",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%9D%92%E5%B1%B1%E6%B9%96%E8%A1%97%E9%81%93%E9%9D%92%E5%B1%B1%E9%B9%A4%E5%B2%AD%E5%B0%8F%E5%8C%BA19%E5%B9%A2"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-137",
    "name": "公园城",
    "fullName": "公园城·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区苕溪北岸临西桥西侧",
    "hours": "周二至周日 9:00-17:00",
    "phone": "13666639862",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E8%8B%95%E6%BA%AA%E5%8C%97%E5%B2%B8%E4%B8%B4%E8%A5%BF%E6%A1%A5%E8%A5%BF%E4%BE%A7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-138",
    "name": "桃李春风",
    "fullName": "桃李春风·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区桃李春风拾贰院花园洋房25号楼一楼",
    "hours": "周二至周日 8:30-20:30",
    "phone": "1500079409113805780968",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E6%A1%83%E6%9D%8E%E6%98%A5%E9%A3%8E%E6%8B%BE%E8%B4%B0%E9%99%A2%E8%8A%B1%E5%9B%AD%E6%B4%8B%E6%88%BF25%E5%8F%B7%E6%A5%BC%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-139",
    "name": "兰锦社区",
    "fullName": "兰锦社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦南街道兰锦路333号兰锦社区邻里中心二楼",
    "hours": "周一至周日 8:30-20:00",
    "phone": "18989552700",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%8D%97%E8%A1%97%E9%81%93%E5%85%B0%E9%94%A6%E8%B7%AF333%E5%8F%B7%E5%85%B0%E9%94%A6%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-140",
    "name": "几何书店",
    "fullName": "几何书店·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦城街道天目路718号净土寺遗址内",
    "hours": "周一到周四 9:00-18:00周五到周日 9:00-19:00",
    "phone": "18257151647",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%9F%8E%E8%A1%97%E9%81%93%E5%A4%A9%E7%9B%AE%E8%B7%AF718%E5%8F%B7%E5%87%80%E5%9C%9F%E5%AF%BA%E9%81%97%E5%9D%80%E5%86%85"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-141",
    "name": "锦天社区",
    "fullName": "锦天社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区玲珑街道公园家11幢103",
    "hours": "周二至周五 13:30—20:30",
    "phone": "15325888878",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E7%8E%B2%E7%8F%91%E8%A1%97%E9%81%93%E5%85%AC%E5%9B%AD%E5%AE%B611%E5%B9%A2103"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-142",
    "name": "兰岭书房",
    "fullName": "兰岭书房·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦城街道钱王街553号",
    "hours": "周一至周日 9:00-21:00",
    "phone": "0571-61080652",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%9F%8E%E8%A1%97%E9%81%93%E9%92%B1%E7%8E%8B%E8%A1%97553%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-143",
    "name": "马溪社区",
    "fullName": "马溪社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦北街道北排街350号二楼",
    "hours": "周二至周日 8:30-21:00",
    "phone": "13357529202",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%8C%97%E8%A1%97%E9%81%93%E5%8C%97%E6%8E%92%E8%A1%97350%E5%8F%B7%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-144",
    "name": "青云驿站",
    "fullName": "青云驿站·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区太湖源镇青溪街263号",
    "hours": "周二至周日 8:30-20:30",
    "phone": "13516727772",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E5%A4%AA%E6%B9%96%E6%BA%90%E9%95%87%E9%9D%92%E6%BA%AA%E8%A1%97263%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-145",
    "name": "吴越书店",
    "fullName": "吴越书店·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦城街道长桥路340号",
    "hours": "周二至周日 10:00-21:00",
    "phone": "13575788750",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%9F%8E%E8%A1%97%E9%81%93%E9%95%BF%E6%A1%A5%E8%B7%AF340%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-146",
    "name": "语岸澜庭",
    "fullName": "语岸澜庭·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区锦北街道白泥路733号语岸澜庭共享办公区",
    "hours": "周一至周日 9:00-20:00",
    "phone": "19517962955",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%94%A6%E5%8C%97%E8%A1%97%E9%81%93%E7%99%BD%E6%B3%A5%E8%B7%AF733%E5%8F%B7%E8%AF%AD%E5%B2%B8%E6%BE%9C%E5%BA%AD%E5%85%B1%E4%BA%AB%E5%8A%9E%E5%85%AC%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-147",
    "name": "保亿浮光书吧",
    "fullName": "保亿浮光书吧·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "临安",
    "address": "杭州市临安区高虹街270号",
    "hours": "周一至周日 9:00-18:00",
    "phone": "18258889793",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E4%B8%B4%E5%AE%89%E5%8C%BA%E9%AB%98%E8%99%B9%E8%A1%97270%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-148",
    "name": "翰林社区",
    "fullName": "翰林社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县翰林社区居民委员会",
    "hours": "周一至周六早上 8:30-11:30下午 13:30-17:00",
    "phone": "17794581612",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E7%BF%B0%E6%9E%97%E7%A4%BE%E5%8C%BA%E5%B1%85%E6%B0%91%E5%A7%94%E5%91%98%E4%BC%9A"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-149",
    "name": "吾家书巢",
    "fullName": "吾家书巢·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县城南街道朝霞路100号",
    "hours": "周一闭馆周二至周日 8:30-17:30",
    "phone": "0571-58011190",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%9F%8E%E5%8D%97%E8%A1%97%E9%81%93%E6%9C%9D%E9%9C%9E%E8%B7%AF100%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-150",
    "name": "桐庐农商银行5060活动中心",
    "fullName": "桐庐农商银行5060活动中心·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县城南街道大奇山路687号",
    "hours": "周一至周六 8:00-17:00",
    "phone": "15857138975",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%9F%8E%E5%8D%97%E8%A1%97%E9%81%93%E5%A4%A7%E5%A5%87%E5%B1%B1%E8%B7%AF687%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-151",
    "name": "玉华社区",
    "fullName": "玉华社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县分水镇武盛街城隍庙对面",
    "hours": "周一至周六上午 8:30-11:00下午 1:30-4:30",
    "phone": "15026552816",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%88%86%E6%B0%B4%E9%95%87%E6%AD%A6%E7%9B%9B%E8%A1%97%E5%9F%8E%E9%9A%8D%E5%BA%99%E5%AF%B9%E9%9D%A2"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-152",
    "name": "康乐社区",
    "fullName": "康乐社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县体育场路73号",
    "hours": "周一至周六 9:00-17:00",
    "phone": "15757106940",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E4%BD%93%E8%82%B2%E5%9C%BA%E8%B7%AF73%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-153",
    "name": "大奇山社区",
    "fullName": "大奇山社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县城南街道城南路434号",
    "hours": "周一至周日 上午8:30-11:30 下午13:30-17:30",
    "phone": "13758238788",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%9F%8E%E5%8D%97%E8%A1%97%E9%81%93%E5%9F%8E%E5%8D%97%E8%B7%AF434%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-154",
    "name": "东斋书院",
    "fullName": "东斋书院·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县城南街道云栖中路1200号",
    "hours": "周一至周四 早上9:00-14:00周五到周日 早上9:00-17:00",
    "phone": "13968064926",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%9F%8E%E5%8D%97%E8%A1%97%E9%81%93%E4%BA%91%E6%A0%96%E4%B8%AD%E8%B7%AF1200%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-155",
    "name": "凤来社区“读者之家”",
    "fullName": "凤来社区“读者之家”·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县春江东路2155号飘鹰富春江花苑5号楼2楼",
    "hours": "周一至周日 上午8:30-11:00 下午14:00-17:00",
    "phone": "15267001782",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E6%98%A5%E6%B1%9F%E4%B8%9C%E8%B7%AF2155%E5%8F%B7%E9%A3%98%E9%B9%B0%E5%AF%8C%E6%98%A5%E6%B1%9F%E8%8A%B1%E8%8B%915%E5%8F%B7%E6%A5%BC2%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-156",
    "name": "富春堂",
    "fullName": "富春堂·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县学生学圣路327号富春堂大麦校区",
    "hours": "周一至周日8:00-15:30",
    "phone": "17767098804",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%AD%A6%E7%94%9F%E5%AD%A6%E5%9C%A3%E8%B7%AF327%E5%8F%B7%E5%AF%8C%E6%98%A5%E5%A0%82%E5%A4%A7%E9%BA%A6%E6%A0%A1%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-157",
    "name": "茶舍",
    "fullName": "茶舍·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县城南街道白云源路815号",
    "hours": "周一至周日9:00-22:00",
    "phone": "13735889657",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%9F%8E%E5%8D%97%E8%A1%97%E9%81%93%E7%99%BD%E4%BA%91%E6%BA%90%E8%B7%AF815%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-158",
    "name": "江滨社区",
    "fullName": "江滨社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县江滨社区居民委员会（春江路1043号）",
    "hours": "周一至周日上午8:30-11:30下午14:00-17:00",
    "phone": "0571-69999017",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E6%B1%9F%E6%BB%A8%E7%A4%BE%E5%8C%BA%E5%B1%85%E6%B0%91%E5%A7%94%E5%91%98%E4%BC%9A%EF%BC%88%E6%98%A5%E6%B1%9F%E8%B7%AF1043%E5%8F%B7%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-159",
    "name": "新城聚“新城书屋”",
    "fullName": "新城聚“新城书屋”·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县凤翔路53号美庐新城15幢3单元302室",
    "hours": "周一至周日上午8:30-11:00 下午2:00-17:00",
    "phone": "18267173970",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E5%87%A4%E7%BF%94%E8%B7%AF53%E5%8F%B7%E7%BE%8E%E5%BA%90%E6%96%B0%E5%9F%8E15%E5%B9%A23%E5%8D%95%E5%85%83302%E5%AE%A4"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-160",
    "name": "梦达",
    "fullName": "梦达·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "桐庐",
    "address": "杭州市桐庐县春江路52号",
    "hours": "周一至周日 9:00-21:30",
    "phone": "13805760968",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%A1%90%E5%BA%90%E5%8E%BF%E6%98%A5%E6%B1%9F%E8%B7%AF52%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-161",
    "name": "马路村",
    "fullName": "马路村·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇马路村文化礼堂（珍珠北路西段）",
    "hours": "周一至周日 9:00-16:00",
    "phone": "13968119003",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E9%A9%AC%E8%B7%AF%E6%9D%91%E6%96%87%E5%8C%96%E7%A4%BC%E5%A0%82%EF%BC%88%E7%8F%8D%E7%8F%A0%E5%8C%97%E8%B7%AF%E8%A5%BF%E6%AE%B5%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-162",
    "name": "南山社区",
    "fullName": "南山社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇南山大街540号南山社区",
    "hours": "周一至周五上午 8:30-12:00下午 14:00-17:00晚上 18:00-20:00",
    "phone": "13575759566",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E5%8D%97%E5%B1%B1%E5%A4%A7%E8%A1%97540%E5%8F%B7%E5%8D%97%E5%B1%B1%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-163",
    "name": "江滨社区",
    "fullName": "江滨社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇新安大街29号江滨社区",
    "hours": "周一至周日 9:00-16:00每周一夜间开放 18:00-20:00",
    "phone": "15858113679",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E6%96%B0%E5%AE%89%E5%A4%A7%E8%A1%9729%E5%8F%B7%E6%B1%9F%E6%BB%A8%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-164",
    "name": "曙光社区",
    "fullName": "曙光社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇南山一路29号曙光社区",
    "hours": "周一至周日 8:30-17:00",
    "phone": "15158007361",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E5%8D%97%E5%B1%B1%E4%B8%80%E8%B7%AF29%E5%8F%B7%E6%9B%99%E5%85%89%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-165",
    "name": "城东社区",
    "fullName": "城东社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇新安东路681号城东社区",
    "hours": "周一至周日 9:00-16:00",
    "phone": "15059512251",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E6%96%B0%E5%AE%89%E4%B8%9C%E8%B7%AF681%E5%8F%B7%E5%9F%8E%E4%B8%9C%E7%A4%BE%E5%8C%BA"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-166",
    "name": "啤酒小镇",
    "fullName": "啤酒小镇·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇睦州大道669号",
    "hours": "周一至周日 9:00-20:00",
    "phone": "13588192792",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E7%9D%A6%E5%B7%9E%E5%A4%A7%E9%81%93669%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-167",
    "name": "汾口镇",
    "fullName": "汾口镇·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县汾口镇综合文化站一楼",
    "hours": "周三至周日8:30-11:45 13:30-17:00",
    "phone": "15068894088",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E6%B1%BE%E5%8F%A3%E9%95%87%E7%BB%BC%E5%90%88%E6%96%87%E5%8C%96%E7%AB%99%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-168",
    "name": "威坪镇",
    "fullName": "威坪镇·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县威坪镇兴华街300号",
    "hours": "周二至周日 8:00-16:30",
    "phone": "13605705478",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%A8%81%E5%9D%AA%E9%95%87%E5%85%B4%E5%8D%8E%E8%A1%97300%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-169",
    "name": "文渊狮城",
    "fullName": "文渊狮城·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县姜家镇狮城路1号文渊狮城璞仕酒店三楼",
    "hours": "周一至周日 9:00-20:30",
    "phone": "13738020570",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%A7%9C%E5%AE%B6%E9%95%87%E7%8B%AE%E5%9F%8E%E8%B7%AF1%E5%8F%B7%E6%96%87%E6%B8%8A%E7%8B%AE%E5%9F%8E%E7%92%9E%E4%BB%95%E9%85%92%E5%BA%97%E4%B8%89%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-170",
    "name": "大墅镇",
    "fullName": "大墅镇·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县大墅镇新兴路4号",
    "hours": "周一至周日 8:30-17:00",
    "phone": "13757127346",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%A4%A7%E5%A2%85%E9%95%87%E6%96%B0%E5%85%B4%E8%B7%AF4%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-171",
    "name": "华数",
    "fullName": "华数·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县新安东路489号",
    "hours": "周一至周日 8:30-17:00",
    "phone": "19211810427",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E6%96%B0%E5%AE%89%E4%B8%9C%E8%B7%AF489%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-172",
    "name": "龙郡",
    "fullName": "龙郡·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县千岛湖镇环湖北路1086号",
    "hours": "周一至周日 8:00-22:00",
    "phone": "15224002247",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%8D%83%E5%B2%9B%E6%B9%96%E9%95%87%E7%8E%AF%E6%B9%96%E5%8C%97%E8%B7%AF1086%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-173",
    "name": "美客爱途",
    "fullName": "美客爱途·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "淳安",
    "address": "杭州市淳安县富文乡青田村雪坑自然村48号",
    "hours": "周一至周日 8:30-18:30",
    "phone": "13732236896",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%B7%B3%E5%AE%89%E5%8E%BF%E5%AF%8C%E6%96%87%E4%B9%A1%E9%9D%92%E7%94%B0%E6%9D%91%E9%9B%AA%E5%9D%91%E8%87%AA%E7%84%B6%E6%9D%9148%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-174",
    "name": "健安社区",
    "fullName": "健安社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市新安江街道健康南路43-1号",
    "hours": "周一至周日上午8:30-11:30下午13:30-17:00",
    "phone": "0571-64792217 15268578801",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%96%B0%E5%AE%89%E6%B1%9F%E8%A1%97%E9%81%93%E5%81%A5%E5%BA%B7%E5%8D%97%E8%B7%AF43-1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-175",
    "name": "明珠未来社区",
    "fullName": "明珠未来社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市新安江街道明珠路1号",
    "hours": "周一至周日上午8:30-11:30下午13:30-17:00",
    "phone": "64758901",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%96%B0%E5%AE%89%E6%B1%9F%E8%A1%97%E9%81%93%E6%98%8E%E7%8F%A0%E8%B7%AF1%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-176",
    "name": "更化未来社区",
    "fullName": "更化未来社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市更楼社区轻创中心",
    "hours": "周一至周日上午8:30-11:30下午13:30-17:00",
    "phone": "15355002819",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%9B%B4%E6%A5%BC%E7%A4%BE%E5%8C%BA%E8%BD%BB%E5%88%9B%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-177",
    "name": "清泰怡养院",
    "fullName": "清泰怡养院·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市寿昌镇河南里村三里亭6号",
    "hours": "周一至周日 8:00-20:00",
    "phone": "0571-64599988 18668115361",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E5%AF%BF%E6%98%8C%E9%95%87%E6%B2%B3%E5%8D%97%E9%87%8C%E6%9D%91%E4%B8%89%E9%87%8C%E4%BA%AD6%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-178",
    "name": "和园小区",
    "fullName": "和园小区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市洋溪街道洋安和园小区18栋二楼",
    "hours": "周一至周日 8:30-17:00",
    "phone": "13362176880",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%B4%8B%E6%BA%AA%E8%A1%97%E9%81%93%E6%B4%8B%E5%AE%89%E5%92%8C%E5%9B%AD%E5%B0%8F%E5%8C%BA18%E6%A0%8B%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-180",
    "name": "极美绘本屋",
    "fullName": "极美绘本屋·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市新安江街道绿城美好广场2-2-（26-29）",
    "hours": "周二至周日 9:00-21:00",
    "phone": "15068733519 60908668",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%96%B0%E5%AE%89%E6%B1%9F%E8%A1%97%E9%81%93%E7%BB%BF%E5%9F%8E%E7%BE%8E%E5%A5%BD%E5%B9%BF%E5%9C%BA2-2-%EF%BC%8826-29%EF%BC%89"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-181",
    "name": "横山未来社区",
    "fullName": "横山未来社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市寿昌镇横山路52号",
    "hours": "周一至周日上午8:00-11:30 下午13:30-17:00",
    "phone": "13675889743",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E5%AF%BF%E6%98%8C%E9%95%87%E6%A8%AA%E5%B1%B1%E8%B7%AF52%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-182",
    "name": "景春书画艺术院",
    "fullName": "景春书画艺术院·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市大同镇劳村中心街东门前一百米",
    "hours": "周六至周日上午9:00-11:30 下午14:00-17:00",
    "phone": "13823128980",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E5%A4%A7%E5%90%8C%E9%95%87%E5%8A%B3%E6%9D%91%E4%B8%AD%E5%BF%83%E8%A1%97%E4%B8%9C%E9%97%A8%E5%89%8D%E4%B8%80%E7%99%BE%E7%B1%B3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-183",
    "name": "望江社区",
    "fullName": "望江社区·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市寿昌镇昌解放路69A",
    "hours": "周一至周日上午8:30-11:30 下午13:30-17:00",
    "phone": "64567099",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E5%AF%BF%E6%98%8C%E9%95%87%E6%98%8C%E8%A7%A3%E6%94%BE%E8%B7%AF69A"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "杭州邻里阅读空间"
    ],
    "website": "https://www.zjhzlib.cn/dzfwtjth.htm",
    "note": "社区公益阅读空间，接入全市通借通还",
    "id": "neighbor-184",
    "name": "新安书院",
    "fullName": "新安书院·杭州邻里阅读空间",
    "subType": "邻里阅读空间",
    "district": "建德",
    "address": "杭州市建德市新安江街道白沙路12号",
    "hours": "周二至周六上午9:00-11:30 下午14:00-17:00",
    "phone": "15968115999",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%B8%82%E5%BB%BA%E5%BE%B7%E5%B8%82%E6%96%B0%E5%AE%89%E6%B1%9F%E8%A1%97%E9%81%93%E7%99%BD%E6%B2%99%E8%B7%AF12%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": true
    },
    "features": [
      "850㎡",
      "24小时自助阅读区",
      "数字文化长廊",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-jinshahu",
    "name": "金沙湖书房",
    "fullName": "金沙湖书房",
    "subType": "杭州书房",
    "district": "钱塘",
    "address": "钱塘区金沙大道681号金沙湖大剧院一楼南面",
    "hours": "周二至周五 9:00-20:30；周六周日 9:00-21:00，周一闭馆",
    "phone": "13867403106",
    "transport": "地铁1号线金沙湖站",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E9%87%91%E6%B2%99%E5%A4%A7%E9%81%93681%E5%8F%B7%E9%87%91%E6%B2%99%E6%B9%96%E5%A4%A7%E5%89%A7%E9%99%A2%E4%B8%80%E6%A5%BC%E5%8D%97%E9%9D%A2"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "钱塘区城市书房",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-qiantang",
    "name": "钱塘书房",
    "fullName": "钱塘书房",
    "subType": "杭州书房",
    "district": "钱塘",
    "address": "钱塘区学林街463号",
    "hours": "周二至周日 8:30-20:30",
    "phone": "0571-85303395",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%AD%A6%E6%9E%97%E8%A1%97463%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "滨江区首个空中文化长廊",
      "藏书2万+册",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yunfan",
    "name": "云帆书房",
    "fullName": "云帆书房",
    "subType": "杭州书房",
    "district": "滨江",
    "address": "滨江区浙商发展大厦",
    "hours": "以现场公告为准",
    "phone": "",
    "transport": "地铁5号线长河站G口步行约5分钟",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%BB%A8%E6%B1%9F%E5%8C%BA%E6%B5%99%E5%95%86%E5%8F%91%E5%B1%95%E5%A4%A7%E5%8E%A6"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "社区学习生活社交空间",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yisi",
    "name": "特有爱·有意思书房",
    "fullName": "特有爱·有意思书房",
    "subType": "杭州书房",
    "district": "上城",
    "address": "上城区凯旋路123号",
    "hours": "以现场公告为准",
    "phone": "",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%87%AF%E6%97%8B%E8%B7%AF123%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "馆外流通点",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-nanxue",
    "name": "南山路学士书房",
    "fullName": "南山路学士书房",
    "subType": "杭州书房",
    "district": "上城",
    "address": "上城区南山路61号",
    "hours": "9:00-18:00",
    "phone": "0571-88189368",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E4%B8%8A%E5%9F%8E%E5%8C%BA%E5%8D%97%E5%B1%B1%E8%B7%AF61%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "馆外流通点",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-mengquan",
    "name": "虎跑梦泉书院",
    "fullName": "虎跑梦泉书院",
    "subType": "杭州书房",
    "district": "西湖",
    "address": "西湖区虎跑路39号",
    "hours": "9:30-16:30",
    "phone": "13967176605",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%A5%BF%E6%B9%96%E5%8C%BA%E8%99%8E%E8%B7%91%E8%B7%AF39%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-lanli",
    "name": "兰里研学书房",
    "fullName": "兰里研学书房",
    "subType": "杭州书房",
    "district": "西湖",
    "address": "西湖区三墩镇华联村蒋家斗26号兰里研学大本营",
    "hours": "9:00-17:00",
    "phone": "0571-87331783",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%A5%BF%E6%B9%96%E5%8C%BA%E4%B8%89%E5%A2%A9%E9%95%87%E5%8D%8E%E8%81%94%E6%9D%91%E8%92%8B%E5%AE%B6%E6%96%9726%E5%8F%B7%E5%85%B0%E9%87%8C%E7%A0%94%E5%AD%A6%E5%A4%A7%E6%9C%AC%E8%90%A5"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": true
    },
    "features": [
      "萧山图书馆城市书房",
      "延长至24:00",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yuan",
    "name": "元驿站",
    "fullName": "元驿站",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区市心中路958号萧山图书馆北门",
    "hours": "周二至周日 8:30-24:00",
    "phone": "0571-83869040",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%B8%82%E5%BF%83%E4%B8%AD%E8%B7%AF958%E5%8F%B7%E8%90%A7%E5%B1%B1%E5%9B%BE%E4%B9%A6%E9%A6%86%E5%8C%97%E9%97%A8"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-bei",
    "name": "北书房",
    "fullName": "北书房",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区北干街道国悦府8-5",
    "hours": "周二至周日 10:00-20:00",
    "phone": "0571-82893220",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%8C%97%E5%B9%B2%E8%A1%97%E9%81%93%E5%9B%BD%E6%82%A6%E5%BA%9C8-5"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-moyun",
    "name": "墨韵书房",
    "fullName": "墨韵书房",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区建设四路龙湖景宸天玺北大门",
    "hours": "周二至周日 8:30-20:00，周一闭馆",
    "phone": "0571-82736575",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%BB%BA%E8%AE%BE%E5%9B%9B%E8%B7%AF%E9%BE%99%E6%B9%96%E6%99%AF%E5%AE%B8%E5%A4%A9%E7%8E%BA%E5%8C%97%E5%A4%A7%E9%97%A8"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yingyue",
    "name": "盈悦书房",
    "fullName": "盈悦书房",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区盈丰街道民和路25-29号",
    "hours": "周二至周日 9:00-21:00",
    "phone": "",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E7%9B%88%E4%B8%B0%E8%A1%97%E9%81%93%E6%B0%91%E5%92%8C%E8%B7%AF25-29%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-sanjiang",
    "name": "三江书院",
    "fullName": "三江书院",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区闻堰街道湘湖路3388号闻堰文体中心",
    "hours": "周二至周日 8:30-17:00",
    "phone": "0571-82300095",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E9%97%BB%E5%A0%B0%E8%A1%97%E9%81%93%E6%B9%98%E6%B9%96%E8%B7%AF3388%E5%8F%B7%E9%97%BB%E5%A0%B0%E6%96%87%E4%BD%93%E4%B8%AD%E5%BF%83"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-guyun",
    "name": "古塘书屋",
    "fullName": "古塘书屋",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区北干街道博学路1360号",
    "hours": "周二至周日 10:00-20:00",
    "phone": "0571-82808200",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E5%8C%97%E5%B9%B2%E8%A1%97%E9%81%93%E5%8D%9A%E5%AD%A6%E8%B7%AF1360%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-ningchao",
    "name": "宁巢共享书房",
    "fullName": "宁巢共享书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区义蓬街道义府大街1700号",
    "hours": "周一至周日 9:30-12:00，13:30-21:00",
    "phone": "18267807773",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E4%B9%89%E5%BA%9C%E5%A4%A7%E8%A1%971700%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-jusha",
    "name": "聚沙邻里中心城市书房",
    "fullName": "聚沙邻里中心城市书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区天城东路230号聚沙邻里中心一楼",
    "hours": "周二至周日 9:00-20:00",
    "phone": "19176773740",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%A4%A9%E5%9F%8E%E4%B8%9C%E8%B7%AF230%E5%8F%B7%E8%81%9A%E6%B2%99%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83%E4%B8%80%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-dongfang",
    "name": "东方社区城市书房",
    "fullName": "东方社区城市书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区下沙街道东方社区潮起下沙文化驿站",
    "hours": "周二至周日 9:00-17:00",
    "phone": "0571-86839996",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%8B%E6%B2%99%E8%A1%97%E9%81%93%E4%B8%9C%E6%96%B9%E7%A4%BE%E5%8C%BA%E6%BD%AE%E8%B5%B7%E4%B8%8B%E6%B2%99%E6%96%87%E5%8C%96%E9%A9%BF%E7%AB%99"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yunshang",
    "name": "云上书房",
    "fullName": "云上书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区白杨街道海涛路与水云街交叉口东北角",
    "hours": "周二至周日 8:30-11:30，14:00-17:30",
    "phone": "0571-87217566",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E7%99%BD%E6%9D%A8%E8%A1%97%E9%81%93%E6%B5%B7%E6%B6%9B%E8%B7%AF%E4%B8%8E%E6%B0%B4%E4%BA%91%E8%A1%97%E4%BA%A4%E5%8F%89%E5%8F%A3%E4%B8%9C%E5%8C%97%E8%A7%92"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-yunbian",
    "name": "云边书房",
    "fullName": "云边书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区白杨街道2号大街与25号大街交叉口东北侧",
    "hours": "周一至周日 8:30-20:30",
    "phone": "0571-86840968",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E7%99%BD%E6%9D%A8%E8%A1%97%E9%81%932%E5%8F%B7%E5%A4%A7%E8%A1%97%E4%B8%8E25%E5%8F%B7%E5%A4%A7%E8%A1%97%E4%BA%A4%E5%8F%89%E5%8F%A3%E4%B8%9C%E5%8C%97%E4%BE%A7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "城市文化客厅",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-dangqun",
    "name": "钱塘区党群服务中心城市书房",
    "fullName": "钱塘区党群服务中心城市书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区青六路与义府大街交叉口江东明盛大厦裙楼3-4楼",
    "hours": "周二至周日 9:00-21:00",
    "phone": "0571-82987145",
    "transport": "",
    "featured": true,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E9%9D%92%E5%85%AD%E8%B7%AF%E4%B8%8E%E4%B9%89%E5%BA%9C%E5%A4%A7%E8%A1%97%E4%BA%A4%E5%8F%89%E5%8F%A3%E6%B1%9F%E4%B8%9C%E6%98%8E%E7%9B%9B%E5%A4%A7%E5%8E%A6%E8%A3%99%E6%A5%BC3-4%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-xinsha",
    "name": "新沙书房",
    "fullName": "新沙书房",
    "subType": "城市书房",
    "district": "钱塘",
    "address": "钱塘区下沙街道新沙社区党群服务中心二楼",
    "hours": "周一至周日 8:30-11:30，13:30-17:00",
    "phone": "0571-87708687",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B8%8B%E6%B2%99%E8%A1%97%E9%81%93%E6%96%B0%E6%B2%99%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "夏季纳凉点",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "公益阅读空间，设施以现场为准",
    "id": "study-xishan-keng",
    "name": "西山坑道书房",
    "fullName": "西山坑道书房",
    "subType": "城市书房",
    "district": "萧山",
    "address": "萧山区萧金路2号",
    "hours": "夏季纳凉时段开放",
    "phone": "",
    "transport": "",
    "featured": false,
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E8%90%A7%E5%B1%B1%E5%8C%BA%E8%90%A7%E9%87%91%E8%B7%AF2%E5%8F%B7"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-lvting",
    "name": "地铁书房·绿汀路站",
    "fullName": "地铁书房·绿汀路站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁5号线绿汀路站B口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "5号线绿汀路站B口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%815%E5%8F%B7%E7%BA%BF%E7%BB%BF%E6%B1%80%E8%B7%AF%E7%AB%99B%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-datieguan",
    "name": "地铁书房·打铁关站",
    "fullName": "地铁书房·打铁关站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁5号线打铁关站A口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "5号线打铁关站A口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%815%E5%8F%B7%E7%BA%BF%E6%89%93%E9%93%81%E5%85%B3%E7%AB%99A%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-shimin",
    "name": "地铁书房·市民中心站",
    "fullName": "地铁书房·市民中心站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁4号线市民中心站D口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "4号线市民中心站D口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%814%E5%8F%B7%E7%BA%BF%E5%B8%82%E6%B0%91%E4%B8%AD%E5%BF%83%E7%AB%99D%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-zhongyi",
    "name": "地铁书房·中医药大学站",
    "fullName": "地铁书房·中医药大学站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁4号线中医药大学站出发层",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "4号线中医药大学站出发层",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%814%E5%8F%B7%E7%BA%BF%E4%B8%AD%E5%8C%BB%E8%8D%AF%E5%A4%A7%E5%AD%A6%E7%AB%99%E5%87%BA%E5%8F%91%E5%B1%82"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-qianjiang2",
    "name": "地铁书房·钱江路站",
    "fullName": "地铁书房·钱江路站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁2号线钱江路站A口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "2号线钱江路站A口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%812%E5%8F%B7%E7%BA%BF%E9%92%B1%E6%B1%9F%E8%B7%AF%E7%AB%99A%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-sanba",
    "name": "地铁书房·三坝站",
    "fullName": "地铁书房·三坝站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁2号线三坝站D口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "2号线三坝站D口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%812%E5%8F%B7%E7%BA%BF%E4%B8%89%E5%9D%9D%E7%AB%99D%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-xueyuan",
    "name": "地铁书房·学院路站",
    "fullName": "地铁书房·学院路站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁2号线学院路站站厅D口处",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "2号线学院路站站厅D口处",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%812%E5%8F%B7%E7%BA%BF%E5%AD%A6%E9%99%A2%E8%B7%AF%E7%AB%99%E7%AB%99%E5%8E%85D%E5%8F%A3%E5%A4%84"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-binkang",
    "name": "地铁书房·滨康路站",
    "fullName": "地铁书房·滨康路站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁5号线滨康路站换乘通道",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "5号线滨康路站换乘通道",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%815%E5%8F%B7%E7%BA%BF%E6%BB%A8%E5%BA%B7%E8%B7%AF%E7%AB%99%E6%8D%A2%E4%B9%98%E9%80%9A%E9%81%93"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-qibao",
    "name": "地铁书房·七堡站",
    "fullName": "地铁书房·七堡站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁1号线七堡站B口",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "1号线七堡站B口",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%811%E5%8F%B7%E7%BA%BF%E4%B8%83%E5%A0%A1%E7%AB%99B%E5%8F%A3"
  },
  {
    "category": "reading",
    "seasonal": false,
    "facilities": {
      "wifi": "partial",
      "water": false,
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "features": [
      "通借通还",
      "地铁书房"
    ],
    "website": "https://www.zjhzlib.cn/",
    "note": "开放时间与所在地铁站一致",
    "id": "metro-study-qiaosi",
    "name": "地铁书房·乔司站",
    "fullName": "地铁书房·乔司站",
    "subType": "地铁书房",
    "district": "杭州",
    "address": "杭州地铁1号线乔司站2F平台层",
    "hours": "与地铁站开放时间一致",
    "phone": "400-903-0887",
    "transport": "1号线乔司站2F平台层",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E6%9D%AD%E5%B7%9E%E5%9C%B0%E9%93%811%E5%8F%B7%E7%BA%BF%E4%B9%94%E5%8F%B8%E7%AB%992F%E5%B9%B3%E5%8F%B0%E5%B1%82"
  },
  {
    "id": "study-laojie",
    "name": "老街书房",
    "fullName": "老街书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区义蓬街道头蓬街128号",
    "hours": "周一至周日 夏令8:30-21:00；冬令9:00-19:30",
    "phone": "0571-82181247",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E5%A4%B4%E8%93%AC%E8%A1%97128%E5%8F%B7"
  },
  {
    "id": "study-shiguang",
    "name": "拾光书房",
    "fullName": "拾光书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区河庄街道田城社区邻里中心二楼",
    "hours": "周一至周六 8:30-16:30",
    "phone": "0571-86031928",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E6%B2%B3%E5%BA%84%E8%A1%97%E9%81%93%E7%94%B0%E5%9F%8E%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83%E4%BA%8C%E6%A5%BC"
  },
  {
    "id": "study-zhixin",
    "name": "知心书房",
    "fullName": "知心书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区河庄街道知行社区邻里中心",
    "hours": "周一至周六 8:30-11:30，13:30-17:00",
    "phone": "0571-82174695",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E6%B2%B3%E5%BA%84%E8%A1%97%E9%81%93%E7%9F%A5%E8%A1%8C%E7%A4%BE%E5%8C%BA%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  },
  {
    "id": "study-myspace",
    "name": "My space共享书房",
    "fullName": "My space共享书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区元成路211号铭扬园区3号楼1楼",
    "hours": "周一至周日 8:30-17:30（之后保安巡逻，实质24小时）",
    "phone": "13296732958",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": true
    },
    "seasonal": false,
    "featured": true,
    "features": [
      "24小时开放",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%85%83%E6%88%90%E8%B7%AF211%E5%8F%B7%E9%93%AD%E6%89%AC%E5%9B%AD%E5%8C%BA3%E5%8F%B7%E6%A5%BC1%E6%A5%BC"
  },
  {
    "id": "study-gujiashome",
    "name": "顾家家居科创园书房",
    "fullName": "顾家家居科创园书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区前进街道东二路666号",
    "hours": "周一至周日 7:00-23:00",
    "phone": "19818523233",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "超长开放时间",
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%89%8D%E8%BF%9B%E8%A1%97%E9%81%93%E4%B8%9C%E4%BA%8C%E8%B7%AF666%E5%8F%B7"
  },
  {
    "id": "study-jihe",
    "name": "几何书屋",
    "fullName": "几何书屋",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区义蓬街道青六中路667号",
    "hours": "周一至周日 10:00-22:00",
    "phone": "0571-28930221",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E4%B9%89%E8%93%AC%E8%A1%97%E9%81%93%E9%9D%92%E5%85%AD%E4%B8%AD%E8%B7%AF667%E5%8F%B7"
  },
  {
    "id": "study-dongshahu",
    "name": "东沙湖书房",
    "fullName": "东沙湖书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区河庄街道东沙湖社区文化家园青西一路1284号",
    "hours": "周二至周五 9:00-21:00；周末 13:30-21:00",
    "phone": "0571-82101530",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E6%B2%B3%E5%BA%84%E8%A1%97%E9%81%93%E4%B8%9C%E6%B2%99%E6%B9%96%E7%A4%BE%E5%8C%BA%E6%96%87%E5%8C%96%E5%AE%B6%E5%9B%AD%E9%9D%92%E8%A5%BF%E4%B8%80%E8%B7%AF1284%E5%8F%B7"
  },
  {
    "id": "study-qianyue",
    "name": "前悦书房",
    "fullName": "前悦书房",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区前进街道前悦社区党群服务中心一楼",
    "hours": "周三至周日 9:00-20:00",
    "phone": "0571-87688795",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%89%8D%E8%BF%9B%E8%A1%97%E9%81%93%E5%89%8D%E6%82%A6%E7%A4%BE%E5%8C%BA%E5%85%9A%E7%BE%A4%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E4%B8%80%E6%A5%BC"
  },
  {
    "id": "study-hanlin",
    "name": "翰林书院",
    "fullName": "翰林书院",
    "subType": "城市书房",
    "category": "reading",
    "district": "钱塘",
    "address": "钱塘区前进街道前新福苑东门邻里中心",
    "hours": "周二至周日 9:00-17:30",
    "phone": "0571-82732157",
    "transport": "",
    "facilities": {
      "wifi": "partial",
      "water": "partial",
      "ac": true,
      "study": true,
      "charge": "partial",
      "open24": false
    },
    "seasonal": false,
    "featured": false,
    "features": [
      "通借通还"
    ],
    "website": "https://www.zjhzlib.cn/fwwd/714.htm",
    "note": "钱塘区社区服务点",
    "mapUrl": "https://uri.amap.com/search?query=%E6%9D%AD%E5%B7%9E%20%E9%92%B1%E5%A1%98%E5%8C%BA%E5%89%8D%E8%BF%9B%E8%A1%97%E9%81%93%E5%89%8D%E6%96%B0%E7%A6%8F%E8%8B%91%E4%B8%9C%E9%97%A8%E9%82%BB%E9%87%8C%E4%B8%AD%E5%BF%83"
  }
];
