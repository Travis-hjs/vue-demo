<template lang="html">
	<div class="plug">
		<h2>轮播图</h2>
		<span class="notes">loop</span>
		<div class="swiper loop">
			<ul class="swiper_list">
				<li class="swiper_item" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<span class="notes">no-loop</span>
		<div class="swiper noLoop">
			<ul class="swiper_list">
				<li class="swiper_item" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
			</ul>
			<div class="swiper_pagination"></div>
		</div>
		<span class="notes">transformY</span>
		<div class="swiper transformY">
			<ul class="swiper_list">
				<li class="swiper_item" v-for="(item, index) in banners" :key="index" :style="{ backgroundImage: `url(${ item.image })` }"></li>
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
import DropDownRefresh from '../module/refresh'
import Picker from 'iosselect'
import swiper from '../module/swiper'
import dialog from '../module/prompts'
import { baseRequest } from '../module/ajax';

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
		this.getRefresh();
	},
	beforeDestroy () {
		let title = document.querySelector('.refresh_title');
		title.parentNode.removeChild(title);
	},
	methods: {
		getBanner () {
			swiper({
				el: '.loop',
				pagination: true,
				autoPaly: true,
				interval: 5000,
				loop: true
			});
			swiper({
				el: '.noLoop',
				pagination: true,
				autoPaly: true,
				interval: 5000
			});
			swiper({
				el: '.transformY',
				pagination: true,
				autoPaly: true,
				interval: 5000,
				loop: true,
				vertical: true
			});
		},
		getRefresh () {
			// setTimeout(() => {
				let Ddr = new DropDownRefresh('.plug');
				Ddr.start({
					height: 100,
					padding: document.querySelector('nav').offsetHeight + 4
				}, () => {
					console.log('下拉成功');
					setTimeout(() => {
						Ddr.end();
					},2000)
				})
			// },100)
		},
		promptsBtn (num) {
			if (num == 0) {
				dialog.alertMsg('这是一个提示框~', function () {
					console.log('确认回调')
				},'Hello')
			}else if (num == 1) {
				dialog.confirmMsg('这是一个操作提示框',function () {
					console.log('点击了确认')
				}, 'Hi~', function () {
					console.log('点击了取消')
				})
			}else if (num == 2) {
				dialog.loading();
				setTimeout(() => {
					dialog.remove()
				},2000)
			}else if (num == 3) {
				dialog.loadBall();
				setTimeout(() => {
					dialog.remove()
				},2000)
			}else {
				dialog.toast('底部弹出文字,2.5秒后消失', 2500)
			}
		},
		getData () {
            dialog.loading('加载中..');
            let send_data = {
                appkey: 'e2fb20ea3f3df33310788a4247834c93',
                token: '2a11d6d67a8b8196afbcefbac3e0a573',
                page: '1',
                limit: '7',
                longitude: '113.30764968',
                latitude: '23.1200491',
                sort: 'distance',
                order: 'asc',
                keyword: ''
            }
            baseRequest('post', 'http://che.qihao.lzei.com/api/app/parking', send_data, res => {
                dialog.remove();
                console.log(res);
                this.requestData.content = JSON.stringify(res);
            }, err => {
                dialog.remove();
                dialog.toast(err.message, 1000);
            });
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
		.notes{ .label(); color: @fadeColor; line-height: .7rem; text-indent: .3rem; display: block; }
		.swiper{
			width: 100%; height: 4rem; position: relative; background-color: #eee; overflow: hidden;
			.swiper_list{ overflow: hidden; position: relative; width: 100%; }
			.swiper_item{ height: 4rem; float: left; width: 100%; text-align: center; background-size: cover; background-position: center center; }
		}
		.transformY{
			.swiper_item{ height: 4rem; float: none; width: 100%; }
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
