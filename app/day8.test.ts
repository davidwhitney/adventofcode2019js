import * as fs from 'fs';

describe("Day 8", () => {
    it("Puzzle 1", () => {

        // 25 wide, 6 tall
        const testData: string = fs.readFileSync("./app/day8-input1.txt", "utf8");
        let x = 0;

        const layers: string[] = [];
        let buffer = "";
        for(const char of testData) {
            if(x == (25 * 6)){ 
                x = 0;
                layers.push(buffer);
                buffer = "";
            }

            buffer += char;
            x++
        }

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

        const oneDigitCount = line.split('1').length -1;
        const twoDigitCount = line.split('2').length -1;

        expect(oneDigitCount * twoDigitCount).toBe(1935);

    });
});
