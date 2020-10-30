<template>
    <div class="goods">
        <div class="goods card">
            <h1 class="title">{{ orderInfo.name }}</h1>
            <code class="code_box">{{ orderInfo }}</code>
            <button class="button button_green" @click="changeName()">设置`orderInfo.name`为随机字符串</button>
            <button class="button button_red" @click="changeState()">修改`orderInfo.state`</button>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import store from "../store/Store";

export default defineComponent({
    setup(props, context) {
        const orderInfo = store.orderInfo;

        function changeName() {
            orderInfo.name = Math.random().toString(36).substr(2);
        }

        function changeState() {
            orderInfo.state = orderInfo.state == "wait" ? "ok" : "wait";
        }

        return {
            orderInfo,
            changeName,
            changeState
        }
    }
})
</script>
<style>
.goods{ width: 100%; margin-bottom: 20px; padding: 8px; }
.goods .title { font-size: 22px; margin-bottom: 14px; }
.goods .code_box { font-size: 14px; margin-bottom: 10px; display: block; }
</style>