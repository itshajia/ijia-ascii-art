namespace ijia.AsciiArt {

    export class Stage extends I9nDomObject {

        /**
         * @language zh_CN
         * 消息舞台
         * */
        public msgStage:MsgStage;



        public constructor() {
            super();

            this.element = this.createElement(this.createTemplate());
            Sys.appFacadeInstance().registerMediator(new StageMediator(this));
            this.isDrag = true;
        }

        /**
         * @language zh_CN
         * 初始化
         * */
        public init() {
            this.msgStage = new MsgStage();
            this.msgStage.append(this.element);

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
         * @language zh_CN
         * */
        public onDrop(e, eventData) {
            super.onDrop(e, eventData);
            if (!e.originalEvent || !e.originalEvent.dataTransfer) {
                Sys.notify("系统不支持拖拽上传.");
                return;
            }

            let dataTransfer, files;
            dataTransfer = e.originalEvent.dataTransfer;
            files = dataTransfer.files;
            if ( files.length ) {
                this.readFile(files[0]);
            }
        }

        /**
         * @language zh_CN
         * */
        public readFile(file) {
            if (!file) return;
            let reader = new FileReader();
            reader.onload = function(e) {
                Sys.sendNotification(FileNotify.READED, reader.result);
            };
            reader.readAsDataURL(file);
            //reader.readAsArrayBuffer(file);
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

                if (this.msgStage) {
                    this.msgStage.enable();
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

                if (this.msgStage) {
                    this.msgStage.disable();
                }
            }

            return this;
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<div class="'+ prefixClass +'-stage"></div>';
        }
    }
}