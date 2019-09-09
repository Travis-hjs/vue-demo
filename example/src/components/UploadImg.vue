<template>
    <div class="upload-img">
        <div v-if="imgUrl" class="img-box">
            <img class="image" :src="imgUrl">
            <div @click="removeImg()" class="remove">
                <svg t="1567996911031" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2169" width="18" height="18">
                    <path d="M806.4 172.8l-633.6 633.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l633.6-633.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0z" fill="#ffffff" p-id="2170"></path>
                    <path d="M172.8 172.8c-12.8 12.8-12.8 32 0 44.8l633.6 633.6c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L217.6 172.8c-12.8-12.8-32-12.8-44.8 0z" fill="#ffffff" p-id="2171"></path>
                </svg>
            </div>
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
        this.getBase64(file, (res: string) => {
            this.sendImgSrc(res);
            input.value = null;
        });
        
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
     * 获取 base64
     * @param file 文件
     * @param callback 回调
     */
    private getBase64(file: File, callback: Function) {
        let reader = new FileReader();
        reader.onload = function() {
            if (callback) callback(reader.result);
        }
        reader.readAsDataURL(file);
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