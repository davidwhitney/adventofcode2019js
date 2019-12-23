import {Coord, default as StarfieldScanner} from "./day10";

describe("Day 10", () => {
    it("Can correctly get neighbouring locations for immediate neighbours", () =>{
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const neighbours = sut.getNeighboursUsingOffset(new Coord(0, 0), 1);
        expect(neighbours.length).toBe(3);
    });

    it("Can correctly get neighbouring locations for offsetted neighbours", () =>{
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const neighbours = sut.getNeighboursUsingOffset(new Coord(0, 0), 2);
        expect(neighbours.length).toBe(5);
    });


    it("Can see to right", () => {
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });

    it("Can see to left", () => {
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const result = sut.canSee(new Coord(2, 0));
        expect(result).toBe(1);
    });

    it("Can see down", () => {
        const sut = new StarfieldScanner([
            "#..",
            "...",
            "#..",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });

    it("Can see up", () => {
        const sut = new StarfieldScanner([
            "#..",
            "...",
            "#..",
        ]);

        const result = sut.canSee(new Coord(0, 2));
        expect(result).toBe(1);
    });

    it("Can see diagonals", () => {
        const sut = new StarfieldScanner([
            "#..",
            ".#.",
            "...",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });

    it("Can see non-compass directions", () => {
        const sut = new StarfieldScanner([
            "#...",
            "....",
            "...#",
            "....",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });


    it("Can have vision obscured to the right", () => {
        const sut = new StarfieldScanner([
            "###",
            "...",
            "...",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });

    it("Can have vision obscured to the left", () => {
        const sut = new StarfieldScanner([
            "###",
            "...",
            "...",
        ]);

        const result = sut.canSee(new Coord(2, 0));
        expect(result).toBe(1);
    });

    it("Can have vision obscured upwards", () => {
        const sut = new StarfieldScanner([
            "#..",
            "#..",
            "#..",
        ]);

        const result = sut.canSee(new Coord(0, 0));
        expect(result).toBe(1);
    });

    it("Can have vision obscured downwards", () => {
        const sut = new StarfieldScanner([
            "#..",
            "#..",
            "#..",
        ]);

        const result = sut.canSee(new Coord(0, 2));
        expect(result).toBe(1);
    });

    it("Example 1", () => {

        const sut = new StarfieldScanner([
            ".#..#",
            ".....",
            "#####",
            "....#",
            "...##"
        ]);

        const bestLocation = sut.findBest();

        expect(bestLocation.x).toBe(3);
        expect(bestLocation.y).toBe(4);
        expect(bestLocation.canSee).toBe(8);
    });
});
