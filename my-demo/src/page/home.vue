<template lang="html">
	<div class="home">
		<h2>todo-list（props传参）</h2>
		<todo></todo>
		<h2>过滤筛选</h2>
		<list></list>
	</div>
</template>

<script>
import List from './home/list'
import Todo from './home/todo'

export default {
	data () {
		return {
			// 距离底部触发的距离
			distance: 100,
			interval: false
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
			let _scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            let _scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
			if (_scrollHeight-_scrollTop-this.distance <= window.innerHeight) {
                // 阻止多次执行
				if (this.interval) return ;
				this.interval = true;
				this.$msg({ type: 'confirm', text: '到达页面底部，点击确认继续判断滚动事件' }, () => {
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
		h2{ .title(); color: @themeColor; line-height: .88rem; text-indent: .3rem; }
	}
</style>
