class ModuleUtils {
    // constructor() {

    // }

    /**
     * rem 适配
     * @param el 指定节点
     */
    public remSetting(el: HTMLElement) {
        const html = document.documentElement;
        /** 比例值 */
        const value = 375 / 50;
        /** 视口宽度 */
        let width = el.clientWidth;
        html.style.fontSize = width / value + 'px';
        // 窗口变动时更新适配
        window.addEventListener('resize', function () {
            width = el.clientWidth;
            html.style.fontSize = width / value + 'px';
        });
    }

    /** 检查是否移动端 */
    public isMobile() {
        const pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
        return pattern.test(navigator.userAgent); //  ? 'Mobile' : 'Desktop';
    }
    
    /**
     * 范围随机数
     * @param min 最小数
     * @param max 最大数
     */
    public ranInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 随机打乱数组
     * @param array 
     */
    public shuffleArray<T>(array: Array<T>) {
        // 洗牌随机法（性能最优）
        for (let i = array.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = itemAtIndex;
        }
        return array;
    }
}

/** 工具类 */
const utils = new ModuleUtils();

export default utils;
