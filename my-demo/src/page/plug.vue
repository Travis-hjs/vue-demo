<template lang="html">
	<div class="plug">
		<h2>轮播图</h2>
		<span class="notes">loop</span>
		<div class="swiper loop">
			<ul class="swiper_list">
				<li class="swiper_slider" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<span class="notes">no-loop</span>
		<div class="swiper noLoop">
			<ul class="swiper_list">
				<li class="swiper_slider" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<span class="notes">transformY</span>
		<div class="swiper transformY">
			<ul class="swiper_list">
				<li class="swiper_slider" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<h2>交互提示</h2>
		<ul class="btn_list">
			<li v-for="(item, index) in btnList" :key="index" class="ripple_btn" @click="promptsBtn(index)" onclick="ripple(this)">{{ item }}</li>
		</ul>
		<h2>Ajax-请求</h2>
		<div class="bottom_btn ripple_btn" data-color="#fbe8ca" onclick="ripple(this)" @click="getData">发送一个post请求</div>
		<div class="request_content">{{ requestData }}</div>
		<h2>Picker 选择器</h2>
		<input class="input" data-opacity type="text" readonly placeholder="请选择城市~" @click="openPicker" v-model="pickerData">
	</div>
</template>

<script>
import { iosProvinces, iosCitys, iosCountys } from '@/module/city'
import Refresh from '@/module/refresh'
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
		this.getBanner()
		this.getRefresh()
		// console.log(ripple);
	},
	beforeDestroy () {
		let _title = document.querySelector('.refresh_title')
		_title.parentNode.removeChild(_title)
	},
	methods: {
		getBanner () {
			new Swiper({
				el: '.loop',
				pagination: true,
				autoPaly: true,
				interval: 5000,
				loop: true
			});
			new Swiper({
				el: '.noLoop',
				pagination: true,
				autoPaly: true,
				interval: 5000
			});
			new Swiper({
				el: '.transformY',
				pagination: true,
				autoPaly: true,
				interval: 5000,
				loop: true,
				direction: true
			});
		},
		getRefresh () {
			// setTimeout(() => {
				let _Ddr = new Refresh('.plug');
				_Ddr.start({
					height: 100,
					padding: document.querySelector('nav').offsetHeight + 4
				}, () => {
					console.log('下拉成功');
					setTimeout(() => {
						_Ddr.end();
					},2000)
				})
			// },100)
		},
		promptsBtn (num) {
			if (num == 0) {
				this.$msg.alertMsg('这是一个提示框~', function () {
					console.log('确认回调')
				},'Hello')
			}else if (num == 1) {
				this.$msg.confirmMsg('这是一个操作提示框',function () {
					console.log('点击了确认')
				}, 'Hi~', function () {
					console.log('点击了取消')
				})
			}else if (num == 2) {
				this.$msg.loading();
				setTimeout(() => {
					this.$msg.remove()
				},2000)
			}else if (num == 3) {
				this.$msg.loadBall();
				setTimeout(() => {
					this.$msg.remove()
				},2000)
			}else {
				this.$msg.toast('底部弹出文字,2.5秒后消失', 2500)
			}
		},
		getData () {
			this.$msg.loading('加载中..');
			this.$http.post('store/v2.groups/product.html',{}, ret => {
				this.$msg.remove()
				// console.log(ret);
				if (ret.code != 1) return this.$msg.alertMsg(ret.msg)
				this.requestData = ret.data;
			}, err => this.$msg.toast(err, 1000))
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
<style>
	@import "../../static/style/refresh.css";
	@import "../../static/style/loading.css";
</style>
<style lang="less" scoped>
	@import "../../static/style/base.less";
	.plug{
		h2{ .title(); line-height: 1rem; text-indent: .3rem; color: @themeColor; }
		.notes{ .label(); color: @fadeColor; line-height: .7rem; text-indent: .3rem; }
		.swiper{
			width: 100%; height: 4rem; position: relative; background-color: #eee; overflow: hidden;
			.swiper_list{ overflow: hidden; position: relative; width: 100%; }
			.swiper_slider{ height: 4rem; float: left; width: 100%; text-align: center; background-size: cover; background-position: center center; }
		}
		.transformY{
			.swiper_slider{ height: 4rem; float: none; width: 100%; }
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
