namespace ijia.puremvc {

    /**
     * 可添加子命令的控制器
     * */
    export class MacroCommand extends Notifier implements ICommand, INotifier{

        /**
         * @language zh_CN
         * 子命令
         * */
        public subCommands:any[];

        constructor() {
            super();

            this.subCommands = null;
            this.subCommands = [];
            this.initializeMacroCommand();
        }

        /**
         * @language zh_CN
         * 初始化
         * */
        public initializeMacroCommand():void {

        }

        /**
         * @language zh_CN
         * 添加子命令
         * */
        public addSubCommand(commandClassRef):void {
            this.subCommands.push(commandClassRef);
        }

        /**
         * @language zh_CN
         * 执行命令
         * */
        public execute(notification):void {
            let subCommands = this.subCommands.slice(0);
            let len = this.subCommands.length;
            for(let i = 0; i < len; i++) {
                let commandClassRef = subCommands[i];
                let commandInstance = new commandClassRef();
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        }
    }
}