function Yf(options = {}) {
    this.$options = options;
    var data = this._data = options.data;
    observe(data)
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
    replace(fragment);
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node, index) => {
            let Test = node.textContent;
            let reg = /\{\{(.*)\}\}/g;
            if (node.nodeType == 3 && reg.test(Test)) {
                let arr = RegExp.$1.split('.'); //[a,a] [b]
                let val = vm;
                arr.forEach((key) => {
                    val = val[key];
                });
                //替换逻辑
                new Watcher(vm,RegExp.$1,function(newVal){ //需要接收一个新值
                    console.log(newVal)
                    node.textContent = Test.replace(/\{\{(.*)\}\}/, newVal)
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
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        observe(val)
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                console.log('ddd')
                Dep.target&&dep.addSub(Dep.target)
                return val
            },
            set(newVal) {
                if (val == newVal) {
                    return;
                }
                val = newVal;
                observe(newVal)
                dep.notify()
            }
        })
    }
}
//数据拦截
function observe(data) {
    console.log(data)
    if (typeof data !== 'object') {
        return;
    }
    return new Observe(data)
}

function Dep(){
    this.subs =[]
}
Dep.prototype.addSub=function(sub){
    this.subs.push(sub)
}
Dep.prototype.notify=function(){
    this.subs.forEach(item=>item.update())
};
//添加到订阅的当中
function Watcher(vm,exp,fn){
    this.fn = fn;
    this.vm = vm;
    this.exp= exp;
    Dep.target = this;
    let val =vm;
    let arr = exp.split('.');
    arr.forEach(item=>{
        val=val[item];
    })
    Dep.target=null;

}
Watcher.prototype.update=function(){
    let val=this.vm;
    let arr =this.exp.split('.');
    arr.forEach(item=>{
        val=val[item];
    })
    this.fn(val)
};