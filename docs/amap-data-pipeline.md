# 高德 POI 数据管道

生成时间：2026-06-18

## 数据来源总览

| 层级 | 文件 | 条数（v75） | 性质 |
|------|------|-------------|------|
| 杭州真实 POI | `data-amap-hangzhou.js` | **1,484** | 高德 POI 搜索 API，`verified: true` |
| 杭州细录 | `data-study-spaces.js` + `data.js` 基底 | ~340 | 政府/图书馆官网 |
| 浙江扩展 | `data-zhejiang-expanded.js` 等 | ~300 | 手工 + 模板 |
| 全国模板 | `data-china-nationwide.js` | ~12,949 | 107 城模板兜底 |

**合并后总量：15,092 条**

## 高德 API 用法

### 1. 地理编码（已有）

```bash
npm run build:coords
```

- 读取 `.env` 中 `AMAP_WEB_KEY`
- 对**非模板**资源调用 `/v3/geocode/geo`
- 模板资源（`cn-*`）跳过 API，使用地市中心估算（节省配额）
- 高德 POI 自带 `lat/lng`，标记精度 `exact`

### 2. POI 拉取（新增）

```bash
npm run fetch:amap
# 或一步：npm run build:amap
```

- 脚本：`scripts/fetch-amap-poi.mjs`
- 接口：`/v3/place/text`（keywords + city=杭州）
- 输出：`js/data-amap-hangzhou.js`
- 缓存：`scripts/.amap-poi-cache.json`（去重）

### 杭州 POI 分类分布（v75）

| 类别 | 条数 |
|------|------|
| gov_service | 343 |
| court | 296 |
| toilet | 199 |
| charging | 194 |
| library | 124 |
| sports | 150 |
| community | 143 |
| park | 18 |
| reading | 17 |

## 坐标精度（v75 build:coords 后）

| 精度 | 条数 | 说明 |
|------|------|------|
| exact / geocode | 4,050 | 含 1,484 高德 POI + 杭州细录 geocode |
| district | 74 | 区县中心 |
| city | 10,968 | 全国模板估算 |

## 前端分层展示

- `verified: true` + `source: "amap"` 的资源：
  - 综合/评分排序**优先靠前**
  - 卡片右上角 **✓** 徽章（`badge-verified`）
  - 详情 note 标注「数据来源：高德地图 POI」

## 合规说明

- Key 仅存 `.env`，**不提交 Git**
- POI 数据为构建期拉取，非前端实时调用
- 用户导航仍走 `uri.amap.com/search` 官方 URI

## 验收

```bash
npm run test:all

# 杭州政务服务应显著增多（含真实 POI）
# 浏览器 index.html?v=75 → 选杭州 → 类型「政务服务」→ 带 ✓ 徽章条目优先
```

## 后续扩展

1. 浙江其他 10 市 POI 拉取（复制 fetch 任务，改 city）
2. 定期 `npm run build:amap` 增量更新
3. 与政府开放数据交叉校验，替换模板条目
