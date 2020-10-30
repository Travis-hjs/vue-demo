<template>
    <div class="test">
        <button class="button button_blue" @click="goBack()">返回上一页</button>
        <JsxBox />
    </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import utils from "../utils";
import router from "../router";
import JsxBox from "./jsx";

export default defineComponent({
    components: {
        JsxBox
    },
    setup(props, context) {
        onMounted(function() {
            // utils.insertScript("https://huangjingsheng.gitee.io/hjs/face/js/index.js", function() {
            //     console.log("加载完成");
            // })
        })
        function goBack() {
            router.back();
        }
        return {
            goBack
        }
    }
})
</script>
<style scoped>
.test{
    width: 100%;
}
</style>