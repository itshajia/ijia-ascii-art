namespace ijia.AsciiArt {

    export class AppFacade extends puremvc.Facade implements puremvc.IFacade {

        public static STARTUP:string = "startup";

        public constructor() {
            super();
        }

        /**
         * 获取应用实例
         * */
        public static getInstance():AppFacade {
            if ( this.instance == null ) this.instance = new AppFacade();
            return <AppFacade><any> (this.instance);
        }

        /**
         * 初始化控制器
         * */
        public initializeController():void {
            super.initializeController();
            this.registerCommand(AppFacade.STARTUP, StartupCommand);
        }

        /**
         * 启动PureMVC,在应用程序中调用此方法,并传递应用程序本身的引用
         */
        public startUp(root:AppContainer):void {
            this.sendNotification(AppFacade.STARTUP, root);
            this.removeCommand(AppFacade.STARTUP); // PureMVC初始化完成后，移除STARTUP命令
        }
    }
}