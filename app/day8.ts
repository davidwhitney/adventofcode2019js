import * as Jimp from "jimp";

export default class Day8 {
    layers: string[] = [];
    x: number;
    y: number;

    constructor(dataAtString: string, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.layers = Day8.loadData(dataAtString, x, y);
    }

    public toImage(filename: string) {
        let lines: string[] = [];
        let buffer = "";

        for (let x = 0; x < (this.x * this.y); x++) {
            if (buffer.length == this.x) {
                lines.push(buffer);
                buffer = "";
            }

            let value = Day8.firstNonTransparentPixelFor(this.layers, x) ?? "2";
            buffer += value;
        }

        if(buffer.length > 0) {
            lines.push(buffer);
        }

        let image = new Jimp(this.x, this.y, '#a39a99');
        for (let x = 0; x < this.x; x++) {
            for (let y = 0; y < this.y; y++) {
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

    private static firstNonTransparentPixelFor(layers: string[], charIndex: number) {
        for (const layer of layers) {
            if (layer[charIndex] != '2') {
                return layer[charIndex];
            }
        }
        return null;
    }

    private static loadData(testData, maxX, maxY) {
        const layers: string[] = [];
        let buffer = "";
        for (const char of testData) {
            if (buffer.length == (maxX * maxY)) {
                layers.push(buffer);
                buffer = "";
            }

            buffer += char;
        }

        if (buffer.length > 0) {
            layers.push(buffer);
        }
        return layers;
    }
}