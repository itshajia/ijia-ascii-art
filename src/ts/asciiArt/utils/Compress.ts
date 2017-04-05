namespace ijia.AsciiArt {

    /**
     * @language zh_CN
     * 图像原数据压缩（等距采样）
     * http://blog.csdn.net/luoweifu/article/details/8067302
     * */
    export function  compressBufferedImageWithIsometricSampling(pixelData, naturalWidth, naturalHeight, width, height, ratio:number) {
        let newPixelData, index = 0, naturalIndex = 0;

        console.log(pixelData);
        console.log("width="+ width+";height="+height+";ratio="+ratio);
        newPixelData = new Uint8ClampedArray(width * height * 4);
        for (let i=0; i<height; i++) {
            for (let j=0; j<width; j++) {
                index = (i * width + j) * 4;
                naturalIndex = (Math.floor(i / ratio) * naturalWidth + Math.floor(j / ratio)) * 4;
                //naturalIndex = (Math.floor(naturalIndex / ratio) ) * 4;
                newPixelData[index++] = pixelData[naturalIndex++];
                newPixelData[index++] = pixelData[naturalIndex++];
                newPixelData[index++] = pixelData[naturalIndex++];
                newPixelData[index] = pixelData[naturalIndex];
            }
        }

        return newPixelData;
    }


    /**
     * @language zh_CN
     * 图像原始数据压缩（均值缩小）
     * http://blog.csdn.net/luoweifu/article/details/8069883
     * */
    export function compressBufferedImageWithMeanReduction(pixelData, naturalWidth, naturalHeight, width, height, ratio:number, color:boolean = false) {
        let newPixelData, index = 0, naturalIndex = 0, columnSpacing, rowSpacing;

        columnSpacing = naturalWidth / width;
        rowSpacing = naturalHeight / height;
        if (color) {
            newPixelData = new Int16Array(width * height * 3);
            for (let i=0; i<height; i++) {
                for (let j=0; j<width; j++) {
                    let r = 0, g = 0, b = 0;

                    index = (i * width + j) * 3;
                    for (let k=0; k<parseInt(columnSpacing); k++) {
                        for (let l=0; l<parseInt(rowSpacing); l++) {
                            naturalIndex = (Math.floor(i / ratio + k) * naturalWidth + Math.floor(j / ratio + l)) * 3;
                            r += pixelData[naturalIndex++];
                            g += pixelData[naturalIndex++];
                            b += pixelData[naturalIndex++];
                        }
                    }

                    r = Math.floor(r * ratio * ratio);
                    g = Math.floor(g * ratio * ratio);
                    b = Math.floor(b * ratio * ratio);

                    newPixelData[index++] = r;
                    newPixelData[index++] = g;
                    newPixelData[index] = b;
                }
            }
        } else {
            newPixelData = new Int16Array(width * height);
            for (let i=0; i<height; i++) {
                for (let j=0; j<width; j++) {
                    let value = 0;

                    for (let k=0; k<parseInt(columnSpacing); k++) {
                        for (let l=0; l<parseInt(rowSpacing); l++) {
                            value += pixelData[Math.floor(i / ratio + k) * naturalWidth + Math.floor(j / ratio + l)];
                        }
                    }

                    index = i * width + j;
                    value = Math.floor(value * ratio * ratio);
                    newPixelData[index] = value;
                }
            }
        }

        return newPixelData;
    }
}