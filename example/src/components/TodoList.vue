<template>
    <div class="todo-list">
        <input class="input" type="text" v-model.trim="inputText" placeholder="输入内容摁回车键即可增加条数" @keyup.enter="addItem">
        <!-- <transition-group tag="div" name="listMove" class="move-list list">
            <div :class="['list-item', 'move-list-item', { 'list-item-active': item.active }]" ripple v-for="(item, index) in list" :key="'todo-' + item.id" @click="toggleItem(index)">
                <span class="list-text">{{ item.text }}</span>
                <span class="list-icon" @click="removeItem(index)">删除</span>
            </div>
        </transition-group> -->
        <div class="list">
            <div :class="['list-item', { 'list-item-active': item.active }]" ripple v-for="(item, index) in list" :key="'todo-' + item.id" @click="toggleItem(index)">
                <span class="list-text">{{ item.text }}</span>
                <span class="list-icon" @click="removeItem($event, index)">删除</span>
            </div>
        </div>
        <div class="bottom">
            <button ripple class="btn redbtn" @click="removeFirst">删除第一条</button>
            <button ripple class="btn redbtn" @click="removeLast">删除最后一条</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { TodoListItemInfo } from '../modules/interfaces';
import store from '../modules/store';
import Global from '../modules/Global';

@Component({})
export default class TodoList extends Vue {
    /** 输入内容 */
    private inputText: string = '';

    /** 列表数据 */
    private list = store.todoList;

    @Watch('list', {
        deep: true
    }) onListChange() {
        store.saveTodoList();
    }

    /** 增加一条列表 */
    private addItem() {
        if (!this.inputText) return Global.openDialog({
            type: 'alert',
            content: '输入不能为空'
        });
        const item: TodoListItemInfo = {
            id: store.todoId,
            text: this.inputText,
            active: true,
        }
        store.todoId++;
        this.list.push(item);
        this.inputText = '';
    }

    /**
     * 切换 item 状态
     * @param index item索引
     */
    private toggleItem(index: number) {
        this.list[index].active = !this.list[index].active;
    }

    /**
     * 删除 item
     * @param e 事件
     * @param index item索引
     */
    private removeItem(e: Event, index: number) {
        // 防止和 toggleItem 事件冲突
        e.stopPropagation();
        e.preventDefault();
        this.list.splice(index, 1);
    }

    /** 删除第一条 */
    private removeFirst() {
        if (!this.list.length) return Global.openDialog({
            type: 'alert',
            content: '当前没有可以删除的列表'
        }); 
        this.list.shift();
    }

    /** 删除最后一条 */
    private removeLast() {
        if (!this.list.length) return Global.openDialog({
            type: 'alert',
            content: '当前没有可以删除的列表'
        });
        this.list.pop();
    }
}
</script>

<style lang="less" scoped>
@import "../../static/styles/base.less";

.todo-list{
    width: 100%;
    .input{ width: 100%; display: block; .s1(); color: @textColor; border: none; border-bottom: solid 1px @themeColor; height: .8rem; margin-bottom: .2rem; }
    .list{
        width: 100%;
        .list-item{
            .flex(); 
            .fvertical(); 
            width: 100%; 
            height: .8rem; 
            border: solid 1px @themeColor; 
            padding: 0 .2rem; 
            background-color: @themeColor; 
            margin-bottom: .2rem;
            transition: .3s all;
            .list-text{ .f(1); .s1(); .ellipsis(); color: #fff; }
            .list-icon{ .s1(); color: #fff; }
        }
        .list-item-active{ 
            background-color: #8146b4; 
            border-color: #8146b4;
        }
    }
    .bottom{
        width: 100%; .flex(); .fcenter(); padding: 10px 0 15px;
        .btn{ margin: 0 auto; }
    }
}
</style>
