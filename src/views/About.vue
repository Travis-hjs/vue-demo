<template>
    <div class="about">
        <h1>This is an about page</h1>
        <List />
        <Goods :ref="setGoodsRef" />
        <div class="card item" :ref="setItemRef">
            <button class="button button_blue" v-if="false" @click="openVueExample()">跳转子项目</button>
            <button class="button button_green">
                <router-link to="/test">跳转测试页</router-link>
            </button>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import List from "../components/List.vue";
import Goods from "../components/Goods.vue";
import router from "../router/index";

export default defineComponent({
    components: {
        List,
        Goods
    },
    setup(props, context) {
        function openVueExample() {
            // router.push(apps[0].activeRule);
            // router.push("/test");
        }

        let GoodsRef = null;
        
        function setGoodsRef(el) {
            GoodsRef = el;
            // console.log("setGoodsRef >>", el);
        }

        let itemRefs = [];
        
        /**
         * @param {HTMLElement} el
         */
        function setItemRef(el) {
            itemRefs.push(el)
        }
        
        onMounted(function() {
            // console.log("onMounted >>", itemRefs);
        })

        return {
            openVueExample,
            setGoodsRef,
            setItemRef,
        }
    }
})
</script>
<style scoped>
.about .item { 
    padding: 8px;
}
</style>
