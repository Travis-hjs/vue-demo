import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import home from '@/page/home'
import Plug from '@/page/plug'
// 分模块打包
const Cart = () => import ( /* webpackChunkName: "page" */ '@/page/cart')
const Navtab = () => import ( /* webpackChunkName: "page" */ '@/page/navTab')

// 这里定义的goback方法将等同于浏览器的返回事件
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: '/home',
            component: Index,
            children: [
                {
                    path: '/home',
                    component: home
                }, {
                    path: '/plug',
                    component: Plug
                }
            ]
        },{
            meta: {
                title: '购物车'
            },
            path: '/cart',
            component: Cart
        },{
            meta: {
                title: 'menu-tab'
            },
            path: '/navtab',
            component: Navtab
        }
    ],
    // 路由切换时回到顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    linkActiveClass: 'link-active'
})
