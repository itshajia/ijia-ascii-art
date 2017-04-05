namespace ijia.AsciiArt {

    // 根容器（负责管理各类视图组件）
    export class AppContainer extends DomObject {

        /**
         * @language zh_CN
         * 实例
         * */
        private static instance:AppContainer;

        /**
         * @language zh_CN
         * 头部按钮
         * */
        private button:Button;

        /**
         * @language zh_CN
         * 视口
         * */
        private viewport:AppViewport;

        /**
         * @language zh_CN
         * 隐藏Input控件
         * */
        private hiddenInput:HiddenInput;

        public constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
            Sys.appFacadeInstance().registerMediator(new AppContainerMediator(this));
            this.onChange = this.onChange.bind(this);
            this.init();
        }

        public static view(): AppContainer {
            if ( AppContainer.instance == null ) AppContainer.instance = new AppContainer();
            return AppContainer.instance;
        }

        /**
         * @language zh_CN
         * 初始化
         * */
        public init() {
            this.createButton();
            this.createViewport();
        }

        /**
         * @language zh_CN
         * 创建 头部按钮
         * */
        public createButton() {
            if (!this.button) {
                this.button = new Button();
                this.button.append(this.element);
                this.button.init();
            }
        }

        /**
         * @language zh_CN
         * 创建 视口
         * */
        public createViewport() {
            if (!this.viewport) {
                this.viewport = new AppViewport();
                this.viewport.append(this.element);
            }
        }

        /**
         * @language zh_CN
         * 创建隐藏Input控件
         * */
        public createHiddenInput(acceptedFiles) {

            console.log("acceptedFiles="+ acceptedFiles);
            this.hiddenInput = new HiddenInput(acceptedFiles);
            this.hiddenInput.on("change", this.onChange);
            this.hiddenInput.append(this.element);
        }

        /**
         * @language zh_CN
         * 重置隐藏Input控件
         * */
        private resetHiddenInput() {
            if (this.hiddenInput) {
                this.hiddenInput.off("change", this.onChange);
                this.hiddenInput.remove();
                this.hiddenInput.resetDom();
                this.hiddenInput.on("change", this.onChange);
                this.hiddenInput.append(this.element);
            }
        }

        /**
         * @language zh_CN
         * 隐藏Input点击
         * */
        public clickHiddenInput() {
            this.hiddenInput.element.click();
        }

        /**
         * @language zh_CN
         * 选择文件事件
         * */
        private onChange(e) {
            console.warn("onChange");

            Sys.sendNotification(FileNotify.READED, App.covertFile(this.hiddenInput.element['files'][0]));
            this.resetHiddenInput();
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

                if (this.button) {
                    this.button.enable();
                }

                if (this.viewport) {
                    this.viewport.enable();
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


            }

            return this;
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<div class="'+ prefixClass +'-container"></div>';
        }
    }
}