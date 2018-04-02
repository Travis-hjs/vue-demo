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
			<li v-for="(item, index) in btnList" :key="index" data-spread @click="promptsBtn(index)">{{ item }}</li>
		</ul>
		<h2>Ajax-请求</h2>
		<div class="bottom_btn" data-spread @click="getData">发送一个post请求</div>
		<div class="request_content">{{ requestData }}</div>
		<h2>Picker 选择器</h2>
		<input class="input" data-opacity type="text" readonly placeholder="请选择城市~" @click="openPicker" v-model="pickerData">
	</div>
</template>

<script>
import { iosProvinces, iosCitys, iosCountys } from '@/module/city'
import Picker from 'iosselect'
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
			btnList: ['alert','confirm','loading','load-ball','toast'],
			requestData: {
				content: '请求数据内容盒子'
			},
			pickerData: ''
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
		},
		getData () {
			this.$msg({ type: 'load', text: '加载中..' })
			this.$http.post('store/v2.groups/product.html',{}, ret => {
				this.$msg({ type: 'remove' })
				// console.log(ret);
				if (ret.code != 1) return this.$msg({ type: 'alert', text: ret.msg });
				this.requestData = ret.data;
			}, err => this.$msg({ type: 'toast' }))
		},
		openPicker () {
			let that = this;
			new Picker(3,
				[iosProvinces, iosCitys, iosCountys],
	            {
	                title: '地址选择',
	                relation: [1, 1],
	                oneLevelId: 440000,
	                twoLevelId: 440000,
	                threeLevelId: 440103,
					itemHeight: 0.7,	//	列表行高
					itemShowCount: 5,	//  这里只能是基数
	                headerHeight: 0.88,	//	标题行高
					cssUnit: 'rem',
	                callback (selectOne, selectTwo, selectorThree) {
						that.pickerData = `${ selectOne.value }-${ selectTwo.value }-${ selectorThree.value }`
	                    // console.log(selectOne, selectTwo, selectorThree);
	                }
	        });
		},
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
		.bottom_btn{ margin-bottom: .4rem; }
		.request_content{ width: 6.9rem; border: solid 1px @textColor; min-height: 2rem; margin-bottom: .4rem; border-radius: .08rem; margin: 0 auto; .standard(); overflow: hidden; }
		.input{
			display: block; width: 6.9rem; height: .88rem; background-color: @textColor; box-sizing: border-box; margin: 0 auto; color: #fff; text-align: center; margin-bottom: .4rem;
			&::-webkit-input-placeholder{ color: @themeColor; }
		}
	}
</style>
