#!/usr/bin/env node
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = vm.createContext({
  URLSearchParams,
  location: { search: "" },
  localStorage: { setItem() {} },
  document: { documentElement: { dataset: {} } },
  window: {},
});
vm.runInContext(
  fs.readFileSync(path.join(ROOT, "js/design-variants.js"), "utf8") + "; globalThis.__D = DESIGN_VARIANTS;",
  ctx
);
const variants = ctx.__D;

const requiredModes = new Set(["premium", "row", "tile", "compact", "minimal"]);
const requiredFilterRows = new Set([
  "standard", "scenes-sort", "categories", "scenes-perks", "facilities", "nearby",
  "categories-perks", "groups", "merged", "guide",
]);

let pass = 0;
let fail = 0;
const errors = [];

function ok(name, cond) {
  if (cond) pass++;
  else {
    fail++;
    errors.push(name);
  }
}

for (const v of Object.values(variants)) {
  ok(`${v.id} 有描述`, !!v.description);
  ok(`${v.id} cardMode 合法`, requiredModes.has(v.cardMode));
  ok(`${v.id} filterRow 合法`, requiredFilterRows.has(v.filterRow));
  ok(`${v.id} 无数字统计`, v.layout.stats === false);
}

ok("design-layouts.css 存在", fs.existsSync(path.join(ROOT, "css/design-layouts.css")));
ok("design-engine.js 存在", fs.existsSync(path.join(ROOT, "js/design-engine.js")));
ok("对比墙存在", fs.existsSync(path.join(ROOT, "labs/ab-design.html")));
ok("单行筛选栏存在", /filter-toolbar/.test(fs.readFileSync(path.join(ROOT, "css/design-layouts.css"), "utf8")));

const modes = new Set(Object.values(variants).map((v) => v.cardMode));
ok("≥4 种卡片形态", modes.size >= 4);
const rows = new Set(Object.values(variants).map((v) => v.filterRow));
ok("≥6 种单行筛选模式", rows.size >= 6);

console.log(`\n整站 UX AB: ${pass}/${pass + fail} 通过`);
if (errors.length) {
  errors.forEach((e) => console.log("  ✗", e));
  process.exit(1);
}

const md = `# 整站 UX AB 报告

共 10 套，每套 **结构 / 交互 / 筛选 / 列表形态** 不同。

| ID | 名称 | 维度 | 单行筛选 | 卡片 | 说明 |
|----|------|------|----------|------|------|
${Object.values(variants)
  .map(
    (v) =>
      `| ${v.id} | ${v.name} | ${v.dimension} | ${v.filterRow} | ${v.cardMode} | ${v.description} |`
  )
  .join("\n")}

预览：[labs/ab-design.html](../labs/ab-design.html) · \`?design=d01&v=44\`
`;
fs.writeFileSync(path.join(ROOT, "docs/ab-design-report.md"), md);
console.log("📄 docs/ab-design-report.md\n");
