namespace ijia.AsciiArt {

    /**
     * @language zh_CN
     * 合并对象属性
     * */
    export function extend(target,...objects:any[]) {
        let key, object;

        for (let i=0, len = objects.length; i < len; i++) {
            object = objects[i];

            for (key in object) {
                target[key] = object[key];
            }
        }

        return target;
    }

    /**
     * @language zh_CN
     * 检测浏览器是否支持
     * */
    export function isBrowserSupported():boolean {
        let capableBrowser = true, regex, i, len, ref;

        if ( window['File'] && window['FileReader'] && window['FileList'] && window['Blob'] && window['FormData'] && document.querySelector ) {
            if ( !("classList" in document.createElement("a")) ) {
                capableBrowser = false;
            } else {
                ref = [/opera.*Macintosh.*version\/12/i];
                for (i = 0, len = ref.length; i < len; i++ ) {
                    regex = ref[i];
                    if ( regex.test(navigator.userAgent) ) {
                        capableBrowser = false;
                        continue;
                    }
                }
            }
        } else {
            capableBrowser = false;
        }
        return capableBrowser;
    }

    /**
     * @language zh_CN
     * 随机
     * */
    export function random(min, max) {
        return Math.random() * ( max - min ) + min;
    }

    /**
     * @language zh_CN
     * 获取随机code
     * */
    //let codeText:string = "!@#$%^&*_+1234567890";
    let codeText:string = "!@#$%^&*_+";
    //let codeText:string = "-";
    export function getRandomCode() {
        var i = Math.floor(random(0, codeText.length));
        return codeText.substr(i, 1);
    }

    export function generateMatrix(w, h, initialValue) {
        let matrix, x, y, _i, _j, _ref, _ref1;
        matrix = [];
        for (x = _i = 0, _ref = w - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
            matrix[x] = [];
            for (y = _j = 0, _ref1 = h - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
                matrix[x][y] = initialValue;
            }
        }
        return matrix;
    }
}