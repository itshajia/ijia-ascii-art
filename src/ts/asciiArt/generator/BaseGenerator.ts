namespace ijia.AsciiArt {

    export abstract class BaseGenerator {

        /**
         * @language zh_CN
         * 解析图像像素信息
         * */
        public abstract parse(byteArray:Uint8Array, width, height);
    }
}