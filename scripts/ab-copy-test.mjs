#!/usr/bin/env node
/**
 * 首页文案 AB 自动化测试
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { rankCopyVariants } from "./lib/copy-scorer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const ctx = vm.createContext({});
vm.runInContext(
  fs.readFileSync(path.join(ROOT, "js/copy-variants.js"), "utf8") + "; globalThis.__CV = COPY_VARIANTS;",
  ctx
);
const variants = ctx.__CV;

const ranked = rankCopyVariants(variants);
const generatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

const md = `# 首页文案 AB 测试报告

> ${generatedAt} · 10 套差异化首页 · 各含独立品牌/Hero/引导/onboard

## 排名总览

| # | ID | 名称 | 优化维度 | 配对主题 | 品牌名 | 总分 |
|---|-----|------|----------|----------|--------|------|
${ranked.map((t) => `| ${t.rank} | **${t.id}** | ${t.name} | ${t.dimension} | ${t.theme} | ${t.brand} | **${t.total}** |`).join("\n")}

## Top 3 推荐

1. **${ranked[0].id} ${ranked[0].name}** — ${ranked[0].dimension}（${ranked[0].total} 分）
2. **${ranked[1].id} ${ranked[1].name}** — ${ranked[1].dimension}（${ranked[1].total} 分）
3. **${ranked[2].id} ${ranked[2].name}** — ${ranked[2].dimension}（${ranked[2].total} 分）

## 预览方式

- **对比墙**：[\`labs/ab-homepage.html\`](../labs/ab-homepage.html)
- **全站单版**：\`index.html?copy=h01\`（h01–h10，自动联动配色主题）

## 各版 Hero 文案

${Object.values(variants)
  .map(
    (v) => `### ${v.id} · ${v.name}
- **品牌**：${v.brand.name}（${v.brand.tagline}）
- **Hero**：${v.hero.titleHtml.replace(/<br \/>/g, " ")}
- **副文案**：${v.hero.sub}
`
  )
  .join("\n")}

## 评分维度（满分 100）

| 维度 | 分 | 说明 |
|------|---|------|
| 清晰易懂 | 20 | Hero 长度、副标题简洁 |
| 行动引导 | 20 | onboard 步骤、动词引导 |
| 受众精准 | 20 | 维度标签、场景关键词 |
| 信任感 | 15 | 政府/公益表述，无负面梗 |
| SEO | 15 | title/description 长度 |
| 差异化 | 10 | 品牌独立命名 |
`;

fs.mkdirSync(path.join(ROOT, "docs"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "docs/ab-copy-report.md"), md);
fs.writeFileSync(
  path.join(ROOT, "docs/ab-copy-results.json"),
  JSON.stringify({ generatedAt, ranked, variants: Object.keys(variants) }, null, 2)
);

console.log("\n═══ 首页文案 AB 测试 ═══\n");
ranked.forEach((t) => {
  const bar = "█".repeat(Math.round(t.total / 5)) + "░".repeat(20 - Math.round(t.total / 5));
  console.log(`${String(t.rank).padStart(2)}. ${t.id} ${t.name.padEnd(8)} ${bar} ${t.total}/100  [${t.theme}]`);
});
console.log(`\n🏆 Top3: ${ranked.slice(0, 3).map((t) => t.id).join("、")}`);
console.log("📄 docs/ab-copy-report.md");
console.log("👀 labs/ab-homepage.html\n");
