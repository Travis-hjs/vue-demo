import baseRequest from '../modules/ajax';
import { RequestSuccess, RequestFail } from '../modules/interfaces';

class ModuleNetWork {
    /**
     * 上传图片
     * @param file 图片文件
     * @param success 上传成功
     * @param fail 上传失败
     */
    public uploadImg(file: FormData, success?: RequestSuccess, fail?: RequestFail) {
        baseRequest('POST', '/api/uploadImg', {}, res => {
            if (success) success(res);
        }, err => {
            if (fail) fail(err);
        }, file);
    }

    /**
     * 测试请求
     * @param success 请求成功回调
     * @param fail 请求失败回调
     */
    public testPost(success?: RequestSuccess, fail?: RequestFail) {
        baseRequest('POST', '/api/app/parking', {
            appkey: 'e2fb20ea3f3df33310788a4247834c93',
            token: '2a11d6d67a8b8196afbcefbac3e0a573'
        }, res => {
            if (success) success(res);
        }, err => {
            if (fail) fail(err);
        });
    }
}

/** 接口模块 */
const api = new ModuleNetWork();

export default api;