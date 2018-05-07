class Prompts {
    createNode () {
        let _box = document.createElement('div');
        _box.className = 'prompts';
        return _box;
    }
    output (_box, _num, _html, fun){
        _box.appendChild(_html);
        document.body.appendChild(_box);
        _box.style.backgroundColor = 'rgba(0,0,0,'+_num+')';
        setTimeout(() => {
            _box.style.opacity = 1;
            if (typeof fun === 'function') fun.call(this);
        }, 20);
    }
    removeThis (_box) {
        _box.style.opacity = 0;
        setTimeout(() => document.body.removeChild(_box), 241);
    }
    remove () {
        let _prompts = document.getElementsByClassName('prompts');
        if (!_prompts.length) return;
        for (let i = 0; i < _prompts.length; i++) this.removeThis(_prompts[i]);
    }
    alertMsg (_text = '内容', fn, _title = '提示') {
        let [_div, _module, _btn] = [this.createNode(), document.createElement('div'), document.createElement('div')];
        [_module.className, _btn.className, _btn.textContent] = ['prompt', 'callback_btn', '确认'];
        _module.innerHTML = '<h2>'+_title+'</h2><div class="text_box"><p>'+_text+'</p></div>';
        _module.appendChild(_btn);
        this.output(_div, .4, _module, () => {
            _module.classList.add('scale_in');
            _btn.addEventListener('click', () => {
                if (typeof fn === 'function') fn.call(this);
                _module.classList.add('scale_out');
                this.removeThis(_div);
            });
        });
    }
    confirmMsg (_text = '内容', Afn, _title = '提示', Bfn) {
        let [_div, _module, _Lbtn, _Rbtn] = [this.createNode(), document.createElement('div'),document.createElement('div'),document.createElement('div')];
        [_module.className, _Lbtn.className, _Lbtn.textContent, _Rbtn.className, _Rbtn.textContent] = ['confirm', 'callback_btn','取消','callback_btn callback_right','确认'];
        _module.innerHTML = '<h2>'+_title+'</h2><div class="text_box"><p>'+_text+'</p></div>';
        _module.appendChild(_Lbtn);
        _module.appendChild(_Rbtn);
        this.output(_div, .4, _module, () => {
            _module.classList.add('scale_in');
            _Rbtn.addEventListener('click', () => {
                if (typeof Afn === 'function') Afn.call(this);
                _module.classList.add('scale_out');
                this.removeThis(_div);
            });
            _Lbtn.addEventListener('click', () => {
                if (typeof Bfn === 'function') Bfn.call(this);
                _module.classList.add('scale_out');
                this.removeThis(_div);
            });
        });
    }
    loadBall () {
        let [_div, _module] = [this.createNode(), document.createElement('div')];
        _module.className = 'loding_ball';
        _module.innerHTML = '<div></div><div></div><div></div>';
        this.output(_div, .4, _module);
    }
    loading (_text = 'loading') {
        let [_div, _module] = [this.createNode(), document.createElement('div')];
        _module.className = 'loading_box';
        _module.innerHTML = '<div></div><p>'+_text+'</p>';
        this.output(_div, 0, _module);
    }
    toast (_text = 'toast', _time = 1500, fn) {
        let _module = document.createElement('div');
        _module.className = 'itoast';
        _module.textContent = _text;
        document.body.appendChild(_module);
        setTimeout(() => {
            _module.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(_module);
                if (typeof fn === 'function') fn.call(this);
            }, 200);
        }, _time);
    }
}
export default Prompts 