describe("Day 10", () => {

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

type Coord = { x: number, y: number; }
interface LocationResult extends Coord { canSee: number; }

class StarfieldScanner {
    private _astroidBelt: string[];

    constructor(astroidBelt: string[]) {
        this._astroidBelt = astroidBelt;
    }
        
    public canSee(coord: Coord): number {
        let total = 0;
        const totalLocations = this._astroidBelt.length * this._astroidBelt[0].length;

        let dist = 1;
        let visitedLocations = 0;

        while(visitedLocations < totalLocations) {

            const neighbourLocations = [
                { x: coord.x - dist, y: coord.y - dist },  { x: coord.x, y: coord.y - dist },  { x: coord.x + dist, y: coord.y - dist }, 
                { x: coord.x - dist, y: coord.y },         /*     OUR COORD                */  { x: coord.x + dist, y: coord.y }, 
                { x: coord.x - dist, y: coord.y + dist },  { x: coord.x, y: coord.y + dist },  { x: coord.x + dist, y: coord.y + dist }, 
            ]
            .filter(loc => loc.x >= 0 && loc.x <= this._astroidBelt[0].length)
            .filter(loc => loc.y >= 0 && loc.y <= this._astroidBelt.length);

            console.log(neighbourLocations);

            visitedLocations += neighbourLocations.length;
            dist++;
        }

        return total;
    }

    public findBest(): LocationResult {
        let bestLocation = { x: -1, y: -1, canSee: -1 };

        return bestLocation;
    }
}
