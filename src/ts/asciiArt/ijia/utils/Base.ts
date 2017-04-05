/**
 * 基本工具
 * */
namespace ijia {

    /**
     * @language zh_CN
     * 判断对象是否为空对象
     * @param obj {Object} 要判断的对象
     * @returns {boolean}
     * */
    export function isEmptyObject(obj) {
        let name;
        for (name in obj) {
            return false;
        }
        return true;
    }

    /**
     * @language zh_CN
     * 判断是否为对象
     * */
    export function isObject(obj) {
        let name;
        for (name in obj) {
            return true;
        }
        return false;
    }

    /**
     * @language zh_CN
     * 判断对象是否有相应的属性
     * @param value {string} 属性名称
     * @param obj {Object}
     * @returns {boolean}
     * */
    export function inObject(value:string, obj:Object) {
        return obj.hasOwnProperty(value);
    }

    /**
     * @language zh_CN
     * 对象类型
     * @param obj {Object} 要检测的对象
     * @returns
     * */
    const class2type:Object = {};
    export function type(obj) {
        if( obj == null ) {
            return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ? class2type[{}.toString.call(obj)] || "object" : typeof obj;
    }

    /**
     * @language zh_CN
     * 判断对象是否为方法
     * @param obj {Object} 要判断的对象
     * @returns {boolean}
     * */
    export function isFunction(obj) {
        return type( obj ) === "function";
    }

    /**
     * @language zh_CN
     * 判断对象是否为数组
     * @param obj {Object} 要判断的对象
     * @returns {boolean}
     * */
    export function isArray(obj) {
        return type( obj ) === "array";
    }

    /**
     * @language zh_CN
     * 判断对象是否为字符串
     * */
    export function isString(obj) {
        return type(obj) === "string";
    }

    /**
     * @language zh_CN
     * 判断字符是否在数组中
     * @param value {string} 检测的字符
     * @param arr {array} 检测的数组
     * @returns {boolean}
     * */
    export function inArray(elem, arr) {
        return arr == null ? false : ([].indexOf.call( arr, elem ) != -1 ? true : false);
    }

    /**
     * @language zh_CN
     * 过滤字符串首位空格符号
     * @param text {string} 要过滤的字符串
     * @returns {string} 过滤后的字符串
     * */
    export function trim( text ) {
        return text && isString(text) ? text.replace(/(^\s*)|(\s*$)/g, "") : "";
    }

    /**
     * @language zh_CN
     * 判断是否为Window对象
     * @param obj {object} 要判断的对象
     * @returns {boolean}
     * */
    export function isWindow(obj) {
        return obj != null && obj === obj.window;
    }

    /**
     * @language zh_CN
     * 循环体
     * @param obj {object} 循环的对象
     * @param callback {function} 回调方法
     * */
    export function each(obj, callback) {
        let length, i = 0;
        if ( isArray( obj ) ) {
            length = obj.length;
            for ( ; i < length; i++ ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        } else {
            for (let i in obj ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        }
        return obj;
    }

    /**
     * @language zh_CN
     * 对象属性合并
     * @param obj {object} 基本对象
     * @param props {object} 待合并的属性
     * @returns {object}
     * */
    export function extend(obj, props) {
        for ( let prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                obj[prop] = props[prop];
            }
        }

        return obj;
    }

    /**
     * @language zh_CN
     * 获取当前时间(精确到毫秒)
     * @returns
     * */
    export function now() {
        return new Date().getTime();
    }

    /**
     * @language zh_CN
     * 角度值转化为弧度制
     * @param angle {number} 角度
     * @return {number} 弧度
     * */
    export function angle2Radian(angle) {
        return Math.PI / 180 * angle;
    }

    /**
     * @language zh_CN
     * @param value {number}
     * @returns {boolean}
     * */
    export function isNAN(value:number):boolean {
        value = +value;
        return value !== value;
    }

    /**
     * @language zh_CN
     * 是否为数字类型
     * @param value {number}
     * @returns {boolean}
     * */
    export function isNumber(value:number):boolean {
        return (value !== null && value !== undefined) && !!(value).toFixed;
    }

    /**
     * @language zh_CN
     * 过滤掉数组中的空字符和undefined
     * */
    export function filter(arr=[]) {
        return arr.filter((value) => {
            //return !!(trim(value));
            return isString(value) ? !!(trim(value)) : (isNumber(value) ? true : !!(value)) ;
        });
    }

    /**
     * @language zh_CN
     * 返回数组唯一
     * */
    export function unique(arr=[]) {
        let array = [], len = arr.length;
        for (let i=0; i<len; i++) {
            if (!inArray(arr[i], array)) {
                array.push(arr[i]);
            }
        }

        return array;
    }

    /**
     * @language zh_CN
     * 将数字用 逗号 隔开显示
     * */
    export function numberWithCommas(x) {
        // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        var parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    /**
     *
     * */
    function requestFrame(cb, fps = 60) {
        window.setTimeout(cb, 1000 / fps);
    }

    /**
     * @language zh_CN
     * 帧动画监听
     * */
    export function requestAnimFrame(cb, fps = 60) {
        return window.requestAnimationFrame(cb) ||
            window['webkitRequestAnimationFrame'](cb) ||
            window['mozRequestAnimationFrame'](cb) ||
            window['oRequestAnimationFrame'](cb) ||
            window['msRequestAnimationFrame'](cb) ||
            requestFrame(cb, fps);
    }

    /**
     * @language zh_CN
     * GetUTC
     * */
    export function getUtc() {
        let d;

        d = new Date();
        return Date.UTC(d.getFullYear()
            ,d.getMonth()
            ,d.getDate()
            ,d.getHours()
            ,d.getMinutes()
            ,d.getSeconds()
            ,d.getMilliseconds());
    }

    /**
     * @language zh_CN
     * Guid
     * */
    export function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    each("Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });
}