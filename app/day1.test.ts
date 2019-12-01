import { Day1 } from "./day1";

import * as fs from 'fs';

describe("Day 1", () => {
    it("Can calculate fuel needed for first and last example", () => {
        const sut = new Day1();
        
        expect(sut.calculate(12)).toBe(2);  
        expect(sut.calculate(100756)).toBe(33583);        
    });

    it("Can solve puzzle input 1", async () => {
        const testData: String = fs.readFileSync("./app/day1-input1.txt", "utf8");
        const dataItems = testData.split(require('os').EOL).map(asString => parseInt(asString));

        const sut = new Day1();
        const result = sut.calculate(...dataItems);

        expect(result).toBe(3161483);
    });
});
