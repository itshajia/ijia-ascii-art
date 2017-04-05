namespace ijia {

    /**
     * 哈希计数
     * */
    let $hashCode:number = 1;

    interface IHashObject {

        /**
         * 返回此对象唯一的哈希值，用于唯一确定一个对象
         * hashCode为大于等于1的整数
         * */
        hashCode:number;
    }

    /**
     * 哈希对象（顶级对象）
     * */
    export class HashObject implements IHashObject {

        constructor() {
            this.$hashCode = $hashCode++;
        }

        /**
         * 哈希计数
         * */
        private $hashCode:number;

        /**
         * 返回hashCode的值，全局唯一
         * */
        public get hashCode():number {
            return this.$hashCode;
        }
    }
}