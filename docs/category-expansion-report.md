# 城市公共资源类别扩充报告

生成时间：2026-06-17

## 扩充前后对比（8 类目标）

| 类别 | 扩充前 (v=56) | 扩充后 (v=57) | 增量 | 说明 |
|------|---------------|---------------|------|------|
| **parking**（免费停车） | 110 | 752 | **+642** | 每城 6 条模板 + 原有工具 |
| **toilet**（免费公厕） | 111 | 753 | **+642** | 每城 6 条模板 + 原有工具 |
| **camping**（免费露营） | 0 | 643 | **+643** | 新增类别，每城 6 条 + 全国工具 |
| **sports**（免费运动场） | 115 | 757 | **+642** | 每城 6 条模板 + 原有工具 |
| **charging**（免费充电） | 103 | 745 | **+642** | 每城 6 条模板 + 原有工具 |
| **policy**（政务服务） | 123 | 765 | **+642** | 每城 6 条模板 + 原有工具 |
| **legal**（法律咨询） | 0 | 643 | **+643** | 新增类别，每城 6 条 + 全国工具 |
| **training**（职业培训） | 0 | 643 | **+643** | 新增类别，每城 6 条 + 全国工具 |
| **8 类合计** | **662** | **5,701** | **+5,039** | — |

### 总量与覆盖

| 指标 | 扩充前 | 扩充后 | 变化 |
|------|--------|--------|------|
| **资源总量** | 6,076 | **11,215** | **+5,139 (+84.6%)** |
| **全国包 (data-china-nationwide.js)** | 5,417 | 10,556 | +5,139 |
| **覆盖城市数** | 109 | 109 | 持平 |
| **坐标覆盖率** | 100% | **100%** (11,215/11,215) | 持平 |
| **缓存版本** | v=56 | **v=57** | index 及 data js 已 bump |

## 采用方法

1. **增强 `scripts/build-china-nationwide.mjs`**
   - 新增 `mkAmenity` 工厂 + `generateCityAmenities`，为 **107 个代表城市**（含浙江 11 市）各生成 8 类 × 6 条模板点位
   - 沿用「省+市+区县+公共设施类型」地址模式，不编造具体门牌
   - 全国工具新增：公共露营信息、中国法律服务网、国家职业技能培训

2. **新增 category id（`js/data.js`）**
   - `camping`（露营点 · outdoor）
   - `legal`（法律咨询 · policy）
   - `training`（职业培训 · policy）

3. **地图导航（`js/map-nav.js`）**
   - 为新类别补充 `CATEGORY_KEYWORD` / `TOOL_SEARCH` 映射

4. **坐标补全 `npm run build:coords`**
   - 5,139 条新资源全部获得坐标（地市 jitter + 缓存 geocode）

5. **测试阈值适配**
   - 总量下限 11,000；8 类分类筛选下限 600–700
   - 城市筛选池下限 80（模板城市 ~105 条/城）

## 改动文件

- `scripts/build-china-nationwide.mjs` — 8 类公共设施模板生成
- `js/data-china-nationwide.js` — 全国资源包（生成物）
- `js/resource-coords.js` — 坐标表（生成物）
- `js/data.js` — 新增 camping/legal/training 类别
- `js/map-nav.js` — 地图关键词
- `scripts/test-data-logic.mjs` — 回归阈值
- `scripts/test-product-flows.mjs` — 回归阈值
- `index.html` 等 — 缓存 v=57

## 验收方式

```bash
# 1. 资源条数与 8 类分布
node -e "import { loadSiteData } from './scripts/lib/load-site-data.mjs'; const s=loadSiteData(); const t=['parking','toilet','camping','sports','charging','policy','legal','training']; console.log('Total', s.RESOURCES.length); t.forEach(c=>console.log(c, s.RESOURCES.filter(r=>r.category===c).length))"
# 期望 Total ≥ 11000，8 类各 ≥ 600

# 2. 全量测试
npm run test:all

# 3. 浏览器
# 打开 index.html?v=57，筛选「露营点/法律咨询/职业培训」应有 600+ 条；选北京应有 100+ 本地资源

# 4. 小程序（可选）
npm run build:miniprogram
```
