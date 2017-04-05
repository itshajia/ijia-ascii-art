namespace ijia.puremvc {

    /**
     * 数据模型
     * */
    export class Model implements IModel{

        /**
         * @language zh_CN
         * */
        public static SINGLETON_MSG:string = "Model singleton already constructed!";

        /**
         * @language zh_CN
         * 模型单例
         * */
        public static instance:IModel;

        /**
         * @language zh_CN
         * 代理字典
         * */
        public proxyMap:Object;

        constructor() {
            this.proxyMap = null;
            if(Model.instance) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = {
            };
            this.initializeModel();
        }

        /**
         * @language zh_CN
         * 初始化数据模型
         * */
        public initializeModel():void {

        }

        /**
         * @language zh_CN
         * 注册代理
         * */
        public registerProxy(proxy:IProxy):void {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        }

        /**
         * @language zh_CN
         * 移除代理
         * */
        public removeProxy(proxyName:string):IProxy {
            let proxy = this.proxyMap[proxyName];
            if(proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        }

        /**
         * @language zh_CN
         * 检索代理
         * */
        public retrieveProxy(proxyName:string):IProxy {
            return this.proxyMap[proxyName] || null;
        }

        /**
         * @language zh_CN
         * 检测是否存在对应名称的代理
         * */
        public hasProxy(proxyName:string):boolean {
            return this.proxyMap[proxyName] != null;
        }

        /**
         * @language zh_CN
         * 获取单例
         * */
        public static getInstance():IModel {
            if(!Model.instance) {
                Model.instance = new Model();
            }
            return Model.instance;
        }
    }
}