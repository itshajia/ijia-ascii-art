namespace ijia.puremvc {

    /**
     * 代理
     * */
    export class Proxy extends Notifier implements IProxy, INotifier{

        /**
         * @language zh_CN
         * */
        public static NAME:string = "Proxy";

        /**
         * @language zh_CN
         * 数据
         * */
        public data:any;

        /**
         * @language zh_CN
         * 代理名称
         * */
        public proxyName:string;

        constructor(proxyName?:string, data?:any) {
            super();

            if (typeof proxyName === "undefined") { proxyName = null; }
            if (typeof data === "undefined") { data = null; }
            this.data = null;
            this.proxyName = null;
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if(data != null) {
                this.setData(data);
            }
        }

        /**
         * @language zh_CN
         * 获取代理名称
         * */
        public getProxyName():string {
            return this.proxyName;
        }

        /**
         * @language zh_CN
         * 设置数据
         * */
        public setData(data):void {
            this.data = data;
        }

        /**
         * @language zh_CN
         * 获取数据
         * */
        public getData():any {
            return this.data;
        }

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