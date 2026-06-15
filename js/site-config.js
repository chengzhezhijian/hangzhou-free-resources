/**
 * 站点配置 — 上线前请修改以下项
 */
const SITE_CONFIG = {
  /** 百度统计 Site ID — 在 https://tongji.baidu.com 创建站点后填入，见 docs/setup-feedback-analytics.md */
  baiduTongjiId: "50a56e1094f56845c92f9c6dc7dc41e4",

  /** Microsoft Clarity 项目 ID — https://clarity.microsoft.com */
  clarityProjectId: "x7dvhuedcl",

  /**
   * 反馈链接：腾讯问卷优先；当前默认 GitHub Issues（无需注册即可用）
   * 创建腾讯问卷后替换为 https://wj.qq.com/s2/xxxxx/
   */
  feedbackUrl: "https://wj.qq.com/s2/27038162/ce58/",

  /** 页内反馈邮件收件人（feedbackUrl 为空时生效） */
  feedbackEmail: "",

  /** 是否在本机控制台打印埋点（调试用） */
  analyticsDebug: false,

  /** 首次访问自动尝试定位并选中地市（需用户授权） */
  autoLocateOnLoad: true,
};
