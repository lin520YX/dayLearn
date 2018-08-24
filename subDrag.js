class Subscribe{
	constuctor(){
		this.prod=[];
	}
	add(fn){
		let prods= this.prod,exist = false;
		prods.forEach((item,index)=>item==fn?null:exist=false)
		!exist?prods.push(fn):null
	}
	remove(fn){
		for(let i=0;i<this.prod.length;i++){
			let cur = this.prod[i];
			if(cur==fn){
				cur=null;
			}
		}
	}
	fire(...arg){
		for(let i=0;i<this.prods.length;i++){
			let cur= this.prods[i]
			if(!cur){
				 this.prods.splice(i, 1);
                 i--;
                  continue;
			}
			cur(...arg);
		}
	}
}
Function.prototype.myBind = function myBind(context,...arg) {
	let _this= this;
	return function anonmys(...oArg){
		_this.apply(context,[...arg,...oArg]);
	}
};
class Drag{
	constuctor(ele,options={}){
		 let {selector = ele} = options;
         this.ele = ele;
         this.dragTarget = selector;
            if (typeof selector === 'string') {
                this.dragTarget = document.querySelector(`${ele} > ${selector}`)[0];
            }
         this.dragStart = new Subscribe();
         this.draging = new Subscribe();
         this.dragEnd = new Subscribe()
         this.dragTarget.addEventListener('mousedown', this.down.bind(this));
	}
	down(ev){
		this.startX = ev.clientX;
		this.startY = ev.clientY;
		this.startL = window.getComputedStyle(this.dragTarget).left;
		this.startT = window.getComputedStyle(this.dragTarget).top;
		this.MOVE = this.move.myBind(this)
		this.UP=  this.up.myBind(this)
		document.addEventListener('mousemove', this.MOVE);
        document.addEventListener('mouseup', this.UP);
        this.dragStart.fire(this,ev);
	}
	move(ev){
		let curX = ev.clientX-this.startX + this.startL;
		let curT = ev.clientY-this.startY + this.startT;
		this.dragTarget.display.left = curX+ 'px';
		this.dragTarget.display.top = curT + 'px';
		this.draging.fire(this,ev);
	}
	up(ev){
		   document.removeEventListener('mousemove', this.MOVE);
    	   document.removeEventListener('mouseup', this.UP);
		   this.dragEnd.fire(this, ev);
	}


}