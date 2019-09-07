<template>
    <div class="index">
        <div class="nav">
            <router-link ripple class="nav-item" tag="div" to="/home">Home</router-link>
            <router-link ripple class="nav-item" tag="div" to="/plug">自定义插件</router-link>
            <div ripple class="nav-item" @click="nextPage">切换页面</div>
        </div>
        <!-- 子路由渲染位置 -->
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
    private nextPage () {
        this['$router'].push('/about/1');
    }
}
</script>

<style lang="less" scoped>
@import "../../static/styles/base.less";

.index{
    width: 100%; padding-top: .88rem;
    .nav{ 
        width: 100%; 
        height: .88rem;
        background: linear-gradient(270deg,#8146b4,#6990f6); 
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        .flex();
        .nav-item {
            font-size: .32rem;
            color: #fff;
            text-align: center;
            line-height: .88rem;
            .f(1);
            &::after{
                content: "";
                position: absolute;
                width: 80%;
                height: 80%;
                background-color: rgba(255,255,255,0.1);
                border-radius: 6px;
                top: 10%;
                left: 10%;
                transform: scale(0);
                transition: .3s all;
            }
        }
        .link-active.nav-item::after {
            transform: scale(1);
        }
    }
}

</style>
