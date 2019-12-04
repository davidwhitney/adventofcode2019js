import { Day3, Wire, WirePart } from './day3';

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
        console.log(result);
        expect(result.length).toBe(2);
    }
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