import Vue from 'vue';
import App from './App';
import router from './router';
import store from './module/store';
import rippleClick from './module/ripple';

Vue.config.productionTip = false;

// 监控分享路由链接
router.beforeEach((to, from, next) => {
    let url = window.location.href;
    if (url.indexOf('?wxshare') > 0) {
        url = url.slice(0, url.indexOf('='));
        window.location.href = url.replace('?wxshare', '#');
    } else {
        next();
    }
});

// 监听浏览器按钮去触发定义的切换状态
window.addEventListener('popstate', e => {
    router.isBack = true
    // console.log(router.isBack);
});

// 定义水波纹点击
window.ripple = rippleClick;
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
