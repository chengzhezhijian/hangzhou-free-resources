# 设计统一重构（v70）

## 背景

v69 完成了场景 / 工具 / 说明 / 反馈的**内容**动态适配，但子页仍沿用 `style.css` 旧 token（`--bg` / `--ink` / 描边卡片），与发现页 `design-system.css` + `premium-ui.css` 的 iOS 紫渐变调性脱节。

## 审计对比（统一前）

| 元素 | 首页（发现） | 子页（v69） | 统一为（v70） |
|------|-------------|------------|--------------|
| 页面背景 | `--ios-bg` #f2f2f7 | `--bg` #f4f6f5 | `--ios-bg` |
| 移动顶栏 | `glass-nav` 毛玻璃 + 品牌渐变字 | 无 glass-nav，仅 desktop header | `layout.js` 注入同款 `glass-nav` |
| 标题字号 | `display-title` clamp 1.75–2.25rem / 700 | `page-head h2` 1.15rem | 与 `display-title` 一致 clamp |
| 副文案 | `--ios-label-secondary` 0.92rem | `--ink-muted` 0.85rem | `--ios-label-secondary` |
| 场景 chip | `quick-scene` 白底阴影圆角 12px | 描边 `#e8e8e8` 小 chip | 对齐 `quick-scene` token |
| 列表卡片 | 白底 + `--card-stripe` 顶条 + `--ios-shadow` | 灰底 + 1px border | 复用 `.card` 条纹与阴影 |
| 主按钮 | `--btn-primary-bg` 青紫渐变 | 纯色 `--accent` | `--btn-primary-bg` |
| 反馈 FAB | `--fab-bg` 靛紫渐变 | 纯色 teal | `--fab-bg` |
| 底栏 | `--tab-bar-bg` blur 52px + 指示点 | 白底 56px 无指示点 | `design-system` 底栏（子页 `.app-ui` 覆盖 legacy） |
| Sheet 头 | `--detail-header-gradient` 紫渐变 | 白底平头 | 反馈 modal 同款渐变头 |
| 自适应字号 | `app.js` → `syncAdaptiveFonts` | 未挂载 | `adaptive-fonts.js` + `layout.js` |

## 改动摘要

### 新增

- `js/adaptive-fonts.js` — 全站自适应字号（发现页注册扩展 sync，子页直接 schedule）
- `docs/design-unification.md` — 本文档

### 核心文件

| 文件 | 改动 |
|------|------|
| `css/design-system.css` | 子页 shell、标题、chip、卡片、工具/说明/反馈组件全套 iOS token |
| `css/premium-ui.css` | 子页反馈 Sheet 紫渐变头 |
| `js/layout.js` | `initSubpageShell()` 注入 `app-viewport` + `glass-nav` |
| `js/app.js` | 字号逻辑迁至 `AdaptiveFonts.register()` |
| 四子页 HTML | 引入 `adaptive-fonts.js?v=70` |
| `index.html` | 同上 |
| `scripts/test-ui-quality.mjs` | 设计统一断言 |

## Design Token 表（子页应使用）

| Token | 值 / 用途 |
|-------|----------|
| `--ios-bg` | 页面背景 #f2f2f7 |
| `--ios-bg-elevated` | 卡片 / chip 白底 |
| `--ios-label` | 主文字 #1c1c1e |
| `--ios-label-secondary` | 副文案 rgba(60,60,67,.55) |
| `--ios-teal` / `--accent-dark` | 强调色、链接 |
| `--accent-light` | 标签浅底 |
| `--ios-radius-sm/md/lg` | 8 / 16 / 20px 圆角 |
| `--ios-shadow` / `--ios-shadow-sm` | 卡片阴影 |
| `--card-stripe` | 卡片顶条青→靛→紫渐变 |
| `--chip-active-bg` | 选中 chip 渐变 |
| `--btn-primary-bg` | 主按钮渐变 |
| `--fab-bg` | 反馈 FAB 靛紫渐变 |
| `--glass-nav-bg` | 顶栏毛玻璃底 |
| `--nav-brand-gradient` | 品牌迷你标题渐变字 |
| `--tab-bar-h` | 底栏高度（含 safe-area） |
| `--detail-header-gradient` | Sheet 顶栏紫渐变 |

## 验收清单

并排打开 **发现** 与 **场景 / 工具 / 说明 / 反馈**：

- [ ] 移动端正文背景同为浅灰 `#f2f2f7`，非偏绿灰
- [ ] 子页顶部有毛玻璃 `glass-nav`，品牌名为紫青渐变字
- [ ] 子页标题大小与发现页大标题同一量级（非小一号 h2）
- [ ] 场景 chip 为白底圆角阴影，非灰描边
- [ ] 场景卡 / 工具卡 / 说明卡顶部有青紫条纹，无 1px 灰边框
- [ ] 底栏高度、模糊、选中色与发现页一致；选中项有底部指示点
- [ ] 右下角反馈 FAB 为紫渐变（非纯 teal）
- [ ] 反馈页 Sheet 弹出时顶栏为紫渐变（与详情 Sheet 一致）
- [ ] 桌面端子页 header 毛玻璃与白底发现页一致
- [ ] `npm run test:all` 全绿

## 版本

静态资源缓存参数：**v=70**（v69 设计统一 +1）
