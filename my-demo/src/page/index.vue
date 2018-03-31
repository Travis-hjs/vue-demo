<template lang="html">
	<div class="index">
        <nav>
            <router-link tag="li" to="/vuex" data-spread>Vuex</router-link>
            <router-link tag="li" to="/plug" data-spread>插件</router-link>
            <li @click="nextPage" data-spread>next-page</li>
        </nav>
		<!-- 路由渲染的位置 -->
	    <router-view></router-view>
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
			this.$router.push('/page-1')
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    nav{
        width: 100%; height: .88rem; .flex(); background-color: @textColor;
        li{ line-height: .88rem; text-align: center; .title(); color: #fff; .f(1); }
        .link-active{ color: @themeColor; }
    }
</style>
