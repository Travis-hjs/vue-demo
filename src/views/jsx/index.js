import { defineComponent, reactive, onMounted } from "vue";
import Card from "./card";
import utils from "../../utils";

import "./index.css"

const JsxBox = defineComponent({
    setup(props) {
        const state = reactive({
            /** 计数值 */
            count: 0,
            /** 输入绑定值 */
            inputValue: "",
            /**
             * 根节点
             * @type {HTMLElement}
             */
            root: null
        })
        
        /** 计数++ */
        function countAdd() {
            state.count ++;
        }
        
        onMounted(function() {
            
            console.log("props >>", props, state.root);
        })
        
        return () => (
            <div className="jsx-test card" ref={state.root}>
                <Card title="jsx-card" id="12" />
                <div className="code_box">计数：{ state.count } 输入框输入内容：{ state.inputValue }</div>
                <input vModel={ state.inputValue } placeholder="请输入内容"></input>
                <button className="button button_green" onClick={ countAdd }>计数加一</button>
            </div>
        );
    }
})

export default JsxBox