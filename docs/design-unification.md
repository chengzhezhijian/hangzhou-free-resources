# 设计统一重构（v70 → v71）

## 背景

v69 完成了场景 / 工具 / 说明 / 反馈的**内容**动态适配，但子页仍沿用 `style.css` 旧 token（`--bg` / `--ink` / 描边卡片），与发现页 `design-system.css` + `premium-ui.css` 的 iOS 紫渐变调性脱节。

**v71** 修复 v70 遗留的**品牌色分叉**：首页蓝紫、子页青绿。

## 蓝/绿分叉根因（v70 审计）

| 分叉点 | 首页（发现） | 子页（v70） |
|--------|-------------|------------|
| 主题脚本 | 加载 `theme-switch.js` → `data-theme="v01"` | **未加载**，无 `data-theme` |
| 主题 CSS | 加载 `variants.css`，覆盖 `--nav-brand-gradient` 为 `#007aff → #5856d6` | 仅用 `design-system.css` 默认 `--ios-teal: #0d9488` |
| 「惠」图标 | `variants.css` 将 `--accent` 覆写为 `#007aff` | `style.css` `--accent: #0d6e6e` + design-system teal 默认 → **绿色方块** |
| 「全国惠民地图」 | `nav-brand-mini` 蓝紫渐变字（variants） | 同 class 但 teal→indigo 渐变 → **偏绿** |
| 移动 glass-nav | 城市 pill + `nav-brand-mini` | `layout.js` 仅注入纯文字，**无 brand-mark** |
| theme-color | v01 `#007aff`（运行时） | 静态 `#0d9488` |

**结论**：首页通过 A/B 主题栈（`theme-switch.js` + `variants.css`）获得蓝紫品牌；子页缺少该栈且 `design-system.css` `:root` 仍以 teal 为默认 accent，造成全站品牌视觉不一致。

## v71 统一方案（以首页 v01 为准）

### 单一品牌 Token（`design-system.css` `:root`）

| Token | 值 / 用途 |
|-------|----------|
| `--brand-gradient` | `linear-gradient(135deg, #007aff, #5856d6)` — **全站品牌主渐变** |
| `--nav-brand-gradient` | `var(--brand-gradient)` — glass-nav / 桌面 h1 渐变字 |
| `--brand-mark-bg` | `var(--brand-gradient)` — 「惠」字标背景 |
| `--accent` / `--ios-teal` | `#007aff` — 强调色与品牌主色对齐 |
| `--accent-dark` | `#0051a8` |
| `--accent-light` | `rgba(0, 122, 255, 0.12)` |
| `--chip-active-bg` | `#007aff → #14b8a6` |
| `--btn-primary-bg` | `#007aff → #14b8a6` |
| `--card-stripe` | `#007aff → #5856d6 → #a855f7` |
| `--fab-bg` | `#5856d6 → #a855f7` |

> `variants.css` 仍可在 `?theme=` 实验时覆盖上述 token；**默认态**与子页无主题参数时均与首页 v01 一致。

### 品牌组件（全站同一 class）

| 元素 | Class | 规则位置 |
|------|-------|---------|
| 「惠」字标 | `.brand-mark`（桌面兼用 `.brand-icon`） | `design-system.css` |
| 移动顶栏品牌区 | `.glass-nav__brand` > `.brand-mark` + `.nav-brand-mini` | `index.html` + `layout.js` 注入 |
| 桌面品牌名 | `.brand h1` | 与 `nav-brand-mini` 同款渐变字 |

### 子页补齐主题栈

四子页 head 与首页对齐引入：

- `js/theme-switch.js?v=71`
- `css/themes/variants.css?v=71`

### 改动摘要

| 文件 | 改动 |
|------|------|
| `css/design-system.css` | `:root` 默认蓝紫品牌 token；`.brand-mark` / `.glass-nav__brand` / `.brand h1` 统一规则 |
| `js/layout.js` | `glassNavBrandHtml()` 注入与首页一致的 `glass-nav__brand` 结构 |
| `js/adaptive-fonts.js` | 字号计算计入 `brand-mark` 宽度 |
| `index.html` | glass-nav 增加 `glass-nav__brand` + `brand-mark`；`theme-color` → `#007aff` |
| 四子页 HTML | 引入主题栈；`brand-mark brand-icon`；`v=71` |
| `scripts/test-ui-quality.mjs` | 品牌统一断言（gradient token / 禁止 teal brand / brand-mark class） |

## Design Token 表（子页应使用）

| Token | 值 / 用途 |
|-------|----------|
| `--ios-bg` | 页面背景 #f2f2f7 |
| `--ios-bg-elevated` | 卡片 / chip 白底 |
| `--ios-label` | 主文字 #1c1c1e |
| `--ios-label-secondary` | 副文案 rgba(60,60,67,.55) |
| `--brand-gradient` | 品牌主渐变（蓝→靛） |
| `--brand-mark-bg` | 「惠」字标背景 |
| `--accent` / `--accent-dark` | 强调色、链接 |
| `--accent-light` | 标签浅底 |
| `--ios-radius-sm/md/lg` | 8 / 16 / 20px 圆角 |
| `--ios-shadow` / `--ios-shadow-sm` | 卡片阴影 |
| `--card-stripe` | 卡片顶条蓝→靛→紫渐变 |
| `--chip-active-bg` | 选中 chip 渐变 |
| `--btn-primary-bg` | 主按钮渐变 |
| `--fab-bg` | 反馈 FAB 靛紫渐变 |
| `--glass-nav-bg` | 顶栏毛玻璃底 |
| `--nav-brand-gradient` | 品牌迷你标题渐变字 |
| `--tab-bar-h` | 底栏高度（含 safe-area） |
| `--detail-header-gradient` | Sheet 顶栏紫渐变 |

## 验收清单

并排打开 **发现** 与 **场景 / 工具 / 说明 / 反馈**（移动 + 桌面）：

- [ ] 「惠」字标：同款 28×28 圆角 8px、蓝紫渐变底、白字
- [ ] 「全国惠民地图」：同款 `font-family` / `font-weight: 700` / `letter-spacing: -0.03em` / 蓝紫 `background-clip: text`
- [ ] 移动 glass-nav：城市 pill（仅发现页）+ `glass-nav__brand`（惠 + 渐变字），子页无城市 pill 但品牌区结构一致
- [ ] 正文背景同为浅灰 `#f2f2f7`，品牌区无 teal / 绿色覆盖
- [ ] 子页标题大小与发现页大标题同一量级
- [ ] 场景 chip 为白底圆角阴影，非灰描边
- [ ] 场景卡 / 工具卡 / 说明卡顶部有蓝紫条纹，无 1px 灰边框
- [ ] 底栏高度、模糊、选中色与发现页一致
- [ ] 右下角反馈 FAB 为紫渐变
- [ ] `npm run test:all` 全绿

## 版本

静态资源缓存参数：**v=71**（v70 品牌统一 +1）
