<template>
    <div class="upload-img">
        <div v-if="imgUrl" class="img-box">
            <img class="image" :src="imgUrl">
            <div @click="removeImg()" class="remove">×</div>
        </div>
        <div v-else class="upload">
            <div class="add-icon"></div>
            <input class="upload-input" type="file" name="picture" ref="uploadinput" @change="uploadImg()">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import api from '../api/network';

@Component({})
export default class UploadImg extends Vue {

    /** 上传的图片路径 */
    @Prop({
        type: String,
        default: ''
    })
    private imgUrl!: string;

    /** 发送数据到父组件中 */
    @Emit('getImgUrl') sendImgSrc(src: string) {}

    /** 上传图片 */
    private uploadImg() {
        let input: any = this.$refs.uploadinput;
        let file: File = input.files[0];
        // console.log('上传图片文件 >>', file);
        
        /** 上传类型数组 */
        let typeStr = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];

        // 判断文件类型
        if (typeStr.indexOf(file.type) < 0) {
            // Global.openDialog({
            //     type: 'alert',
            //     content: '文件格式只支持：jpg 和 png'
            // });
            return;
        }

        // 判断大小
        if (file.size > 2 * 1024 * 1024) {
            // Global.openDialog({
            //     type: 'alert',
            //     content: '上传的文件不能大于2M'
            // });
            return;
        }

        // 静态上传
        const src = this.getObjectURL(file);
        this.sendImgSrc(src);
        input.value = null;
        
        // let formData = new FormData();
        // formData.append('img', file);
        
        // Global.openDialog({ type: 'loading', content: '图片上传中' });
        // api.uploadImg(formData, res => {
        //     Global.hideDialog();
        //     // console.log('上传成功 >>', res);
        //     /** 图片路径 */
        //     let src: string = res.data[0];
        //     this.sendImgSrc(src);
        // }, err => {
        //     Global.hideDialog();
        //     console.log('上传图片失败 >>', err);
        //     setTimeout(() => {
        //         Global.openDialog({
        //             type: 'alert',
        //             content: '上传图片失败'
        //         });
        //     }, 10);
        // });
    }

    /** 清除当前图片 */
    private removeImg() {
        this.sendImgSrc('');
    }

    /**
     * 获取二进制路径（需要打开服务器调试）
     * @param file 文件
     */
    private getObjectURL(file: File) {
        let url = null;
        // if (window['createObjectURL']) {
        //     url = window['createObjectURL'](file);
        // } else if (window.URL) {
        //     url = window.URL.createObjectURL(file);
        // } else if (window['webkitURL']) {
        //     url = window['webkitURL'].createObjectURL(file);
        // }
        url = window.URL.createObjectURL(file);
        return url;
    }
}
</script>

<style lang="less" scoped>
@import "../../static/styles/base.less";

.upload-img{ 
    width: 240px; .card(); transition: .2s all;
    &:hover{
        .buttonActive();
    }
    .img-box{ 
        position: relative; width: 100%; height: 100%; overflow: hidden;
        .image{ display: block; width: 100%; }
        .remove{ position: absolute; top: 0; right: 0; border-radius: 100%; cursor: pointer; width: 30px; height: 30px; background-color: rgba(0,0,0,0.5); font-size: 28px; color: #fff; .flex(); .fvertical(); .fcenter(); }
    }
    .upload{ 
        width: 100%; min-height: 240px; position: relative; .flex(); .fcenter(); .fvertical();
        .upload-input{ width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 2; opacity: 0; cursor: pointer; }
        .add-icon{
            position: relative; width: 50px; height: 50px;
            &::after{ content: ""; position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background-color: #999; transform: translateX(-50%); }
            &::before{ content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background-color: #999; transform: translateY(-50%); }
        }
    }   
}
</style>