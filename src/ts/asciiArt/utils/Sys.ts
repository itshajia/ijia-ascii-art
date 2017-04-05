namespace ijia.AsciiArt.Sys {

    /**
     * pureMVC消息通知
     */
    export function sendNotification(name: string, body?: any, type?: string) {
        AppFacade.getInstance().sendNotification(name, body, type);
    }

    /**
     * 获取appFacade实例
     */
    export function appFacadeInstance() {
        return AppFacade.getInstance();
    }

    /**
     * 系统通知
     * */
    export function notify(msg:string, name?:string) {
        if (!msg) return;
        if (name) {
            msg = msg +": "+ name;
        }
        sendNotification(AppNotify.NOTIFY, msg);
    }
}