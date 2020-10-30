import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const myApp = createApp(App);

myApp.directive("highlight", {
    /**
     * 
     * @param {HTMLElement} el 
     */
    beforeMount(el, binding, vnode, prevVnode) {
        // console.log(el, binding, vnode, prevVnode);
        el.style.backgroundColor = binding.value
    }
});
myApp.directive("font", {
    /**
     * 
     * @param {HTMLElement} el 
     */
    beforeMount(el, binding, vnode, prevVnode) {
        // console.log(el, binding, vnode, prevVnode);
        el.style.fontSize = binding.value;
        el.style.fontWeight = "bold";
    }
})
// myApp.component();
myApp.use(router).mount("#app")
