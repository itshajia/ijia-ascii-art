namespace ijia.DOM {

    /**
     * DOM方法集合
     * */
    /**
     * @language zh_CN
     * 获取元素
     * */
    export function get(el) {
        let r = (el == document || el == window || el instanceof HTMLElement ? el : document.getElementById(el));
        if(r == null){
            console.log(el);
        }

        return r;
    }

    /**
     * @language zh_CN
     * 设置属性
     * */
    export function  attr(el,attr,value?) {
        if(value){
            get(el).setAttribute(attr,value);
        }else{
            return get(el).getAttribute(attr);
        }
    }

    /**
     * @language zh_CN
     * 显示
     * */
    export function show(el) {
        get(el).style.display = "block";
    }

    /**
     * @language zh_CN
     * 隐藏
     * */
    export function hide(el) {
        get(el).style.display = 'none';
    }

    /**
     * @language zh_CN
     * 获取元素在文档中的位置 (position)
     * */
    export function offset(el) {
        el = get(el);

        return {
            x : el.clientLeft + window['scrollLeft'],
            y : el.clientTop + window['scrollTop']
        };

        /*let pos = {x:0,y:0};
        do {
            pos.x += el.offsetLeft || 0;
            pos.y += el.offsetTop || 0;
        } while ((el = el.parentNode) !== null);
        return pos;*/
    }

    /**
     * @language zh_CN
     * 查询
     * */
    export function query(query) {
        if(!document.querySelectorAll)
            return null;

        let q = document.querySelectorAll(query);
        return q;
    }

    /**
     * @language zh_CN
     * 单个查询
     * */
    export function queryOne(query) {
        if(!document.querySelector)
            return null;

        let q = document.querySelector(query);
        return q;
    }

    /**
     * @language zh_CN
     * 上下文中寻找元素
     * */
    export function find(context, query) {
        if(!context || !context.querySelectorAll)
            return null;

        let q = context.querySelectorAll(query);
        return q;
    }

    /**
     * @language zh_CN
     * 上下文中寻找单个元素
     * */
    export function findOne(context, query):HTMLElement {
        if(!context || !context.querySelector)
            return null;

        let q = context.querySelector(query);
        return q;
    }

    /**
     * @language zh_CN
     * 创建实例
     * */
    export function create(type) {
        return document.createElement(type);
    }

    /**
     * @language zh_CN
     * 向后添加
     * */
    export function append(parent, child) {
        if (!parent || !child) return;
        parent.appendChild(child);
    }

    /**
     * @language zh_CN
     * 向前添加
     * */
    export function prepend(parent, child) {
        if (!parent || !child) return;
        parent.appendChild(child);
    }

    /**
     * @language zh_CN
     * 获取className
     * */
    export function  getClass(elem) {
        return attr(elem, "class") || "";
    }

    /**
     * @language zh_CN
     * 添加className
     * */
    export function addClass(elem, value) {
        let values, className, classNames;

        values = value.split(" ");
        if (!values || (values && !values.length)) return;
        className = getClass(elem);
        classNames = className ? className.split(" ") : [];
        for (let i=0,len = values.length; i < len; i++) {
            if (!inArray(values[i], classNames)) {
                classNames.push(values[i]);
            }
        }

        attr(elem, "class", classNames.join(" "));
    }

    /**
     * @language zh_CN
     * 移除className
     * */
    export function removeClass(elem, value) {
        let values, className, classNames;

        values = value.split(" ");
        if (!values || (values && !values.length)) return;
        className = getClass(elem);
        classNames = className ? className.split(" ") : [];
        for (let i=0,len = classNames.length; i < len; i++) {
            if (inArray(classNames[i], values)) {
                classNames[i] = null;
            }
        }

        classNames = filter(classNames);
        attr(elem, "class", (classNames && classNames.length) ? classNames.join(" ") : " ");
    }

    /**
     * @language zh_CN
     * 是否存在class名称
     * */
    export function hasClass(el:HTMLElement, className:string) {
        return new RegExp("(^|\\s)"+className+"(\\s|$)").test(el.className);
    }
}