namespace ijia.puremvc {

    /**
     * 控制器
     * */
    export class Controller implements IController {

        /**
         * @language zh_CN
         * */
        public static SINGLETON_MSG:string = "Controller singleton already constructed!";

        /**
         * @language zh_CN
         * 控制器单例
         * */
        public static instance:IController;

        /**
         * @language zh_CN
         * 视图
         * */
        public view:IView;

        /**
         * @language zh_CN
         * 控制命令字典
         * */
        public commandMap:Object;

        constructor() {
            this.view = null;
            this.commandMap = null;
            if(Controller.instance) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = {
            };
            this.initializeController();
        }

        /**
         * @language zh_CN
         * 初始化控制器
         * */
        public initializeController():void {
            this.view = View.getInstance();
        }

        /**
         * @language zh_CN
         * 执行命令
         * */
        public executeCommand(notification:INotification):void {
            let commandClassRef = this.commandMap[notification.getName()];
            if(commandClassRef) {
                let command = new commandClassRef();
                command.execute(notification);
            }
        }

        /**
         * @language zh_CN
         * 注册命令
         * */
        public registerCommand(notificationName:string, commandClassRef:Function):void {
            if(!this.commandMap[notificationName]) {
                this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
            }
            this.commandMap[notificationName] = commandClassRef;
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的控制命令
         * */
        public hasCommand(notificationName:string):boolean {
            return this.commandMap[notificationName] != null;
        }

        /**
         * @language zh_CN
         * 移除控制命令
         * */
        public removeCommand(notificationName:string):void {
            if(this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        }

        /**
         * @language zh_CN
         * 获取控制器单例
         * */
        public static getInstance():IController {
            if(!Controller.instance) {
                Controller.instance = new Controller();
            }
            return Controller.instance;
        }
    }
}