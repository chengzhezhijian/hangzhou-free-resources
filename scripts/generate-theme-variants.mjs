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

const SHADOW_PRESETS = {
  none: {
    shadow: "none",
    shadowSm: "none",
    shadowLg: "none",
    chipMul: 0,
    btnMul: 0,
  },
  flat: {
    shadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.02)",
    shadowLg: "0 2px 8px rgba(0, 0, 0, 0.05)",
    chipMul: 0.2,
    btnMul: 0.22,
  },
  subtle: {
    shadow: "0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0, 0, 0, 0.03)",
    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.025)",
    shadowLg: "0 4px 16px rgba(0, 0, 0, 0.06)",
    chipMul: 0.25,
    btnMul: 0.28,
  },
  soft: {
    shadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)",
    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.03)",
    shadowLg: "0 4px 24px rgba(0, 0, 0, 0.08)",
    chipMul: 0.35,
    btnMul: 0.35,
  },
  crisp: {
    shadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.04)",
    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.04)",
    shadowLg: "0 4px 12px rgba(0, 0, 0, 0.08)",
    chipMul: 0.3,
    btnMul: 0.32,
  },
  airy: {
    shadow: "0 2px 8px rgba(0, 0, 0, 0.03), 0 8px 32px rgba(0, 0, 0, 0.04)",
    shadowSm: "0 1px 4px rgba(0, 0, 0, 0.025)",
    shadowLg: "0 8px 32px rgba(0, 0, 0, 0.07)",
    chipMul: 0.32,
    btnMul: 0.34,
  },
  warm: {
    shadow: "0 2px 8px rgba(255, 56, 92, 0.06), 0 6px 20px rgba(0, 0, 0, 0.05)",
    shadowSm: "0 1px 4px rgba(255, 56, 92, 0.05)",
    shadowLg: "0 8px 28px rgba(255, 56, 92, 0.1)",
    chipMul: 0.38,
    btnMul: 0.38,
  },
  bold: {
    shadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.1)",
    shadowSm: "0 1px 4px rgba(0, 0, 0, 0.06)",
    shadowLg: "0 10px 32px rgba(0, 0, 0, 0.14)",
    chipMul: 0.42,
    btnMul: 0.42,
  },
};

const { themes, defaultTheme } = JSON.parse(fs.readFileSync(themesPath, "utf8"));

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function resolveShadow(preset, rgb) {
  const p = SHADOW_PRESETS[preset] || SHADOW_PRESETS.soft;
  const chipShadow =
    p.chipMul > 0
      ? `0 4px 16px rgba(${rgb}, ${p.chipMul})`
      : "none";
  const btnShadow =
    p.btnMul > 0
      ? `0 4px 14px rgba(${rgb}, ${p.btnMul})`
      : "none";
  return { ...p, chipShadow, btnShadow };
}

function themeBlock(t) {
  const c = t.colors;
  const ty = t.typography;
  const sh = t.shape || { radius: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 }, shadow: "soft" };
  const r = sh.radius;
  const preset = resolveShadow(sh.shadow || "soft", hexToRgb(c.accent));
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

  --ios-radius-xs: ${r.xs}px;
  --ios-radius-sm: ${r.sm}px;
  --ios-radius-md: ${r.md}px;
  --ios-radius-lg: ${r.lg}px;
  --ios-radius-xl: ${r.xl}px;
  --ios-shadow: ${preset.shadow};
  --ios-shadow-sm: ${preset.shadowSm};
  --ios-shadow-lg: ${preset.shadowLg};

  --glass-nav-bg: ${c.glassNavBg};
  --search-bg: ${c.searchBg};
  --search-bg-focus: ${c.searchBgFocus};
  --tab-bar-bg: ${c.tabBarBg};
  --chip-active-bg: linear-gradient(135deg, ${c.accent}, ${c.accentAlt});
  --chip-active-shadow: ${preset.chipShadow};
  --btn-primary-bg: linear-gradient(135deg, ${c.accent}, ${c.accentAlt});
  --btn-primary-shadow: ${preset.btnShadow};
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
