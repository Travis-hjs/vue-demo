<template>
    <div class="new-page">
        <div class="title">{{ title }}</div>
        <img :src="src" alt="">
        <button ripple class="bluebtn" @click="goBack()" style="margin-right: .2rem">返回上一页</button>
        <button ripple class="greenbtn" @click="nextPage">下一页</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator';
import store from '../modules/store';

@Component
export default class About extends Vue {
    private src = store.swiperList[1].img;

    private id: number = 0;

    private title = '空白页..';

    goBack() {
        this['$router'].goBack();
    }

    nextPage() {
        this['$router'].push(`/about/${this.id}`);
        // location.reload();
    }

    mounted() {
        const id = Number(this['$route'].params.id);
        this.title = '空白页-' + id;
        this.id = id + 1;
        // console.log(this['$route']);
    }
}
</script>

<style lang="less">
@import "../../static/styles/base.less";

.new-page{
    width: 100%;
    padding: .2rem;
}
</style>