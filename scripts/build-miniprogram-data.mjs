#!/usr/bin/env node
/**
 * 将网站 data-*.js 合并为小程序可用的 JSON
 * 用法: node scripts/build-miniprogram-data.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const JS_DIR = path.join(ROOT, "js");
const OUT_DIR = path.join(ROOT, "miniprogram", "data");

function runDataFile(filename, context) {
  const code = fs.readFileSync(path.join(JS_DIR, filename), "utf8");
  vm.runInContext(code, context);
}

function build() {
  const context = vm.createContext({ console });

  const files = [
    "map-nav.js",
    "data-study-spaces.js",
    "data-extra-resources.js",
    "data-zhejiang-cities.js",
    "data.js",
  ];
  const combined = files
    .map((f) => fs.readFileSync(path.join(JS_DIR, f), "utf8"))
    .join("\n");
  vm.runInContext(
    `${combined}\n;(() => {
      globalThis.__EXPORT__ = {
        RESOURCES,
        RESOURCE_CATEGORIES,
        CATEGORY_GROUPS,
        COST_TYPE_LABELS,
        FACILITY_FILTERS,
        CITIES,
        DISTRICTS,
        READING_SUBTYPES,
        SCENE_GUIDES,
        EXTERNAL_TOOLS,
      };
    })();`,
    context
  );

  const exported = context.__EXPORT__;
  const RESOURCES = exported?.RESOURCES;
  const RESOURCE_CATEGORIES = exported.RESOURCE_CATEGORIES;
  const CATEGORY_GROUPS = exported.CATEGORY_GROUPS;
  const COST_TYPE_LABELS = exported.COST_TYPE_LABELS;
  const FACILITY_FILTERS = exported.FACILITY_FILTERS;
  const CITIES = exported.CITIES;
  const DISTRICTS = exported.DISTRICTS;
  const READING_SUBTYPES = exported.READING_SUBTYPES;
  const SCENE_GUIDES = exported.SCENE_GUIDES;
  const EXTERNAL_TOOLS = exported.EXTERNAL_TOOLS;

  if (!Array.isArray(RESOURCES)) {
    throw new Error("RESOURCES 未生成，请检查 js/data.js 加载顺序");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const resourcesPath = path.join(OUT_DIR, "resources.json");
  const metaPath = path.join(OUT_DIR, "meta.json");

  fs.writeFileSync(resourcesPath, JSON.stringify(RESOURCES));
  fs.writeFileSync(
    metaPath,
    JSON.stringify({
      resourceCategories: RESOURCE_CATEGORIES,
      categoryGroups: CATEGORY_GROUPS,
      costTypeLabels: COST_TYPE_LABELS,
      facilityFilters: FACILITY_FILTERS,
      cities: CITIES,
      districts: DISTRICTS,
      readingSubtypes: READING_SUBTYPES,
      sceneGuides: SCENE_GUIDES,
      externalTools: EXTERNAL_TOOLS,
      generatedAt: new Date().toISOString(),
      total: RESOURCES.length,
    })
  );

  const resourcesSize = fs.statSync(resourcesPath).size;
  const metaSize = fs.statSync(metaPath).size;

  console.log(`✓ 已生成 ${RESOURCES.length} 条资源`);
  console.log(`  ${resourcesPath} (${(resourcesSize / 1024).toFixed(1)} KB)`);
  console.log(`  ${metaPath} (${(metaSize / 1024).toFixed(1)} KB)`);
}

build();
