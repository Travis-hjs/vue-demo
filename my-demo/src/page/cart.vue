<template lang="html">
	<div class="content">
        <top></top>
        <ul class="cart_list">
            <li v-for="(item, index) in cartData.cartList" :key="item.id">
                <div :class="['checked_btn',{ check_on: item.isSelect }]" @click="single(index)"></div>
				<router-link tag="div" class="goods_photo" :style="{ backgroundImage: `url(${ item.image })` }" to="/navtab"></router-link>
                <div class="goods_text">
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.spec }}</p>
                    <div class="number">
                        <i class="aui-iconfont aui-icon-minus" @click="reduce(index)"></i>
                        <p>{{ item.num }}</p>
                        <i class="aui-iconfont aui-icon-plus" @click="add(index)"></i>
                    </div>
                    <h3>￥{{ item.price }}</h3>
                    <i class="aui-iconfont aui-icon-trash" @click="deleteBtn(index)"></i>
                </div>
            </li>
        </ul>
        <footer>
            <div :class="['checked_btn',{ check_on: allChecked }]" @click="allSelect"></div>
            <p>全选</p>
            <div class="total">总计：<i>￥{{ totalPrice }}</i></div>
            <div class="buy_btn" data-opacity @click="buy">立即购买</div>
        </footer>
	</div>
</template>

<script>
import Top from '@/components/header'
import { mapState } from 'vuex'

export default {
	data () {
		return {

		}
	},
    components: { Top },
    computed: {
		...mapState(['cartData']),
        // 总价
		totalPrice() {
			let _price = 0;
            this.cartData.cartList.forEach((item, index) => {
                if (item.isSelect) {
                    _price += Number(item.num) * Number(item.price)
                }
            })
			return _price.toFixed(2);
		},
        // 全选
		allChecked() {
			let _all = true;
            this.cartData.cartList.forEach((item, index) => {
                if (!item.isSelect) _all = false
            })
			return _all;
		}
    },
	created () {

	},
	mounted () {

	},
	methods: {
        add (key) {
            this.cartData.cartList[key].num ++
        },
        reduce (key) {
            if (this.cartData.cartList[key].num == 1) return ;
            this.cartData.cartList[key].num --
        },
        deleteBtn (key) {
            this.cartData.cartList.splice(key, 1)
        },
        // 单个商品选择
		single(key) {
			this.cartData.cartList[key].isSelect = !this.cartData.cartList[key].isSelect;
		},
        // 全选按钮
		allSelect() {
            if (this.allChecked) {
                this.cartData.cartList.forEach((item, index) => {
                    item.isSelect = false
                })
            }else {
                this.cartData.cartList.forEach((item, index) => {
                    item.isSelect = true
                })
            }
		},
        buy () {
			this.cartData.select = false
			this.cartData.cartList.forEach((item, index) => {
                if (item.isSelect) this.cartData.select = true
            })
            if (!this.cartData.select) return this.$msg({ type: 'alert', text: '你还没选择商品呢~' });
        }
	}
}
</script>

<style lang="less" scoped>
	@import "../../static/style/base.less";
    .cart_list{
        width: 100%; overflow: hidden; padding-bottom: 1.2rem; clear: both;
        li{
            width: 100%; height: 2.4rem; box-sizing: border-box; background-color: #fff; border-bottom: solid 1px #eee; padding: 0 .2rem; .flex(); .vertical();
            .checked_btn{ margin-right: .2rem; }
            .goods_photo{ width: 1.8rem; height: 1.8rem; .autoBg(); border: solid 1px #eee; margin-right: .3rem; }
            .goods_text{
                .f(1); height: 1.8rem; overflow: hidden; position: relative;
                h2{ font-size: .3rem; margin-bottom: .1rem; .ellipsis(); width: 90%; }
                p{ font-size: .26rem; color: @fadeColor; }
                .number{
                    width: 2.2rem; height: .6rem; border: solid 1px @textColor; .flex(); .vertical(); position: absolute; bottom: 0; left: 0;
                    .aui-iconfont{ font-size: .32rem; color: @textColor; display: inline-block; width: .6rem; text-align: center; }
                    p{ .f(1); font-size: .28rem; color: @textColor; text-align: center; line-height: .6rem; border-left: solid 1px @textColor; border-right: solid 1px @textColor; }
                }
                h3{ font-size: .4rem; font-size: .4rem; position: absolute; bottom: 0; right: 0; }
                .aui-icon-trash{ font-size: .4rem; position: absolute; right: 0; top: 0; }
            }
        }
    }
    footer{
        position: fixed; bottom: 0; left: 0; width: 100%; box-sizing: border-box; padding: 0 .2rem; height: 1.1rem; .flex(); .vertical(); background-color: #fff; border-top: solid 1px #eee; z-index: 10;
        .total{
            .f(1); font-size: .3rem; color: @fadeColor; text-align: center;
            i{ color: #666; }
        }
        .checked_btn{ margin-right: .2rem; }
        p{ font-size: .3rem; color: @fadeColor; }
        .buy_btn{ font-size: .3rem; background-color: #212121; width: 1.5rem; height: .7rem; border-radius: .08rem; text-align: center; line-height: .7rem; color: #fff; }
    }

</style>
