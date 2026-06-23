# 高德 POI 每日增量同步

## 机制

| 模式 | 命令 | 说明 |
|------|------|------|
| **每日增量**（默认） | `npm run sync:amap` | 每任务拉前 2 页；已有 POI 从 `data-amap-poi.js` 合并，仅追加新 id |
| **全量同步** | `npm run sync:amap:full` | `AMAP_FULL_SYNC=1`，浙江 11 市拉满 + 8 个代表城；非杭州每任务最多 5 页 |
| **单城/自定义** | `AMAP_CITIES=宁波,温州 npm run fetch:amap` | 逗号分隔城市名 |

### 覆盖城市

- **浙江 11 市**：杭州、宁波、温州、嘉兴、湖州、绍兴、金华、衢州、舟山、台州、丽水
- **每日轮转 1 城**（增量模式）：北京、上海、广州、深圳、成都、武汉、南京、苏州（按 UTC 星期几轮换）
- **全量模式**：上述全部 19 城

## GitHub Actions 定时任务

工作流：`.github/workflows/daily-amap-sync.yml`

- **触发**：每天 UTC 18:00（北京时间 **02:00**）
- **手动**：GitHub → Actions → Daily Amap POI Sync → Run workflow

### 首次配置（必做）

1. 打开仓库 **Settings → Secrets and variables → Actions**
2. 新建 Secret：`AMAP_WEB_KEY` = 你的高德 Web 服务 Key
3. 手动跑一次 workflow 验证

成功后自动：拉 POI → 重建坐标 → `test:all` → bump `v=` → commit & push

## 本地定时（可选）

```crontab
# 每天 03:00 本地增量（需已配置 .env）
0 3 * * * cd /path/to/hangzhou-free-resources && npm run sync:amap >> /tmp/amap-sync.log 2>&1
```

## 输出文件

| 文件 | 说明 |
|------|------|
| `js/data-amap-poi.js` | 统一 POI 包（`AMAP_POI_RESOURCES`） |
| `js/resource-coords.js` | 坐标（build:coords 生成） |
| `docs/amap-sync-log.md` | 同步历史 |
| `scripts/.amap-poi-cache.json` | 本地运行统计（gitignore） |

## 日志

每次运行追加一行到 `docs/amap-sync-log.md`，含日期、模式、总量、新增数。

## 配额建议

- 日常依赖 **增量 2 页/任务**，配额占用低
- 每周或发版前本地跑一次：`npm run sync:amap:full`
- 勿将 `.env` 提交 Git
