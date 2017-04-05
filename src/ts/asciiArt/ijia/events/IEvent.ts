namespace ijia {

    export interface IEvent {

        /**
         * @language zh_CN
         * 事件类型
         * */
            type:string;

        /**
         * @language zh_CN
         * 事件触发目标
         * */
        target;

        /**
         * @language zh_CN
         * 事件绑定目标
         * */
        currentTarget;

        /**
         * @language zh_CN
         * 事件绑定数据
         * */
        data?;

        /**
         * @language zh_CN
         * 事件源
         * */
        originalEvent?;

        /**
         * @language zh_CN
         * Mouse
         * */
        button?;
        buttons?;
        clientX?;
        clientY?;
        offsetX?;
        offsetY?;
        pageX?;
        pageY?;
        sceenX?;
        sceenY?;
        toElement?;

        /**
         * @language zh_CN
         * Key
         * */
        char?;
        charCode?;
        key?;
        keyCode?;

        /**
         * @language zh_CN
         * 通用属性
         * */
        altKey?;
        bubbles?;
        cancelable?;
        ctrlKey?;
        detail?;
        eventPhase?;
        metaKey?;
        relatedTarget?;
        shiftKey?;
        timeStamp?;
        view?;
        which?;

        isDefaultPrevented();
        isPropagationStopped();
        isImmediatePropagationStopped();
        preventDefault();
        stopPropagation();
        stopImmediatePropagation();
    }
}