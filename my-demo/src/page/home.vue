<template lang="html">
	<div class="home">
		<skill v-if="skillState" @skillFn="skillShow"></skill>
		<div class="skill_btn" @click="skillState = true">路径小技巧<i class="aui-iconfont aui-icon-info"></i></div>
		<h2>todo-list & props传参</h2>
		<todo></todo>
		<h2>过滤筛选</h2>
		<list></list>
	</div>
</template>

<script>
import Skill from './home/skill'
import List from './home/list'
import Todo from './home/todo'

export default {
	data () {
		return {
			// 距离底部触发的距离
			distance: 100,
			interval: false,
			skillState: false
		}
	},
	components: { List, Todo, Skill },
	created () {

	},
	mounted () {
		window.addEventListener('scroll', this.scrollBottom)
	},
	beforeDestroy () {
		// 页面销毁时要清除scrollBottom事件
	    window.removeEventListener('scroll', this.scrollBottom)
	},
	methods: {
		// 接收子组件传过来的参数
		skillShow (_parms) {
			this.skillState = _parms
		},
		// 监听滚动条事件
		scrollBottom () {
			let _scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            let _scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
			if (_scrollHeight-_scrollTop-this.distance <= window.innerHeight) {
                // 阻止多次执行
				if (this.interval) return ;
				this.interval = true;
				this.$msg.confirmMsg('到达页面底部，点击确认继续判断滚动事件', () => {
					this.interval = false
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
	.home{
		.skill_btn{
			width: 100%; padding: 0 .3rem; box-sizing: border-box; height: .8rem; .flex(); .vertical(); .standard(); color: @textColor;
			.aui-icon-info{ font-size: .32rem; color: @textColor; margin-left: .1rem; font-weight: 600; }
		}
		h2{ .title(); color: @themeColor; line-height: .88rem; text-indent: .3rem; }
	}
</style>
