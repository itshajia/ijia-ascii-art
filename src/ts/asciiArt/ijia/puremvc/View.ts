namespace ijia.puremvc {

    /**
     * 视图
     * */
    export class View implements IView{

        public static SINGLETON_MSG:string = "View singleton already constructed!";

        /**
         * @language zh_CN
         * 视图单例
         * */
        public static instance:IView;

        /**
         * @language zh_CN
         * 中间者字典
         * */
        public mediatorMap:Object;

        /**
         * @language zh_CN
         * 观察者字典
         * */
        public observerMap:Object;

        constructor() {
            this.mediatorMap = null;
            this.observerMap = null;

            if(View.instance) {
                throw Error(View.SINGLETON_MSG);
            }

            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }

        /**
         * @language zh_CN
         * 初始化视图
         * */
        public initializeView():void {

        }

        /**
         * @language zh_CN
         * 注册观察者
         * */
        public registerObserver(notificationName:string, observer:IObserver):void {
            let observers = this.observerMap[notificationName];
            if (observers) {
                observers.push(observer);
            } else {
                this.observerMap[notificationName] = [
                    observer
                ];
            }
        }

        /**
         * @language zh_CN
         * 移除观察者
         * */
        public removeObserver(notificationName:string, notifyContext:any):void {
            let observers = this.observerMap[notificationName];
            let i = observers.length;
            while(i--) {
                let observer = observers[i];
                if(observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if(observers.length == 0) {
                delete this.observerMap[notificationName];
            }
        }

        /**
         * @language zh_CN
         * 通知观察者
         * */
        public notifyObservers(notification:INotification):void {
            let notificationName = notification.getName();
            let observersRef = this.observerMap[notificationName];
            if(observersRef) {
                let observers = observersRef.slice(0);
                let len = observers.length;
                for(let i = 0; i < len; i++) {
                    let observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        }

        /**
         * @language zh_CN
         * 注册中间者
         * */
        public registerMediator(mediator:IMediator):void {
            let name = mediator.getMediatorName();
            if(this.mediatorMap[name]) {
                return;
            }
            this.mediatorMap[name] = mediator;
            let interests = mediator.listNotificationInterests();
            let len = interests.length;
            if(len > 0) {
                let observer = new puremvc.Observer(mediator.handleNotification, mediator);
                for(let i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        }

        /**
         * @language zh_CN
         * 检索中间者
         * */
        public retrieveMediator(mediatorName:string):IMediator {
            return this.mediatorMap[mediatorName] || null;
        }

        /**
         * @language zh_CN
         * 移除中间者
         * */
        public removeMediator(mediatorName:string):IMediator {
            let mediator = this.mediatorMap[mediatorName];
            if(!mediator) {
                return null;
            }
            let interests = mediator.listNotificationInterests();
            let i = interests.length;
            while(i--) {
                this.removeObserver(interests[i], mediator);
            }
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的中间者
         * */
        public hasMediator(mediatorName:string):boolean {
            return this.mediatorMap[mediatorName] != null;
        }

        /**
         * @language zh_CN
         * 返回视图单例
         * */
        public static getInstance():IView {
            if(!View.instance) {
                View.instance = new View();
            }
            return View.instance;
        }
    }
}