<template lang="html">
	<header>
        <span class="aui-iconfont aui-icon-left" @click="goBack"></span>
        <h2>{{ title }}</h2>
        <span>{{  }}</span>
    </header>
</template>

<script>
export default {
	data () {
		return {
            title: '标题',
            rightText: '右边文字'
		}
	},
	created () {

	},
	mounted () {

	},
	methods: {
        goBack () {
            this.$router.goBack()
        }
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    header{
        .flex(); width: 100%; height: .88rem; background-color: @textColor;
        span{ width: .88rem; .standard(); color: #fff; text-align: center; line-height: .88rem; }
		h2{ .title(); color: #fff; text-align: center; .f(1); line-height: .88rem; }
    }
</style>
