import { default as StarfieldScanner } from "./day10";

describe("Day 10", () => {
    it("Can correctly get neighbouring locations for immediate neighbours", () =>{
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const neighbours = sut.getNeighboursUsingOffset({ x: 0, y: 0 }, 1);

        expect(neighbours.length).toBe(3);
    });

    it("Can correctly get neighbouring locations for offsetted neighbours", () =>{
        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const neighbours = sut.getNeighboursUsingOffset({ x: 0, y: 0 }, 2);

        expect(neighbours.length).toBe(5);
    });


    it("Can see to right", () => {

        const sut = new StarfieldScanner([
            "#.#",
            "...",
            "...",
        ]);

        const result = sut.canSee({ x: 0, y: 0 })

        expect(result).toBe(1);
    });
/*
    it("Can have vision obscured to the right", () => {

        const sut = new StarfieldScanner([
            "###",
            "...",
            "...",
        ]);

        const result = sut.canSee({ x: 0, y: 0 })

        expect(result).toBe(1);
    });*/

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
