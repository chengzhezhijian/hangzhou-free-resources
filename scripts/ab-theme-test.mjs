#!/usr/bin/env node
/**
 * 主题 AB 自动化测试 — 10 套配色/字体/形状量化评分与合法性校验
 * 用法: node scripts/ab-theme-test.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rankThemes } from "./lib/theme-scorer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const themesPath = path.join(ROOT, "css/themes/themes.json");
const variantsPath = path.join(ROOT, "css/themes/variants.css");
const reportMd = path.join(ROOT, "docs/ab-test-report.md");
const compareMd = path.join(ROOT, "docs/ab-theme-compare.md");
const reportJson = path.join(ROOT, "docs/ab-test-results.json");

const EXPECTED_IDS = Array.from({ length: 10 }, (_, i) => `v${String(i + 1).padStart(2, "0")}`);
const REQUIRED_SHAPE = ["xs", "sm", "md", "lg", "xl"];
const SHADOW_PRESETS = ["none", "flat", "subtle", "soft", "crisp", "airy", "warm", "bold"];

const { themes, defaultTheme } = JSON.parse(fs.readFileSync(themesPath, "utf8"));
const variantsCss = fs.readFileSync(variantsPath, "utf8");

let errors = 0;
function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

console.log("\n═══ 主题合法性校验 ═══\n");

if (themes.length !== 10) fail(`themes.json 应有 10 套，实际 ${themes.length}`);
EXPECTED_IDS.forEach((id) => {
  if (!themes.find((t) => t.id === id)) fail(`缺少主题 ${id}`);
  if (!variantsCss.includes(`[data-theme="${id}"]`)) fail(`variants.css 缺少 ${id}`);
});

themes.forEach((t) => {
  if (!t.tagline) fail(`${t.id} 缺少 tagline`);
  if (!t.scenario) fail(`${t.id} 缺少 scenario`);
  if (!t.keywords?.length) fail(`${t.id} 缺少 keywords`);
  if (!t.shape?.radius) fail(`${t.id} 缺少 shape.radius`);
  else {
    REQUIRED_SHAPE.forEach((k) => {
      if (typeof t.shape.radius[k] !== "number") fail(`${t.id} shape.radius.${k} 无效`);
    });
  }
  if (!SHADOW_PRESETS.includes(t.shape?.shadow)) fail(`${t.id} shape.shadow 无效: ${t.shape?.shadow}`);
  if (!variantsCss.includes(`--ios-radius-sm: ${t.shape.radius.sm}px`)) {
    fail(`${t.id} variants.css 圆角未同步（sm=${t.shape.radius.sm}）`);
  }
});

if (errors) {
  console.error(`\n合法性校验失败：${errors} 项\n`);
  process.exit(1);
}
console.log("✓ 10 套主题定义与 variants.css 同步\n");

const ranked = rankThemes(themes);
const generatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
const recommendation = ranked.slice(0, 3).map((t) => t.id).join("、");
const winner = ranked[0];

const compareDoc = `# 10 套主题 AB 对比说明

> 生成时间：${generatedAt} · 对比墙：[\`labs/ab-compare.html\`](../labs/ab-compare.html)

## 如何选择

1. 打开 [对比墙](../labs/ab-compare.html) 并排浏览 10 套 iframe 预览
2. 点击「全屏体验」进入 \`index.html?theme=v0X&v=54\`
3. 结合下方场景推荐与自动化评分（[\`ab-test-report.md\`](./ab-test-report.md)）做决策

## 主题清单

| ID | 名称 | 主色 | 风格关键词 | 一句话 | 推荐场景 |
|----|------|------|-----------|--------|----------|
${themes
  .map(
    (t) =>
      `| **${t.id}** | ${t.name} | \`${t.colors.accent}\` | ${(t.keywords || []).join("、")} | ${t.tagline} | ${t.scenario} |`
  )
  .join("\n")}

## 视觉差异维度

| 维度 | 差异说明 | 极值对比 |
|------|----------|----------|
| 色板 | accent / 背景 / 辅色各不同 | v04 珊瑚粉 ↔ v02 政务蓝 |
| 圆角 | 每套独立 \`--ios-radius-*\` | v09 0–8px ↔ v08 14–30px |
| 阴影 | soft / flat / bold / warm 等 8 档 | v09 无阴影 ↔ v03/v10 强阴影 |
| 字重 | title 600–900、body 400–500 | v09 轻标题 ↔ v10 超粗 900 |
| accent | 按钮/Chip 渐变随主色变化 | v06 微信绿 ↔ v10 美团橙 |

## 场景推荐

| 诉求 | 首选 | 备选 |
|------|------|------|
| 政务可信、办事指引 | **v02** 政务可信 | v01 苹果原生 |
| 通用首屏、原生 App 感 | **v01** 苹果原生 | v08 夏日纳凉 |
| 纳凉/夏季专题 | **v08** 夏日纳凉 | v01 苹果原生 |
| 地图出行、附近发现 | **v03** 高德导航 | v01 苹果原生 |
| 图书馆/自习阅读 | **v07** 阅读书房 | v09 墨韵简约 |
| 生活消费、本地服务 | **v10** 活力橙光 | v04 爱彼迎暖 |
| 极简克制、长期阅读 | **v09** 墨韵简约 | v07 阅读书房 |
| 中老年/微信习惯 | **v06** 微信便民 | v02 政务可信 |

## 自动化评分 Top 3

1. **${ranked[0].id} ${ranked[0].name}**（${ranked[0].total} 分）
2. **${ranked[1].id} ${ranked[1].name}**（${ranked[1].total} 分）
3. **${ranked[2].id} ${ranked[2].name}**（${ranked[2].total} 分）

## 命令

\`\`\`bash
npm run themes:generate   # themes.json → variants.css
npm run test:ab           # 合法性 + 评分报告
\`\`\`
`;

const md = `# 主题 AB 测试报告

> 生成时间：${generatedAt} · 共 ${themes.length} 套 · 默认 ${defaultTheme}

## 结论（供验收决策）

| 排名 | ID | 名称 | 对标 | 总分 | 主色 | 字体 |
|------|-----|------|------|------|------|------|
${ranked.map((t) => `| ${t.rank} | **${t.id}** | ${t.name} | ${t.reference} | **${t.total}**/100 | \`${t.accent}\` | ${t.font} |`).join("\n")}

