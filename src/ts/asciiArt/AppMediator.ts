namespace ijia.AsciiArt {

    export class AppMediator extends BaseMediator {

        // 名称
        public static NAME:string = "AppMediator";

        public constructor(viewComponent:any) {
            super(AppMediator.NAME, viewComponent);
        }

        public listNotificationInterests():Array<any> {
            return [
                FileNotify.READED
            ];
        }

        /**
         * @language zh_CN
         * 处理消息通知
         * */
        public handleNotification(notification: puremvc.INotification):void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case FileNotify.READED:
                    this.view.readedFile(data);
                    break;
            }
        }

        /**
         * 返回 Mediator对应的视图
         */
        public get view(): App {
            return <App><any>(this.viewComponent);
        }
    }
}