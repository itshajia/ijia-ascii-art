namespace ijia.AsciiArt {

    export class UploadButton extends I9nDomObject {

        public constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
        }

        /**
         * @language zh_CN
         * 点击事件
         * */
        public onClick(e, eventData) {
            if (this.disabled) return;
            Sys.sendNotification(AppNotify.CLICK_HIDDEN_INPUT);
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

            }

            return this;
        }

        /**
         * @language zh_CN
         * 禁用
         * */
        public disable() {
            if (!this.disabled) {
                super.disable();

            }

            return this;
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<button class="'+ prefixClass +'-upload-btn"><i></i><span>上传文件</span></button>';
        }
    }
}