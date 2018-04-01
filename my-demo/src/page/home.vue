<template lang="html">
	<div class="home">
		<h2>todo-list（props传参）</h2>
		<todo></todo>
		<h2>过滤筛选</h2>
		<list></list>
	</div>
</template>

<script>
import View from '@/module/viewport'
import List from './home/list'
import Todo from './home/todo'

export default {
	data () {
		return {
			interval: true
		}
	},
	components: { List, Todo },
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
		scrollBottom () {
			if (View.getScrollTop() + View.getWindowHeight() == View.getScrollHeight()) {
                // 阻止多次执行
				if (!this.interval) return ;
				this.interval = false;
				this.$msg({ type: 'alert', text: '到达页面底部' }, () => this.interval = true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
	.home{
		h2{ .title(); color: @themeColor; line-height: .88rem; text-indent: .3rem; }
	}
</style>
