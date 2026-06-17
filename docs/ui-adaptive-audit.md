# 全站文字 / 按钮自适应审计（v64）

## 审计范围与结论

| 区域 | 问题（审计前） | 方案 | 状态 |
|------|----------------|------|------|
| 四段筛选 toolbar chip | 窄屏下「设施(N)」等标签溢出 | `syncToolbarChipFonts` + `--chip-label-font-size` + `min-width:0` | ✅ |
| 场景/类型/设施/排序下拉项 | 长文案换行或撑破面板 | `syncDropPanelFonts` + `--drop-item-font-size` + `word-break` | ✅ |
| 设施下拉「重置」 | 与「完成」并排时挤压；完成按钮已移除 | `fitElementFontSize` + `--drop-action-font-size` | ✅ |
| 排序独立面板 `.sort-drop-item` | 固定 0.875rem，窄锚点 ellipsis 截断过早 | `syncSortDropPanelFonts` + `--sort-drop-item-font-size` | ✅ |
| glass-nav 城市 pill | 长城市名撑破顶栏 | `syncLocPillFonts` + `--loc-pill-font-size` + `max-width:46%` | ✅ |
| glass-nav 品牌 | 与城市 pill 争抢宽度 | `syncNavBrandFont` + `--nav-brand-font-size` + ellipsis | ✅ |
| 搜索框 | placeholder 过长 | CSS `clamp` + `min-width:0` flex 子项 | ✅ |
| 筛选抽屉 fss-opt | 三列排序段固定字号 | `syncFssOptFonts` + `--fss-opt-font-size` | ✅ |
| 筛选抽屉 footer | 重置/确定并排溢出 | `syncFilterDropFooters` + `--sheet-action-font-size` | ✅ |
| 筛选 sheet footer | 同上 | 共用 `syncSheetActionFonts` | ✅ |
| 已选 filter-chip | 长关键词撑破行 | `syncActiveFilterChipFonts` + `--filter-chip-font-size` | ✅ |
| 城市面板 pill | 三字城市在 3 列 grid 略紧 | `syncCityPanelFonts` + `--city-pill-font-size` | ✅ |
| 城市定位卡「定位」按钮 | 窄屏略大 | 纳入 `syncSheetActionFonts` | ✅ |
| 详情 Sheet 标题 | 长机构名换行顶栏 | `syncDetailSheetFonts` + `--detail-title-font-size` | ✅ |
| 详情 footer 多按钮 | 「复制导航词」等并排溢出 | `--sheet-action-font-size` on footer buttons | ✅ |
| 列表卡片标题/地址/标签 | 双列 grid 下文字叠出 | CSS `line-clamp` / `ellipsis` + `min-width:0` on `.card-inner` | ✅ |
| 空状态「清除筛选」 | 小屏按钮字号 | `syncEmptyStateFonts` | ✅ |

## 核心机制

### JS（`js/app.js`）

- **`fitElementFontSize(el, maxWidth, minPx, maxPx)`** — 二分查找单行可用字号。
- **`syncAdaptiveFonts()`** — 统一入口，聚合全部子同步函数。
- **`scheduleAdaptiveFonts()`** — 同步 + `requestAnimationFrame` 二次测量（布局稳定后）。
- 触发时机：`resize`/`scroll`、渲染卡片/工具栏/城市/筛选 chips、打开 Sheet/下拉、选城市后。

### CSS 约定

- 可变字号：`font-size: var(--*-font-size, clamp(...))`。
- Flex 子项：`min-width: 0` + `overflow: hidden` + `text-overflow: ellipsis`（单行）或 `-webkit-line-clamp`（多行标题）。
- 主要 token 文件：`design-layouts.css`、`design-system.css`、`premium-ui.css`、`style.css`。

## 自动化测试

```bash
npm run test:all
```

新增/扩展断言：

- `scripts/test-ui-quality.mjs` — 静态检查 `syncAdaptiveFonts`、各 CSS 变量与子函数存在。
- `scripts/test-filter-geo.mjs` 场景 12 — jsdom 集成：toolbar chip、城市 pill、glass-nav、排序下拉、详情 Sheet、空状态按钮字号变量。

## 人工验收清单

### 375px（H5）

1. 打开 `index.html?v=65`，DevTools 设 375×812。
2. **glass-nav**：点城市选「呼和浩特」或长名城市 → 城市 pill 单行 ellipsis，品牌「全国惠民地图」不被挤出视口。
3. **四段筛选**：依次打开排序/场景/类型/设施 → 下拉宽度贴触发器；设施选 2+ 项后 toolbar 显示「设施(N)」不溢出；设施面板仅「重置」，按钮字号可读。
4. **搜索**：输入长关键词 → 搜索框内文字可滚动/ellipsis，toolbar 不被挤变形。
5. **列表**：双列卡片标题最多两行；地址/距离/设施 tag 单行 ellipsis。
6. **详情**：点任意卡片 → 长标题单行缩放；footer 2–3 个按钮并排无重叠。
7. **空状态**：搜 `zzzznotfound` → 提示文案换行正常，「清除筛选」按钮完整可见。

### 1280px（桌面）

1. 视口 1280×800；确认 **site-header** 左侧城市 pill（非 glass-nav）长城市名自适应。
2. 四段快捷下拉仍从 toolbar 向下展开（非 sidebar）；下拉项与 H5 一致可读。
3. 卡片 grid 为 auto-fill 宽列；标题/地址字号随 clamp 放大，无异常换行。
4. 打开城市 Sheet、详情 Sheet — footer 按钮与 H5 行为一致。

## 版本

- 缓存戳：`?v=65`
- 提交信息：`fix(ui): 全站文字按钮自适应审计 v64`
