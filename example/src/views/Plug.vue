<template>
    <div class="plug">
        <div class="tip">提示：当前页面可以下拉刷新</div>
        <div class="title">轮播图组件</div>
        <div v-for="(box, i) in swipers" :key="box.id">
            <div class="swiper" :id="box.id">
                <div class="swiper_list">
                    <div class="swiper_item" v-for="(item, index) in swiperList" :key="box + index">
                        <img :src="item.img" alt="自定义轮播图">
                    </div>
                </div>
                <div class="swiper_pagination" v-if="i != 0"></div>
            </div>
            <div class="tip">{{ box.tip }}</div>
        </div>
        <div class="title">交互提示</div>
        <button ripple class="bluebtn plug-btn" @click="showAlert">alert</button>
        <button ripple class="bluebtn plug-btn" @click="showConfirm">confirm</button>
        <button ripple class="bluebtn plug-btn" @click="showLoading">loading</button>
        <button ripple class="bluebtn plug-btn" @click="showToast">toast</button>
        <div class="title">http请求</div>
        <button ripple class="bluebtn plug-btn" @click="postData">发送请求</button>
        <textarea class="text-box" ref="text-box" placeholder="请求结果容器" v-model.trim="content"></textarea>
        <transition name="fade">
            <button ripple class="greenbtn plug-btn" @click="copyText" v-show="content">复制结果</button>
        </transition> 
    </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator';
import api from '../api/network';
import store from '../modules/store';
import Global from '../modules/Global';
import swiper from '../modules/swiper';
import dropDownRefresh from '../modules/refresh';

@Component({})
export default class Plug extends Vue {
    private swiperList = store.swiperList;

    private swipers = [
        {
            id: 'swiper-1',
            tip: '没有回路和底部圆点',
        }, {
            id: 'swiper-2',
            tip: '有回路和底部圆点'
        }, {
            id: 'swiper-3',
            tip: '垂直滚动'
        }, 
    ];
    
    private content = '';

    showAlert() {
        Global.openDialog({
            type: 'alert',
            content: '提示框',
        });
    }

    showConfirm() {
        Global.openDialog({
            type: 'confirm',
            content: '确定-取消提示框',
            cancel() {
                Global.openDialog({
                    type: 'alert',
                    content: '点击了取消',
                });
            }
        });
    }

    showToast() {
        Global.showToast('提示条~');
    }

    showLoading() {
        Global.openDialog({
            type: 'loading'
        });
        setTimeout(function() {
            Global.hideDialog();
        }, 3000);
    }

    postData() {
        Global.openDialog({
            type: 'loading'
        });
        // const patt = /github/;
        // if (patt.test(location.hostname)) {
            api.testGet(res => {
                Global.hideDialog();
                this.content = JSON.stringify(res);
                console.log('请求成功', res);
            }, err => {
                Global.hideDialog();
                console.log('请求错误', err);
            });
        // } else {
        //     api.testPost(res => {
        //         Global.hideDialog();
        //         this.content = JSON.stringify(res);
        //     }, err => {
        //         Global.hideDialog();
        //         console.log(err.message);
        //     })
        // }
    }
    
    copyText() {
        const el: any = this.$refs['text-box'];
        el.select();
        el.setSelectionRange(0, el.value.length);
        document.execCommand('copy');
        Global.openDialog({
            type: 'confirm',
            content: '复制成功，是否清空文本框数据？',
            cancelText: '不清空',
            confirm: () => {
                this.content = '';
            }
        });
    }

    mounted() {
        swiper({
            el: '#' + this.swipers[0].id,
            autoPaly: true
        });
        swiper({
            el: '#' + this.swipers[1].id,
            autoPaly: true,
            pagination: true,
            loop: true,
            interval: 4000
        });
        swiper({
            el: '#' + this.swipers[2].id,
            autoPaly: true,
            pagination: true,
            loop: true,
            vertical: true
        });
        const page: any = document.querySelector('.plug');
        const nav: any = document.querySelector('.nav');
        const refresh = dropDownRefresh({
            el: page,
            distance: 100,
            deviation: nav.clientHeight,
            loadIcon: `<div class="preloader">
                <div class="preloader-inner">
                    <div class="preloader-inner-gap"></div>
                    <div class="preloader-inner-left">
                        <div class="preloader-inner-half-circle"></div>
                    </div>
                    <div class="preloader-inner-right">
                        <div class="preloader-inner-half-circle"></div>
                    </div>
                </div>
            </div>`
        });
        refresh.onStart(() => {
            setTimeout(() => {
                refresh.end();
            }, 1800);
        });
    }
}
</script>

<style lang="less">
@import "../../static/styles/base.less";

.plug{
    width: 100%; padding: .2rem;
    .tip{ .s2(); color: @blue; padding: 10px 0; text-align: center; }
    .plug-btn{ margin: 0 auto .24rem; display: block; }
    .text-box{ display: block; width: 100%; height: 4rem; border: solid 1px @themeColor; border-radius: 4px; margin-bottom: .2rem; padding: 10px; .s2(); color: @themeColor; }
}

.swiper{ 
    width: 100%; height: 4rem; position: relative; background-color: #eee; overflow: hidden; 
    .swiper_list{ 
        overflow: hidden; position: relative; width: 100%; transition: 0s all; 
        .swiper_item{ 
            float: left; width: 100%; height: 100%; text-align: center; color: #fff; 
            img{ display: block; width: 100%; object-fit: cover; }
        }
    }
    .swiper_pagination{ 
        position: absolute; width: 100%; height: 10px; bottom: 10px; left: 0; z-index: 1; .flex(); .fvertical(); .fcenter();
        .swiper_dot{ margin: 0 4px; width: 8px; height: 8px; background-color: rgba(0,0,0,0.5); border-radius: 50%; }
        .swiper_dot_active{ background-color: #fff; }
    }
}

</style>


