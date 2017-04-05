namespace ijia.AsciiArt {

    export class Button extends DomObject {

        /**
         * @language zh_CN
         * 上传按钮
         * */
        private uploadButton:UploadButton;

        public constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
        }

        /**
         * @language zh_CN
         * 初始化
         * */
        public init() {
            this.uploadButton = new UploadButton();
            this.uploadButton.append(this.element);
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

                if (this.uploadButton) {
                    this.uploadButton.enable();
                }
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

                if (this.uploadButton) {
                    this.uploadButton.disable();
                }
            }

            return this;
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<div class="'+ prefixClass +'-btn"></div>';
        }
    }
}