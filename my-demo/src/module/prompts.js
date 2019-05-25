/** 消息交互组件 */
class Dialogs {
    constructor() {}
    /** 创建整体 */
    createNode() {
        let el = document.createElement('div');
        el.className = 'prompts';
        return el;
    }

    /**
     * 输出节点
     * @param {Element} el 
     * @param {number} num 透明度
     * @param {Element} childNode 插入节点 
     * @param {Function} callback 回调
     */
    output(el, num, childNode, callback) {
        el.appendChild(childNode);
        document.body.appendChild(el);
        el.style.backgroundColor = 'rgba(0,0,0,' + num + ')';
        setTimeout(() => {
            el.style.opacity = 1;
            if (typeof callback === 'function') callback.call(this);
        }, 20);
    }

    /**
     * 清除节点
     * @param {Element} el 清除的节点
     */
    removeThis(el) {
        el.style.opacity = 0;
        setTimeout(() => el.parentNode.removeChild(el), 241);
    }

    /** 清除当前组件节点 */
    remove() {
        let layer = document.getElementsByClassName('prompts');
        if (!layer.length) return;
        for (let i = 0; i < layer.length; i++) this.removeThis(layer[i]);
    }

    /**
     * 确认提示框
     * @param {string} text 提示内容
     * @param {Function} callback 确认回调
     * @param {string} title 提示标题
     */
    alertMsg(text = '内容', callback, title = '提示') {
        let layer = this.createNode(), box = document.createElement('div'), button = document.createElement('div');
        [box.className, button.className, button.textContent] = ['prompt', 'callback_btn', '确认'];
        box.innerHTML = '<h2>' + title + '</h2><div class="text_box"><p>' + text + '</p></div>';
        box.appendChild(button);
        this.output(layer, .4, box, () => {
            box.classList.add('scale_in');
            button.addEventListener('click', () => {
                if (typeof callback === 'function') callback.call(this);
                box.classList.add('scale_out');
                this.removeThis(layer);
            });
        });
    }

    /**
     * 确认取消提示框
     * @param {string} text 提示内容
     * @param {Function} success 确认回调
     * @param {string} title 提示标题
     * @param {Function} cancel 取消回调
     */
    confirmMsg(text = '内容', success, title = '提示', cancel) {
        let layer = this.createNode(), box = document.createElement('div'), btn_left = document.createElement('div'), btn_right = document.createElement('div');
        [box.className, btn_left.className, btn_left.textContent, btn_right.className, btn_right.textContent] = ['confirm', 'callback_btn', '取消', 'callback_btn callback_right', '确认'];
        box.innerHTML = '<h2>' + title + '</h2><div class="text_box"><p>' + text + '</p></div>';
        box.appendChild(btn_left);
        box.appendChild(btn_right);
        this.output(layer, .4, box, () => {
            box.classList.add('scale_in');
            btn_right.addEventListener('click', () => {
                if (typeof success === 'function') success.call(this);
                box.classList.add('scale_out');
                this.removeThis(layer);
            });
            btn_left.addEventListener('click', () => {
                if (typeof cancel === 'function') cancel.call(this);
                box.classList.add('scale_out');
                this.removeThis(layer);
            });
        });
    }

    /** 显示加载动画球 */
    loadBall() {
        let layer = this.createNode(), box = document.createElement('div');
        box.className = 'loding_ball';
        box.innerHTML = '<div></div><div></div><div></div>';
        this.output(layer, .4, box);
    }

    /**
     * 显示加载中
     * @param {string} text 加载内容
     */
    loading(text = 'loading') {
        let layer = this.createNode(), box = document.createElement('div');
        box.className = 'loading_box';
        box.innerHTML = '<div></div><p>' + text + '</p>';
        this.output(layer, 0, box);
    }

    /**
     * 显示 toast 提示
     * @param {string} text 提示内容
     * @param {number} time 提示时间 (毫秒)
     * @param {Function} callback 结束回调
     */
    toast(text = 'toast', time = 1500, callback) {
        let box = document.createElement('div');
        box.className = 'itoast';
        box.textContent = text;
        document.body.appendChild(box);
        setTimeout(() => {
            box.style.opacity = 0;
            setTimeout(() => {
                box.parentNode.removeChild(box);
                if (typeof callback === 'function') callback.call(this);
            }, 200);
        }, time);
    }
}

/** 消息交互组件 */
const dialog = new Dialogs();

export default dialog;