# 全国惠民地图

全国 **政府免费便民** 资源查询：自习、纳凉、WiFi、饮水、充电。

**在线访问**：https://chengzhezhijian.github.io/hangzhou-free-resources/?v=35

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
npm run test:all   # 含文案 + 配色 AB
```

## 本地预览

```bash
python3 -m http.server 8080
# 对比墙 http://localhost:8080/labs/ab-homepage.html
# 单版   http://localhost:8080/?copy=h01&v=35
```
