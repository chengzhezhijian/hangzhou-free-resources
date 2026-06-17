/**
 * 首页文案 AB 自动化评分
 */

function wordCount(s) {
  return (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, "").length;
}

function hasAny(text, words) {
  const t = (text || "").toLowerCase();
  return words.some((w) => t.includes(w.toLowerCase()));
}

export function scoreCopyVariant(v) {
  const heroText = v.hero.titleHtml + v.hero.sub;
  const notes = [];

  // 清晰易懂 20
  let clarity = 10;
  const heroLen = wordCount(v.hero.titleHtml);
  if (heroLen >= 8 && heroLen <= 28) clarity += 6;
  else if (heroLen <= 36) clarity += 3;
  else clarity += 1;
  if (v.hero.sub && v.hero.sub.length <= 40) clarity += 4;
  notes.push(`Hero ${heroLen} 字`);

  // 行动引导 20
  let action = 8;
  if (v.onboard?.length >= 3) action += 6;
  if (hasAny(v.hero.sub, ["选", "点", "搜", "导航", "定位"])) action += 6;
  else action += 2;

  // 受众精准 20
  let audience = 12;
  const dim = v.dimension || "";
  if (dim.includes("·")) audience += 5;
  if (v.id === "h01" && hasAny(heroText, ["政府", "官方", "公益"])) audience += 3;
  if (v.id === "h05" && hasAny(heroText, ["娃", "带"])) audience += 3;
  if (v.id === "h06" && hasAny(heroText, ["自习", "WiFi", "咖啡"])) audience += 3;
  if (v.id === "h07" && hasAny(heroText, ["夏", "空调", "纳凉"])) audience += 3;
  if (v.id === "h09" && hasAny(heroText, ["懂", "简单", "大字"])) audience += 3;
  audience = Math.min(20, audience);

  // 信任感 15
  let trust = 5;
  if (hasAny(v.footer + v.hero.badge, ["政府", "公益", "官方", "公告"])) trust += 6;
  if (!hasAny(v.brand.name + heroText, ["蹭", "白嫖"])) trust += 4;
  else trust -= 3;
  if (v.id === "h04" && v.tabDiscover.includes("白嫖")) trust -= 2;
  trust = Math.max(0, Math.min(15, trust));

  // SEO 15
  let seo = 0;
  const descLen = (v.meta?.description || "").length;
  const titleLen = (v.meta?.title || "").length;
  if (descLen >= 50 && descLen <= 160) seo += 8;
  else if (descLen >= 30) seo += 4;
  if (titleLen >= 12 && titleLen <= 32) seo += 7;
  else if (titleLen >= 8) seo += 3;

  // 差异化 10 — 品牌名独特
  let diff = 6;
  if (v.brand.name !== "全国惠民地图") diff += 4;

  const total = clarity + action + audience + trust + seo + diff;

  return {
    id: v.id,
    name: v.name,
    dimension: v.dimension,
    theme: v.theme,
    brand: v.brand.name,
    total: +Math.min(100, total).toFixed(2),
    breakdown: {
      clarity: +clarity.toFixed(2),
      action: +action.toFixed(2),
      audience: +audience.toFixed(2),
      trust: +trust.toFixed(2),
      seo: +seo.toFixed(2),
      differentiation: +diff.toFixed(2),
    },
    notes,
  };
}

export function rankCopyVariants(variants) {
  return Object.values(variants)
    .map(scoreCopyVariant)
    .sort((a, b) => b.total - a.total)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}
