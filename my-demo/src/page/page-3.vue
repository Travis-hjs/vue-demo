<template lang="html">
	<div class="page-3">
		<top></top>
		<!-- 新建的模板 -->
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
    .page-3{ width: 100%; background-color: purple; height: 200vh; }
</style>
