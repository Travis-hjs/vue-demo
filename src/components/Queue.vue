<template>
    <div class="queue">
        <div class="menu" ref="menu">
            <div class="menu-item" v-for="(item, index) in pageData.menu" :key="item.id" @click="menuSwitch(index)" ripple>{{ item.text }}</div>
            <div class="move-item" :style="moveItemStyle"></div>
        </div>
        <div class="seach-box">
            <input class="input" type="number" v-model.trim="minPrice" placeholder="$最小价格">
            <input class="input" type="number" v-model.trim="maxPrice" placeholder="$最高价格">
            <button ripple class="greenbtn" @click="seachList">查询</button>
        </div>
        <input class="filter" type="number" v-model="pageData.seachText" placeholder="$输入最高价格过滤">
        <transition-group tag="div" name="listMove" class="move-list shop">
            <div class="move-list-item shop-item" v-for="item in filterList" :key="item.id">
                <div class="img-box"></div>
                <div class="price">$ {{ item.price }}</div>
                <div class="info">{{ item.info }}</div>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '../modules/store';
import { QueueData } from '../modules/interfaces';
import utils from '../modules/utils';
import Global from '../modules/Global';

@Component({})
export default class Queue extends Vue {
    /** 页面数据 */
    private pageData = store.queueData;

    /** 最小价格 */
    private minPrice = 0;

    /** 最大价格 */
	private maxPrice = 0;

    private itemWidth = 1;

    private get moveItemStyle() {
        return {
            width: this.itemWidth + 'px',
            transform: `translateX(${this.pageData.index * this.itemWidth}px)`
        }
    }

    /** 过滤列表数据 */
    private get filterList() {
        const price = Number(this.pageData.seachText);
        let list = this.pageData.queueList;
        if (price) {
            // 模糊搜索
            // return this.pageData.queueList.filter(function(product) {
            //     return Object.keys(product).some(function(key) {
            //         return String(product[key]).toLowerCase().indexOf(price) > -1;
            //     });
            // });
            list = list.filter(item => item.price <= price);
        }
        return list;
    }

    /**
     * 选项切换
     * @param index 点击索引
     */
    private menuSwitch(index: number) {
        this.pageData.index = index;
        switch (index) {
            case 0:
                this.pageData.queueList.sort((a, b) => b.price - a.price);                
                break;
        
            case 1:
                this.pageData.queueList.sort((a, b) => a.price - b.price);
                break;

            case 2:
                this.pageData.queueList = utils.shuffleArray(this.pageData.queueList);
                break;
        }
    }

    /** 查询列表 */
    private seachList() {
        let [min, max] = [Number(this.minPrice), Number(this.maxPrice)];
        
        if (!(min && max)) return Global.openDialog({
            type: 'alert',
            content: '请输入大于零的价格'
        });

        if (!(min < max)) return Global.openDialog({
            type: 'alert',
            content: '最大价格必需大于最小价格'
        });
        const list: QueueData['queueList'] = JSON.parse(JSON.stringify(this.pageData.goodsList));
        this.pageData.queueList = list.filter(item => {
            return (item.price >= min && item.price <= max);
        });
    }

    mounted() {
        const el: any = this.$refs.menu;
        this.itemWidth = el.offsetWidth / this.pageData.menu.length;
        
    }
}
</script>

<style lang="less" scoped>
@import "../../static/styles/base.less";

.queue{
    width: 100%; padding: 10px 0;
    .menu{ 
        width: 100%; height: .88rem; .flex(); background-color: @blue; position: relative; margin-bottom: .2rem;
        .menu-item{
            .f(1); .s1(); color: #fff; text-align: center; line-height: .88rem;
        }
        .move-item{
            position: absolute; top: 0; left: 0; height: 100%; background-color: rgba(255,255,255,0.2); transition: .3s all; z-index: 1;
        }
    }
    .seach-box{
        width: 100%; .flex(); .fvertical(); height: .88rem; margin-bottom: .2rem;
        .input{
            display: block; width: 34%; margin-right: .2rem; height: .8rem; border-bottom: solid 1px @themeColor; padding: 0 10px; color: @themeColor; .s1();
        }
    }
    .filter{ 
        display: block; margin: 0 auto 10px; width: 50%; height: .8rem; border-bottom: solid 1px @themeColor; padding: 0 10px; color: @themeColor; .s1(); transition: .4s all; 
        &:focus{ width: 90%; }
    }
    .shop{
        width: 100%; .flex();
        .shop-item{ 
            .card(); width: 48%; margin-bottom: 14px;
            &:nth-child(odd) {
                margin-right: 4%;
            }
            .img-box{ width: 100%; height: 2.4rem; background-color: #f1f1f1; margin-bottom: 4px; }
            .price{ .s1(); color: @pink; padding-left: 10px; }
            .info{ .s2(); color: @gray; padding-left: 10px; }
        }
    }
}
</style>