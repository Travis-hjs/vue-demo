import { 
    createRouter, 
    createWebHashHistory, 
    createWebHistory, 
    RouteRecordRaw 
} from "vue-router"

/**
 * @type {Array<RouteRecordRaw>}
 */
const routes = [
    {
        path: "/",
        name: "Index",
        redirect: "home",
        component: () => import("../views/AppMain.vue"),
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import("../views/Home.vue")
            },
            {
                path: "about",
                name: "About",
                component: () => import("../views/About.vue")
            }, 
        ]
    },
    {
        path: "/test",
        name: "Test",
        component: () => import(/* webpackChunkName: "pack" */ "../views/TestPage.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory() || createWebHistory(),
    routes
})

export default router
