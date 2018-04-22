<template lang="html">
	<div class="index">
        <nav>
            <router-link tag="li" to="/home" data-spread>Home</router-link>
            <router-link tag="li" to="/plug" data-spread>插件</router-link>
            <li @click="nextPage" data-spread>next-page</li>
        </nav>
		<!-- 路由渲染的位置 -->
	    <router-view class="content"></router-view>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	created () {

	},
	mounted () {

	},
	methods: {
		nextPage () {
			this.$router.push('/cart')
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    nav{
		width: 100%; height: .98rem; .flex(); background-color: @textColor; position: fixed; top: 0; left: 0; z-index: 10;
		&::after{ content: ''; position: absolute; right: 0; width: 100%; top: 100%; bottom: auto; height: 10px; pointer-events: none; background: -webkit-gradient(linear,left top, left bottom,color-stop(0, rgba(0,0,0,.3)),color-stop(40%, rgba(0,0,0,.1)),color-stop(50%, rgba(0,0,0,.05)),color-stop(80%, rgba(0,0,0,0)),to(rgba(0,0,0,0))); background: linear-gradient(to bottom,rgba(0,0,0,.3) 0,rgba(0,0,0,.1) 40%,rgba(0,0,0,.05) 50%,rgba(0,0,0,0) 80%,rgba(0,0,0,0) 100%); }
        li{ line-height: .9rem; text-align: center; .title(); color: #fff; .f(1); }
        .link-active{ color: @themeColor; }
    }
	.content{ padding-top: 1.2rem; }
</style>
