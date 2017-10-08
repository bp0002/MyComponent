var App = {};
App.prototype.myAddEvent = founction(obj, event0, func) {
		if (obj.attachEvent) {
			obj.attachEvent("on" + event0, func);
			return true;
		}else if(obj.addEventListener){
			obj.addEventListener(event0, func, false);
			return true;
		}else{
			return false;
		};
};
(function(App){
    /**
     * 分页选择器
     * Paging selector
     * @param {*} container Dom-parent, Need to have enough width. min-width 446px -> Base Chinese Template.
     * @param {*} pagesNum  Number of total pages.
     */
    function PagesSelectorModel(container, pagesNum, startIndex){

        this.parenteDIV = container;
        this.container = document.createElement("div");
        this.container.className = "m-pagesselector";
        container.appendChild(this.container);
        this.startPageIndex = startIndex;
        this.pageTotal = pagesNum;
        this.index = 0;
        this.maxCount = 8;
        this.txtFirst = "第一页";
        this.txtLast = "上一页";
        this.txtNext = "下一页";
        this.txtFinal = "尾页";
        this.txtWidth = 11; // 字符size
        this.btnHeight = 31; // 页码按钮高度，依据按钮图片
        this.btnWidth =  29; // 页码按钮宽度
        this.btns = [];
        this.blankWidth = 10;
        this.createNew();
    }
    // 创建
    // create
    PagesSelectorModel.prototype.createNew = function(){
        this.actionWidth = (this.txtFirst.length + this.txtLast.length + this.txtNext.length +this.txtFinal.length)*this.txtWidth +8*this.blankWidth;
        var tempWidth = this.parenteDIV.offsetWidth - this.actionWidth;
        // 宽度不足以放下至少一个页码
        if (tempWidth <= this.btnWidth) return false;
        this.nFirst = document.createElement("i");
        this.nFirst.style.width = this.txtFirst.length*this.txtWidth + 2*this.blankWidth + 'px';
        this.nFirst.style.lineHeight = this.btnHeight + 'px';
        this.nFirst.style.height = this.btnHeight + 'px';
        this.nFirst.innerHTML = this.txtFirst;
        this.nLast = document.createElement("i");
        this.nLast.style.width = this.txtLast.length*this.txtWidth + 2*this.blankWidth + 'px';
        this.nLast.style.lineHeight = this.btnHeight + 'px';
        this.nLast.style.height = this.btnHeight + 'px';
        this.nLast.innerHTML = this.txtLast;
        this.nNext = document.createElement("i");
        this.nNext.style.width = this.txtNext.length*this.txtWidth + 2*this.blankWidth + 'px';
        this.nNext.style.lineHeight = this.btnHeight + 'px';
        this.nNext.style.height = this.btnHeight + 'px';
        this.nNext.innerHTML = this.txtNext;
        this.nFinal = document.createElement("i");
        this.nFinal.style.width = this.txtFinal.length*this.txtWidth + 2*this.blankWidth + 'px';
        this.nFinal.style.lineHeight = this.btnHeight + 'px';
        this.nFinal.style.height = this.btnHeight + 'px';
        this.nFinal.innerHTML = this.txtFinal;

        this.nList = document.createElement("ul");
        this.container.appendChild(this.nFirst);
        this.container.appendChild(this.nLast);
        this.container.appendChild(this.nList);
        this.container.appendChild(this.nNext);
        this.container.appendChild(this.nFinal);
        
        this.btnCount = Math.min(this.maxCount, Math.floor(tempWidth / this.btnWidth), this.pageTotal);
        this.nList.style.width = this.btnCount * this.btnWidth + 'px';
        this.nList.style.height = this.btnHeight + 'px';
        this.container.style.width = this.btnCount * this.btnWidth + this.actionWidth + 'px';
        this.container.style.height = this.btnHeight + 'px';
        for (var i = 0; i<this.btnCount; i++){
            var li = document.createElement("li");
            var pageIndex = i+this.startPageIndex ;
            li.style.height = this.btnHeight + 'px';
            li.style.width = this.btnWidth + 'px';
            li.style.lineHeight = this.btnHeight + 'px';
            li.setAttribute("data-index", i);
            li.setAttribute("data-pageindex", pageIndex);
            li.innerHTML = pageIndex;
            this.nList.appendChild(li);
            this.btns.push(li);
        }
        App.myAddEvent(this.nList, 'click', function(event){
            if (event.target.nodeName == 'LI'){
                var index = event.target.dataset.index;
                if (this.index != index) {
                    this.toindex(index);
                }
            }
        }.bind(this));
        App.myAddEvent(this.nFirst, 'click', function(event){
            this.toFirst();
        }.bind(this));
        App.myAddEvent(this.nLast, 'click', function(event){
            this.toLast();
        }.bind(this));
        App.myAddEvent(this.nNext, 'click', function(event){
            this.toNext();
        }.bind(this));
        App.myAddEvent(this.nFinal, 'click', function(event){
            this.toFinal();
        }.bind(this));
    }
    // 点击第一页
    // first page click
    PagesSelectorModel.prototype.toFirst = function(){
        this.changeStartIndex(1);
        this.changeToIndex(0);
    }
    // 点击末页
    // final page click
    PagesSelectorModel.prototype.toFinal = function(){
        if (this.pageTotal > this.startPageIndex + this.btnCount -1){
            this.changeStartIndex(this.pageTotal - this.btnCount +1);
        }
        this.changeToIndex(this.btnCount - 1);
    }
    // 点击上一页
    // last page click
    PagesSelectorModel.prototype.toLast = function(){
        if (this.index > 0) {
            this.changeToIndex(this.index -1);
        }else{
            if (this.startPageIndex < this.pageTotal){
                this.changeStartIndex(this.startPageIndex +1);
                this.changeToIndex(this.index);
            }
        }
    }
    // 点击下一页
    // next page click
    PagesSelectorModel.prototype.toNext = function(){
        if (this.index < this.btnCount -1) {
            this.changeToIndex(this.index +1);
        }else{
            if (this.startPageIndex < 1){
                this.changeStartIndex(this.startPageIndex +1);
                this.changeToIndex(this.index);
            }
        }
    }
    // 点击对应页码
    // page click with data-index
    PagesSelectorModel.prototype.toindex = function(index){
        this.changeToIndex(index);
    }
    // 选择指示器以外的页面
    PagesSelectorModel.prototype.changeStartIndex = function(pageindex){
        if (this.startPageIndex != pageindex) {
            this.startPageIndex = pageindex;
            for (var i=0; i<this.btns.length; i++){
                var li = this.btns[i];
                var index = i+this.startPageIndex;
                li.className = "i-pagebtn";
                li.setAttribute("data-pageindex", index);
                li.innerHTML = index;
            }
        }
    }
    // 指示器变化
    PagesSelectorModel.prototype.changeToIndex = function(index){
        for (var i=0; i<this.btns.length; i++){
            var li = this.btns[i];
            li.className = "";
            if (i==index) li.className = "z-active";
        }
        this.changeToPageIndex(this.startPageIndex + parseInt(index));
        this.index = index;
    }
    /**
     * 设置页面切换
     * f: 创建者的页面选择事件
     */
    PagesSelectorModel.prototype.setChangeEvent = function(f){
        this.changeEvent = f;
    }
    /**
     * 页面切换的响应
     * index: 页面序号
     */
    PagesSelectorModel.prototype.changeToPageIndex = function(pageindex){
        if (this.changeEvent) this.changeEvent(pageindex);
    }

    App.PagesSelectorModel = PagesSelectorModel
})(window.App);
