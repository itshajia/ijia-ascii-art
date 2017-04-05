namespace ijia.AsciiArt {

    export class AppViewportMediator extends BaseMediator {

        // 名称
        public static NAME:string = "AppViewportMediator";

        public constructor(viewComponent:any) {
            super(AppViewportMediator.NAME, viewComponent);
        }

        public listNotificationInterests():Array<any> {
            return [
                AppNotify.CREATE_STAGE,
            ];
        }

        /**
         * @language zh_CN
         * 处理消息通知
         * */
        public handleNotification(notification: puremvc.INotification):void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppNotify.CREATE_STAGE:
                    this.view.createStage();
                    break;
            }
        }

        /**
         * 返回 Mediator对应的视图
         */
        public get view(): AppViewport {
            return <AppViewport><any>(this.viewComponent);
        }
    }
}