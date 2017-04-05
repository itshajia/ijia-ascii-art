namespace ijia.puremvc {

    /**
     * 通知类
     * */
    export class Notification implements INotification{

        /**
         * @language zh_CN
         * 通知名称
         * */
        public name:string;

        /**
         * @language zh_CN
         * 通知信息主体
         * */
        public body:any;

        /**
         * @language zh_CN
         * 通知类型
         * */
        public type:string;

        constructor(name:string, body?:any, type?:string) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.name = null;
            this.body = null;
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }

        /**
         * @language zh_CN
         * 获取通知名称
         * */
        public getName():string {
            return this.name;
        }

        /**
         * @language zh_CN
         * 设置通知信息主体
         * */
        public setBody(body:any):void {
            this.body = body;
        }

        /**
         * @language zh_CN
         * 获取通知信息主体
         * */
        public getBody():any {
            return this.body;
        }

        /**
         * @language zh_CN
         * 设置通知类型
         * */
        public setType(type:string):void {
            this.type = type;
        }

        /**
         * @language zh_CN
         * 获取通知类型
         * */
        public getType():string {
            return this.type;
        }

        /**
         * @language zh_CN
         * 消息体转字符串
         * */
        public toString():string {
            let msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        }
    }
}