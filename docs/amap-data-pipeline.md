# 高德 POI 数据管道

生成时间：2026-06-18

## 数据来源总览

| 层级 | 文件 | 条数（v76） | 性质 |
|------|------|-------------|------|
| 多城真实 POI | `data-amap-poi.js` | **20,307** | 高德 POI 搜索 API，`verified: true` |
| 杭州细录 | `data-study-spaces.js` + `data.js` 基底 | ~340 | 政府/图书馆官网 |
| 浙江扩展 | `data-zhejiang-expanded.js` 等 | ~300 | 手工 + 模板 |
| 全国模板 | `data-china-nationwide.js` | ~12,949 | 107 城模板兜底 |

**合并后总量：33,915 条**

覆盖城市：浙江 11 市 + 8 个代表城（北京、上海、广州、深圳、成都、武汉、西安、南京），可通过 `AMAP_CITIES` 环境变量收窄范围。

## 高德 API 用法

### 1. 地理编码（已有）

```bash
npm run build:coords
```

- 读取 `.env` 中 `AMAP_WEB_KEY`
- 对**非模板**资源调用 `/v3/geocode/geo`
- 模板资源（`cn-*`）跳过 API，使用地市中心估算（节省配额）
- 高德 POI 自带 `lat/lng`，标记精度 `exact`

### 2. POI 拉取

```bash
# 每日增量（默认：浙江 11 市 + 按星期轮转 1 代表城，每任务前 2 页）
npm run fetch:amap

# 全量（杭州满页，其它城每任务最多 5 页）
npm run fetch:amap:full

# 一步：拉取 + 坐标
npm run build:amap
```

- 脚本：`scripts/fetch-amap-poi.mjs`
- 配置：`scripts/lib/amap-poi-config.mjs`（城市列表、分类任务、页数策略）
- 接口：`/v3/place/text`（keywords + city）
- 输出：`js/data-amap-poi.js`（`AMAP_POI_RESOURCES`）
- 增量：从现有文件按 `amapId` 合并，只追加新 POI
- 缓存：`scripts/.amap-poi-cache.json`（去重）

环境变量：

| 变量 | 说明 |
|------|------|
| `AMAP_WEB_KEY` | 高德 Web 服务 Key（必填） |
| `AMAP_FULL_SYNC=1` | 全量模式 |
| `AMAP_CITIES=zhejiang` | 仅浙江 11 市 |
| `AMAP_CITIES=hangzhou,ningbo` | 指定城市 |

### 3. 每日定时同步

```bash
# 本地手动跑完整流水线
npm run sync:amap

# GitHub Actions：每天 UTC 18:00（北京 02:00）
# 见 .github/workflows/daily-amap-sync.yml
```

详见 [amap-daily-sync.md](./amap-daily-sync.md)。

## 坐标精度（v76 build:coords 后）

| 精度 | 条数 | 说明 |
|------|------|------|
| exact / geocode | ~22,873 | 含 20,307 高德 POI + 细录 geocode |
| district | ~74 | 区县中心 |
| city | ~10,968 | 全国模板估算 |

## 前端分层展示

- `verified: true` + `source: "amap"` 的资源：
  - 综合/评分排序**优先靠前**
  - 卡片右上角 **✓** 徽章（`badge-verified`）
  - 详情 note 标注「数据来源：高德地图 POI」

## 合规说明

- Key 仅存 `.env` / GitHub Secrets，**不提交 Git**
- POI 数据为构建期拉取，非前端实时调用
- 用户导航仍走 `uri.amap.com/search` 官方 URI

## 验收

```bash
npm run test:all

# 浏览器 index.html?v=76 → 选杭州 → 类型「政务服务」→ 带 ✓ 徽章条目优先
```

## 后续

1. 与政府开放数据交叉校验，替换模板条目
2. 按需调整 `AMAP_CITIES` 或代表城轮转列表
3. 在 GitHub → Settings → Secrets 配置 `AMAP_WEB_KEY` 以启用 Actions 自动同步
