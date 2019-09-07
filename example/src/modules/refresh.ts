export default class DropDownRefresh {
    /**
     * 下拉刷新
     * @param name class|id|<label> 
     */
    constructor(name: string) {
        const page: any = document.querySelector(name);
        this.page = page;
        this.layer = document.createElement('div');
        this.layer.style.cssText = 'position: fixed;top: 0;left: 0;width: 100vh;height: 100vh;background-color: rgba(0,0,0,0);z-index: 100;';
    }

    /** 下拉时遮罩层 */
    private layer: HTMLElement;

    /** 下拉节点整体 */
    private page: HTMLElement;
    
    /**
     * 设置动画
     * @param time 动画时间（秒）
     */
    private getAnimation(time: number) {
        this.page.style.transition = `${time}s all`;
    }
    
    /**
     * 滑动距离设置
     * @param num 滑动的距离（像素）
     */
    private setStyle(num: number) {
        this.page.style.transform = `translate3d(0px, ${num}px, 0px)`;
    }
    
    /**
     * 监听开始刷新
     * @param max 下拉距离（像素）
     * @param callback 下拉回调距离函数
     * @param rangeCallback 回调距离函数 如果有需要
     */
    public onStart(max: number = 100, callback: Function, rangeCallback?: (num: number) => void) {
        /** 顶部距离 */
        let scrollTop = 0;
        /** 开始距离 */
        let sd = 0;	
        /** 结束距离 */
        let ed = 0;	
        /** 最后移动的距离 */
        let range = 0;	

        // 触摸开始
        this.page.addEventListener('touchstart', ev => {
            sd = ev.touches[0].pageY;
            this.getAnimation(0);
        });

        // 触摸移动
        this.page.addEventListener('touchmove', ev => {
            scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            // 没到达顶部就停止
            if (scrollTop != 0) return;
            ed = ev.touches[0].pageY;
            range = Math.floor(ed - sd);
            // 判断如果是下滑才执行
            if (range > 0) {
                // 阻止浏览自带的下拉效果
                ev.preventDefault();
                // 最主要的物理回弹公式计算距离
                range = range - (range * 0.5);
                this.setStyle(range);
                // 回调距离函数 如果有需要
                if (rangeCallback) rangeCallback(range);
            }
        });

        // 触摸结束
        this.page.addEventListener('touchend', () => {
            this.getAnimation(0.3);
            // console.log(`移动的距离：${range}, 最大距离：${max}`);
            if (range > max && range > 1 && scrollTop == 0) {
                this.setStyle(max);
                document.body.appendChild(this.layer);
                // 阻止往上滑动
                this.layer.ontouchmove = e => e.preventDefault();
                // 回调成功下拉到最大距离并松开函数
                if (callback) callback.call(this);
            } else {
                this.setStyle(0);
            }
        });
    }

    /** 下拉结束 */
    public end() {
        const parent = this.layer.parentNode;
        if (parent) parent.removeChild(this.layer);
        this.getAnimation(0.3);
        this.setStyle(0);
    }
}