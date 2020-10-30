export default function theToast() {
    const styleId = "the_toast_style";
    function outputStyle() {
        const cssText = `
        .the_toast{ 
            position: fixed; 
            z-index: 999; 
            bottom: 20%; 
            left: 0; 
            text-align: center; 
            width: 100%; 
        }
        .the_toast_text{ 
            padding: 6px 15px; 
            box-sizing: border-box;
            max-width: 300px; 
            font-size: 14px; 
            color: #fff; 
            text-align: center; 
            border-radius: 2px; 
            background-color: rgba(0,0,0,0.45); 
            display: inline-block; 
            line-height: 26px; 
            animation: showToast 0.26s ease; 
            transition: 0.26s all;
        }
        @keyframes showToast {
            0% { opacity: 0; transform: translateY(100px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .the_toast_text_hide{ 
            opacity: 0; 
            transform: translateY(-80px); 
        }`;
        const styleLabel = document.createElement("style");
        styleLabel.textContent = cssText.replace(/(\n|\t|\s)*/ig, "$1").replace(/\n|\t|\s(\{|\}|\,|\:|\;)/ig, "$1").replace(/(\{|\}|\,|\:|\;)\s/ig, "$1");
        // console.log(cssText, styleLabel.textContent);
        styleLabel.id = styleId;
        document.head.appendChild(styleLabel);
    }

    /** 创建节点 */
    function createToast() {
        const node = document.createElement("div");
        const nodeText = document.createElement("div");
        node.className = "the_toast";
        nodeText.className = "the_toast_text";
        function removeToast() {
            nodeText.removeEventListener("transitionend", removeToast);
            node.parentNode.removeChild(node);
        }
        nodeText.addEventListener("transitionend", removeToast);
        node.appendChild(nodeText);
        return {
            node,
            nodeText
        }
    }

    if (!document.getElementById(styleId)) {
        outputStyle();
    }

    return {
        /**
         * 显示提示条
         * @param {string} value 内容
         * @param {number} duration 提示的时间 
         */
        showToast(value, duration = 1500) {
            const toast = createToast();
            toast.nodeText.innerHTML = value;
            toast.nodeText.addEventListener("animationend", function() {
                setTimeout(function() {
                    toast.nodeText.classList.add("the_toast_text_hide");
                }, duration);
            });
            document.body.appendChild(toast.node);
        }
    }
}