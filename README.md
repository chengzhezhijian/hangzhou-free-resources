# 浙里惠民地图

浙江省**全品类**公益免费资源查询网站。

**在线地址**：https://chengzhezhijian.github.io/hangzhou-free-resources/

## 覆盖范围

| 层级 | 内容 | 数量级 |
|------|------|--------|
| **全省** | 浙里办、浙里文化圈、通借通还政策、爱心驿家 | 政策+工具 |
| **杭州** | 图书馆、223 书房、纳凉、停车、公园… | **400+ 细录** |
| **其他 10 市** | 市图书馆、城市书房工具、代表公园/博物馆 | 每市 4～6 条 + 官方链接 |

支持地市：**杭州、宁波、温州、嘉兴、湖州、绍兴、金华、衢州、舟山、台州、丽水**

## 数据策略

```
杭州     → 政策 + 代表点 + 全量书房（223条）
其他地市 → 政策 + 市图书馆 + 书房查询工具 + 代表公园
全省     → 浙里办 / 文化圈 / 驿站 / 找桩
```

## 功能

- **地市筛选** + 杭州区县筛选
- 7 大资源大类、15 种资源类型
- 费用标注：完全免费 / 有条件免费 / 官方查询工具
- 百度统计 + Clarity + 腾讯问卷反馈

## 本地运行

```bash
cd hangzhou-free-resources
python3 -m http.server 8080
```

## 目录结构

```
hangzhou-free-resources/
├── index.html
├── css/style.css
├── js/
│   ├── data.js                    # 杭州核心 + 配置合并
│   ├── data-study-spaces.js       # 223 杭州书房
│   ├── data-extra-resources.js    # 杭州扩展资源
│   ├── data-zhejiang-cities.js    # 其他 10 市 + 全省
│   └── app.js
└── README.md
```

## 扩展数据

- 其他地市：编辑 `js/data-zhejiang-cities.js`
- 杭州书房：编辑 `data-study-spaces.js`
- 杭州其他：编辑 `data-extra-resources.js`

## 免责声明

信息来源于政府公开资料。收费政策随时段变化，出行前请通过官方平台核实。
