# 微信小程序发布指南

将「全国惠民地图」发布为微信小程序的完整流程。

## 一、项目结构

```
miniprogram/
  app.js / app.json / app.wxss    # 小程序入口
  pages/index/                    # 发现页（搜索、筛选、列表）
  pages/detail/                   # 点位详情 + 地图导航
  pages/guide/                    # 场景指南
  pages/about/                    # 说明与反馈
  components/tab-nav/             # 底部导航
  utils/                          # 筛选、定位、导航
  packageData/                    # 数据分包（约 1MB+）
    data/resources.js             # 点位数据（构建生成）
    data/meta.js                  # 分类、城市、场景等
```

## 二、本地准备

### 1. 生成小程序数据

```bash
npm run build:miniprogram
```

会从网站 `js/data*.js` 导出全国点位（含坐标），写入 `miniprogram/packageData/data/`。

### 2. 安装微信开发者工具

下载：[https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 3. 导入项目

1. 打开微信开发者工具 → **导入项目**
2. 目录选择：`hangzhou-free-resources/miniprogram`
3. AppID：先用测试号，或填入你在公众平台注册的小程序 AppID
4. 修改 `project.config.json` 中的 `"appid"` 为你的真实 AppID

### 4. 预览调试

- 编译后在模拟器测试：城市切换、搜索、设施标签、定位、详情页导航
- 真机预览扫码测试定位与 `wx.openLocation`

## 三、注册小程序（首次发布）

1. 打开 [微信公众平台](https://mp.weixin.qq.com/) → **小程序** → 注册
2. 类型选「个人」或「企业/政府」
3. 填写名称建议：**全国惠民地图** 或 **惠民地图**
4. 类目建议：**政务民生 → 公共事业** 或 **生活服务 → 综合生活服务**
5. 记录 **AppID**，填入 `project.config.json`

## 四、上线前配置

### 1. 隐私与权限

已在 `app.json` 声明定位权限。在公众平台 **设置 → 用户隐私保护指引** 中补充：

> 收集位置信息用于展示附近免费便民点位并按距离排序，不用于其他用途。

### 2. 上传与审核

微信开发者工具 → **上传** → 公众平台 **提交审核**

**审核说明建议：**

> 全国政府免费便民资源查询。用户选择城市后可搜索/筛选图书馆、纳凉点、WiFi、停车等公开点位，查看地址与开放时间，并通过地图导航前往。数据来自政府公开信息整理。

### 3. 发布

审核通过后点击 **发布**。

## 五、数据更新

```bash
npm run build:miniprogram
# 微信开发者工具重新上传
```

## 六、包体说明

| 部分 | 说明 |
|------|------|
| 主包 | 页面 + 逻辑，约 100KB |
| 数据分包 | resources.js + meta.js |
| 上限 | 单分包 2MB，总包 20MB |

## 七、常见问题

**能用 web-view 直接套网站吗？**  
可以但不推荐。需备案与业务域名，体验与审核通过率都较差。当前为原生页面。

**地图用什么？**  
有坐标用 `wx.openLocation`；无坐标则复制地址。
