<template lang="html">
	<div class="todo-child">
        <h2>{{ title }}</h2>
        <p>父组件传过来的值：{{ fatherData }}</p>
        <span @click="clickMe()">{{ text }}</span>
        <input v-model.trim="chlidMsg" @keyup.enter="chlidIput" type="text" value="" placeholder="输入摁回车将子组件的参数传到父组件去">
	</div>
</template>

<script>
export default {
	data () {
		return {
            title: '这里是子组件',
            fatherData: '',
			text: '点击按钮将获取父组件传来的值',
			chlidMsg: ''
		}
	},
	created () {

	},
	mounted () {

	},
    props: ['msgName'],
	methods: {
        clickMe() {
			this.fatherData = this.msgName
			// console.log(this.msgName)
		},
		chlidIput() {
			if (!this.chlidMsg) return this.$msg({ type: 'alert', text: '输入不能为空' })
			this.$emit('chllidFun', this.chlidMsg)
			this.chlidMsg = ''
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../../static/style/base.less";
    .todo-child{
        width: 100%; border: solid 1px @textColor; box-sizing: border-box; padding: .2rem;
        h2{ .title(); line-height: .88rem; }
        p{ .standard(); line-height: .5rem; color: @themeColor; }
        span{ line-height: .8rem; .standard(); background-color: @themeColor; color: #fff; text-align: center; }
        input{ width: 100%; height: .7rem; padding: 0 .2rem; box-sizing: border-box; border-radius: 4px; color: orange; border: solid 1px #ccc; display: block; margin: 10px auto; }
    }
</style>
