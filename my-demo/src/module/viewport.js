export default {
	//滚动条在Y轴上的滚动距离
	getScrollTop() {　　
		var [scrollTop, bodyScrollTop, documentScrollTop] = [0,0,0];　
		if (document.body) {　　　　
			bodyScrollTop = document.body.scrollTop;　　
		}　　
		if (document.documentElement) {　　　　
			documentScrollTop = document.documentElement.scrollTop;　　
		}　　
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		return Math.ceil(scrollTop); // 这里要向上取整，js的计算会有误导致到达底部不匹配　　
	},
	//文档的总高度
	getScrollHeight() {　　
		var [scrollHeight, bodyScrollHeight, documentScrollHeight] = [0,0,0];　　
		if (document.body) {　　　　
			bodyScrollHeight = document.body.scrollHeight;　　
		}　　
		if (document.documentElement) {　　　　
			documentScrollHeight = document.documentElement.scrollHeight;　　
		}　　
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
		return scrollHeight;
	},
	//浏览器视口的高度
	getWindowHeight() {　　
		var windowHeight = 0;　　
		if (document.compatMode == "CSS1Compat") {　　　　
			windowHeight = document.documentElement.clientHeight;　　
		} else {　　　　
			windowHeight = document.body.clientHeight;　　
		}　　
		return windowHeight;
	}
}
