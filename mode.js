function Dep(){
    this.subs =[]
}
Dep.prototype.addSub=function(sub){
    this.subs.push(sub)
}
Dep.prototype.notify=function(){
    this.subs.forEach(item=>item.update())
};
function Watcher(fn){
    this.fn=fn;
}
Watcher.prototype.update=function(){
    this.fn()
};
// eg
let watcher=new Watcher(function(){
    console.log(1)
})
let dep = new Dep();
dep.addSub(watcher);
dep.notify();
