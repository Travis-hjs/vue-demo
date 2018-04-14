//	开始下拉
function DropDownRefresh(params, fn, numFn) {
    const rootNode = document.body;
    let _el = params.el || 'body';
    let _page = document.querySelector(_el);
    let _max = params.maxRange || 100;
    const _titleBox = document.querySelector('.refresh_title');
    _titleBox.style.height = _max + 'px';
    _titleBox.style.top = -_max + 'px';
    let [_sd, _ed, _range] = [0, 0, 0];
    function getAnimation(el, time) {
        el.style.WebkitTransition = `${ time }s all`;
        el.style.transition = `${ time }s all`;
    }
    function slideStyle (el, _num) {
        el.style.WebkitTransform = `translate3d(0px, ${ _num }px, 0px)`;
        el.style.transform = `translate3d(0px, ${ _num }px, 0px)`;
    }
    function outPutLayer () {
        let _layer = document.createElement('div');
        _layer.className = 'refresh_bg';
        document.body.appendChild(_layer);
    }
    _page.addEventListener('touchstart', ev => {
        _sd = ev.touches[0].pageY
        getAnimation(_page, 0)
        getAnimation(_titleBox, 0)
    });
    _page.addEventListener('touchmove', ev => {
        if (rootNode.scrollTop != 0) return ;
        _ed = ev.touches[0].pageY;
        _range = Math.floor(_ed-_sd);
        if (_range > 0) {
            ev.preventDefault();
            _range = _range-(_range*0.5);
            slideStyle(_page, _range);
            slideStyle(_titleBox, _range);
            if (typeof numFn === 'function') numFn(_range);
        }
    });
    _page.addEventListener('touchend', ev => {
        getAnimation(_page, 0.3);
        getAnimation(_titleBox, 0.3);
        if (_range > _max && _range > 1 && rootNode.scrollTop == 0) {
            slideStyle(_page, _max);
            slideStyle(_titleBox, _max);
            outPutLayer();
            if (typeof fn === 'function') fn.call(this);
        }else {
            slideStyle(_page, 0);
            slideStyle(_titleBox, 0);
        }
    });
}
// 结束下拉功能
function RefreshEnd(el) {
    document.body.removeChild(document.querySelector('.refresh_bg'));
    let [_page, _titleBox] = [document.querySelector(el), document.querySelector('.refresh_title')];
    function resetStyle(el) {
        el.style.WebkitTransition = '0.3s all';
        el.style.transition = '0.3s all';
        el.style.WebkitTransform = 'translate3d(0px, 0px, 0px)';
        el.style.transform = 'translate3d(0px, 0px, 0px)';
    }
    resetStyle(_titleBox);
    resetStyle(_page);
}
export { DropDownRefresh, RefreshEnd }
