import { defineComponent, reactive } from "vue";
import utils from "../../utils";
import "./card.css";

const Card = defineComponent({
    props: {
        id: {
            type: [String, Number],
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        const images = [
            "https://muse-ui.org/img/img1.35d144b4.png",
            "https://muse-ui.org/img/img2.9bd96df4.png",
            "https://muse-ui.org/img/img3.6e264e66.png",
            "https://muse-ui.org/img/sun.a646a52d.jpg",
            "https://muse-ui.org/img/breakfast.f1098290.jpg"
        ]

        let count = 0;

        let loading = false;

        const state = reactive({
            src: images[count]
        })
        
        function switchImage() {
            if (loading) return utils.showToast("请等待上一张图片加载完成");
            loading = true;
            count++;
            if (count >= images.length) {
                count = 0;
            }
            state.src = images[count];
        }
        
        function loaded() {
            // console.log("加载完成");
            loading = false;
        }

        return () => (
            <div className="card the_card">
                <div className="flex fvertical card_info">
                    <div className="card_id">ID: {props.id}</div>
                    <div className="f1 card_title">title: {props.title}</div>
                    <button className="button button_purple" onClick={ switchImage }>切换组件图片</button>
                </div>
                <img src={state.src} onLoad={ loaded } />
            </div>
        )
    }
})
export default Card;