import { Day3, Wire, WirePart } from './day3';
import * as fs from 'fs';

describe("Day 3", () => {
    
    it("Plot plots correct number of lines", () => {
        const sut = new Day3();
        sut.plot("R8", "U5", "L5", "D3");
        expect(sut.lines[0].length).toBe(4);
    });

    it("Plot sets correct R direction", () => {
        const sut = new Day3();
        sut.plot("R8");
        expect(sut.lines[0][0].to.x).toBe(8);
    });

    it("Plot sets correct L direction", () => {
        const sut = new Day3();
        sut.plot("L8");
        expect(sut.lines[0][0].to.x).toBe(-8);
    });

    it("Plot sets correct U direction", () => {
        const sut = new Day3();
        sut.plot("U8");
        expect(sut.lines[0][0].to.y).toBe(8);
    });

    it("Plot sets correct D direction", () => {
        const sut = new Day3();
        sut.plot("D8");
        expect(sut.lines[0][0].to.y).toBe(-8);
    });

    it("Can calculate intersections accurately", () => {
        const sut = new Day3();
        sut.plot("R8", "U5", "L5", "D3");
        sut.plot("U7", "R6", "D4", "L4");

        const result = sut.intersections();
        const manhattenDistance = sut.closestIntersection();
        const distanceToIntersection = sut.distanceToClosestIntersection();
        
        expect(result.length).toBe(2);
        expect(manhattenDistance).toBe(6);
        expect(distanceToIntersection).toBe(30);
    })

    it("Examples", () => {
        let sut = new Day3();
        sut.plot("R75","D30","R83","U83","L12","D49","R71","U7","L72");
        sut.plot("U62","R66","U55","R34","D71","R55","D58","R83");
        let manhattenDistance1 = sut.closestIntersection();
        const distanceToIntersection1 = sut.distanceToClosestIntersection();

        sut = new Day3();
        sut.plot("R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51");
        sut.plot("U98","R91","D20","R16","D67","R40","U7","R15","U6","R7");
        let manhattenDistance2 = sut.closestIntersection();    
        const distanceToIntersection2 = sut.distanceToClosestIntersection();    
        
        expect(manhattenDistance1).toBe(159);
        expect(manhattenDistance2).toBe(135);
        
        expect(distanceToIntersection1).toBe(610);
        expect(distanceToIntersection2).toBe(410);
    })

    // Slow
    
    /*it("Quiz 1", () => {
        const testData: String = fs.readFileSync("./app/day3-input1.txt", "utf8");
        const lines: string[] = testData.split('\r\n');
        
        let sut = new Day3();

        for(const l of lines) {            
            const commands: string[] = l.split(',');            
            sut.plot(...commands);
        }

        const manhattenDistance = sut.closestIntersection();        
        const distanceToIntersection1 = sut.distanceToClosestIntersection();

        expect(manhattenDistance).toBe(209);   
        expect(distanceToIntersection1).toBe(43258);
    }, 100 * 1000);*/
});


describe("Wire", () => {
    it("Can calculate an intersection with simple wires", () => {
        const wire1 = new Wire(
            new WirePart({ x: 1,  y: 0 }, { x: 2,  y: 0})
        );

        const wire2 = new Wire(
            new WirePart({ x: 1,  y: -1 }, { x: 1,  y: 1})
        );

        const result = wire1.intersects(wire2);
        const intersections = wire1.intersections(wire2);

        expect(result).toBe(true);
        expect(intersections.length).toBe(1);
    });
});
