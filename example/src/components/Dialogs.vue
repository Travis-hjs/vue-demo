<template>
    <div id="dialog-box">
        <transition name="fade">
            <div v-show="info.show && info.type != 'loading'" class="mask">
                <div class="alert-box box">
                    <div class="box-title">{{ info.title }}</div>
                    <div class="content">{{ info.content }}</div>
                    <div class="btn-box">
                        <div v-show="info.type == 'confirm'" class="cancel" @click="cancelBtn">取消</div>
                        <div class="success" @click="confirmBtn">确定</div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="info.show && info.type == 'loading'" class="mask mask-white">
                <div class="loading">
                    <div class="preloader">
                        <div class="preloader-inner">
                            <div class="preloader-inner-gap"></div>
                            <div class="preloader-inner-left">
                                <div class="preloader-inner-half-circle"></div>
                            </div>
                            <div class="preloader-inner-right">
                                <div class="preloader-inner-half-circle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="loading-text">{{ info.content }}</div>
                </div>
            </div>
        </transition>
        
        <transition-group class="toast" tag="div" name="toastMove">
            <div v-for="item in info.toastList" :key="item.id" class="toast-item">{{ item.text }}</div>
        </transition-group>

    </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import Global from '../modules/Global';

@Component({})
export default class Dialog extends Vue {
    private info = Global.dialog;

    private cancelBtn() {
        this.info.show = false;
        this.info.cancel = true;
    }

    private confirmBtn() {
        this.info.show = false;
        this.info.confirm = true;
    }
}

</script>

<style lang="less">
@import "../../static/styles/base.less";
@import "../../static/styles/loading.css";

#dialog-box{
    .mask{ 
        width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 999; background-color: rgba(0,0,0,0.45); .flex(); .fvertical(); .fcenter();
        .loading{
            text-align: center;
            .preloader{ display: inline-block; margin-bottom: 10px; }
            .loading-text { .s1(); text-align: center; color: @blue; line-height: 30px; }
        }
        .box{ 
            .card(); width: 6.4rem; min-height: 3.4rem; padding: 22px;
            .box-title{ .st(); color: #333; .ellipsis(); margin-bottom: 10px; }
            .content{ .s1(); color: #555; min-height: 1.2rem; margin-bottom: 10px; }
            .btn-box{ 
                .flex(); .fright();
                div{ cursor: pointer; .s1(); padding: 2px 10px; }
                .cancel{ color: @gray; margin-right: 10px; }
                .success{ color: @blue; }
            }
        }
    }
    .mask-white{ background-color: rgba(255,255,255,0.5); }
    .toast{
        width: 96%; 
        position: fixed; 
        top: 10px; 
        margin-left: -48%; 
        left: 50%; 
        z-index: 99;
        .toast-item{ 
            transition: .4s all; 
            width: 100%; 
            .card();
            .s1(); 
            padding: 15px; 
            background-color: @purple; 
            color: #fff; 
            margin-bottom: 10px; 
        }
    }

    // 列表动画
    .toastMove-leave-active{
        opacity: 0;
        position: absolute;
    }
    .toastMove-enter {
        opacity: 0;
        transform: scale(0.5,0.5);
    }
}

</style>



