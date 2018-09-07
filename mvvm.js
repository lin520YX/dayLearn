function Yf(options = {}) {
    this.$options = options;
    var data = this._data = options.data;
    console.log(data)
//    数据代理
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this[key] = this._data[key]
            },
            set(newVal) {
                this._data[key] = newVal
            }
        })
    }
    new Compile(options.el, this)
}
function Compile(el, vm) {
    //el表示被替换的范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment)

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node, index) => {
            let Test = node.textContent;
            let reg = /\{\{(.*)\}\}/g;
            if (node.nodeType == 3 && reg.test(Test)) {
                let arr = RegExp.$1.split('.'); //[a,a] [b]
                let val = vm;
                arr.forEach((key) => {
                    val = val[key];
                })
                node.textContent = Test.replace(/\{\{(.*)\}\}/, val)
            }
            if (node.childNodes) {
                replace(node)
            }
        })
    }
    vm.$el.appendChild(fragment)
}
function Observe(data) {
    for (let key in data) {
        let val = data[key];
        observe(val)
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                return val
            },
            set(newVal) {
                if (val == newVal) {
                    return;
                }
                val = newVal;
            }
        })
    }
}
//数据拦截
function observe(data) {
    if (typeof data !== 'object') {
        return;
    }
    return new Observe(data)
}