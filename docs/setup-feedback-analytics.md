# 腾讯问卷 & 百度统计 — 创建指南

> 这两项需要你的账号登录，AI 无法代注册。按下面步骤约 **5 分钟** 完成，把 ID/链接发给我或自行填入 `js/site-config.js`。

**当前临时方案**：已启用 [GitHub Issues 反馈](https://github.com/chengzhezhijian/hangzhou-free-resources/issues/new?template=feedback.yml)，可先用于验证需求。

---

## 一、腾讯问卷（约 3 分钟）

1. 打开 **https://wj.qq.com/** ，微信扫码登录  
2. 点击 **创建问卷** → 空白创建  
3. 标题填：`杭城免费资源地图 · 用户反馈`  
4. 按下面添加题目（类型与选项一致即可）：

| 题号 | 题型 | 标题 | 选项/说明 |
|------|------|------|-----------|
| Q1 | 单选 | 反馈类型 | 信息纠错 / 新增点位 / 功能建议 / 其他 |
| Q2 | 多行填空 | 反馈内容 | 必填，提示：请写清名称、地址、开放时间 |
| Q3 | 单行填空 | 联系方式（选填） | 微信/手机/邮箱 |
| Q4 | 单选 | 你是通过什么渠道找到本站？ | 小红书 / 公众号 / 搜索 / 朋友推荐 / 其他 |

5. **设置** → 谁可以填答 → **所有人可填**  
6. **分享** → 复制链接，形如：`https://wj.qq.com/s2/12345678/`  
7. 填入 `js/site-config.js`：

```javascript
feedbackUrl: "https://wj.qq.com/s2/你的编号/",
```

---

## 二、百度统计（约 2 分钟）

1. 打开 **https://tongji.baidu.com/** ，百度账号登录（无账号先注册）  
2. **管理** → **新增网站**  
3. 填写：

| 字段 | 内容 |
|------|------|
| 网站域名 | `chengzhezhijian.github.io` |
| 网站首页 | `https://chengzhezhijian.github.io/hangzhou-free-resources/` |
| 行业 | 政府 / 公益 或 生活服务 |
| 名称 | 杭城免费资源地图 |

4. 创建成功后进入该站 → **代码获取** → 找到类似：

```html
hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

5. `?` 后面 **32 位字符串** 就是 Site ID，填入：

```javascript
baiduTongjiId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
```

6. 上线后 1～24 小时可在百度统计后台看到数据（GitHub Pages 国内可统计，偶有延迟）。

---

## 三、填好后重新部署

```bash
cd hangzhou-free-resources
git add js/site-config.js
git commit -m "Configure feedback form and Baidu analytics"
git push
```

约 1～2 分钟自动更新线上站。

---

## 四、验证是否生效

- **问卷**：点网站右下角「反馈」，应跳转腾讯问卷  
- **百度**：访问站点几次 → 百度统计 → 实时访客  
- **本地埋点**：浏览器控制台输入 `JSON.parse(localStorage.getItem('hz_analytics_log'))`
