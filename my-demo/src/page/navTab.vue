<template lang="html">
	<div class="content">
        <top></top>
		<nav>
            <li v-for="(item, index) in navList" :key="item.id" :class="{ li_active: item.id == navTabState.active }" @click="menuFun(item.id)">{{ item.text }}</li>
            <div class="line"></div>
        </nav>
        <div class="list_content">
            <transition-group tag="ul" name="liMove">
            <!-- <ul> -->
                <li v-for="(item, index) in list" :key="item.id" v-if="item.state == 1 && (navTabState.active == 0 || navTabState.active == 1)">
                    <p>{{ item.text }}</p>
                    <h2>完成</h2>
                </li>
                <li v-for="(item, index) in list" :key="item.id" v-if="item.state == 2 && (navTabState.active == 0 || navTabState.active == 2)">
                    <p class="red">{{ item.text }}</p>
                    <h2>失败</h2>
                </li>
            <!-- </ul> -->
            </transition-group>
        </div>
	</div>
</template>

<script>
import Top from '@/components/header'
import { mapState } from 'vuex'

export default {
	data () {
		return {
            navList: [
                {
                    id: 0,
                    text: '全部'
                },{
                    id: 1,
                    text: '完成'
                },{
                    id: 2,
                    text: '失败'
                },
            ],
            list: [
                {
                    id: 0,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 1,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 2,
                    state: 2,
                    text: '当前为失败列表...'
                },{
                    id: 3,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 4,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 5,
                    state: 2,
                    text: '当前为失败列表...'
                },{
                    id: 6,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 7,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 8,
                    state: 2,
                    text: '当前为失败列表...'
                },{
                    id: 9,
                    state: 1,
                    text: '当前列表状态为已完成...'
                },{
                    id: 10,
                    state: 1,
                    text: '模拟的列表数据...'
                },
            ]
		}
	},
    components: { Top },
	computed: mapState(['navTabState']),
	created () {

	},
	mounted () {
        this.resetStyle()
	},
	methods: {
        menuFun (num) {
            this.navTabState.active = num
            this.lineSlide();
        },
        resetStyle () {
            const _line = document.querySelector('.line');
            _line.style.width = document.querySelector('nav li').offsetWidth + 'px';
            this.lineSlide()
        },
        lineSlide () {
            let [_slide, _howFar] = [document.querySelector('.line'), document.querySelector('nav li').offsetWidth];
			_slide.style.WebkitTransform = 'translateX('+_howFar * this.navTabState.active+'px)';
			_slide.style.transform = 'translateX('+_howFar * this.navTabState.active+'px)';
        },
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    nav{
        width: 100%; height: .88rem; .flex(); border-top: solid 1px @textColor; border-bottom: solid 1px @textColor; position: relative; margin-bottom: .3rem;
        li{ .standard(); text-align: center; line-height: .88rem; .f(1); position: relative; z-index: 2; .transition(0.3s); }
        .li_active{ color: #fff; }
        .line{ width: 1px; height: 100%; background-color: @textColor; z-index: 1; position: absolute; top: 0; left: 0; transform: translateX(0px); .transition(0.3s); }
    }
    .list_content{
        width: 100%; overflow: hidden;
        ul{ padding: 0 .3rem; }
        li{
            .transition(1s); width: 100%; box-sizing: border-box; padding: .3rem; height: 3rem; .flex(); .vertical(); .center(); box-shadow: 0 10px 25px 0 rgba(0,0,0,0.2); margin-bottom: .4rem; border-radius: .15rem;
            h2{ .title(); color: @themeColor; }
            p{ .standard(); .f(1); }
            .red{ color: red }
        }
    }
    // 动画
    .liMove-leave-active{
        opacity: 0;
        position: absolute;
        transform: scale(0.5,0.5);
    }
    .liMove-enter {
        opacity: 0;
        transform: translateY(60%);
    }
</style>
