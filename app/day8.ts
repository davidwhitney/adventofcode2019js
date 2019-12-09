import * as Jimp from "jimp";

export default class Day8 {
    layers: string[] = [];
    x: number;
    y: number;

    constructor(dataAtString: string, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.layers = this.loadData(dataAtString, x, y);
    }

    public toImage(filename: string) {
        let lines: string[] = [];
        let buffer = "";

        for (let x = 0; x < (this.x * this.y); x++) {
            if (buffer.length == this.x) {
                lines.push(buffer);
                buffer = "";
            }

            let value = this.firstNonTransparentPixelFor(this.layers, x) ?? "2";
            buffer += value;
        }

        if(buffer.length > 0) {
            lines.push(buffer);
        }

        let image = new Jimp(25, 6, '#a39a99');
        for(let x = 0; x < 25; x++) {
            for(let y = 0; y < 6; y++) {
                const value = lines[y][x];
                let colour = '#ffffff00'; // red
                if (value == '0') {
                    colour = '#000000';
                }
                if (value == '1') {
                    colour = '#ffffff';
                }
                const hex = Jimp.cssColorToHex(colour);

                image.setPixelColor(hex, x, y);
            }
        }

        image.write(filename);
    }

    private firstNonTransparentPixelFor(layers: string[], charIndex: number) {
        for (const layer of layers) {
            if (layer[charIndex] != '2') {
                return layer[charIndex];
            }
        }
        return null;
    }

    private loadData(testData, maxX, maxY) {
        let x = 0;
        const layers: string[] = [];
        let buffer = "";
        for (const char of testData) {
            if (x == (maxX * maxY)) {
                x = 0;
                layers.push(buffer);
                buffer = "";
            }

            buffer += char;
            x++
        }
        layers.push(buffer);
        return layers;
    }
}