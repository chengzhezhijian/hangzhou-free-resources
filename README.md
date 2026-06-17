# 全国惠民地图

全国 **政府免费便民** 资源查询：自习、纳凉、WiFi、饮水、充电。

**在线访问**：https://chengzhezhijian.github.io/hangzhou-free-resources/?v=37

## 整站 UX AB（10 套 · UED 重构）

UED 原则：**紧凑首屏、主次字号分明、列表信息更全、无数字统计**。筛选统一 Chip 栏，结构/交互/列表形态仍各不相同。

| 入口 | 说明 |
|------|------|
| **[整站设计对比墙](labs/ab-design.html)** | 10 套 iframe 并排 |
| `?design=d01` … `d10` | 整站结构 / 交互 / 筛选切换 |

| ID | 名称 | 核心差异 |
|----|------|----------|
| d01 | 标准发现 | 紧凑标题 + 设施/场景 Chip + 完整卡片 |
| d02 | 搜索直达 | 搜索为主 + 场景辅筛 + 行列表含地址 |
| d03 | 分类浏览 | 大类 Chip + 双列卡片含地址 |
| d04 | 场景优先 | 场景 Chip 主筛 + 设施辅筛 |
| d05 | 设施组合 | 设施 Chip 多选 + 场景辅行 |
| d06 | 附近发现 | 定位 Chip + 距离排序 + 行列表 |
| d07 | 双列探索 | 分类 Tab + 设施辅筛 + 双列卡片 |
| d08 | 分区索引 | 大类 Chip + 按类型分区列表 |
| d09 | 高密度列表 | 合并 Chip + 单行列表含地址 |
| d10 | 办事引导 | 三步引导条 + 场景 Chip |

可与 `?copy=`、`?theme=` 组合预览，例如 `?design=d04&copy=h07&theme=v08`。

## 首页文案 AB（10 套 · 验收入口）

| 入口 | 说明 |
|------|------|
| **[首页对比墙](labs/ab-homepage.html)** | 10 套 iframe 并排，点「全屏验收」 |
| `?copy=h01` … `h10` | 独立品牌 / Hero / 引导 / onboard |
| [文案报告](docs/ab-copy-report.md) | 自动化评分排名 |

| ID | 名称 | 维度 |
|----|------|------|
| h01 | 政务官方 | 信任感 |
| h02 | 效率极简 | 三步闭环 |
| h03 | 场景问答 | 问题导向 |
| h04 | 零花费 | 完全免费 |
| h05 | 遛娃家长 | 亲子出行 |
| h06 | 打工人自习 | 远程办公 |
| h07 | 夏日纳凉 | 防暑降温 |
| h08 | 新城市指南 | 异地落脚 |
| h09 | 银发关怀 | 适老大字 |
| h10 | 青年社区 | 公共共享 |

## 配色 AB（10 套）

| 入口 | 说明 |
|------|------|
| [配色对比墙](labs/ab-compare.html) | 10 套色板预览 |
| `?theme=v01` … `v10` | 全站配色切换 |

```bash
npm run test:all   # 含整站 UX + 文案 + 配色 AB
```

## 本地预览

```bash
python3 -m http.server 8080
# 对比墙 http://localhost:8080/labs/ab-design.html
# 单版   http://localhost:8080/?design=d04&v=37
```

## 微信小程序

原生小程序代码在 [`miniprogram/`](miniprogram/) 目录，发布步骤见 **[docs/miniprogram-publish.md](docs/miniprogram-publish.md)**。

```bash
npm run build:miniprogram   # 导出全国点位数据到分包
# 用微信开发者工具导入 miniprogram/ 目录
```
