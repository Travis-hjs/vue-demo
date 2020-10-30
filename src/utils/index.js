import theToast from "./toast";

const toast = theToast();

/**
 * @author https://github.com/Hansen-hjs
 * @description 工具类
 */
class ModuleUtil {
    
    showToast = toast.showToast;
    
    /**
     * 插入脚本
     * @param {string} link 脚本路径
     * @param {Function} callback 脚本加载完成回调
     */
    insertScript(link, callback) {
        const label = document.createElement("script");
        label.src = link;
        label.onload = function () {
            if (label.parentNode) label.parentNode.removeChild(label);
            if (typeof callback === "function") callback();
        }
        document.body.appendChild(label);
    }

    /**
     * 格式化日期
     * @param {string | number | Date} value 指定日期
     * @param {string} format 格式化的规则
     * @example
     * ```js
     * formatDate();
     * formatDate(1603264465956);
     * formatDate(1603264465956, "h:m:s");
     * formatDate(1603264465956, "Y年M月D日");
     * ```
     */
    formatDate(value = Date.now(), format = "Y-M-D h:m:s") {
        const formatNumber = n => `0${n}`.slice(-2);
        const date = new Date(value);
        const formatList = ["Y", "M", "D", "h", "m", "s"];
        const resultList = [];
        resultList.push(date.getFullYear().toString());
        resultList.push(formatNumber(date.getMonth() + 1));
        resultList.push(formatNumber(date.getDate()));
        resultList.push(formatNumber(date.getHours()));
        resultList.push(formatNumber(date.getMinutes()));
        resultList.push(formatNumber(date.getSeconds()));
        for (let i = 0; i < resultList.length; i++) {
            format = format.replace(formatList[i], resultList[i]);
        }
        return format;
    }

    /**
     * 复制文本
     * @param {string} text 复制的内容
     * @param {() => void} success 成功回调
     * @param {(error: string) => void} fail 出错回调
     */
    copyText(text, success = null, fail = null) {
        text = text.replace(/(^\s*)|(\s*$)/g, "");
        if (!text) {
            typeof fail === "function" && fail("复制的内容不能为空！");
            return;
        }
        const id = "the-clipboard";
        /**
         * 粘贴板节点
         * @type {HTMLTextAreaElement}
         */
        let clipboard = document.getElementById(id);
        if (!clipboard) {
            clipboard = document.createElement("textarea");
            clipboard.id = id;
            clipboard.style.cssText = "font-size: 15px; position: fixed; top: -1000%; left: -1000%;";
            document.body.appendChild(clipboard);
        }
        clipboard.value = text;
        clipboard.select();
        clipboard.setSelectionRange(0, clipboard.value.length);
        document.execCommand("copy");
        clipboard.blur();
        typeof success === "function" && success();
    }

    /**
     * 检测类型
     * @param {any} target 检测的目标
     * @returns {"string" | "number" | "array" | "object" | "function" | "null" | "undefined"}
     */
    checkType(target) {
        const value = Object.prototype.toString.call(target);
        const result = value.match(/\[object (\S*)\]/)[1];
        return result.toLocaleLowerCase();
    }

    /**
     * 判断是否外部链接
     * @param {string} path 路径
     */
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    }
    
}

/** 工具模块 */
const utils = new ModuleUtil();

export default utils;