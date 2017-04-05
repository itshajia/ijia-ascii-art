namespace ijia.puremvc {

    /**
     * Observer
     * */
    export class Observer implements IObserver{

        /**
         * @language zh_CN
         * 返回通知
         * */
        public notify:Function;

        /**
         * @language zh_CN
         * 返回上下文
         * */
        public context:any;

        constructor(notifyMethod:Function, notifyContext:any) {
            this.notify = null;
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }

        /**
         * @language zh_CN
         * 获取通知方法
         * */
        public getNotifyMethod():Function {
            return this.notify;
        }

        /**
         * @language zh_CN
         * 设置通知方法
         * */
        public setNotifyMethod(notifyMethod):void {
            this.notify = notifyMethod;
        }

        /**
         * @language zh_CN
         * 获取上下文
         * */
        public getNotifyContext():any {
            return this.context;
        }

        /**
         * @language zh_CN
         * 设置上下文
         * */
        public setNotifyContext(notifyContext):void {
            this.context = notifyContext;
        }

        /**
         * @language zh_CN
         * 通知观察者
         * */
        public notifyObserver(notification):void {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        }

        /**
         * @language zh_CN
         * 对比通知上下文
         * */
        public compareNotifyContext(object):boolean {
            return object === this.context;
        }
    }
}