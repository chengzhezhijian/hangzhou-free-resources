/**
 * 站点配置 — 上线前请修改以下项
 */
const SITE_CONFIG = {
  /** 百度统计 Site ID — 在 https://tongji.baidu.com 创建站点后填入，见 docs/setup-feedback-analytics.md */
  baiduTongjiId: "",

  /**
   * 反馈链接：腾讯问卷优先；当前默认 GitHub Issues（无需注册即可用）
   * 创建腾讯问卷后替换为 https://wj.qq.com/s2/xxxxx/
   */
  feedbackUrl:
    "https://github.com/chengzhezhijian/hangzhou-free-resources/issues/new?template=feedback.yml",

  /** 页内反馈邮件收件人（feedbackUrl 为空时生效） */
  feedbackEmail: "",

  /** 是否在本机控制台打印埋点（调试用）；上线后可改为 false */
  analyticsDebug: true,
};
