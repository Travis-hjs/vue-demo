<template lang="html">
	<div class="todo">
		<input type="text" v-model.trim="newItem" placeholder="输入内容摁回车键即可增加条数" @keyup.enter="addItem">
        <ul class="list">
            <li v-for="(item, index) in lists" :key="index" :class="{ li_hover: !item.show }" @click="item.show = !item.show">
                <p>{{ item.text }}</p>
                <i class="aui-iconfont aui-icon-trash" @click="removeThis(index)"></i>
            </li>
        </ul>
        <div class="todo_btn">
            <span @click="removeFirst" data-opacity>删除第一条</span>
            <span @click="removeLast" data-opacity>删除最后一条</span>
        </div>
        <div class="title">
            <p>子组件传过来的值: {{ childData }}</p>
        </div>
        <child :msgName="title" v-on:chllidFun='listenToBoy'></child>
	</div>
</template>

<script>
import Child from './todo-child'
import Todostore from '@/module/todolist-store'

export default {
	data () {
		return {
            newItem: '',
            lists: Todostore.fetch(),
            childData: '',
            title: 'this is todo list',
		}
	},
    components: { Child },
	created () {

	},
	mounted () {

	},
    watch: {
		lists: {
			handler(lists) {
				Todostore.save(lists)
			},
			deep: true
		}
	},
	methods: {
        addItem() {
			if (!this.newItem) return this.$msg.alertMsg('输入不能为空~')
			this.lists.push({
				text: this.newItem,
				show: true
			})
			this.newItem = ''
		},
        removeThis(index) {
			this.lists.splice(index, 1)
		},
        removeFirst() {
            if (!this.lists.length) return this.$msg.alertMsg('当前没有可以删除的列表') 
			this.lists.shift()
		},
		removeLast() {
            if (!this.lists.length) return this.$msg.alertMsg('当前没有可以删除的列表') 
			this.lists.pop()
		},
        listenToBoy(childMsg) {
			this.childData = childMsg
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../../static/style/base.less";
    .todo{
        padding: 0 .3rem;
        input{ display: block; width: 100%; height: .7rem; box-sizing: border-box; border: solid 1px @textColor; padding: 0 .2rem; margin-bottom: .3rem; }
        .list{
            width: 100%;
            li{
                width: 100%; height: .8rem; border: solid 1px @textColor; box-sizing: border-box; padding: 0 .2rem; background-color: @textColor; .flex(); .vertical(); margin-bottom: .3rem;
                p{ .standard(); color: #fff; .ellipsis(); .f(1); }
                .aui-icon-trash{ color: #fff; font-size: .36rem; }
            }
			.li_hover{
				background-color: #fff;
				p{ .standard(); color: @textColor; }
                .aui-icon-trash{ color: @textColor; }
			}
        }
        .todo_btn{
            width: 100%; .flex(); height: .8rem;
            span{ .standard(); text-align: center; .f(1); line-height: .8rem; margin: 0 .2rem; background-color: @themeColor; color: #fff; }
        }
        .title{ width: 100%; padding: .2rem 0; .standard(); }
    }
</style>
