import * as fs from 'fs';

describe("Day 8", () => {
    it("Puzzle 1", () => {
        // 25 wide, 6 tall
        const testData: string = fs.readFileSync("./app/day8-input1.txt", "utf8");
        const layers = loadData(testData)

        let line = "";
        let shortest = 10000000000;
        for (const layer of layers) {

            const parts = layer.split('0');

            if (parts.length < shortest) {
                console.log("This layer only has " + parts.length + " zeros!");
                line = layer;
                shortest = parts.length;
            }
        }

        const oneDigitCount = line.split('1').length - 1;
        const twoDigitCount = line.split('2').length - 1;

        expect(oneDigitCount * twoDigitCount).toBe(1935);
    });

    it("Puzzle 2", () => {
        // 25 wide, 6 tall
        const testData: string = fs.readFileSync("./app/day8-input1.txt", "utf8");
        const layers = loadData(testData)

        // 0 = black
        // 1 = white
        // 2 = transparent

        let resultantImageLines: string[] = [];

        for(let x = 0; x < 150; x++) {
            let buffer = "";

            const __ret = extracted(layers, x);
            if(__ret != null) {
                buffer += __ret;
            } else {
                buffer += "2";
            }

            if (x != 0 && x % 25 == 0) {
                resultantImageLines.push(buffer);
                buffer = "";
            }
        }
    });
});


function loadData(testData) {
    let x = 0;
    const layers: string[] = [];
    let buffer = "";
    for (const char of testData) {
        if (x == (25 * 6)) {
            x = 0;
            layers.push(buffer);
            buffer = "";
        }

        buffer += char;
        x++
    }
    return layers;
}

function extracted(layers: string[], charIndex: number) {
    for (const layer of layers) {
        if (layer[charIndex] != '2') {
            console.log(layer[charIndex]);
            return layer[charIndex];
        }
    }
    return null;
}
