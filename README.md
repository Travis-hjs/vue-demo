# 仅供学习参考！！！请勿商用！！！谢谢~
# vue.js(2.0) + vue-router + vuex 实现的单页移动端

1. 页面切换的动画是用 watch 去监听 router 的 行为 然后进行动画切换实现

2. 常用的 Props 子父传参 store 数据仓库使用都有，wtach 和 computed 这两个核心功能只是做简单的演示，更高级的功能自己去研究吧，也可以问我；另外列表队列动画我非常喜欢，而且是Vue自带的，React要实现的话好像代码要比较多

3. 下拉刷新，swiper轮播图，dialog组件，点击水波纹，ajax请求等插件参考我 my-note 仓库里面的源码

>对于 vuex 这个的争议，如果不是很高级的功能，我觉得自行定义一个 class 作为数据管理会更加好，理由就是在 vscode 编辑器上面的代码追踪提示会非常有利于代码阅读和维护，这个我也是从TS那边得来的编程习惯。
```{JavaScript}
store.js:
// 自行定义一个 class 作为数据管理
class StoreModule{
    /** 订单页面列表数据 */
    order: {
        date: '2018/12/12 12:12:12',
        state: 1
    }
}

/** 全局数据 */
const Store = new StoreModule;

export default Store;

订单页面.vue:
<script>
// 注意这里不要用 @/ 而是使用相对路径，不然vscode无法代码最终提示 
import Store from '../module/store'
export default {
	data () {
		return {
            // 页面实例化的时候获取数据
            pageData: Store.order
		}
	}
}
</script>

这样做只是静态化实例页面的时候做数据同步会比较好，因为有代码追踪提示，但是要想要在页面数据动态同步的话，就不推荐这样的写法了，这时候就需要vuex去管理了。

```

### 有需要的老哥可以支持一下
![my-code.png](https://github.com/Hansen-hjs/Hansen-hjs.github.io/blob/master/images/wxcode.jpg "my-code")