### 推荐 Top 3

1. **${ranked[0].id} ${ranked[0].name}**（${ranked[0].total} 分）— ${ranked[0].reference}
2. **${ranked[1].id} ${ranked[1].name}**（${ranked[1].total} 分）— ${ranked[1].reference}
3. **${ranked[2].id} ${ranked[2].name}**（${ranked[2].total} 分）— ${ranked[2].reference}

**综合建议**：若优先政务可信 → 选 **${ranked.find((t) => t.id === "v02")?.rank <= 3 ? "v02" : ranked[0].id}**；若优先 App 原生感 → **v01**；若强调纳凉场景 → **v08**。

## 评分维度（满分 100）

| 维度 | 权重 | 说明 |
|------|------|------|
| 无障碍 | 30 | WCAG 正文/按钮/层级对比度 |
| 字体 | 20 | 中文栈、字重、字距 |
| 品牌契合 | 25 | 政府惠民可信感（蓝/青/绿优先） |
| 色彩和谐 | 15 | 主辅色关系、背景层级 |
| 层级可读 | 10 | 主/次/三级文字区分 |

## 各版本明细

${ranked
  .map(
    (t) => {
      const theme = themes.find((x) => x.id === t.id);
      const shape = theme?.shape;
      return `### ${t.rank}. ${t.id} · ${t.name}（${t.total}/100）

- **对标**：${t.reference}
- **主色** \`${t.accent}\` · **背景** \`${t.bg}\`
- **圆角** sm=${shape?.radius?.sm}px · **阴影** ${shape?.shadow}
- **场景**：${theme?.scenario || "—"}
- 无障碍 ${t.breakdown.accessibility.score}/${t.breakdown.accessibility.max}
- 字体 ${t.breakdown.typography.score}/${t.breakdown.typography.max}
- 品牌 ${t.breakdown.brandFit.score}/${t.breakdown.brandFit.max}
- 和谐 ${t.breakdown.harmony.score}/${t.breakdown.harmony.max}
- 层级 ${t.breakdown.hierarchy.score}/${t.breakdown.hierarchy.max}
`;
    }
  )
  .join("\n")}

## 如何预览

1. **对比墙**：[\`labs/ab-compare.html\`](../labs/ab-compare.html) — 10 套并排 + iframe
2. **说明文档**：[\`docs/ab-theme-compare.md\`](./ab-theme-compare.md)
3. **全站预览**：[\`index.html?theme=v01&v=54\`](../index.html?theme=v01&v=54)（替换 v01–v10）
4. **应用主题**：验收后告知 ID，写入 \`site-config.js\` 默认 theme

## 自动化命令

\`\`\`bash
npm run themes:generate   # 从 themes.json 生成 variants.css
npm run test:ab             # 合法性校验 + 重新跑本报告
\`\`\`
`;

fs.mkdirSync(path.dirname(reportMd), { recursive: true });
fs.writeFileSync(reportMd, md);
fs.writeFileSync(compareMd, compareDoc);
fs.writeFileSync(
  reportJson,
  JSON.stringify(
    {
      generatedAt,
      defaultTheme,
      themeCount: themes.length,
      winner: { id: winner.id, name: winner.name, total: winner.total },
      recommendation,
      ranked,
      themes: themes.map((t) => ({
        id: t.id,
        name: t.name,
        accent: t.colors.accent,
        tagline: t.tagline,
        scenario: t.scenario,
        keywords: t.keywords,
        shape: t.shape,
      })),
    },
    null,
    2
  )
);

console.log("═══ 主题 AB 测试 ═══\n");
ranked.forEach((t) => {
  const bar = "█".repeat(Math.round(t.total / 5)) + "░".repeat(20 - Math.round(t.total / 5));
  console.log(`${String(t.rank).padStart(2)}. ${t.id} ${t.name.padEnd(8)} ${bar} ${t.total}/100`);
});
console.log(`\n🏆 推荐: ${recommendation}`);
console.log(`📄 报告: docs/ab-test-report.md`);
console.log(`📋 对比: docs/ab-theme-compare.md`);
console.log(`📊 数据: docs/ab-test-results.json`);
console.log(`👀 预览: labs/ab-compare.html\n`);
