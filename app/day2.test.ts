import { IntcodeVm as Day2 } from "./IntCodeVm";
import * as fs from 'fs';

describe("Day 2", () => {
  
    it("Can do simple add", () => {
        const sut = new Day2(1, 9, 10, 3, 2,3,11,0, 99, 30,40,50);
        sut.execute();        
        expect(sut.state).toEqual([3500, 9, 10, 70, 2,3,11,0,99, 30,40,50 ]);
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
        const sut = Day2.withInput("./app/day2-input1.txt").resetStateUsing(12, 2);
        
        sut.execute();

        expect(sut.state[0]).toEqual(3706713);
    });

    it("Part 2", () => {
        const testData: string = fs.readFileSync("./app/day2-input1.txt", "utf8");
        const dataItems = testData.split(',').map(asString => parseInt(asString));        
        
        for(let noun = 0; noun <= 99; noun++) {
            for(let verb = 0; verb <= 99; verb++) {
                const sut = new Day2(...dataItems).resetStateUsing(noun, verb);        
                sut.execute();

                if (sut.state[0] === 19690720) {
                    console.log(100 * noun + verb);
                }
            }
        }
    });
});
