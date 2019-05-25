<template lang="html">
	<header>
        <span onclick="ripple(this)" @click="goBack" class="ripple_btn"><i class="aui-iconfont aui-icon-left"></i></span>
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
        display: flex; width: 100%; height: .98rem; overflow: hidden; background-color: @textColor; position: fixed; top: 0; left: 0; z-index: 10; box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        span{ width: .9rem; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; }
		.aui-icon-left{ font-weight: 600; .standard(); color: #fff; }
		h2{ .title(); color: #fff; text-align: center; flex: 1; line-height: .9rem; }
    }
</style>
