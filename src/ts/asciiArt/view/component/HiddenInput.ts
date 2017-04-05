namespace ijia.AsciiArt {

    export class HiddenInput extends DomObject {

        /**
         * @language zh_CN
         * 可接受文件
         * */
        private acceptedFiles;

        constructor(acceptedFiles?:string) {
            super();

            this.acceptedFiles = acceptedFiles;
            this.element = this.createElement(this.createTemplate());
        }

        /**
         * @language zh_CN
         * 更新DOM
         * */
        public resetDom() {
            this.element = null;
            this.element = this.createElement(this.createTemplate());
        }

        /**
         * @inheritDoc
         * */
        public createTemplate() {
            return '<input type="file" multiple="multiple" class="'+ prefixClass +'-hidden-input" accept="'+ this.acceptedFiles +'" />';
        }
    }
}