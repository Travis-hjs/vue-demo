import { TodoListItemInfo, QueueData } from './interfaces';
import utils from '../modules/utils';

class ModuleStore {
    constructor() {
        this.initTodoList();
        this.initQueueList();
    }
    
    private readonly todoKey = 'todo';

    public todoId = 0;

    public todoList: Array<TodoListItemInfo> = [];

    /** 初始化列表数据 */
    private initTodoList() {
        this.todoList = this.fetchTodoList();
        const list = this.todoList.map(item => item.id);
        if (list.length > 0) {
            this.todoId = Math.max(...list);
        }
    }

    private fetchTodoList() {
        let list: any = localStorage.getItem(this.todoKey);
        if (list) {
            list = JSON.parse(list);
        } else {
            list = [];
        }
        return list;
    }

    /** 储存 todolist 数据 */
    public saveTodoList() {
        localStorage.setItem(this.todoKey, JSON.stringify(this.todoList));
    }

    /** 排序过滤数据 */
    public queueData: QueueData = {
        index: 0,
        menu: [
            {
                id: 0,
                text: '高到低'
            },{
                id: 1,
                text: '低到高'
            },{
                id: 2,
                text: '随机'
            }
        ],
        seachText: '',
        queueList: [],
        goodsList: []
    }

    private initQueueList() {
        const list = [];
        for (let i = 0; i < 20; i++) {
            const num = utils.ranInt(1000, 11000) / 100;
            const index = i + 1;
            list.push({
                id: index,
                price: num,
                info: '商品-' + index
            });
        }
        // console.log(list);
        this.queueData.goodsList = list;
        this.queueData.queueList = list;
    }
    
    /** 轮播图列表 */
    public swiperList = [
        {
            img: require('../assets/swiper_1.png')
        },{
            img: require('../assets/swiper_2.png')
        },{
            img: require('../assets/swiper_3.png')
        }
    ]

}

/** 自定义数据管理 */
const store = new ModuleStore();

export default store;