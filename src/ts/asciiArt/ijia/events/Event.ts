namespace ijia {

    var rkeyEvent = /^key/;
    var rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
    var fixHooks = {};
    var props = ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
    "metaKey relatedTarget shiftKey target timeStamp view which").split(" ");

    var keyHooks = {
        props: "char charCode key keyCode".split(" "),
        filter: function(event, original) {
            if (event.which == null) {
                event.which = original.charCode != null ? original.charCode : original.keyCode;
            }

            return;
        }
    };

    var mouseHooks = {
        props: ("button buttons clientX clientY offsetX offsetY pageX pageY" +
        " sceenX sceenY toElement").split(" "),
        filter: function(event, original) {
            let eventDoc, doc, body, button = original.button;

            // Calculate pageX/Y if missing and clientX/Y available
            if ( event.pageX == null && original.clientX != null ) {
                eventDoc = event.target.ownerDocument || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = original.clientX +
                    ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
                    ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                event.pageY = original.clientY +
                    ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
                    ( doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            // Note: button is not normalized, so don't use it
            if ( !event.which && button !== undefined ) {
                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
            }

            return event;
        }
    };

    export function returnTrue() {
        return true;
    }

    export function returnFalse() {
        return false;
    }


    export class Event implements IEvent {

        /**
         * @language zh_CN
         * 事件类型
         * */
        public type:string;

        /**
         * @language zh_CN
         * 事件触发目标
         * */
        public target;

        /**
         * @language zh_CN
         * 事件绑定目标
         * */
        public currentTarget;

        /**
         * @language zh_CN
         * 事件绑定数据
         * */
        public data;

        /**
         * @language zh_CN
         * 事件源
         * */
        public originalEvent;

        constructor(type, target, currentTarget, param?) {
            this.type = type;
            this.target = target;
            this.currentTarget = currentTarget;

            if (param && param.data) {
                this.data = param.data;
            }

            if (param && param.originalEvent) {
                this.originalEvent = param.originalEvent;
                this.$fix();
            }
        }


        /**
         * @language zh_CN
         * */
        private $fix() {
            let prop, copy, type = this.type, originalEvent = this.originalEvent, fixHook = fixHooks[type];

            if (!fixHook) {
                fixHooks[type] = fixHook = rmouseEvent.test( type ) ? mouseHooks : rkeyEvent.test(type) ? keyHooks : {};
            }

            copy = fixHook.props ? props.concat(fixHook.props) : props;
            for (let i=0;i<copy.length;i++) {
                prop = copy[i];
                this[prop] = originalEvent[prop];
            }
        }

        /**
         * @language zh_CN
         * 是否阻止了默认事件行为
         * */
        public isDefaultPrevented;

        /**
         * @language zh_CN
         * 是否阻止了事件冒泡
         * */
        public isPropagationStopped;

        /**
         * @language zh_CN
         * 是否阻止了事件冒泡（并停止剩余事件处理函数的执行）
         * */
        public isImmediatePropagationStopped;

        /**
         * @language zh_CN
         * 阻止默认事件行为
         * */
        public preventDefault() {
            let e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;

            if ( e ) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        }

        /**
         * @language zh_CN
         * 阻止事件冒泡
         * */
        public stopPropagation() {
            let e = this.originalEvent;
            this.isPropagationStopped = returnTrue;

            if ( e ) {
                e.stopPropagation();
            }
        }

        /**
         * @language zh_CN
         * 阻止了事件冒泡（并停止剩余事件处理函数的执行）
         * */
        public stopImmediatePropagation() {
            let e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;

            if ( e ) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    }

    /**
     * @language zh_CN
     * 是否阻止了默认事件行为
     * */
    Event.prototype.isDefaultPrevented = returnFalse;

    /**
     * @language zh_CN
     * 是否阻止了事件冒泡
     * */
    Event.prototype.isPropagationStopped = returnFalse;

    /**
     * @language zh_CN
     * 是否阻止了事件冒泡（并停止剩余事件处理函数的执行）
     * */
    Event.prototype.isImmediatePropagationStopped = returnFalse;
}