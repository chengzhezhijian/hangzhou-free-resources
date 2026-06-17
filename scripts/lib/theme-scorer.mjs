/**
 * 主题自动化 AB 评分 — 无障碍 / 字体 / 品牌契合 / 色彩和谐
 */

function parseHex(hex) {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function parseColor(input) {
  if (!input) return [0, 0, 0];
  if (input.startsWith("#")) return parseHex(input);
  const m = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) return [+m[1], +m[2], +m[3]];
  return [0, 0, 0];
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(c1, c2) {
  const l1 = luminance(parseColor(c1));
  const l2 = luminance(parseColor(c2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToHsl(hex) {
  const [r, g, b] = parseHex(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function scoreContrast(ratio, min, max = 7) {
  if (ratio < min) return Math.max(0, (ratio / min) * 0.5);
  return Math.min(1, 0.5 + ((ratio - min) / (max - min)) * 0.5);
}

/** 无障碍 30 分 */
export function scoreAccessibility(theme) {
  const c = theme.colors;
  const checks = [
    { label: "正文/背景", ratio: contrastRatio(c.label, c.bg), min: 4.5, weight: 8 },
    { label: "次级/背景", ratio: contrastRatio(c.labelSecondary, c.bg), min: 3.0, weight: 5 },
    { label: "按钮字/主色", ratio: contrastRatio(c.onAccent, c.accent), min: 4.5, weight: 8 },
    { label: "正文/卡片", ratio: contrastRatio(c.label, c.bgElevated), min: 4.5, weight: 5 },
    { label: "主色/背景", ratio: contrastRatio(c.accent, c.bg), min: 3.0, weight: 4 },
  ];
  let total = 0;
  const details = checks.map((ch) => {
    const s = scoreContrast(ch.ratio, ch.min) * ch.weight;
    total += s;
    return { ...ch, score: +s.toFixed(2), pass: ch.ratio >= ch.min };
  });
  return { score: +total.toFixed(2), max: 30, details };
}

/** 字体 20 分 */
export function scoreTypography(theme) {
  const f = theme.font.family.toLowerCase();
  const t = theme.typography;
  let score = 0;
  const notes = [];

  if (f.includes("pingfang") || f.includes("-apple-system")) {
    score += 6;
    notes.push("iOS 系统字体栈 +6");
  }
  if (f.includes("noto sans sc")) {
    score += 5;
    notes.push("Noto Sans SC 中文优化 +5");
  }
  if (f.includes("inter")) {
    score += 3;
    notes.push("Inter 西文精密 +3");
  }
  if (f.includes("noto serif")) {
    score += 2;
    notes.push("衬线阅读感 +2（工具类略降）");
    score -= 2;
    notes.push("工具类衬线 -2");
  }
  if (t.titleWeight >= 700 && t.titleWeight <= 800) {
    score += 4;
    notes.push("标题字重适中 +4");
  } else if (t.titleWeight === 900) {
    score += 2;
    notes.push("超粗标题 +2");
  } else {
    score += 3;
    notes.push("轻标题 +3");
  }
  if (parseFloat(t.titleTracking) <= -0.03) {
    score += 3;
    notes.push("负字距现代感 +3");
  } else {
    score += 2;
  }
  score = Math.min(20, Math.max(0, score));
  return { score: +score.toFixed(2), max: 20, notes };
}

/** 品牌契合（政府惠民）25 分 */
export function scoreBrandFit(theme) {
  const [h, s, l] = hexToHsl(theme.colors.accent);
  let score = 0;
  const notes = [];

  // 蓝/青/绿 色相更契合政务可信
  if (h >= 180 && h <= 250) {
    score += 10;
    notes.push("蓝色系政务可信 +10");
  } else if (h >= 140 && h < 180) {
    score += 9;
    notes.push("青绿便民 +9");
  } else if (h >= 90 && h < 140) {
    score += 8;
    notes.push("绿色公益 +8");
  } else if (h >= 20 && h < 45) {
    score += 5;
    notes.push("橙色生活化 +5");
  } else if (h >= 330 || h < 20) {
    score += 4;
    notes.push("红/粉消费感 +4");
  } else {
    score += 6;
    notes.push("其他色相 +6");
  }

  if (s >= 45 && s <= 85) score += 5;
  else score += 3;
  notes.push(`饱和度 ${s.toFixed(0)}%`);

  if (l >= 35 && l <= 55) {
    score += 5;
    notes.push("明度适中 +5");
  } else {
    score += 3;
  }

  // 背景不应过暗
  const bgL = hexToHsl(theme.colors.bg)[2];
  if (bgL >= 92) {
    score += 5;
    notes.push("浅色背景清爽 +5");
  } else {
    score += 2;
  }

  score = Math.min(25, score);
  return { score: +score.toFixed(2), max: 25, notes };
}

/** 色彩和谐 15 分 */
export function scoreHarmony(theme) {
  const c = theme.colors;
  const h1 = hexToHsl(c.accent)[0];
  const h2 = hexToHsl(c.secondary.startsWith("#") ? c.secondary : c.accent)[0];
  let diff = Math.abs(h1 - h2);
  if (diff > 180) diff = 360 - diff;

  let score = 0;
  const notes = [];
  if (diff >= 25 && diff <= 120) {
    score += 8;
    notes.push(`辅色色相差 ${diff.toFixed(0)}° 和谐 +8`);
  } else {
    score += 4;
    notes.push(`色相差 ${diff.toFixed(0)}° +4`);
  }

  const bgElevatedContrast = contrastRatio(c.bgElevated, c.bg);
  if (bgElevatedContrast >= 1.02 && bgElevatedContrast <= 1.15) {
    score += 4;
    notes.push("层级对比 subtle +4");
  } else {
    score += 2;
  }

  if (c.accentLight.includes("rgba")) score += 3;
  notes.push("accentLight 透明层 +3");

  return { score: Math.min(15, score), max: 15, notes };
}

/** 层级可读 10 分 */
export function scoreHierarchy(theme) {
  const c = theme.colors;
  const primarySecondary = contrastRatio(c.label, c.labelSecondary);
  const secondaryTertiary = contrastRatio(c.labelSecondary, c.labelTertiary);
  let score = 0;
  if (primarySecondary >= 1.3 && primarySecondary <= 2.5) score += 5;
  else score += 3;
  if (secondaryTertiary >= 1.2) score += 5;
  else score += 2;
  return {
    score: +score.toFixed(2),
    max: 10,
    notes: [`主/次级对比 ${primarySecondary.toFixed(2)}`, `次/三级对比 ${secondaryTertiary.toFixed(2)}`],
  };
}

export function scoreTheme(theme) {
  const accessibility = scoreAccessibility(theme);
  const typography = scoreTypography(theme);
  const brandFit = scoreBrandFit(theme);
  const harmony = scoreHarmony(theme);
  const hierarchy = scoreHierarchy(theme);
  const total =
    accessibility.score + typography.score + brandFit.score + harmony.score + hierarchy.score;

  return {
    id: theme.id,
    name: theme.name,
    reference: theme.reference,
    total: +total.toFixed(2),
    maxTotal: 100,
    breakdown: { accessibility, typography, brandFit, harmony, hierarchy },
    font: theme.font.family.split(",")[0].replace(/['"]/g, ""),
    accent: theme.colors.accent,
    bg: theme.colors.bg,
  };
}

export function rankThemes(themes) {
  return themes
    .map(scoreTheme)
    .sort((a, b) => b.total - a.total)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}
