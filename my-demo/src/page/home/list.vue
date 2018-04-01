<template lang="html">
	<div class="filter">
		<nav>
            <li v-for="(item, index) in listData.menus" :key="item.id" :class="{ li_active: item.id == listData.active }" @click="menuFun(item.id)">{{ item.value }}</li>
            <div class="line"></div>
        </nav>
        <div class="filter_box">
			<input type="number" name="" value="" v-model.trim="minNum" placeholder="￥最小价格">
			<i>——</i>
			<input type="number" name="" value="" v-model.trim="maxNum" placeholder="￥最大价格">
		</div>
		<span class="select_btn" @click="dataFilter">查询</span>
		<input type="text" name="" value="" v-model.trim="listData.seachText" placeholder="输入价格或产品模糊搜索">
		<transition-group tag="ul" name="liMove" class="shop_ul">
			<li v-for="(shop, key) in searchData" :key="shop.id">
				<span></span>
				<h2>￥{{ shop.price }}</h2>
				<p>{{ shop.text }} <i>index-{{ key }}</i></p>
			</li>
		</transition-group>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data () {
		return {
            minNum: '',
			maxNum: ''
		}
	},
    computed: {
        ...mapState(['listData']),
        // 过滤
        searchData () {
            var search = this.listData.seachText;
            if (search) {
                return this.listData.queues.filter(function(product) {
                    return Object.keys(product).some(function(key) {
                        return String(product[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.listData.queues;
        }
    },
	created () {

	},
	mounted () {
        this.listData.queues = this.listData.goodsList
        this.resetStyle();
	},
	methods: {
        // 随机
		shuffle (array) {
		    var i,x,j,newArr;
			newArr = array;
		    for(i = newArr.length; i > 0 ; i-- ){
		        j = Math.floor(Math.random() * i);
		        x = newArr[j];
		        newArr[j] = newArr[i-1];
		        newArr[i-1] = x;
		    }
			return newArr;
		},
		// 对比方法
		compare(prop) {
			return function(obj1, obj2) {
				let val1 = obj1[prop];
				let val2 = obj2[prop];
				if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
					val1 = Number(val1);
					val2 = Number(val2);
				}
				if (val1 > val2) { // 大到小
					return -1;
				} else if (val1 < val2) {
					return 1;
				} else {
					return 0;
				}
			}
		},
        resetStyle () {
            const _line = document.querySelector('.line');
            _line.style.width = document.querySelector('nav li').offsetWidth + 'px';
            this.lineSlide()
        },
        lineSlide () {
            let [_slide, _howFar] = [document.querySelector('.line'), document.querySelector('nav li').offsetWidth];
			_slide.style.WebkitTransform = 'translateX('+_howFar * this.listData.active+'px)';
			_slide.style.transform = 'translateX('+_howFar * this.listData.active+'px)';
        },
        menuFun (num) {
            this.listData.active = num
            this.lineSlide();
            if (num == 0) {
                // 从高到低
				this.listData.queues = this.listData.queues.sort(this.compare('price'));
            }else if (num == 1) {
                // 从低到高
				this.listData.queues = this.listData.queues.sort(this.compare('price')).reverse();
            }else {
                // 随机排序
				this.listData.queues = this.shuffle(this.listData.queues);
            }
            // this.$router.replace({ path:'/vorder', query: { state: this.navActive } });  //改变当前地址
        },
        dataFilter () {
            // 重置一下商品数据
			this.listData.queues = this.listData.goodsList
			let [_min, _max] = [Number(this.minNum), Number(this.maxNum)]
			if (!(_min && _max)) return this.$msg({ type: 'toast', text: '请输入大于零的价格' })
			if (!(_min < _max)) return this.$msg({ type: 'toast', text: '最大价格必需大于最小价格' })
			this.listData.queues = this.listData.queues.filter((item, index, array) => {
				return (item.price >= _min && item.price <= _max);
            });
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../../static/style/base.less";
    .filter{
        nav{
            width: 100%; height: .88rem; .flex(); border-top: solid 1px @textColor; border-bottom: solid 1px @textColor; position: relative; margin-bottom: .3rem;
            li{ .standard(); text-align: center; line-height: .88rem; .f(1); position: relative; z-index: 2; .transition(0.3s); }
            .li_active{ color: #fff; }
            .line{ width: 1px; height: 100%; background-color: @textColor; z-index: 1; position: absolute; top: 0; left: 0; transform: translateX(0px); .transition(0.3s); }
        }
        input{
            display: block; width: 50%; height: .7rem; box-sizing: border-box; padding: 0 .2rem; border: solid 1px @themeColor; font-size: 14px; margin: 0 auto 20px; border-radius: 4px; outline: none; .transition(0.3s);
            &:focus{ width: 90%; }
        }
    	.filter_box{
    		width: 100%; height: 40px; overflow: hidden; .flex; margin-bottom: 10px;
    		input{ .f(2); margin: 0 10px; }
    		i{ .f(1); text-align: center; font-size: .36rem; line-height: 40px; }
    	}
    	.select_btn{
            width: 140px; height: 40px; font-size: 14px; line-height: 40px; color: #fff; background-color: @themeColor; text-align: center; margin: 0 auto 10px; border-radius: 19px;
            &:active{ opacity: 0.8; }
        }
    	.shop_ul{
    		width: 100%; overflow: hidden; position: relative;
    		li{ width: 45.35%; margin-left: 3.1%; margin-bottom: 3.1%; float: left; box-shadow: 0 0 15px 0 rgba(0,0,0,0.2); transition: 1s all; }
    		span{ width: 100%; padding: 50% 0; background-color: #eee; margin-bottom: 10px; }
    		h2{ font-size: 16px; font-weight: 400; text-indent: 10px; color: #f90667; }
    		p{ color: @fadeColor; font-size: 14px; text-indent: 10px; }
    		i{ font-size: 12px; }
    	}
        // 动画
        .liMove-leave-active{
    		opacity: 0;
    		position: absolute;
    		transform: scale(0.5,0.5);
    	}
    	.liMove-enter {
    		opacity: 0;
    		transform: translateY(60%);
    	}
    }
</style>
