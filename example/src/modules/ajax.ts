import { AjaxType, RequestFail, RequestSuccess } from "./interfaces";

/**
 * XMLHttpRequest 请求 
 * learn: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
function ajax(param: AjaxType) {
    /** XMLHttpRequest */
    const XHR = new XMLHttpRequest();
    /** 请求方法 */
    const method = param.method.toUpperCase();
    /** 请求链接 */
    let url = param.url;
    /** 请求数据 */
    let data = null;
    /** 超时检测 */
    let overtime = param.overtime || 0;

    // 传参处理
    switch (method) {
        case 'POST':
            data = JSON.stringify(param.data);
            break;

        case 'GET':
            // 判断是否一个空对象
            if (JSON.stringify(param.data) != '{}') {
                // 解析对象传参
                let send_data = '';
                let _data: any = param.data;
                for (const key in _data) {
                    send_data += '&' + key + '=' + _data[key];
                }
                send_data = '?' + send_data.slice(1);
                url += send_data;
            }
            break;
    }

    // 监听请求变化
    // XHR.status learn: http://tool.oschina.net/commons?type=5
    XHR.onreadystatechange = function () {
        if (XHR.readyState !== 4) return;
        if (XHR.status === 200 || XHR.status === 304) {
            if (param.success) param.success(JSON.parse(XHR.response));
        } else {
            if (param.fail) param.fail(XHR);
        }
    }

    // 判断请求进度
    // if (param.progress) {
    //     XHR.addEventListener('progress', param.progress, false);
    // }

    // XHR.responseType = 'json';
    // 是否Access-Control应使用cookie或授权标头等凭据进行跨站点请求。
    // XHR.withCredentials = true;	
    XHR.open(method, url, true);

    // 判断是否上传文件通常用于上传图片
    if (param.file) {
        data = param.file;
    } else {
        // Content-Type:
        // application/json
        // application/x-www-form-urlencoded
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    
    // 在IE中，超时属性只能在调用 open() 方法之后且在调用 send() 方法之前设置。
    if (overtime > 0) {
        XHR.timeout = overtime;
        XHR.ontimeout = function () {
            console.warn('ajax 请求超时 !!!');
            XHR.abort();
            if (param.timeout) param.timeout(XHR);
        }
    }

    XHR.send(data);
}

/** 域名 */
const baseUrl = 'http://che.qihao.lzei.com';

/**
 * 基础请求
 * @param method GET | POST
 * @param url 请求接口
 * @param data 请求数据 
 * @param success 成功回调
 * @param fail 失败回调
 * @param upload 上传图片 FormData
 */
export default function baseRequest(method: AjaxType['method'], url: string, data: object, success?: RequestSuccess, fail?: RequestFail, upload?: AjaxType['file']) {
    ajax({
        url: baseUrl + url,
        method: method,
        data: data,
        file: upload,
        overtime: 8000,
        success(res) {
            if (success) success(res);
        },
        fail(err) {
            let error = {
                message: '接口报错'
            };
            if (err.response.charAt(0) == '{') {
                error = JSON.parse(err.response);
            }
            if (fail) fail(error);
        },
        timeout() {
            let error = {
                message: '请求超时'
            }
            if (fail) fail(error);
        }
    });
}
