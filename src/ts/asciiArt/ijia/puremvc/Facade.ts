namespace ijia.puremvc {

    /**
     * 外观类
     * */
    export class Facade implements IFacade{

        /**
         * @language zh_CN
         * */
        public static SINGLETON_MSG:string = "Facade singleton already constructed!";

        /**
         * @language zh_CN
         * 外观单例
         * */
        public static instance:IFacade;

        /**
         * @language zh_CN
         * 模型
         * */
        public model:IModel;

        /**
         * @language zh_CN
         * 视图
         * */
        public view:IView;

        /**
         * @language zh_CN
         * 控制器
         * */
        public controller:IController;

        constructor() {
            this.model = null;
            this.view = null;
            this.controller = null;
            if(Facade.instance) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.instance = this;
            this.initializeFacade();
        }

        /**
         * @language zh_CN
         * 初始化外观
         * */
        public initializeFacade():void {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        }

        /**
         * @language zh_CN
         * 初始化模型
         * */
        public initializeModel():void {
            if(!this.model) {
                this.model = Model.getInstance();
            }
        }

        /**
         * @language zh_CN
         * 初始化控制器
         * */
        public initializeController():void {
            if(!this.controller) {
                this.controller = Controller.getInstance();
            }
        }

        /**
         * @language zh_CN
         * 初始化视图
         * */
        public initializeView():void {
            if(!this.view) {
                this.view = View.getInstance();
            }
        }

        /**
         * @language zh_CN
         * 注册控制命令
         * */
        public registerCommand(notificationName:string, commandClassRef:Function):void {
            this.controller.registerCommand(notificationName, commandClassRef);
        }

        /**
         * @language zh_CN
         * 移除控制命令
         * */
        public removeCommand(notificationName:string):void {
            this.controller.removeCommand(notificationName);
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的控制命令
         * */
        public hasCommand(notificationName:string):boolean {
            return this.controller.hasCommand(notificationName);
        }

        /**
         * @language zh_CN
         * 注册代理
         * */
        public registerProxy(proxy:IProxy):void {
            this.model.registerProxy(proxy);
        }

        /**
         * @language zh_CN
         * 检索代理
         * */
        public retrieveProxy(proxyName:string):IProxy {
            return this.model.retrieveProxy(proxyName);
        }

        /**
         * @language zh_CN
         * 移除代理
         * */
        public removeProxy(proxyName:string):IProxy {
            let proxy;
            if(this.model) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的代理
         * */
        public hasProxy(proxyName:string):boolean {
            return this.model.hasProxy(proxyName);
        }

        /**
         * @language zh_CN
         * 注册中间者
         * */
        public registerMediator(mediator:IMediator):void {
            if(this.view) {
                this.view.registerMediator(mediator);
            }
        }

        /**
         * @language zh_CN
         * 检索中间者
         * */
        public retrieveMediator(mediatorName:string):IMediator {
            return this.view.retrieveMediator(mediatorName);
        }

        /**
         * @language zh_CN
         * 移除中间者
         * */
        public removeMediator(mediatorName:string):IMediator {
            let mediator;
            if(this.view) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的中间者
         * */
        public hasMediator(mediatorName:string):boolean {
            return this.view.hasMediator(mediatorName);
        }

        /**
         * @language zh_CN
         * 通知观察者
         * */
        public notifyObservers(notification:INotification):void {
            if(this.view) {
                this.view.notifyObservers(notification);
            }
        }

        /**
         * @language zh_CN
         * 发送通知
         * */
        public sendNotification(name:string, body?:any, type?:string):void {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.notifyObservers(new puremvc.Notification(name, body, type));
        }

        /**
         * @language zh_CN
         * 返回单例
         * */
        public static getInstance():IFacade {
            if(!Facade.instance) {
                Facade.instance = new Facade();
            }
            return Facade.instance;
        }
    }
}