class Table{
	constructor(container,option = {}){
		if(container == undefined){
				throw new SyntaxError('xxxxxxxxxx');
		}

		let default ={
			eventType : 'mouseover',
			lastIndex:0,
			customPageClass: 'option',
            customContentClass: 'con'
		}
		 for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    _default[attr] = options[attr];
                }
            }
         for (let attr in _default) {
                if (_default.hasOwnProperty(attr)) {
                    this[attr] = _default[attr];
                }
         }
         // 获取所有子元素
         this.container = container;
         let tTitles = [...container.children];
         let tTarget = tTitles.find(item => this.hasClass(item, this.customPageClass))
      	 this.options=tTarget?[...tTarget.children]:null;
      	 this.cons=tTitles.filter(item => this.hasClass(item, this.customContentClass));
      	 this.options.forEach((item, index) => {
                if (index === this.lastIndex) {
                    this.addClass(this.optionList[index], 'active');
                    this.addClass(this.conList[index], 'active');
                    return;
                }
                this.removeClass(this.optionList[index], 'active');
                this.removeClass(this.conList[index], 'active');
            });
       this.changeTab();
	}
	changeTab(){
		this.options.forEach((item,index)=>{
			let _this = this;
			item[`on${this.eventType}`]=function anonmonys(){
				 if (_this.lastIndex === index) return;
                    _this.addClass(this, 'active');
                    _this.removeClass(_this.options[_this.lastIndex], 'active');

                    _this.addClass(_this.cons[index], 'active');
                    _this.removeClass(_this.cons[_this.lastIndex], 'active');
                    _this.lastIndex = index;
			}
		})
	}
    hasClass(ele, str) {
            return ele.className.trim().split(/ +/).indexOf(str) >= 0;
    }

    addClass(ele, str) {
            if (this.hasClass(ele, str)) return;
            ele.className += ` ${str}`;
    }

    removeClass(ele, str) {
            if (!this.hasClass(ele, str)) return;
            ele.className = ele.className.trim().split(/ +/).filter(item => item !== str).join(' ');
    }
}