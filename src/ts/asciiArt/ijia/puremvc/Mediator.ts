namespace ijia.puremvc {

    /**
     * 中间者
     * */
    export class Mediator extends Notifier implements IMediator, INotifier{

        /**
         * @language zh_CN
         * */
        public static NAME:string = "Mediator";

        /**
         * @language zh_CN
         * 中间者名称
         * */
        public mediatorName:string;

        /**
         * @language zh_CN
         * 中间者绑定的视图
         * */
        public viewComponent:any;

        constructor(mediatorName?:string, viewComponent?:any) {
            super();

            this.mediatorName = null;
            this.viewComponent = null;
            this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
            this.viewComponent = viewComponent;
        }

        /**
         * @language zh_CN
         * 获取中间者名称
         * */
        public getMediatorName():string {
            return this.mediatorName;
        }

        /**
         * @language zh_CN
         * 获取绑定视图
         * */
        public getViewComponent():any {
            return this.viewComponent;
        }

        /**
         * @language zh_CN
         * 绑定视图
         * */
        public setViewComponent(viewComponent:any):void {
            this.viewComponent = viewComponent;
        }

        /**
         * @language zh_Cn
         * 中间者感兴趣的通知名称
         * */
        public listNotificationInterests():string[] {
            return [];
        }

        /**
         * @language zh_CN
         * 处理通知
         * */
        public handleNotification(notification):void {}

        /**
         * @language zh_CN
         * 注册事件
         * */
        public onRegister():void {}

        /**
         * @language zh_CN
         * 移除事件
         * */
        public onRemove():void {}
    }
}