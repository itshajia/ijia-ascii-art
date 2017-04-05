namespace ijia.AsciiArt {

    // 消息舞台
    export class MsgStage extends I9nDomObject {

        /**
         * @language zh_CN
         * 消息内容
         * */
        public value:string;

        /**
         * @language zh_CN
         * 消息元素
         * */
        public msg:HTMLElement;

        constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
            this.msg = DOM.findOne(this.element, 'span');
            Sys.appFacadeInstance().registerMediator(new MsgStageMediator(this));
        }

        /**
         * @language zh_CN
         * 设置消息
         * */
        public setValue(value:string) {
            if (this.value == value) return;

            this.value = value;
            this.msg.textContent = this.value;
        }

        /**
         * @language zh_CN
         * 点击事件
         * */
        public onClick(e, eventData) {
            if (this.disabled || e.target != this.element) return;
            Sys.sendNotification(AppNotify.CLICK_HIDDEN_INPUT);
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<div class="'+ prefixClass +'-msg-stage"><span></span></div>';
        }
    }
}