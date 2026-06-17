/**
 * 站点配置 — 上线前请修改以下项
 */
const SITE_CONFIG = {
  /** 对外品牌名（页面展示用，不含部署域名） */
  siteBrandName: "全国惠民地图",

  /** 品牌副标题（全站 header 展示） */
  siteTagline: "政府免费便民 · 72城搜完即走",

  /** 数据范围：china = 全国版 */
  siteScope: "china",

  /** 百度统计 Site ID — 见 docs/setup-feedback-analytics.md */
  baiduTongjiId: "50a56e1094f56845c92f9c6dc7dc41e4",

  /** Microsoft Clarity 项目 ID */
  clarityProjectId: "x7dvhuedcl",

  /** 反馈链接（腾讯问卷） */
  feedbackUrl: "https://wj.qq.com/s2/27038162/ce58/",

  /** 页内反馈邮件收件人（feedbackUrl 为空时生效） */
  feedbackEmail: "",

  /** 是否在本机控制台打印埋点（仅开发调试） */
  analyticsDebug: false,

  /** 首次访问自动尝试定位并选中地市（需用户授权） */
  autoLocateOnLoad: true,
};
