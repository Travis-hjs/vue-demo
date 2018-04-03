import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    // 排序过滤数据
    listData: {
        active: 0,
        menus: [
            {
                id: 0,
                value: '高到低'
            },{
                id: 1,
                value: '低到高'
            },{
                id: 2,
                value: '随机'
            }
        ],
        // 搜索的内容
        seachText: '',
        // 需要变动的数组
        queues: [],
        // 存放不变的数组
        goodsList: [{
                id: 0,
                price: '12.50',
                text: '产品一'
            },{
                id: 1,
                price: '18.50',
                text: '产品二'
            },{
                id: 2,
                price: '20.00',
                text: '产品三'
            },{
                id: 3,
                price: '9.90',
                text: '产品四'
            },{
                id: 4,
                price: '16.30',
                text: '产品五'
            },{
                id: 5,
                price: '12.00',
                text: '产品六'
            },{
                id: 6,
                price: '33.33',
                text: '产品七'
            },{
                id: 7,
                price: '6.66',
                text: '产品八'
            },{
                id: 8,
                price: '50.20',
                text: '产品九'
            },{
                id: 9,
                price: '10.10',
                text: '产品十'
            },{
                id: 10,
                price: '24.00',
                text: '产品十一'
            },{
                id: 11,
                price: '66.50',
                text: '产品十二'
            },{
                id: 12,
                price: '100',
                text: '产品十三'
            },{
                id: 13,
                price: '88.88',
                text: '产品十四'
            },{
                id: 14,
                price: '33.88',
                text: '产品十五'
            },{
                id: 15,
                price: '56.00',
                text: '产品十六'
            },{
                id: 16,
                price: '99.00',
                text: '产品十七'
            },{
                id: 17,
                price: '73.20',
                text: '产品十八'
            },{
                id: 18,
                price: '40.00',
                text: '产品十九'
            },
            {
                id: 19,
                price: '15.50',
                text: '产品二十'
            }
        ]
    },
    // 购物车数据
    cartData: {
        select: false,
        cartList: [
            {
                id: 0,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 12,
                price: '168.00',
                isSelect: false
            },{
                id: 1,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 2,
                price: '168.00',
                isSelect: false
            },{
                id: 2,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 12,
                price: '168.00',
                isSelect: false
            },{
                id: 3,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 12,
                price: '168.00',
                isSelect: false
            },{
                id: 4,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 2,
                price: '168.00',
                isSelect: false
            },{
                id: 5,
                image: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
                title: '商品标题商品标题商品标题',
                spec: '颜色：黑色',
                num: 12,
                price: '168.00',
                isSelect: false
            }
        ]
    },
    // 导航切换状态
    navTabState: {
        active: 0
    },
}

const mutations = {
    // modifyisMine (state, payload) { state.isMine = payload.state }
}
export default new Vuex.Store({state, mutations})
