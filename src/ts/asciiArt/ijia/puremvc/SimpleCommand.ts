namespace ijia.puremvc {

    /**
     * 简单控制器
     * */
    export class SimpleCommand extends Notifier implements ICommand,INotifier{

        constructor() {
            super();
        }

        /**
         * @language zh_CN
         * 执行命令
         * */
        public execute(notification:INotification):void {}
    }
}