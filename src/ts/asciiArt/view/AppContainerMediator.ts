namespace ijia.AsciiArt {

    export class AppContainerMediator extends BaseMediator {

        // 名称
        public static NAME:string = "AppContainerMediator";

        public constructor(viewComponent:any) {
            super(AppContainerMediator.NAME, viewComponent);

        }

        public listNotificationInterests():Array<any> {
            return [
                AppNotify.CREATE_HIDDEN_INPUT, AppNotify.CLICK_HIDDEN_INPUT,
                AppNotify.ENABLE, AppNotify.DISABLE
            ];
        }

        /**
         * @language zh_CN
         * 处理消息通知
         * */
        public handleNotification(notification: puremvc.INotification):void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppNotify.CREATE_HIDDEN_INPUT:
                    this.view.createHiddenInput(data);
                    break;
                case AppNotify.CLICK_HIDDEN_INPUT:
                    this.view.clickHiddenInput();
                    break;
                case AppNotify.ENABLE:
                    this.view.enable();
                    break;
                case AppNotify.DISABLE:
                    this.view.disable();
                    break;
            }
        }

        /**
         * 返回 Mediator对应的视图
         */
        public get view(): AppContainer {
            return <AppContainer><any>(this.viewComponent);
        }
    }
}