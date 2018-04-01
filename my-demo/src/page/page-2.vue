<template lang="html">
	<div class="content">
		<top></top>
		<!-- 新建的模板 -->
		<router-link to="/page-3">click-me-nxet</router-link>
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
    .content{ width: 100%; background-color: gray; height: 200vh; }
</style>
