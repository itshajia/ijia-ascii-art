namespace ijia {

    export abstract class DomObject extends EventEmitter {

        /**
         * @language zh_CN
         * 是否开启动画效果
         * */
        public animate:boolean = false;

        /**
         * @language zh_CN
         * 窗口宽度
         * */
        public windowWidth;

        /**
         * @language zh_CN
         * 窗口高度
         * */
        public windowHeight;

        /**
         * @language zh_CN
         * 交互方式
         * */
        public click:string;

        /**
         * @language zh_CN
         * 实例化
         * */
        public createElement:Function;

        /**
         * @language zh_CN
         * 元素容器
         * */
        public container:HTMLElement;

        /**
         * @language zh_CN
         * 元素
         * */
        public element:HTMLElement;

        /**
         * @language zh_CN
         * 是否禁用
         * */
        public disabled:boolean = true;

        /**
         * @language zh_CN
         * 是否隐藏
         * */
        public hided:boolean = false;

        /**
         * @language zh_CN
         * 是否激活
         * */
        public actived:boolean = false;

        /**
         * @language zh_CN
         * 睡眠中...
         * */
        public sleeping:boolean = false;

        /**
         * @language zh_CN
         * 睡眠计时器
         * */
        public sleepTimer;

        /**
         * @language zh_CN
         * 是否存在于文档中
         * */
        public appended:boolean = false;

        /**
         * @language zh_CN
         * 褪去状态
         * */
        public fadedIn:boolean = false;

        constructor() {
            super();
        }

        /**
         * @language zh_CN
         * 创建模板
         * */
        //abstract createTemplate();

        /**
         * @language zh_CN
         * 添加到舞台
         * */
        public append(parent:HTMLElement) {
            let ref;
            if (this.appended) return;
            if (this.element && this.element.parentNode) return;
            if (this.container) {
                if (ref = DOM.findOne(this.container, '.inner')) {
                    this.appended = true;
                    DOM.append(ref, this.element);
                } else {
                    this.appended = true;
                    DOM.append(this.container, this.element);
                }

                if (!this.container.parentNode && parent) {
                    this.appended = true;
                    DOM.append(parent, this.container);
                }
            } else {
                if (parent) {
                    this.appended = true;
                    DOM.append(parent, this.element);
                }
            }
            if ( this.animate ) {
                setTimeout(() => {this.fadeIn();}, 0);
            }
        }

        /**
         * @language zh_CN
         * */
        public prepend(parent:HTMLElement) {
            if (this.appended) return;
            if (this.element && this.element.parentNode) return;
            if (this.container) {
                let ref;
                if (ref = DOM.findOne(this.container, '.inner')) {
                    this.appended = true;
                    DOM.append(ref, this.element);
                }
                if (!this.container.parentNode && parent && parent.firstChild) {
                    this.appended = true;
                    parent.insertBefore(this.container, parent.firstChild);
                }
            } else {
                if (parent && parent.firstChild) {
                    this.appended = true;
                    parent.insertBefore(this.element, parent.firstChild);
                }
            }
            if ( this.animate ) {
                setTimeout(() => {this.fadeIn();}, 0);
            }
        }

        /**
         * @language zh_CN
         * 移除
         * */
        public remove() {
            if (!this.appended) return;
            if (this.element && this.element.parentNode) {
                if ( this.animate ) this.fadeOut();
                this.element.parentNode.removeChild(this.element);
                this.appended = false;
                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }
            }

            return this;
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                this.disabled = false;
                DOM.removeClass(this.container || this.element, "disabled")
            }

            return this;
        }

        /**
         * @language zh_CN
         * 禁用
         * */
        public disable() {
            if (!this.disabled) {
                this.disabled = true;
                DOM.addClass(this.container || this.element, "disabled");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 显示
         * */
        public show() {
            if (this.hided) {
                this.hided = false;
                DOM.removeClass(this.container || this.element, "hidden");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 隐藏
         * */
        public hide() {
            if (!this.hided) {
                this.hided = true;
                DOM.addClass(this.container || this.element, "hidden");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 激活
         * */
        public activate() {
            if (!this.actived && !this.disabled && !this.sleeping) {
                this.actived = true;
                DOM.addClass(this.container || this.element, "active");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 取消激活
         * */
        public deactivate() {
            if (this.actived) {
                this.actived = false;
                DOM.removeClass(this.container || this.element, "active");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 睡眠
         * */
        public sleep( time = 3000, cb? ) {
            if (!this.sleeping) {
                this.sleeping = true;
                clearTimeout(this.sleepTimer);
                DOM.addClass(this.container || this.element, "sleeping");
                this.sleepTimer = setTimeout(() => {
                    this.sleeping = false;
                    DOM.removeClass(this.container || this.element, "sleeping");
                    if (cb) cb();
                }, time);
            }

            return this;
        }

        /**
         * @language zh_CN
         * 淡入
         * */
        public fadeIn() {
            if (!this.fadedIn) {
                this.fadedIn = true;
                DOM.addClass(this.container || this.element, "fadeIn");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 淡出
         * */
        public fadeOut() {
            if (this.fadedIn) {
                this.fadedIn = false;
                DOM.removeClass(this.container || this.element, "fadeIn");
            }

            return this;
        }

        /**
         * @language zh_CN
         * 宽度
         * */
        public width() {
            return (this.container || this.element).clientWidth;
        }

        /**
         * @language zh_CN
         * 高度
         * */
        public height() {
            return (this.container || this.element).clientHeight;
        }
    }

    /**
     * @language zh_CN
     * 窗口宽度
     * */
    DomObject.prototype.windowWidth = function() {
        return window.innerWidth ||
            document.documentElement.clientWidth || document.body.clientWidth;
    };

    /**
     * @language zh_CN
     * 窗口高度
     * */
    DomObject.prototype.windowHeight = function() {
        return window.innerHeight ||
            document.documentElement.clientHeight || document.body.clientHeight;
    };

    /**
     * @language zh_CN
     * 交互方式
     * */
    DomObject.prototype.click = "click";

    /**
     * @language zh_CN
     * 实例化
     * */
    DomObject.prototype.createElement = function (content:string) {
        let parent, child;

        parent = document.createElement("div");
        parent.innerHTML = content;
        child = parent.childNodes[0];
        if ( child && child.parentNode ) child.parentNode.removeChild( child );
        return child;
    };
}