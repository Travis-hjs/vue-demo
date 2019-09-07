import utils from "./utils";

/** 水波纹节点对象池 */
const RIPPLE_POOL: Array<HTMLElement> = [];

/**
 * 点击水波纹
 * @param event 点击事件
 * @param target 点击目标
 */
function ripple(event: any, target: HTMLElement) {
    /** 水波纹动画节点 */
    let node: HTMLElement;

    // 从对象池里面拿取节点
    if (RIPPLE_POOL.length > 1) {
        const item: any = RIPPLE_POOL.shift();
        node = item;
    } else {
        node = document.createElement('div');
        node.className = 'ripple';
    }

    /** 点击目标矩阵尺寸 */
    let rect = target.getBoundingClientRect();
    /** 当前自定义颜色值 */
    let color = target.getAttribute('color');
    /** 波纹大小 */
    let size = Math.max(rect.width, rect.height);
    // 设置最大范围
    if (size > 200) size = 200;
    // 设置大小
    node.style.height = node.style.width = size + 'px';
    // 默认是白色透明
    node.style.backgroundColor = color || 'rgba(255, 255, 255, .45)';
    // 这里必须输出节点后再设置位置，不然会有问题
    target.appendChild(node);

    let y: number = event.touches ? event.touches[0].clientY : event.clientY;
    let x: number = event.touches ? event.touches[0].clientX : event.clientX;
    let top = y - rect.top - (node.offsetHeight / 2);
    let left = x - rect.left - (node.offsetWidth / 2);
    
    node.style.top = top + 'px';
    node.style.left = left + 'px';

    function an() {
        node.removeEventListener('animationend', an);
        // console.log('动画结束', node);
        target.removeChild(node);
        RIPPLE_POOL.push(node);
    }
    node.addEventListener('animationend', an);
}

/** 是否移动端 */
let isMobile = utils.isMobile();

let eventType = isMobile ? 'touchstart' : 'mousedown';

document.body.addEventListener(eventType, function (e) {
    const event: any = e || window.event || arguments.callee.caller.arguments[0];
    let loop_count = 3; 
    let target: HTMLElement = event.target;
    let parent: any = null;
    while (loop_count > 0 && target && target != document.body) {
        loop_count--;
        if (target.hasAttribute('ripple')) {
            ripple(event, target);
            break;
        }
        parent = target.parentNode;
        target = parent;
    }
});