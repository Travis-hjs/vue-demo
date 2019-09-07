# vue + vue-router + ts 构建单页应用

**之前的 `js` 版本已经删除了，未来的 `vue3.0` 发布后也会是用 `ts` 去编写**

仅供学习参考，请勿商用，转载请标明出处~

**预览地址：[vue-example](https://hansen-hjs.github.io/cv/demo/vue/)**

## 功能清单（这里只用到 `vue-router` 一个依赖，其余都是自己实现）
1. 路由切换时模拟 APP 的页面切换动画

2. 核心 api: `watch` 和 `computed` 使用和对应场景在 `ts` 项目中，不会出现 `computed` 关键字，而是 `get xxx() {}` 

3. 自带的队列动画和过渡动画场景使用（配合`computed`）

4. 自定义 `class ModuleStore {}` 代替 `vuex` 更好的代码追踪和提示

5. 常用的网页组件：http请求、点击水波纹、上传图片、swiper轮播图、下拉刷新、上拉到底部监听、交互提示组件、基于 less 的UI组件。以上插件代码可以在 `https://github.com/Hansen-hjs/my-note/tree/master/JavaScript` 我这个仓库地址查看源码。

**这里不使用 `vuex` 而自己定义数据管理模块可以看下我这篇文章 [你不需要 vuex](https://juejin.im/post/5d425a83f265da03d8719cb8)**

### 有需要的老哥可以支持一下
![my-code.png](https://github.com/Hansen-hjs/Hansen-hjs.github.io/blob/master/images/wxcode.jpg "my-code")
