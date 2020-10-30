import { reactive } from "vue";

class ModuleStore {

    /** 订单信息 */
    orderInfo = reactive({
        /** 订单名 */
        name: "订单" + Math.random().toString(36).substr(2),
        /** 订单日期 */
        date: "2018/12/12 12:12:12",
        /** 
         * 订单状态 
         * @type {"ok"|"fail"|"invalid"|"wait"} 完成 | 失败 | 无效 | 待支付
        */
        state: "ok"
    })

}

/** 状态管理模块 */
const store = new ModuleStore;

export default store;
