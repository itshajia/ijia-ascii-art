namespace ijia.AsciiArt {

    export class StartupCommand extends puremvc.MacroCommand {

        public constructor() { super(); }

        /**
         * 添加子Command 初始化MacroCommand
         *
         * 命令会按照“先进先出”（FIFO）的顺序被执行
         * 在用户与数据交互之前，Model必须处于一种一致的已知的状态
         * 一旦Model初始化完成，View视图就可以显示数据允许用户操作与之交互
         * 因此，一般“开启”（startup）过程首先是Model初始化，然后View初始化
         */
        public initializeMacroCommand():void {
            this.addSubCommand(BootstrapCommand);
            this.addSubCommand(BootstrapModel);
            this.addSubCommand(BootstrapViewMediator);

            // 开始构建应用
            console.log("开始构建应用");
        }
    }
}