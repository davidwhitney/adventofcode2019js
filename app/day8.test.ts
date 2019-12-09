import { default as Day8 } from './day8';
import * as fs from 'fs';
import * as Jimp from 'jimp';

describe("Day 8", () => {
    it("Puzzle 1", () => {
        const testData: string = fs.readFileSync("./app/day8-input1.txt", "utf8");
        const layers = new Day8(testData, 25, 6).layers;

        let line = "";
        let shortest = 10000000000;
        for (const layer of layers) {
            const parts = layer.split('0');
            if (parts.length < shortest) {
                line = layer;
                shortest = parts.length;
            }
        }

        const oneDigitCount = line.split('1').length - 1;
        const twoDigitCount = line.split('2').length - 1;

        expect(oneDigitCount * twoDigitCount).toBe(1935);
    });

    it("Example 2", () => {
        const sut = new Day8("0222112222120000", 2, 2);
        sut.toImage("example2.jpg");
    });

    it("Puzzle 2", () => {
        const testData: string = fs.readFileSync("./app/day8-input1.txt", "utf8");
        const layers = new Day8(testData, 25, 6);
        layers.toImage("puz2.jpg");
    });
});
