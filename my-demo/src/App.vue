<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition >
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            transitionName: 'page-next'
        }
    },
    watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
            if(isBack) {
                this.transitionName = 'page-back'
            } else {
                this.transitionName = 'page-next'
            }
            this.$router.isBack = false
    　　}
　  }
}
</script>

<style lang="less">
    @import "../static/style/base.css";
    @import "../static/style/base.less";
    @import "../static/style/prompt.css";
    @import "../static/style/picker.css";
    #app{ width: 100%; max-width: 680px; overflow: hidden; margin: 0 auto; }
    .content{ padding-top: 1rem; }
    /* 轮播图圆点样式 */
    .swiper .swiper_pagination{ position: absolute; left: 50%; bottom: 8px; height: 8px; transform: translateX(-50%); }
    .swiper .swiper_btn{ float: left; margin-left: 8px; width: 8px; height: 8px; background-color: rgba(0,0,0,0.3); border: solid 1px #fff; border-radius: 50%; }
    .swiper .swiper_btn_active{ background-color: #fff; border-color: @textColor; }
    /* 底部长条按钮 */
    .bottom_btn{ width: 6.9rem; height: .88rem; .standard(); color: #fff; background-color: @themeColor; border-radius: .08rem; margin: 0 auto; text-align: center; line-height: .88rem; }
    /* vue动画 */
    .slideY-enter, .slideY-leave-to{ transform: translateY(1rem); opacity: 0; }
    .slideY-enter-active, .slideY-leave-active{ .transition(.3s) }
    // .child-view {
    //     position: absolute;
    //     width:100%;
    //     transition: all .4s cubic-bezier(.55,0,.1,1);
    // }
    .page-next-enter, .page-back-leave-active {
        position: fixed;
        width: 100%;
        transform: translate3d(100%, 0px, 0px);
    }
    .page-back-enter, .page-next-leave-active{
        position: fixed;
        width: 100%;
        transform: translate3d(-100%, 0px, 0px);
    }
    // cubic-bezier(.55,0,.1,1)
    .page-next-enter-active, .page-back-enter-active{ transition: .3s all cubic-bezier(.3,0,.3,1); }
    .page-next-leave-active, .page-back-leave-active{ transition: .3s all cubic-bezier(1,.3,0,.3); }
</style>
