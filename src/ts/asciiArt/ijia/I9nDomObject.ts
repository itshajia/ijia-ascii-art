namespace ijia {

    /**
     * 可交互的Dom类
     * */

    export class I9nDomObject extends DomObject {

        /**
         * @language zh_CN
         * 可拖拽
         * */
        public isDrag:boolean = false;

        constructor() {
            super();

            this.onClick = this.onClick.bind(this);
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragEnter = this.onDragEnter.bind(this);
            this.onDragOver = this.onDragOver.bind(this);
            this.onDragLeave = this.onDragLeave.bind(this);
            this.onDrop = this.onDrop.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
        }

        /**
         * @language zh_CN
         * 启用
         * */
        public enable() {
            if (this.disabled) {
                super.enable();

                this.on(this.click, this.onClick);

                if (this.isDrag) {
                    this.on('dragstart', this.onDragStart)
                        .on('dragenter', this.onDragEnter)
                        .on('dragover', this.onDragOver)
                        .on('dragleave', this.onDragLeave)
                        .on('drop', this.onDrop)
                        .on('dragend', this.onDragEnd);
                }
            }

            return this;
        }

        /**
         * @language zh_CN
         * 禁用
         * */
        public disable() {
            if (!this.disabled) {
                super.disable();

                this.off(this.click, this.onClick);

                if (this.isDrag) {
                    this.off('dragstart', this.onDragStart)
                        .off('dragenter', this.onDragEnter)
                        .off('dragover', this.onDragOver)
                        .off('dragleave', this.onDragLeave)
                        .off('drop', this.onDrop)
                        .off('dragend', this.onDragEnd);
                }
            }

            return this;
        }

        /**
         * @language zh_CN
         * 点击事件
         * */
        public onClick(e, eventData) {
            if (this.actived || this.disabled) return;
            this.activate();
            this.emit("onClick");
        }

        /**
         * @language zh_CN
         * */
        public onDragStart(e) {
            if (this.disabled) return;
            this.emit("onDragStart");
        }

        /**
         * @language zh_CN
         * */
        public onDragEnter(e) {
            if (this.disabled) return;
            e.stopPropagation();
            e.preventDefault();
            this.emit("onDragEnter");

        }

        /**
         * @language zh_CN
         * */
        public onDragOver(e) {
            if (this.disabled) return;
            e.stopPropagation();
            e.preventDefault();
            this.emit("onDragOver");
        }

        /**
         * @language zh_CN
         * */
        public onDragLeave(e) {
            if (this.disabled) return;
            e.stopPropagation();
            e.preventDefault();
            this.emit("onDragLeave");

        }

        /**
         * @language zh_CN
         * */
        public onDrop(e, eventData) {
            if (this.disabled) return;
            e.stopPropagation();
            e.preventDefault();
            this.emit("onDrop");

        }

        /**
         * @language zh_CN
         * */
        public onDragEnd(e) {
            this.emit("onDragEnd");
        }
    }
}