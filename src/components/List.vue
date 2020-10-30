<template>
    <div class="list">
        <div class="list card">
            <h1 class="title">{{ orderInfo.name }}</h1>
            <code class="code_box">{{ orderInfo }}</code>
            <button class="button button_blue" @click="changeName()">设置`orderInfo.name`为"订单"</button>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import store from "../store/Store";
// import { useRoute } from "vue-router";

export default defineComponent({
    setup(props, context) {
        const orderInfo = store.orderInfo
        
        function changeName() {
            orderInfo.name = "订单" + Math.random().toString(36).substr(2);
        }

        return {
            orderInfo,
            changeName
        }
    }
})
</script>

<style>
.list{ width: 100%; margin-bottom: 20px; padding: 8px; }
.list .title { font-size: 22px; margin-bottom: 14px; }
.list .code_box { font-size: 14px; margin-bottom: 10px; display: block; }
</style>