namespace ijia.AsciiArt {

    export class MsgStageMediator extends BaseMediator {

        // 名称
        public static NAME:string = "MsgStageMediator";

        public constructor(viewComponent:any) {
            super(MsgStageMediator.NAME, viewComponent);
        }

        public listNotificationInterests():Array<any> {
            return [
                MsgStageNotify.NOTICE, MsgStageNotify.SHOW, MsgStageNotify.HIDE
            ];
        }

        /**
         * @language zh_CN
         * 处理消息通知
         * */
        public handleNotification(notification: puremvc.INotification):void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case MsgStageNotify.NOTICE:
                    this.view.setValue(data);
                    break;
                case MsgStageNotify.SHOW:
                    this.view.show();
                    break;
                case MsgStageNotify.HIDE:
                    this.view.hide();
                    break;
            }
        }

        /**
         * 返回 Mediator对应的视图
         */
        public get view(): MsgStage {
            return <MsgStage><any>(this.viewComponent);
        }
    }
}