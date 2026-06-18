# 城市政务公共服务扩充报告

生成时间：2026-06-18

## 类别决策

| 新增 id | 展示名 | 分组 | 说明 |
|---------|--------|------|------|
| **gov_service** | 政务服务 | policy | 市民之家、政务服务中心、各局办事大厅等**实体办事点位** |
| **court** | 法院 | policy | 人民法院、劳动仲裁、行政复议、检察服务等**司法办事点位** |

**沿用现有类别（不新增）：**

| id | 用途 |
|----|------|
| **policy** | 免费政策说明 + 政务查询**在线工具**（如「XX · 政务服务」链接） |
| **legal** | 法律援助、公证、司法所等**法律咨询类**点位 |
| **training** | 人社职业培训类点位 |

> 未采用 `gov-hall` / `citizen-center` 等细分 id，避免与 `policy` 工具类混淆；用户可通过「政务服务」筛选 + 搜索「市民之家」「人社局」等关键词定位。

## 扩充前后对比

### 总量

| 指标 | v=67 扩充前 | v=68 扩充后 | 变化 |
|------|-------------|-------------|------|
| **资源总量** | 11,215 | **13,608** | **+2,393 (+21.3%)** |
| **全国包 (data-china-nationwide.js)** | 10,556 | 12,949 | +2,393 |
| **覆盖城市数** | 107 | 107 | 持平 |
| **坐标覆盖率** | 100% | **100%** (13,608/13,608) | 持平 |
| **缓存版本** | v=67 | **v=68** | 已 bump |

### 政务相关类别

| 类别 | 扩充前 | 扩充后 | 增量 | 说明 |
|------|--------|--------|------|------|
| **gov_service**（政务服务） | 0 | **1,564** | **+1,564** | 新增；107 城 × 12 模板 + 浙江区县加密 + 全国工具 |
| **court**（法院） | 0 | **829** | **+829** | 新增；107 城 × 6 模板 + 浙江区县加密 + 全国工具 |
| **policy**（免费政策） | 765 | 765 | 0 | 保留在线政策/政务工具 |
| **legal**（法律咨询） | 643 | 643 | 0 | 保留 |
| **training**（职业培训） | 643 | 643 | 0 | 保留 |
| **政务相关合计** | **2,051** | **4,444** | **+2,393** | gov_service + court 增量 |

### 杭州 / 浙江加密

| 城市 | gov_service | court | 说明 |
|------|-------------|-------|------|
| 杭州 | 51 | 32 | 13 个真实区县 ×（市民之家 / 政务中心 / 人社局 / 区法院 / 仲裁院） |
| 其他浙江 10 市 | 各 ~27 | 各 ~18 | 8 个模板区县加密 |
| 非浙代表城市 | 各 12 | 各 6 | 市级模板点位 |

## 采用方法

1. **增强 `scripts/build-china-nationwide.mjs`**
   - 新增 `GOV_SERVICE_LABELS`（12 类/城）：市民之家、政务服务中心、行政审批局、人社局、劳动保障、民政、市场监管、公安出入境/户政、街道便民、12345、跨省通办等
   - 新增 `COURT_LABELS`（6 类/城）：区法院、中院、基层法院、劳动人事争议仲裁、行政复议、检察服务
   - 新增 `generateZhejiangGovExtras`：浙江 11 市按区县加密
   - 全国工具：国家政务服务平台 · 办事大厅、中国法院网 · 诉讼服务

2. **前端类别（`js/data.js`）**
   - 注册 `gov_service`、`court`，加入 `CATEGORY_DISPLAY_ORDER`
   - 图标：政务服务 🏢、法院 🏛

3. **地图导航（`js/map-nav.js`）**
   - 补充 `CATEGORY_KEYWORD` / `TOOL_SEARCH` 映射

4. **坐标 `npm run build:coords`**
   - 2,393 条新资源全部获得坐标

5. **测试阈值**
   - 总量下限 13,000；政务服务 ≥ 1,500；法院 ≥ 800
   - 杭州筛选池 ≥ 500；城市模板池 ≥ 98

## 改动文件

- `scripts/build-china-nationwide.mjs` — 政务/法院模板 + 浙江区县加密
- `js/data-china-nationwide.js` — 全国资源包（生成物）
- `js/resource-coords.js` — 坐标表（生成物）
- `js/data.js` — 新增 gov_service / court 类别
- `js/map-nav.js` — 地图关键词
- `scripts/test-data-logic.mjs`、`scripts/test-product-flows.mjs`、`scripts/test-pagination.mjs`、`scripts/verify-site.mjs` — 回归阈值
- `index.html` 等 — 缓存 v=68

## 验收方式

```bash
# 1. 条数与政务类分布
node -e "import { loadSiteData } from './scripts/lib/load-site-data.mjs'; const s=loadSiteData(); const t=['policy','gov_service','court','legal','training']; console.log('Total', s.RESOURCES.length); t.forEach(c=>console.log(c, s.RESOURCES.filter(r=>r.category===c).length))"

# 2. 全量测试
npm run test:all

# 3. 浏览器
# 打开 index.html?v=68
# - 类型筛选应出现「政务服务」「法院」
# - 选「政务服务」全国应有 1500+ 条
# - 搜索「市民之家」「人社局」应有结果
# - 选杭州 + 政务服务应有 45+ 条
```
