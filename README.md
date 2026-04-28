> 本文档由 AI 生成

> 📺 视频介绍：[表情包太多了？B站直播表情包功能增强脚本 - BiliBili](https://www.bilibili.com/video/BV1FBoXB4ELB/)

---

## 📥 安装方法

### 方法1（推荐）

**第1步：安装 Tampermonkey 浏览器插件**

- **Chrome / Edge / Brave / 其他 Chromium 内核浏览器**  
  https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo  

- **Microsoft Edge（Edge 插件商店）**  
  https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd  

- **Firefox**  
  https://addons.mozilla.org/firefox/addon/tampermonkey/  

- **Safari（macOS）**  
  https://www.tampermonkey.net/?browser=safari  

- **Opera**  
  https://addons.opera.com/extensions/details/tampermonkey-beta/  

**第2步：安装脚本**

打开页面 [b站直播表情包增强](https://greasyfork.org/zh-CN/scripts/575095-b站直播表情包增强) 后点击面上方绿色的「安装此脚本」按钮，在弹出的页面中选择安装即可。

### 方法2（不推荐）

打开页面 [b站直播表情包增强 - 代码](https://greasyfork.org/zh-CN/scripts/575095-b站直播表情包增强/code) 后复制源代码，粘贴到浏览器控制台并回车执行。  

⚠️ 注意：该方法2不会持久生效，每次刷新页面都需要重新执行一次，使用体验较差。

---

## 🛠 修复与基础功能

* 修复弹幕列表悬浮跳动问题
* `Ctrl + B` 唤出 / 关闭表情面板
* 更大的表情面板，更清晰的表情图片

---

## 🎯 表情包切换优化

解决原版切换表情包困难的问题：

* 左 / 右切换表情包快捷按钮，长按跳到最左 / 最右
* 自动滚动到当前表情包的 tab 位置
* 滚轮可以滚动 tab 栏
* 更大的横向滚动条
* `Ctrl + ← / Ctrl + →` 切换表情包
* 记住上一次表情包位置
* 鼠标移出表情面板时不会自动关闭

---

## 🔍 表情搜索功能

* `Ctrl + ↑` 或点击搜索框输入内容进行搜索
* 支持搜索表情名称
* 支持搜索 16 位表情 hash

---

## 📚 分类与匹配规则

左侧提供快捷分类，可自行修改代码中的 `categories` 变量：

* 字符串为普通匹配

  * `"早"` → 匹配 `"早" / "早安" / "早上好"`

* `^` 全字匹配

  * `"^早"` → 仅匹配 `"早"`

* 表情 hash 精确匹配

  * `"894dc489523d79b2ab949956b5008b143b1f9333"`

* `!` 否定匹配

  * `"!快乐"` → 不匹配 `"快乐" / "开心快乐"`

* `!^` 全字否定

  * `"!^快乐"` → 仅排除 `"快乐"`

* 表情 hash 精确排除

  * `"!894dc489523d79b2ab949956b5008b143b1f9333"`

---

## 🧹 搜索控制

* `Ctrl + ↓` 清空搜索
* `ESC`（需在输入框内）清空搜索
* 清空后恢复默认面板

---

## 💡 其他功能

* 悬浮时显示表情名称
