export interface toastListType {
    /** 提示文字 */
    text: string | number
    /** key-id */
    id: number
}

/** 打开消息提示设置参数 */
export interface DialogOptionsType {
    /** 是否显示 */
    show?: boolean
    /** 显示类型 */
    type: 'loading' | 'alert' | 'confirm'
    /** 提示框标题 */
    title?: string
    /** 提示框标题 */
    content?: string
    /** 是否点击确认 */
    confirm?: boolean
    /** 确认按钮文字 */
    confirmText?: string
    /** 是否点击取消 */
    cancel?: boolean,
    /** 取消按钮文字 */
    cancelText?: string
    /** 提示列表 */
    toastList: Array<toastListType>
}

/** 打开消息提示组件设置参数 */
export interface ShowDialogOptionsType {
    /** 显示类型 */
    type: 'loading' | 'alert' | 'confirm'
    /** 提示框标题 */
    title?: string
    /** 内容 */
    content?: string
    /** 点击确认回调 */
    confirm?: Function
    /** 确认按钮文字 */
    confirmText?: string
    /** 点击取消回调 */
    cancel?: Function
    /** 取消按钮文字 */
    cancelText?: string
}

/** ajax 传参对象 */
export interface AjaxType {
    /** 请求路径 */
    url: string
    /** 请求方法 */
    method: 'GET' | 'POST'
    /** 传参对象 */
    data: Object
    /** 上传图片 FromData */
    file?: FormData
    /** 成功回调 */
    success: (res: any) => void
    /** 失败回调 */
    fail: (err: XMLHttpRequest) => void
    /** 超时检测毫秒数 */
    overtime: number
    /** 超时回调 */
    timeout: (err: XMLHttpRequest) => void
    /** 进度回调 貌似没什么用  */
    progress?: () => void
}

/** 请求错误回调信息 */
interface RequestErrorInfo {
    /** 错误信息 */
    message: string
}

export interface RequestFail {
    (arg: RequestErrorInfo): void;
}

export interface RequestSuccess {
    (arg: any): void;
}

/** 轮播组件传参信息 */
export interface SwiperType {
    /** 组件节点 class|id|<label> */
    el: string
    /** 过渡时间（毫秒）默认 300 */
    moveTime?: number
    /** 自动播放间隔（毫秒）默认 3000 */
    interval?: number
    /** 是否需要回路 */
    loop?: boolean
    /** 是否垂直滚动 */
    vertical?: boolean
    /** 是否需要自动播放 */
    autoPaly?: boolean
    /** 是否需要底部圆点 */
    pagination?: boolean
}

export interface TodoListItemInfo {
    id: number
    text: string,
    active: boolean
}

interface QueueDataMenu {
    id: number
    text: string
}

interface QueueListInfo {
    id: number
    price: number,
    info: string
}

/** 排序过滤数据类型 */
export interface QueueData {
    /** 当选项前点击索引 */
    index: number
    /** 选项列表 */
    menu: Array<QueueDataMenu>
    /** 搜索的内容 */ 
    seachText: string | number
    /** 需要变动的数组 */
    queueList: Array<QueueListInfo>,
    /** 存放不变的数组 */
    goodsList: Array<QueueListInfo>
}

/** 下拉刷新组件传参类型 */
export interface RefreshInfo {
    /** 下拉元素 */
    el: HTMLElement
    /** 下拉距离[px] */
    distance?: number
    /** 下拉中的 icon html */
    loadIcon?: string,
    /** 顶部往下偏移量[px] */
    deviation?: number
}