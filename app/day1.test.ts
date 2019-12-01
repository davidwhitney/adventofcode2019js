import { Day1 } from "./day1";

import * as fs from 'fs';

describe("Day 1", () => {
    it("Can calculate fuel needed for first and last example", () => {
        const sut = new Day1();
        
        expect(sut.calculate(12)).toBe(2);  
        expect(sut.calculate(100756)).toBe(33583);        
    });

    it("Can calculate fuel with fuel requirements needed for first and last example", () => {
        const sut = new Day1();
        
        expect(sut.calculateWithFuel(14)).toBe(2);  
        expect(sut.calculateWithFuel(1969)).toBe(966);    
        expect(sut.calculateWithFuel(100756)).toBe(50346);        
    });

    it("Can solve puzzle 1", async () => {
        const testData: String = fs.readFileSync("./app/day1-input1.txt", "utf8");
        const dataItems = testData.split(require('os').EOL).map(asString => parseInt(asString));

        const sut = new Day1();
        const result = sut.calculate(...dataItems);

        expect(result).toBe(3161483);
    });
    
    it("Can solve puzzle 2", async () => {
        const testData: String = fs.readFileSync("./app/day1-input1.txt", "utf8");
        const dataItems = testData.split(require('os').EOL).map(asString => parseInt(asString));

        const sut = new Day1();
        const result = sut.calculateWithFuel(...dataItems);

        expect(result).toBe(4739374);
    });
});
