namespace ijia.AsciiArt {

    /**
     * @language zh_CN
     * 模块类前缀
     * */
    export let prefixClass = "ijia-ascii-art";

    /**
     * @language zh_CN
     * */
    export function run(element:any, options:any) {
        return new App(element, options);
    }

    /**
     * @language zh_CN
     * */
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    let canvas2 = document.createElement("canvas");
    let ctx2 = canvas2.getContext("2d");
    document.body.appendChild(canvas2);

    /**
     * 图片转Code文字图像模块
     * */
    export class App {

        /**
         * @language zh_CN
         * 初始化元素
         * */
        public element:any;

        /**
         * @language zh_CN
         * 自定义配置参数
         * */
        public options:any;

        constructor(element:any, options:any) {

            this.element = element;
            this.options = extend({}, this.getDefaultOptions(), options || {});

            // 应用容器添加到页面中
            AppContainer.view().append(this.element);
            // 运行应用组框架
            Sys.appFacadeInstance().startUp(AppContainer.view());
            // 注册中间者
            Sys.appFacadeInstance().registerMediator(new AppMediator(this));
            // 创建场景舞台
            Sys.sendNotification(AppNotify.CREATE_STAGE);
            // 创建隐藏Input控件
            Sys.sendNotification(AppNotify.CREATE_HIDDEN_INPUT, this.options.acceptedFiles);

            // 开启应用
            setTimeout(() => {
                Sys.sendNotification(AppNotify.ENABLE);
                if (isBrowserSupported()) {
                    // 通知消息
                    Sys.sendNotification(MsgStageNotify.NOTICE, this.options.dictDefaultMessage);
                } else {
                    // 通知消息
                    Sys.sendNotification(MsgStageNotify.NOTICE, this.options.dictBrowserNotSupport);
                    Sys.sendNotification(AppNotify.DISABLE);
                }
            }, 0);
        }

        /**
         * @language zh_CN
         * 默认参数
         * */
        private getDefaultOptions() {
            let options;

            options = {
                // 图像最大尺寸宽度
                maxSize: 100,
                // 图像浓密程度
                density: 0.5,
                // 允许文件类型,例如 image/*,application/pdf,.psd
                acceptedFiles: ".jpeg,.jpg,.png",

                dictDefaultMessage: "将单张图片文件拖拽到此处或点击上传.",
                dictBrowserNotSupport: "当前浏览器不支持.",
                dictInvalidFileType: "文件类型不匹配."
            };
            return options;
        }

        /**
         * @language zh_CN
         * 读取文件成功
         * */
        public readedFile(data:any) {
            console.log("读取文件成功");
            this.loadImage(data);
        }

        /**
         * @language zh_CN
         * 加载图像
         * */
        public loadImage(data) {
            let image;

            image = new Image();
            image.onload = () => {
                this.handleImage(image);
                image = image.onload = null;
            };
            image.src = data;
        }

        /**
         * @language zh_CN
         * 处理图片
         * */
        public handleImage(image) {
            let width, height, maxSize, naturalWidth, naturalHeight, ratio = 1;

            maxSize = this.options.maxSize;
            naturalWidth = image.width;
            naturalHeight = image.height;
            if ( maxSize && (naturalWidth > maxSize || naturalHeight > maxSize) ) {
                if ( naturalHeight > naturalWidth ) {
                    height = maxSize;
                    width = Math.floor(maxSize * (naturalWidth / naturalHeight));
                    ratio = maxSize / naturalHeight;
                } else {
                    width = maxSize;
                    height = Math.floor(maxSize * (naturalHeight / naturalWidth));
                    ratio = maxSize / naturalWidth;
                }
            } else {
                width = naturalWidth;
                height = naturalHeight;
            }


            this.resetCanvas(image, naturalWidth, naturalHeight, width, height, ratio);
        }

        /**
         * @language zh_CN
         * 重置画布
         * */
        public resetCanvas(image, naturalWidth, naturalHeight, width, height, ratio) {
            // 重新调整Canvas
            canvas.width = naturalWidth, canvas.height = naturalHeight;
            ctx = canvas.getContext("2d");
            ctx.clearRect( 0, 0, naturalWidth, naturalHeight );
            ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight, 0, 0, naturalWidth, naturalHeight);

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let pixelData = imageData.data;
            if ( ratio != 1 ) {
                pixelData = compressBufferedImageWithIsometricSampling(pixelData, naturalWidth, naturalHeight, width, height, ratio);
            }


            let generator = new AsciiArtGenerator();
            generator.parse(pixelData, width, height);

            canvas2.width = width; canvas2.height = height;
            let imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            imageData2.data.set(pixelData, 0);
            ctx2.putImageData(imageData2, 0, 0);
            ctx2.drawImage(canvas2, 0, 0, width, height, 0, 0, width, height);
        }


        /**
         * @language zh_CN
         * 将本地文件转为系统File对象
         * */
        public static covertFile(file:any):File {
            return new File(file.name, file.size, file);
        }
    }
}