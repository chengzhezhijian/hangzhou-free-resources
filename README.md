# 杭城免费资源地图

杭州市**全品类**公益免费资源查询网站。

**在线地址**：https://chengzhezhijian.github.io/hangzhou-free-resources/

## 收录范围

| 大类 | 类型 | 数量级 | 说明 |
|------|------|--------|------|
| 文化阅读 | 图书馆、城市书房、博物馆 | 250+ | 含 223 城市书房 |
| 避暑饮水 | 爱心驿家、防空洞、地铁纳凉 | 100+ | 夏季纳凉点 |
| **出行停车** | 停车政策、共享停车、查询工具 | — | **邻里停 1.7万+泊位** |
| **户外休闲** | 免费公园、体育场馆 | 30+ 代表点 | **747 公园见官方名录** |
| **便民设施** | 公厕、充电、公共 WiFi | — | 浙里办实时查询 |
| 政策指南 | 免费政策锦囊 | 8 条 | 春节免费停车等 |

## 功能

- **7 大资源大类**筛选：文化阅读 / 避暑饮水 / 出行停车 / 户外休闲 / 便民设施 / 政策指南
- **15 种资源类型**：图书馆、城市书房、博物馆、停车、公园、体育、公厕、充电、WiFi…
- **费用标注**：完全免费 / 有条件免费 / 官方查询工具
- **仅看完全免费** 筛选
- 设施筛选：WiFi、饮水、空调、自习、充电、24 小时
- 分页浏览、场景指南、官方工具链接

## 海量数据怎么查？

部分资源数量太大，无法逐条录入，采用 **「政策 + 代表点位 + 官方工具」** 三层结构：

| 需求 | 本站 | 官方实时查询 |
|------|------|-------------|
| 免费停车 | 政策卡片 + 邻里停工具 | 浙里办/微信搜「邻里停」 |
| 免费公园 | 27 个代表公园 | [城市公园名录 747 个](http://www.zj.xinhuanet.com/20260508/b261af240c0a48f49a0a0975007a01f6/c.html) |
| 体育健身 | 8 个代表场馆 | 浙里办「杭州体育在线」 |
| 充电桩 | 政策说明 | 「一键找桩」 |
| 公厕 | 西湖 24h 政策 | 浙里办「找公厕」 |
| 爱心驿家 | 旗舰站点 | 腾讯地图「爱心驿站」 |

## 本地运行

```bash
cd hangzhou-free-resources
python3 -m http.server 8080
```

浏览器打开：http://localhost:8080

## 验证期配置（上线前必做）

编辑 `js/site-config.js`：

| 配置项 | 说明 |
|--------|------|
| `baiduTongjiId` | 百度统计 Site ID，留空则不加载（[创建指南](docs/setup-feedback-analytics.md)） |
| `feedbackUrl` | 腾讯问卷链接；当前默认 GitHub Issues 反馈 |
| `feedbackEmail` | 无问卷时，页内表单走 `mailto:` |
| `analyticsDebug` | `true` 时在控制台打印埋点 |

### 埋点事件

| 事件 | 触发时机 |
|------|----------|
| `page_view` | 页面加载 |
| `search` | 搜索（含结果数） |
| `filter_change` | 切换大类/类型 |
| `resource_view` | 打开资源详情 |
| `nav_click` | 点击高德导航 |
| `copy_address` | 复制地址 |
| `tool_click` | 点击官方工具 |
| `feedback_open` / `feedback_submit` | 反馈流程 |

本地调试：打开控制台，或执行 `JSON.parse(localStorage.getItem('hz_analytics_log'))` 查看最近 200 条记录。

### 外链带参（用于小红书/公众号）

```
https://你的域名/?category=reading&q=金沙湖
https://你的域名/?group=comfort&free=1
https://你的域名/?utm_source=xhs&utm_campaign=article1
```

### SEO 内容

3 篇文章标题与大纲见 [`content/seo-articles.md`](content/seo-articles.md)。

## 目录结构

```
hangzhou-free-resources/
├── index.html
├── css/style.css
├── content/
│   └── seo-articles.md         # SEO 三篇大纲
├── js/
│   ├── site-config.js          # 统计 / 反馈配置
│   ├── analytics.js            # 埋点
│   ├── data.js                 # 核心配置 + 图书馆/博物馆/纳凉等
│   ├── data-study-spaces.js    # 223 城市书房/邻里阅读空间
│   ├── data-extra-resources.js # 停车/公园/体育/公厕/政策/工具
│   └── app.js
└── README.md
```

## 扩展数据

- 书房：编辑 `data-study-spaces.js` 或重新运行生成脚本
- 其他类别：编辑 `data-extra-resources.js`
- 新增类别：在 `data.js` 的 `RESOURCE_CATEGORIES` 中添加

## 免责声明

信息来源于政府公开资料。停车、体育等收费政策随时段变化，出行前请通过官方平台核实。
