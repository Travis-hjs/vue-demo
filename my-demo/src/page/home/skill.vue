<template lang="html">
    <transition name="slideY">
        <div class="skill">
            <div class="aui-iconfont aui-icon-close" @click="skillClose"></div>
            <div class="list-item" v-for="(item, index) in list" :key="index">
                <p><i>{{ index+1 }}</i>{{ item.text }}</p>
                <img :src="url" alt="" v-for="(url, keys) in item.urls" :key="keys">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
	data () {
		return {
            list: [
                {
                    text: '在build之后的项目静态资源配置说明：首先在build目录下修改utils.js，config目录下的index.js；然后这里我将所有静态资源都放在static文件目录下',
                    urls: ['./static/image/vue-skill-1.png','./static/image/vue-skill-5.png']
                },{
                    text: '变量要以“./static/的写法否则打包后路径不匹配”',
                    urls: ['./static/image/vue-skill-2.png']
                },{
                    text: '静态模板和样式则以绝对路径的写法',
                    urls: ['./static/image/vue-skill-3.png','./static/image/vue-skill-4.png']
                }
            ]
		}
	},
	created () {

	},
	mounted () {

	},
	methods: {
        skillClose () {
            this.$emit('skillFn', false)
        }
	}
}
</script>

<style lang="less" scoped>
	@import "../../../static/style/base.less";
    .skill{
        width: 100%; padding: 1.2rem .3rem .3rem; box-sizing: border-box; background-color: #fff; z-index: 5; height: 100%; overflow-y: auto; position: fixed; top: 0; left: 0;
        .aui-icon-close{ font-size: .4rem; font-weight: 600; float: right; padding: .1rem; color: @textColor; font-weight: 600; margin-bottom: .1rem; }
        .list-item{
            width: 100%; border-bottom: dashed 1px #666; clear: both; margin-bottom: .3rem;
            p{ .standard(); color: @textColor; margin-bottom: .2rem; }
            i{ display: inline-block; .label(); width: .4rem; background-color: @themeColor; height: .4rem; color: #fff; border-radius: 50%; text-align: center; line-height: .4rem; margin-right: .1rem; }
            img{ margin-bottom: .2rem; }
        }
    }
</style>
