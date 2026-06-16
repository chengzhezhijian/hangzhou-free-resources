import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const JS_DIR = path.join(ROOT, "js");

const DATA_FILES = [
  "map-nav.js",
  "data-study-spaces.js",
  "data-extra-resources.js",
  "data-zhejiang-cities.js",
  "data-zhejiang-expanded.js",
  "data.js",
];

export function loadSiteData() {
  const combined = DATA_FILES.map((f) =>
    fs.readFileSync(path.join(JS_DIR, f), "utf8")
  ).join("\n");

  const ctx = vm.createContext({ console });
  vm.runInContext(
    `${combined}
;globalThis.__SITE__ = {
  RESOURCES,
  CITIES,
  CITY_PICKER,
  PREFECTURE_CITIES,
  RESOURCE_CATEGORIES,
  CATEGORY_GROUPS,
  FACILITY_FILTERS,
  EXTERNAL_TOOLS,
  SCENE_GUIDES,
  DISTRICTS,
  MapNav,
};`,
    ctx
  );

  const geoCtx = vm.createContext({});
  vm.runInContext(
    fs.readFileSync(path.join(JS_DIR, "geo.js"), "utf8") +
      ";globalThis.__GEO__ = GeoCity;",
    geoCtx
  );

  const coordsPath = path.join(JS_DIR, "resource-coords.js");
  let RESOURCE_COORDS = {};
  if (fs.existsSync(coordsPath)) {
    const coordsCtx = vm.createContext({});
    vm.runInContext(
      fs.readFileSync(coordsPath, "utf8") +
        ";globalThis.__C__ = RESOURCE_COORDS;",
      coordsCtx
    );
    RESOURCE_COORDS = coordsCtx.__C__;
  }

  return {
    ...ctx.__SITE__,
    GeoCity: geoCtx.__GEO__,
    RESOURCE_COORDS,
    ROOT,
    JS_DIR,
  };
}
