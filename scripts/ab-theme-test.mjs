#!/usr/bin/env node
/**
 * 主题 AB 自动化测试 — 10 套配色/字体量化评分
 * 用法: node scripts/ab-theme-test.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rankThemes } from "./lib/theme-scorer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const themesPath = path.join(ROOT, "css/themes/themes.json");
const reportMd = path.join(ROOT, "docs/ab-test-report.md");
const reportJson = path.join(ROOT, "docs/ab-test-results.json");

const { themes, defaultTheme } = JSON.parse(fs.readFileSync(themesPath, "utf8"));
const ranked = rankThemes(themes);

const generatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

const recommendation = ranked.slice(0, 3).map((t) => t.id).join("、");
const winner = ranked[0];

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
    (t) => `### ${t.rank}. ${t.id} · ${t.name}（${t.total}/100）

- **对标**：${t.reference}
- **主色** \`${t.accent}\` · **背景** \`${t.bg}\`
- 无障碍 ${t.breakdown.accessibility.score}/${t.breakdown.accessibility.max}
- 字体 ${t.breakdown.typography.score}/${t.breakdown.typography.max}
- 品牌 ${t.breakdown.brandFit.score}/${t.breakdown.brandFit.max}
- 和谐 ${t.breakdown.harmony.score}/${t.breakdown.harmony.max}
- 层级 ${t.breakdown.hierarchy.score}/${t.breakdown.hierarchy.max}
`
  )
  .join("\n")}

## 如何预览

1. **对比墙**：[\`labs/ab-compare.html\`](../labs/ab-compare.html) — 10 套并排
2. **全站预览**：[\`index.html?theme=v01\`](../index.html?theme=v01)（替换 v01–v10）
3. **应用主题**：验收后告知 ID，写入 \`site-config.js\` 默认 theme

## 自动化命令

\`\`\`bash
npm run themes:generate   # 从 themes.json 生成 variants.css
npm run test:ab             # 重新跑本报告
\`\`\`
`;

fs.mkdirSync(path.dirname(reportMd), { recursive: true });
fs.writeFileSync(reportMd, md);
fs.writeFileSync(
  reportJson,
  JSON.stringify(
    {
      generatedAt,
      defaultTheme,
      winner: { id: winner.id, name: winner.name, total: winner.total },
      recommendation,
      ranked,
    },
    null,
    2
  )
);

console.log("\n═══ 主题 AB 测试 ═══\n");
ranked.forEach((t) => {
  const bar = "█".repeat(Math.round(t.total / 5)) + "░".repeat(20 - Math.round(t.total / 5));
  console.log(`${String(t.rank).padStart(2)}. ${t.id} ${t.name.padEnd(8)} ${bar} ${t.total}/100`);
});
console.log(`\n🏆 推荐: ${recommendation}`);
console.log(`📄 报告: docs/ab-test-report.md`);
console.log(`📊 数据: docs/ab-test-results.json`);
console.log(`👀 预览: labs/ab-compare.html\n`);
