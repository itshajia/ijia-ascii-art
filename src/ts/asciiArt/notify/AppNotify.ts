namespace ijia.AsciiArt {

    export class AppNotify {

        public constructor() {}

        /**
         * 系统通知
         * */
        public static NOTIFY:string = "codeImageNotify_notify";

        /**
         * 创建隐藏Input控件
         * */
        public static CREATE_HIDDEN_INPUT:string = "codeImageNotify_create_hidden_input";

        /**
         * 点击隐藏Input控件
         * */
        public static CLICK_HIDDEN_INPUT:string = "codeImageNotify_click_hidden_notify";

        /**
         * 创建舞台
         * */
        public static CREATE_STAGE:string = "codeImageNotify_create_stage";

        /**
         * 开启根容器
         * */
        public static ENABLE:string = "codeImageNotify_enable";

        /**
         * 关闭根容器
         * */
        public static DISABLE:string = "codeImageNotify_disable";
    }
}