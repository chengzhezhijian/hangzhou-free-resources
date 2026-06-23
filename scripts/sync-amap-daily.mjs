#!/usr/bin/env node
/**
 * 每日高德 POI 同步流水线：拉取 → 坐标 → 测试（可选）→ 版本 bump
 * 用法: node scripts/sync-amap-daily.mjs [--full] [--no-test] [--bump]
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const fullSync = args.includes("--full");
const skipTest = args.includes("--no-test");
const bump = args.includes("--bump") || process.env.AMAP_BUMP_VERSION === "1";

function run(cmd, env = {}) {
  console.log(`\n$ ${cmd}`);
  const r = spawnSync(cmd, {
    shell: true,
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run(`node scripts/fetch-amap-poi.mjs`, {
  AMAP_FULL_SYNC: fullSync ? "1" : "0",
});

run("node scripts/build-resource-coords.mjs");

if (!skipTest) {
  run("npm run test:all");
}

if (bump) {
  const files = [
    "index.html",
    "guide.html",
    "tools.html",
    "about.html",
    "feedback.html",
    "js/theme-switch.js",
    "labs/ab-compare.html",
    "scripts/test-product-flows.mjs",
    "scripts/test-ui-quality.mjs",
  ];
  for (const f of files) {
    const fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) continue;
    const v = fs.readFileSync(fp, "utf8").match(/v=(\d+)/)?.[1];
    if (!v) continue;
    const next = String(Number(v) + 1);
    fs.writeFileSync(fp, fs.readFileSync(fp, "utf8").replaceAll(`v=${v}`, `v=${next}`));
    console.log(`bump ${f}: v=${v} → v=${next}`);
  }
}

console.log("\n✓ sync-amap-daily 完成");
