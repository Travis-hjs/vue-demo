<template>
    <div class="home">
        <div class="title">todo-list</div>
        <todo-list />
        <div class="title">子父传参（上传图片）</div>
        <div class="img-box">
            <upload-img class="box" :imgUrl="imgSrc" @getImgUrl="getSrc" />
        </div>
        <div class="title">过滤筛选 & 队列动画</div>
        <queue />
    </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator';
import TodoList from '../components/TodoList.vue';
import UploadImg from '../components/UploadImg.vue';
import Queue from '../components/Queue.vue';
import Global from '../modules/Global';

@Component({
    components: {
        'todo-list': TodoList,
        'upload-img': UploadImg,
        'queue': Queue
    }
})
export default class Home extends Vue {
    /** 上传图片路径 */
    private imgSrc = '';

    private getSrc(path: string) {
        this.imgSrc = path;
    }

    private interval = false;

    /** 距离底部触发的距离 */
    private distance = 100;

    /** 监听滚动条事件 */
    private onScrollBottom () {
        let scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
        if (scrollHeight - scrollTop - this.distance <= window.innerHeight) {
            // 阻止多次执行
            if (this.interval) return ;
            this.interval = true;
            Global.openDialog({
                type: 'confirm',
                content: '到达页面底部，是否继续监听滚动到底部事件?',
                confirmText: '继续监听',
                cancelText: '不监听',
                confirm: () => {
                    this.interval = false;
                }
            });
        }
    }

    mounted () {
		window.addEventListener('scroll', this.onScrollBottom);
    }
    
	beforeDestroy () {
		// 页面销毁时要清除scrollBottom事件
	    window.removeEventListener('scroll', this.onScrollBottom);
	}
}
</script>

<style lang="less" scoped>
@import "../../static/styles/base.less";

.home{
    width: 100%;
    padding: .2rem;
    .img-box{
        padding: 10px; margin-bottom: .2rem;
        .box{ margin: 0 auto; }
    }
}
</style>
