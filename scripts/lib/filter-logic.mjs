/**
 * 与 js/app.js 筛选/搜索逻辑保持同步（供 Node 自动化测试）
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedPath = path.join(__dirname, "../../js/filter-shared.js");

let FilterShared;
function loadFilterShared() {
  if (FilterShared) return FilterShared;
  const ctx = vm.createContext({ globalThis: {} });
  vm.runInContext(fs.readFileSync(sharedPath, "utf8"), ctx);
  FilterShared = ctx.globalThis.FilterShared;
  return FilterShared;
}

export function createFilterEngine(deps) {
  return loadFilterShared().createFilterEngine(deps);
}
