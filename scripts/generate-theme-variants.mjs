#!/usr/bin/env node
/**
 * 从 css/themes/themes.json 生成 css/themes/variants.css
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const themesPath = path.join(ROOT, "css/themes/themes.json");
const outPath = path.join(ROOT, "css/themes/variants.css");

const { themes, defaultTheme } = JSON.parse(fs.readFileSync(themesPath, "utf8"));

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function themeBlock(t) {
  const c = t.colors;
  const ty = t.typography;
  const rgb = hexToRgb(c.accent);
  const bgRgb = hexToRgb(c.bg);
  return `
/* ${t.id} · ${t.name}（${t.reference}） */
[data-theme="${t.id}"] {
  --theme-font: ${t.font.family};
  --theme-font-url: ${t.font.googleUrl ? `"${t.font.googleUrl}"` : "none"};
  --theme-color-meta: ${c.themeColor};

  --ios-bg: ${c.bg};
  --ios-bg-elevated: ${c.bgElevated};
  --ios-separator: ${c.separator};
  --ios-label: ${c.label};
  --ios-label-secondary: ${c.labelSecondary};
  --ios-label-tertiary: ${c.labelTertiary};
  --ios-blue: ${c.accent};
  --ios-indigo: ${c.secondary};
  --ios-teal: ${c.accent};
  --accent: ${c.accent};
  --accent-dark: ${c.accentDark};
  --accent-light: ${c.accentLight};
  --accent-alt: ${c.accentAlt};
  --accent-secondary: ${c.secondary};
  --accent-tertiary: ${c.tertiary};
  --on-accent: ${c.onAccent};

  --glass-nav-bg: ${c.glassNavBg};
  --search-bg: ${c.searchBg};
  --search-bg-focus: ${c.searchBgFocus};
  --tab-bar-bg: ${c.tabBarBg};
  --chip-active-bg: linear-gradient(135deg, ${c.accent}, ${c.accentAlt});
  --chip-active-shadow: 0 4px 16px rgba(${rgb}, 0.35);
  --btn-primary-bg: linear-gradient(135deg, ${c.accent}, ${c.accentAlt});
  --btn-primary-shadow: 0 4px 14px rgba(${rgb}, 0.35);
  --card-stripe: linear-gradient(90deg, ${c.accent}, ${c.secondary}, ${c.tertiary});
  --fab-bg: linear-gradient(135deg, ${c.secondary}, ${c.tertiary});
  --premium-gradient: linear-gradient(135deg, ${c.accent} 0%, ${c.secondary} 50%, ${c.tertiary} 100%);
  --discover-sticky-bg: linear-gradient(180deg, rgba(${bgRgb}, 0.97) 0%, rgba(${bgRgb}, 0.92) 70%, rgba(${bgRgb}, 0) 100%);
  --nav-brand-gradient: linear-gradient(135deg, ${c.accent}, ${c.secondary});
  --title-weight: ${ty.titleWeight};
  --title-tracking: ${ty.titleTracking};
  --body-weight: ${ty.bodyWeight};
  --search-spinner-border: rgba(${rgb}, 0.25);
}
`;
}

const header = `/**
 * 主题变体 — 由 scripts/generate-theme-variants.mjs 自动生成
 * 默认: ${defaultTheme} · 共 ${themes.length} 套
 * 预览: labs/ab-compare.html · 切换: ?theme=v01
 */
`;

const css = header + themes.map(themeBlock).join("\n");
fs.writeFileSync(outPath, css.trim() + "\n");
console.log(`✓ 生成 ${outPath}（${themes.length} 套主题）`);
