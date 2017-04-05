namespace ijia.AsciiArt {

    export class StageMediator extends BaseMediator {

        // 名称
        public static NAME:string = "StageMediator";

        public constructor(viewComponent:any) {
            super(StageMediator.NAME, viewComponent);
        }

        public listNotificationInterests():Array<any> {
            return [
                //StageNotify.SHOW_MAJOR, StageNotify.SHOW_SUB
            ];
        }

        /**
         * @language zh_CN
         * 处理消息通知
         * */
        public handleNotification(notification: puremvc.INotification):void {
            let data:any = notification.getBody();

            switch (notification.getName()) {

            }
        }

        /**
         * 返回 Mediator对应的视图
         */
        public get view(): Stage {
            return <Stage><any>(this.viewComponent);
        }
    }
}