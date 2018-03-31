<template lang="html">
	<div class="page-1">
		<top></top>
		<!-- 新建的模板 -->
		<router-link to="/page-2">click-me-nxet</router-link>
	</div>
</template>

<script>
import Top from '@/components/header'

export default {
	data () {
		return {

		}
	},
	components: { Top },
	created () {

	},
	mounted () {

	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    .page-1{ width: 100%; background-color: palevioletred; height: 200vh; }
</style>
