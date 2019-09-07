<template>
    <div id="app">
        <transition :name="transitionName">
            <!-- 这样添加 key 可以重复使用同一个路由并使组件更新，但是会跟路由前进后退冲突 -->
            <!-- <router-view :key="$route.fullPath" /> -->
            <router-view />
        </transition>
        <dialog-box />
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue  } from 'vue-property-decorator';
import utils from './modules/utils';
import Dialog from './components/Dialogs.vue';

@Component({
    components: {
        'dialog-box': Dialog
    }
})
export default class Root extends Vue {

    private transitionName = 'page-next';

    /** 监听路由变化 */
    @Watch('$route') onRoute(to: any, from: any) {
        //  监听路由变化时的状态为前进还是后退
        // isBack 要在 node_modules/vue-router/types/router.d.ts 下自定义声明
        if(this['$router'].isBack) {
            this.transitionName = 'page-back';
        } else {
            this.transitionName = 'page-next';
        }
        this['$router'].isBack = false;
    }

    mounted() {
        const page: any = document.getElementById('app');
        utils.remSetting(page);
        
    }
}
</script>

<style lang="less">
@import "../static/styles/base.css";
@import "../static/styles/base.less";

#app{
    width: 100%;
    max-width: 680px;
    overflow: hidden;
    margin:  auto;
    // position: relative;
}

/* =================== 页面切换过渡动画 ===================== */
.page-next-enter, .page-back-enter, .page-back-leave-active, .page-next-leave-active{
    position: fixed;
    width: 100%;
    height: 100vh;
    // backface-visibility: hidden;
    // perspective: 1000;
    // background-color: #fff;
}
.page-next-enter{
    transform: translate3d(100%, 0, 0);
}
.page-back-enter{
    transform: translate3d(-100%, 0, 0);
}
.page-back-leave-active{
    opacity: 0;
    transform: translate3d(90%, 0, 0);
}
.page-next-leave-active{
    opacity: 0;
    transform: translate3d(-90%, 0, 0);
}
.page-next-enter-active, .page-back-enter-active, .page-next-leave-active, .page-back-leave-active{ transition: .4s all; }

/* =================== 列表过渡动画 ===================== */

// 动画列表最外层容器
.move-list{ position: relative; }
// 动画列表item
.move-list-item{ transition: .8s all; }
// 列表动画
.listMove-leave-active{
    opacity: 0;
    position: absolute;
    transform: scale(0.5,0.5);
}
.listMove-enter {
    opacity: 0;
    transform: scale(0.5,0.5);
}
/* =========================== 过渡动画 ======================== */
// fade
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
/* ========================= 点击水波纹样式 ======================*/
[ripple]{ position: relative; overflow: hidden; }
[ripple] .ripple{ position: absolute; border-radius: 100%; transform: scale(0); pointer-events: none; animation: ripple .5s ease-out; }
@keyframes ripple {to {transform: scale(2); opacity: 0; } }

// 按钮
.bluebtn{ 
    .button(); 
    background-color: @blue; 
    &:active{
        .buttonActive();
    }
}
.greenbtn{ 
    .button(); 
    background-color: @green; 
    &:active{
        .buttonActive();
    }
}
.redbtn{ 
    .button(); 
    background-color: @red; 
    &:active{
        .buttonActive();
    }
}
.whitebtn{ 
    .button(); 
    background-color: #fff; 
    color: #555; 
    &:active{
        .buttonActive();
    }
}
.whitebtn[ripple] .ripple{ background-color: rgba(0,0,0,0.3); }

.title{
    background-image: linear-gradient(90deg, #f66, #f90);
    background-clip: text;
    animation: hue 5s linear infinite;
    -webkit-text-fill-color: transparent;
    // font-weight: bold;
    .st();
    // margin-bottom: .15rem;
}

@keyframes hue {
    from {
        -webkit-filter: hue-rotate(0);
        filter: hue-rotate(0);
    }
    to {
        -webkit-filter: hue-rotate(-1turn);
        filter: hue-rotate(-1turn);
    }
}
</style>
