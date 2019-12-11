type Coord = { x: number, y: number; }
interface LocationResult extends Coord { canSee: number; }

export default class StarfieldScanner {
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
            const neighbourLocations = this.getNeighboursUsingOffset(coord, dist);
            visitedLocations += neighbourLocations.length;
            dist++;
        }

        return total;
    }

    public getNeighboursUsingOffset(coord: Coord, offset: number): Coord[] {
        const candidates = [
            { x: coord.x - offset, y: coord.y - offset },  { x: coord.x, y: coord.y - offset },  { x: coord.x + offset, y: coord.y - offset },
            { x: coord.x - offset, y: coord.y },         /*     OUR COORD                */  { x: coord.x + offset, y: coord.y },
            { x: coord.x - offset, y: coord.y + offset },  { x: coord.x, y: coord.y + offset },  { x: coord.x + offset, y: coord.y + offset },
        ];

        let neighbourLocations = candidates.filter(loc => loc.x >= 0 && loc.x <= this._astroidBelt[0].length)
        neighbourLocations = neighbourLocations.filter(loc => loc.y >= 0 && loc.y <= this._astroidBelt.length);

        return neighbourLocations;
    }

    public findBest(): LocationResult {
        let bestLocation = { x: -1, y: -1, canSee: -1 };

        return bestLocation;
    }
}
