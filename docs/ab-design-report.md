# 整站 UX AB 报告

共 10 套，每套 **结构 / 交互 / 筛选 / 列表形态** 不同。

| ID | 名称 | 维度 | 单行筛选 | 卡片 | 说明 |
|----|------|------|----------|------|------|
| d01 | 标准单行 | 基准 | standard | premium | 设施+场景+排序，单行横滑（美团基准） |
| d02 | 搜索优先 | 交互 | scenes-sort | row | 仅场景+排序单行，搜索占主，行列表 |
| d03 | 分类 Tab | 结构 | categories | tile | 大类 Tab 单行 + 双列卡片 |
| d04 | 场景前置 | 筛选 | scenes-perks | premium | 场景 Chip 在前 + 设施 + 排序，单行 |
| d05 | 设施筛选 | 筛选 | facilities | premium | 设施多选 + 排序，单行 |
| d06 | 附近优先 | 交互 | nearby | row | 距离排序+设施，单行，无定位文案 |
| d07 | 双列密网格 | 结构 | categories-perks | tile | 分类+设施同一行，双列卡片 |
| d08 | 分区目录 | 结构 | groups | compact | 大类单行 + 分区列表无分页 |
| d09 | 高密度 | 交互 | merged | minimal | 类型+设施合并单行 + 极简列表 |
| d10 | 办事引导 | 筛选 | guide | premium | 引导步骤内联单行 + 场景 Chip |

预览：[labs/ab-design.html](../labs/ab-design.html) · `?design=d01&v=44`
