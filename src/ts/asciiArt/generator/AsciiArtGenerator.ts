namespace ijia.AsciiArt {

    /**
     * 创建字符
     * */
    let letters = " abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,-;:_*'^~!@#$%+&";
    let canvas = document.createElement("canvas");
    canvas.width = 12; canvas.height = 12;
    let ctx = canvas.getContext("2d");
    ctx.font = "12px monospace";
    ctx.textAlign = "center";

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    export class AsciiArtGenerator extends BaseGenerator {

        /**
         * @language zh_CN
         * 字母表
         * */
        private alphabet;

        /**
         * @language zh_CN
         * 取样宽度
         * */
        private sampleWidth;

        /**
         * @language zh_CN
         * 取样高度
         * */
        private sampleHeight;

        public constructor() {
            super();

            // 初始化字母表
            this.alphabet = this.getLetterBlackness();
            console.log(this.alphabet);
        }

        /**
         * @language zh_CN
         * */
        public parse2(pixelData:Uint8Array, width, height) {
            let sampleWidth, sampleHeight, xSamples, ySamples, text = "", scale;

            scale = 0.25;
            sampleWidth = 1 / scale;
            sampleHeight = 1 / scale * 2;
            xSamples = width / sampleWidth;
            ySamples = height / sampleHeight;

            let sampleData, sampleIntensity;

            console.log("sampleWidth="+ sampleWidth+";sampleHeight="+sampleHeight);
            console.log("xSamples="+xSamples+";ySamples="+ySamples);
            for (let y=0; y<ySamples; y++) {
                for (let x=0; x<xSamples; x++) {
                    let byteArray = new Uint8ClampedArray( sampleWidth * sampleHeight * 4 );
                    for ( let i=0; i<sampleHeight; i++ ) {
                        sampleData = pixelData.slice((y * xSamples + x) * sampleWidth * 4, (y * xSamples + x + 1) * sampleWidth * 4);
                        /*if (x==0 && y==0) {
                            console.log(sampleData);
                            console.log(byteArray);
                            console.log(i * sampleWidth * 4);
                        }*/
                        byteArray.set(sampleData, ( i * sampleWidth * 4 ));
                    }

                    sampleIntensity = this.getSampleBrightness(byteArray);
                    if ( x ==0 ) {
                        console.log("sampleIntensity="+ sampleIntensity);
                    }
                    text += this.resolveBrightness(sampleIntensity);
                }

                text += "\n";
            }

            console.log('%c '+ text, 'color:#008100;line-height: 12px;font-size: 12px; letter-spacing:2px;text-transform: full-width;');
        }
        public parse(pixelData:Uint8Array, width, height) {
            let index = 0, sampleData, sampleIntensity, text = "";

            console.log("width="+ width +";height="+height);
            let sampleWidth = 1, sampleHeight = 2;
            let column = width / sampleWidth, row = height / sampleHeight;
            for (let i=0; i<row; i++) {
                for (let j=0; j<column; j++) {
                    index = ((i * sampleHeight) * (column * sampleWidth) + j) * 4;

                    let byteArray = new Uint8ClampedArray(Math.floor(sampleWidth * sampleHeight) * 4);
                    for ( let k=0; k<sampleHeight; k++ ) {
                        let index2 = index + (k * column * sampleWidth * 4);
                        sampleData = pixelData.slice(index2, index2 + 4);
                        if ( i==0 && j==0 && k==0 ) {
                            console.log(byteArray);
                            console.log(sampleData);
                        }

                        if (i==0 && j==0) {
                            console.log("index2="+ (k * sampleWidth * 4));
                        }
                        byteArray.set(sampleData, (k * sampleWidth * 4));

                    }

                    sampleIntensity = this.getSampleBrightness(byteArray);
                    text += this.resolveBrightness(sampleIntensity);
                }

                text += "\n";
            }

            console.log('%c '+ text, 'color:#008100;line-height: 12px;font-size: 12px; letter-spacing:2px;text-transform: full-width;');
        }

        /**
         * @language zh_CN
         * */
        private resolveBrightness(brightness) {
            let blackness = 1 - brightness;
            let alphabet = this.alphabet;
            for (let i=0; i<alphabet.length; i++) {
                if (blackness < alphabet[i].blackness) {
                    return alphabet[i].letter;
                }
            }

            return alphabet[alphabet.length - 1].letter;
        }

        /**
         * @language zh_CN
         * */
        private getSampleBrightness(pixelData) {
            let pixelCount = pixelData.length / 4;
            let brightness = 0;

            for (let i=0; i<pixelData.length; i+=4) {
                if (pixelData[i+3] != 255) {
                    brightness += 1;
                } else {
                    let r = pixelData[i] / 255;
                    let g = pixelData[i + 1] / 255;
                    let b = pixelData[i + 2] / 255;
                    brightness += (r + g + b) / 3;
                }
            }

            return brightness / pixelCount;
        }

        /**
         * @language zh_CN
         * */
        private getLetterBlackness() {
            let items = new Array();
            let len = letters.length;
            for (let i=0; i<len; i++) {
                items.push({letter: letters[i], blackness: this.getBlackness(letters[i])});
            }

            let sortItems = this.sort(items);
            this.scale(sortItems);
            return sortItems;
        }

        /**
         * @language zh_CN
         * */
        private getBlackness(letter:string) {
            resetCanvas();
            //ctx.fillText(letter, 50, 75);
            ctx.fillText(letter, canvas.width / 2, canvas.height/3 * 2);

            let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let blackness = 0;
            for (let i=0; i<pixelData.length; i+=4) {
                if ( pixelData[i+3] ) {
                    blackness++;
                }
            }

            return blackness / 10000;
        }

        /**
         * @language zh_CN
         * 排序
         * */
        private sort(unSortItems) {
            let items = new Array();
            let len = letters.length;
            for (let i=0; i<len; i++) {
                let minItem = {blackness: 10.0};

                for (let j=0; j<unSortItems.length; j++) {
                    if ( unSortItems[j].blackness < minItem.blackness ) {
                        minItem = unSortItems[j];
                    }
                }

                items.push(minItem);
                unSortItems.splice(unSortItems.indexOf(minItem), 1);
            }

            return items;
        }

        /**
         * @language zh_CN
         * */
        private scale(sortItems) {
            let scalar = 1 / sortItems[sortItems.length - 1].blackness;
            for (let i=0; i<sortItems.length; i++) {
                sortItems[i].blackness *= scalar;
            }

            // 调整首个元素，确保值不为空
            sortItems[0].blackness = sortItems[1].blackness / 2;
        }
    }
}