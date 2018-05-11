class Ddr {
    constructor (el) {
        if (!el) return console.log('没有可下拉的元素');
        this._page = document.querySelector(el);
        this._layer = document.createElement('div');
        this._layer.style.cssText = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0);z-index: 100;';
        this._pagetitle = document.createElement('div');
        this._pagetitle.className = 'refresh_title';
        this._pagetitle.innerHTML = '<div class="icon_refresh"></div><div class="preloader hide"><span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span></div>';
    }
    getAnimation (_time) {
        this._page.style.WebkitTransition = this._page.style.transition = `${ _time }s all`;
        this._pagetitle.style.WebkitTransition = this._pagetitle.style.transition = `${ _time }s all`;
    }
    setStyle (_num) {
        this._page.style.WebkitTransform = this._page.style.transform = `translate3d(0px, ${ _num }px, 0px)`;
        this._pagetitle.style.WebkitTransform = this._pagetitle.style.transform = `translate3d(0px, ${ _num }px, 0px)`;
    }
    start (_parms, fn, numFn) {
        let rootNode = 0,
            _icon = this._pagetitle.querySelector('.icon_refresh'),
            _loading = this._pagetitle.querySelector('.preloader'),
            _max = _parms.height || 100,
            _drift = _parms.padding || 0,
            _sd = 0,
            _ed = 0,
            _range = 0;
        this._page.parentNode.insertBefore(this._pagetitle, this._page);
        this._pagetitle.style.height = _max + 'px';
        this._pagetitle.style.top = -_max + _drift + 'px';
        this._page.addEventListener('touchstart', ev => {
            _sd = ev.touches[0].pageY;
            this.getAnimation(0);
        });
        this._page.addEventListener('touchmove', ev => {
            rootNode = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            if (rootNode != 0) return;
            _ed = ev.touches[0].pageY;
            _range = Math.floor(_ed-_sd);
            if (_range > 0) {
                ev.preventDefault();
                _range = _range - (_range * 0.5);
                _icon.style.WebkitTransform = _icon.style.transform = `rotate(${ 180 * (_range/_max) }deg)`;
                if (_range > _max) {
                    _icon.classList.add('hide');
                    _loading.classList.remove('hide');
                }else {
                    _icon.classList.remove('hide');
                    _loading.classList.add('hide');
                }
                this.setStyle(_range);
                if (typeof numFn === 'function') numFn(_range);
            }
        });
        this._page.addEventListener('touchend', ev => {
            this.getAnimation(0.3);
            if (_range > _max && _range > 1 && rootNode == 0) {
                this.setStyle(_max);
                document.body.appendChild(this._layer);
                if (typeof fn === 'function') fn.call(this);
            }else {
                this.setStyle(0);
            }
        });
    }
    end () {
        document.body.removeChild(this._layer);
        this.getAnimation(0.3);
        this.setStyle(0);
    }
}
export default Ddr
