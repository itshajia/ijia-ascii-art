namespace ijia.puremvc {

    /**
     * 通知者
     * */
    export class Notifier implements INotifier{

        /**
         * @language zh_CH
         * 观察者
         * */
        public facade:IFacade;

        constructor() {
            this.facade = null;
            this.facade = Facade.getInstance();
        }

        /**
         * @language zh_CN
         * 发送通知
         * */
        public sendNotification(name:string, body?:any, type?:string) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.facade.sendNotification(name, body, type);
        }
    }
}