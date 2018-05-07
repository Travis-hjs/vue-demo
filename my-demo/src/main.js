import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/module/store'
import Http from '@/module/ajax'
import Msg from '@/module/prompts'

Vue.config.productionTip = false
// 定义全局的方法（ajax, prompts）
Vue.prototype.$http = new Http()
Vue.prototype.$msg = new Msg()
// 监控分享路由链接
router.beforeEach((to, from, next) => {
    let _url = window.location.href;
    if (_url.indexOf('?wxshare') > 0) {
        _url = _url.slice(0, _url.indexOf('='));
        window.location.href = _url.replace('?wxshare', '#');
    } else {
        next();
    }
})
// 监听浏览器按钮去触发定义的切换状态
window.addEventListener('popstate', e => {
    router.isBack = true
    // console.log(router.isBack);
});

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
