<template lang="html">
	<header>
        <span @click="goBack" data-spread><i class="aui-iconfont aui-icon-left"></i></span>
        <h2>{{ $route.meta.title }}</h2>
        <span>{{ rightText }}</span>
    </header>
</template>

<script>
export default {
	data () {
		return {
            title: '标题',
            rightText: 'right'
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
        .flex(); width: 100%; height: .9rem; overflow: hidden; background-color: @textColor; position: fixed; top: 0; left: 0; z-index: 10; box-shadow: 0 0 20px 0 rgba(0,0,0,0.8);
        span{ width: .9rem; .flex(); .vertical(); .center(); }
		.aui-icon-left{ font-weight: 600; .standard(); color: #fff; }
		h2{ .title(); color: #fff; text-align: center; .f(1); line-height: .9rem; }
    }
</style>
