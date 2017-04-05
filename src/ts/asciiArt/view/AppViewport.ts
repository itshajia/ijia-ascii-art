namespace ijia.AsciiArt {

    export class AppViewport extends DomObject {

        /**
         * @language zh_CN
         * 舞台
         * */
        private stage:Stage;

        public constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
            Sys.appFacadeInstance().registerMediator(new AppViewportMediator(this));
        }

        /**
         * @language zh_CN
         * 创建 舞台
         * */
        public createStage() {
            if (!this.stage) {
                this.stage = new Stage();
                this.stage.append(this.element);
                this.stage.init();
            }
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

                if (this.stage) {
                    this.stage.enable();
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

                if (this.stage) {
                    this.stage.disable();
                }
            }

            return this;
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<div class="'+ prefixClass +'-viewport"></div>';
        }
    }
}