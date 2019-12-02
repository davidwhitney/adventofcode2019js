import { Day2 } from "./day2";
import * as fs from 'fs';

describe("Day 2", () => {
    it("Can support add opcodes", () => {
        const sut = new Day2(1, 1, 2, 4);        
        sut.execute();        
        expect(sut.state[4]).toBe(3);
    });

    it("Can support multiply opcodes", () => {
        const sut = new Day2(2, 0, 0, 4);        
        sut.execute();        
        expect(sut.state[4]).toBe(4);
    });

    it("Can support halting opcodes", () => {
        const sut = new Day2(99, 3, 3, 4);        
        sut.execute();        
        expect(sut.state[4]).toBeUndefined();
    });

    it("Can run the example 1", () => {
        const sut = new Day2(1, 0, 0, 0, 99);    
        sut.execute();        
        expect(sut.state).toEqual([2, 0, 0, 0, 99]);
    });

    it("Can run the example 2", () => {
        const sut = new Day2(2,3,0,3,99);     
        sut.execute();        
        expect(sut.state).toEqual([2, 3, 0, 6, 99]);
    });

    it("Can run the example 3", () => {3
        const sut = new Day2(2,4,4,5,99,0);        
        sut.execute();        
        expect(sut.state).toEqual([2,4,4,5,99,9801]);
    });

    it("Can run the example 4", () => {
        const sut = new Day2(1 , 1, 1, 4, 99, 5, 6, 0, 99);        
        sut.execute();        
        expect(sut.state).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });

    it("Part 1", () => {        
        const testData: String = fs.readFileSync("./app/day2-input1.txt", "utf8");
        const dataItems = testData.split(',').map(asString => parseInt(asString));        
        const sut = new Day2(...dataItems).resetStateUsing(12, 2);
        
        sut.execute();

        expect(sut.output).toEqual(3706713);
    });

    it("Part 2", () => {        
        const testData: String = fs.readFileSync("./app/day2-input1.txt", "utf8");
        const dataItems = testData.split(',').map(asString => parseInt(asString));        
        
        for(let noun = 0; noun <= 99; noun++) {
            for(let verb = 0; verb <= 99; verb++) {
                const sut = new Day2(...dataItems).resetStateUsing(noun, verb);        
                sut.execute();

                if (sut.output === 19690720) {
                    console.log(100 * noun + verb);
                }
            }
        }
    });
});
