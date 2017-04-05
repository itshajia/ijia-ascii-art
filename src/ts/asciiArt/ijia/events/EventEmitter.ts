/**
 * 事件管理器
 * */
namespace ijia {

    export class EventEmitter extends HashObject{
        public element;

        /**
         * @language zh_CN
         * 各类事件存储
         * */
        private $events = {};
        private $eventHandler;

        constructor() { super(); }

        /**
         * @language zh_CN
         * 返回所有事件集合
         * */
        private $getEvents() {
            return this.$events || (this.$events = {});
        }

        /**
         * @language zh_CN
         * 返回特定类型的事件集合
         * */
        public getListeners(type) {
            let events = this.$getEvents();

            return events[type] || (events[type] = []);
        }


        /**
         * @language zh_CN
         * 注册别名
         * */
        /*private $alias(name:string) {
            return (...args:any[]) => {
                return this[name].apply(this, args);
            };
        }*/

        /**
         * @language zh_CN
         * 添加事件
         * */
        public addListener(types, listener, data?) {
            let listeners, eventHandler, _this = this;

            /*console.error("addListener");
            console.log(arguments);*/
            if ( !(eventHandler = this.$eventHandler) ) {
                eventHandler = this.$eventHandler = function(e, ...args) {
                    let type = e.type, listeners = _this.getListeners(type),
                        event, param;

                    param = {data: data, originalEvent: e};
                    event = new Event(type, e.target, e.currentTarget, param);
                    for (let i=0;i<listeners.length;i++) {
                        listeners[i].listener.apply(this, [event].concat(args || []));
                    }
                };
            }
            types = ( types || "" ).match(/\S+/g) || [""];
            for (var i=0;i<types.length;i++) {
                listeners = this.getListeners(types[i]);
                listeners.push({
                    listener: listener,
                    data: data
                });

                let element = this.element || this;
                if (element.addEventListener) {
                    element.addEventListener(types[i], eventHandler);
                }
            }

            return this;
        }

        //public on = this.$alias("addListener");
        public on = this.addListener;


        /**
         * @language zh_CN
         * 移除事件
         * */
        public removeListener(types, listener?) {
            let listeners, index = -1, eventHandler;

            if ( !(eventHandler = this.$eventHandler) ) {
                return this;
            }

            //if (!listeners) return;
            types = ( types || "" ).match(/\S+/g) || [""];
            for (var i=0;i<types.length;i++) {
                listeners = this.getListeners(types[i]);
                if (listener) {
                    index = this.$indexOfListener(listeners, listener);

                    if (index !== -1) {
                        listeners.splice(index, 1);
                    }
                } else {
                    // 清空所有监听函数
                    listeners.splice(0, listeners.length);
                }

                let element = this.element || this;
                if (element.removeEventListener) {
                    element.removeEventListener(types[i], eventHandler);
                }
            }

            /*console.warn("removeListener");
            console.log(types);
            console.log(this.$events);*/
            return this;
        }

        //public off = this.$alias("removeListener");

        public off = this.removeListener;

        /**
         * @language zh_CN
         * 获取索引
         * */
        private $indexOfListener(listeners, listener) {
            let i = listeners.length;

            while(i--) {
                if (listeners[i].listener === listener) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * @language zh_CN
         * 触发事件
         * */
        public emitEvent(event, args) {
            let type = event.hasOwnProperty("type") ? event.type : event;
            let listeners = this.getListeners(type).slice(), listener;

            if (!listeners) {
                return;
            }

            let element, len;

            element = this.element || this;
            len = listeners.length;
            for (let i=0;i<len;i++) {
                listener = listeners[i];
                if (listener) {
                    event = event.hasOwnProperty("type") ? (event.data = listener.data, event) : new Event(type, element, element, {data: listener.data});
                    if (!event.isPropagationStopped()) {
                        listener.listener.apply(this, [event].concat(args || []));
                    }
                }
            }

            return this;
        }

        public emit(event, ...args) {
            return this.emitEvent(event, args);
        }
    }
}