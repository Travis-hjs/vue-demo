<template lang="html">
	<div class="plug">
        <h2>轮播图</h2>
		<div class="swiper">
			<ul class="swiper_list">
				<li class="swiper_slider" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<h2>交互提示</h2>
		<ul class="btn_list">
			<li v-for="(item, index) in btnList" :key="index" data-opacity @click="promptsBtn(index)">{{ item }}</li>
		</ul>
	</div>
</template>

<script>
import Swiper from '@/module/swiper'

export default {
	data () {
		return {
			banners: [
				{
					image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg'
				},{
					image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg'
				},{
					image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg'
				},{
					image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg'
				}
			],
			btnList: ['alert','confirm','loading','load-ball','toast']
		}
	},
	created () {

	},
	mounted () {
		this.getBanner();
	},
	methods: {
		getBanner () {
			new Swiper({
				el: '.swiper',
				pagination: true,
				autoPaly: true,
				interval: 5000,
				loop: true
			});
		},
		promptsBtn (num) {
			if (num == 0) {
				this.$msg({ type: 'alert', text: '这是一个提示框~' }, () => console.log('确认回调') )
			}else if (num == 1) {
				this.$msg({
					type: 'confirm',
					text: '这是一个确认提示框~'
				}, () => console.log('确认回调'), () => console.log('取消回调') )
			}else if (num == 2) {
				this.$msg({ type: 'load', text: 'loading' })
				setTimeout(() => {
					this.$msg({ type: 'remove' })
				},2000)
			}else if (num == 3) {
				this.$msg({ type: 'ball' })
				setTimeout(() => {
					this.$msg({ type: 'remove' })
				},2000)
			}else {
				this.$msg({ type: 'toast', text: '这里是底部弹出文字', time: 2500 })
			}
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
	.plug{
		h2{ .title(); line-height: 1rem; text-indent: .3rem; color: @themeColor; }
		.swiper{
			width: 100%; height: 4rem; position: relative; background-color: #eee; overflow: hidden;
			.swiper_list{ overflow: hidden; position: relative; width: 100%; }
			.swiper_slider{ height: 4rem; float: left; width: 100%; text-align: center; background-size: cover; background-position: center center; }
		}
		.btn_list{
			padding: 0 .3rem;
			li{ margin-bottom: .2rem; background-color: @textColor; line-height: .88rem; .standard(); color: @themeColor; text-align: center; }
		}
	}
</style>
