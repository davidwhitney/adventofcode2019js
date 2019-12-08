import { default as Day6 } from "./day6";
import * as fs from 'fs';

describe("Day 6", () => {
    it("Can map one direct orbit", () => {
        const sut = new Day6();

        sut.addRelationship("COM)AAA");

        expect(sut.countRelationships()).toBe(1);
    });

    it("Can map  more than one direct orbit", () => {
        const sut = new Day6();

        sut.addRelationship("COM)AAA");
        sut.addRelationship("COM)BBB");

        expect(sut.countRelationships()).toBe(2);
    });

    it("Can map direct orbit when com isn't supplied first", () => {
        const sut = new Day6();

        sut.addRelationship("GGG)FFF");
        sut.addRelationship("COM)AAA");
        sut.addRelationship("COM)BBB");

        expect(sut.countRelationships()).toBe(3);
    });


    it("Example 1", () => {
        const sut = new Day6();

        sut.addRelationship("COM)B");
        sut.addRelationship("B)C");
        sut.addRelationship("C)D");
        sut.addRelationship("D)E");
        sut.addRelationship("E)F");
        sut.addRelationship("B)G");
        sut.addRelationship("G)H");
        sut.addRelationship("D)I");
        sut.addRelationship("E)J");
        sut.addRelationship("J)K");
        sut.addRelationship("K)L");

        expect(sut.countRelationships()).toBe(42);
    });

    it("Puzzle 1", () => {

        const testData: string = fs.readFileSync("./app/day6-input1.txt", "utf8");
        const dataItems = testData.split('\r\n');  

        const sut = new Day6();
        for(const data of dataItems) {
            sut.addRelationship(data);
        }

        expect(sut.countRelationships()).toBe(140608);
    });
});
