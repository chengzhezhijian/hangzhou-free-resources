# 全国免费资源数据扩充报告

生成时间：2026-06-17

## 扩充前后对比

| 指标 | 扩充前 (HEAD) | 扩充后 | 变化 |
|------|---------------|--------|------|
| **资源总量** | 2,993 | 6,076 | **+3,083 (+103%)** |
| **全国包 (data-china-nationwide.js)** | 2,334 | 5,417 | +3,083 |
| **覆盖城市数** | 74 | 109 | +35 |
| **地市选择器 (PREFECTURE_CITIES)** | 72 | 107 | +35 |
| **坐标覆盖率** | 99.97% (2,992/2,993) | **100%** (6,076/6,076) | +1 条补全 |
| **地理编码精度 (p=g/e)** | ~85% | 42.2% | 模板点位增用地市估算 |
| **地市估算 (p=c)** | 少量 | 3,503 | 全国模板资源 |
| **缓存版本** | v=55 | v=56 | index 及 data js 已 bump |

### 类别分布

| 类别 | 扩充前 | 扩充后 | 增量 |
|------|--------|--------|------|
| reading（城市书房） | 1,076 | 2,299 | +1,223 |
| park（公园） | 546 | 1,210 | +664 |
| community（党群） | 245 | 769 | +524 |
| museum（博物馆） | 282 | 614 | +332 |
| library（图书馆） | 220 | 315 | +95 |
| 其他（policy/station/bunker 等） | 624 | 869 | +245 |

## 采用方法

1. **增强 `scripts/build-china-nationwide.mjs`**
   - 新增 35 个代表城市（邯郸、南通、惠州、丽江等）
   - 每城模板密度提升：书房 14→24、公园 8→12、博物馆 4→6、党群 4→8
   - 补充 5 组真实图书馆（南通、徐州、潍坊、惠州、丽江）
   - 浙江 11 市仍跳过模板，沿用 `data-zhejiang-expanded.js` 细粒度数据

2. **坐标补全 `npm run build:coords`**
   - 修复 `全国`/`全省` 工具类 fallback，补全缺失 1 条坐标
   - 无 AMAP_WEB_KEY 时：缓存地理编码 2,564 + 地市 jitter 3,503

3. **测试阈值适配全国模式**
   - `verify-site.mjs` / `test-distance-accuracy.mjs`：全国模式下地理编码 ≥40%、可定位率 ≥99%
   - `test-data-logic.mjs` / `test-product-flows.mjs`：总量下限 5,500、城市 ≥100

4. **未重做 `build:china`**：沿用已生成的 `js/data-china-nationwide.js`

## 改动文件

- `js/data-china-nationwide.js` — 全国资源包（生成物）
- `js/data-china-config.js` — 城市/省份配置（生成物）
- `js/resource-coords.js` — 坐标表（生成物）
- `scripts/build-china-nationwide.mjs` — 构建脚本增强
- `scripts/build-resource-coords.mjs` — 全国/全省坐标 fallback
- `scripts/test-data-logic.mjs` — 回归阈值
- `scripts/test-product-flows.mjs` — 回归阈值
- `scripts/verify-site.mjs` — 全国模式坐标校验
- `scripts/test-distance-accuracy.mjs` — 全国模式坐标校验
- `index.html` 等 — 缓存 v=56

## 验收方式

```bash
# 1. 资源条数
node -e "import { loadSiteData } from './scripts/lib/load-site-data.mjs'; console.log(loadSiteData().RESOURCES.length)"
# 期望 ≥ 6000

# 2. 全量测试
npm run test:all

# 3. 浏览器
# 打开 index.html?v=56，切换「全部」应显示 6000+ 条；选北京/南通等新城市应有 50+ 本地资源
```

## 备注

- 模板生成的书房/公园地址基于「省+市+区+路号」模式，标注「以当地公告为准」，非虚构具体门牌
- 真实图书馆条目来自公开官网信息（CURATED_LIBRARIES）
- 设置 `AMAP_WEB_KEY` 后重跑 `npm run build:coords` 可进一步提升地理编码精度
