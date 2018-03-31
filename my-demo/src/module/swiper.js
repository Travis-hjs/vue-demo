/*
	使用方法：
	Swiper（{
		el: '挂载的容器'，
		pagination: true, 	是否需要底部圆点
		autoPaly: true,		是否自动播放
		interval: 3000,		自动播放的间隔（毫秒）
		loop: true,			是否需要环路	默认不循环
		moveTime: 400,		运动的时间（毫秒）默认300
		direction: true		是X平移还是Y平移 默认 false X平移
	}）
*/
function Swiper (_params) {
	let [_pagination, _loop, _direction, _moveTime, _autoPaly, _interval] = [false, false, false, 300, false, 3000];
	let touch = (_div, _w, _h) => {
		let _ul = _div.querySelector('.swiper_list');
		let _li = _ul.querySelectorAll('.swiper_slider');
		let _btn = _div.querySelectorAll('.swiper_btn');
		let [sTime, eTime, _sd, _ed, _eState, _md, _index, _t, _loopNum] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let _distance = _direction ? _h : _w;
		window.myAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		function hasAnimation() {
			_ul.style.WebkitTransition = `${_moveTime/1000}s all`;
			_ul.style.transition = `${_moveTime/1000}s all`;
		}
		function noAnimation() {
			_ul.style.WebkitTransition = '0s all';
			_ul.style.transition = '0s all'
		}
		function slideStyle(_num) {
			if (_direction) {
				_ul.style.WebkitTransform = `translate3d(0px, ${_num}px, 0px)`;
				_ul.style.transform = `translate3d(0px, ${_num}px, 0px)`;
			}else {
				_ul.style.WebkitTransform = `translate3d(${_num}px, 0px, 0px)`;
				_ul.style.transform = `translate3d(${_num}px, 0px, 0px)`;
			}
		}
		function touchRange() {
			let _num = 0;
			if ((_ed - _sd) >= _distance) {
				_num = _md + _distance;
			}else if ((_ed - _sd) <= -_distance) {
				_num = _md - _distance
			}else {
				_num = _md + (_ed - _sd);
			}
			return _num;
		}
		function judgeTouch(_d) {
			if ((eTime - sTime) < 200) return true;
			if (_d < 0) {
				if ((_ed - _sd) < (_d/2)) return true;
				return false
			}else {
				if ((_ed - _sd) > (_d/2)) return true;
				return false
			}
		}
		function returnP () {
			hasAnimation();
			slideStyle(_md);
		}
		function slideMove (_d) {
			hasAnimation();
			slideStyle(_d);
			_loopNum = 0;
			if (_loop && _index < 0) {
				function loopMoveMin() {
					_loopNum += 1;
					if (_loopNum < _moveTime/1000*60) return myAnimation(loopMoveMin);
					noAnimation();
					slideStyle(_distance * -(_li.length-3));
					_md = _distance * -(_li.length-3);
				}
				loopMoveMin()
				_index = _li.length-3;
			}else if (_loop && _index > _li.length-3) {
				function loopMoveMax() {
					_loopNum += 1;
					if (_loopNum < _moveTime/1000*60) return myAnimation(loopMoveMax);
					noAnimation();
					slideStyle(0);
					_md = 0;
				}
				loopMoveMax()
				_index = 0;
			}
			if (_pagination) {
				_div.querySelector('.swiper_btn_active').className = 'swiper_btn';
				_btn[_index].classList.add('swiper_btn_active');
			}
		}
		function judgeMove() {
			if (_ed < _sd) {
				if (judgeTouch(-_distance)) {
					if (!_loop && _md === -(_li.length-1) * _distance) return returnP();
					_index += 1;
					slideMove(_md - _distance);
					_md -= _distance;
				}else returnP();
			}else {
				if (judgeTouch(_distance)) {
					if (!_loop && _md === 0) return returnP();
					_index -= 1;
					slideMove(_md + _distance);
					_md += _distance;
				}else returnP();
			}
		}
		function autoMove() {
			if (_loop) {
				_index += 1;
				slideMove(_md - _distance);
				_md -= _distance;
			}else {
				if (_index >= _li.length-1) {
					_index = 0;
					slideMove(0);
					_md = 0;
				}else {
					_index += 1;
					slideMove(_md - _distance);
					_md -= _distance;
				}
			}
		}
		function startAuto () {
			_t += 1;
			if (_t < _interval/1000*60) return myAnimation(startAuto);
			_t = 0;
			autoMove();
			startAuto()
		}
		if (_autoPaly) startAuto();
		_ul.addEventListener('touchstart', ev => {
			[sTime, _t, _loopNum] = [new Date().getTime(), 0, _moveTime/1000*60]
			noAnimation();
			_sd = _direction ? ev.touches[0].pageY : ev.touches[0].pageX;
		});
		_ul.addEventListener('touchmove', ev => {
			ev.preventDefault();
			_t = 0;
			_ed = _direction ? ev.touches[0].pageY : ev.touches[0].pageX;
			slideStyle(touchRange());
		});
		_ul.addEventListener('touchend', () => {
			eTime = new Date().getTime();
			if (_eState !== _ed) judgeMove();
			// console.log(`new:${_index}`);	//这里可以做触发回调
			[_eState, _t] = [_ed, 0];
		});
	}
	let layout = (_div, _w, _h) => {
		let [_ul, _li] = [_div.querySelector('.swiper_list'), _div.querySelectorAll('.swiper_slider')];
		if (_direction) {
			for (let i = 0; i < _li.length; i++) {
				_li[i].style.height = `${_h}px`;
			}
		}else {
			_ul.style.width = `${_w * _li.length}px`;
			for (let i = 0; i < _li.length; i++) {
				_li[i].style.width = `${_w}px`;
			}
		}
		touch(_div, _w, _h);
	}
	let outputLoop = (_div, _w, _h) => {
		let _ul = _div.querySelector('.swiper_list');
		let _li = _ul.querySelectorAll('.swiper_slider');
		let _first = _li[0].cloneNode(true);
		let _last = _li[_li.length-1].cloneNode(true);
		_ul.insertBefore(_last, _li[0]);
		_ul.appendChild(_first);
		if (_direction) {
			_ul.style.top = `${-_h}px`;
		}else {
			_ul.style.left = `${-_w}px`;
		}
		layout(_div, _w, _h)
	}
	let outputPagination = _div => {
		let _btnList = _div.querySelector('.swiper_pagination');
		let _liNum = _div.querySelectorAll('.swiper_slider').length;
		let _html = '';
		for (let i = 0; i < _liNum; i++) {
			_html += '<div class="swiper_btn"></div>'
		}
		_btnList.innerHTML = _html;
		_btnList.querySelector('.swiper_btn').classList.add('swiper_btn_active');
	}
	let format = _el => {
		let _swiper = document.querySelector(_el);
		let [_moveWidth, _moveHeight] = [_swiper.offsetWidth, _swiper.offsetHeight];
		if (_pagination) outputPagination(_swiper);
		if (_loop) {
			outputLoop(_swiper,_moveWidth,_moveHeight);
		}else {
			layout(_swiper,_moveWidth,_moveHeight);
		}
	}
	let init = () => {
		_pagination = _params.pagination || false;
		_direction = _params.direction || false;
		_autoPaly = _params.autoPaly || false;
		_loop = _params.loop || false;
		_moveTime = _params.moveTime || 300;
		_interval = _params.interval || 3000;
		if (!_params.el) return console.log('没有可执行的元素！');
		format(_params.el);
	}
	init();
}
export default Swiper
