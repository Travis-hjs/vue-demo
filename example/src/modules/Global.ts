import { DialogOptionsType, ShowDialogOptionsType, toastListType } from './interfaces';

class ModuleGlobal {
    constructor() {}
    /** toast 唯一 key */
    private toastId = 1;

    /** 监听确认回调 防止重复 */
    private watch_confirm: any = null;

    /** 监听取消回调 防止重复 */
    private watch_cancel: any = null;

    /** 消息提示设置 */
    public dialog: DialogOptionsType = {
        show: false,
        type: 'alert',
        title: '提示',
        content: '内容',
        confirm: false,
        cancel: false,
        toastList: []
    }

    /**
     * 打开消息提示组件
     * @param options 设置参数
     */
    public openDialog(options: ShowDialogOptionsType) {
        const THAT = this;
        this.dialog.show = true;
        this.dialog.type = options.type;
        this.dialog.title = options.title || '提示';
        this.dialog.content = options.content || 'loading';
        this.dialog.confirmText = options.confirmText || '确认';
        this.dialog.cancelText = options.cancelText || '取消';
        this.dialog.confirm = false;
        this.dialog.cancel = false;
        const confirmCallback = options.confirm || null;
        const cancelCallback = options.cancel || null;
        // 取消回调监听
        this.watch_confirm = this.watch_cancel = null;
        if (confirmCallback) {
            this.watch_confirm = Object.defineProperty(this.dialog, 'confirm', {
                set(val) {
                    // console.log('设置 confirm', val);
                    if (val && THAT.watch_confirm) {
                        confirmCallback();
                    }
                }
            });
        }
        if (cancelCallback) {
            this.watch_cancel = Object.defineProperty(this.dialog, 'cancel', {
                set(val) {
                    // console.log('设置 cancel', val);
                    if (val && THAT.watch_cancel) {
                        cancelCallback();
                    }
                }
            });
        }
    }

    /** 隐藏消息提示组件 */
    public hideDialog() {
        this.dialog.show = false;
    }

    /**
     * 显示提示
     * @param tip 提示文字
     * @param time 消失时间（毫秒）
     */
    public showToast(tip: toastListType['text'], time: number = 2000) {
        this.toastId ++;
        let obj: toastListType = {
            text: tip,
            id: this.toastId
        }
        this.dialog.toastList.push(obj);
        setTimeout(() => {
            if (this.dialog.toastList.length) {
                this.dialog.toastList.shift();
            }
        }, time);
    }
}

/** 全局模块 */
const Global = new ModuleGlobal();

export default Global;