type Coord = { x: number, y: number; }
interface LocationResult extends Coord { canSee: number; }

export default class StarfieldScanner {
    private readonly _asteroidBelt: string[];

    constructor(astroidBelt: string[]) {
        this._asteroidBelt = astroidBelt;
    }

    public canSee(coord: Coord): number {
        let total = 0;
        const totalLocations = this._asteroidBelt.length * this._asteroidBelt[0].length;

        let dist = 1;
        let visitedLocations = 0;

        while(visitedLocations < totalLocations) {
            const neighbourLocations = this.getNeighboursUsingOffset(coord, dist);
            if (neighbourLocations.length == 0) {
               break;
            }

            for(const location of neighbourLocations) {
                const value = this._asteroidBelt[location.y][location.x];
                if(value != ".") {
                    total++;
                }
            }

            visitedLocations += neighbourLocations.length;
            dist++;
        }

        return total;
    }

    public getNeighboursUsingOffset(coord: Coord, offset: number): Coord[] {
        const candidates = new DistinctList();
        for (let x = coord.x - offset; x <= coord.x + offset; x++) {
            candidates.add(x, coord.y - offset);
            candidates.add(x, coord.y + offset);
        }

        for (let y = coord.y - offset; y <= coord.y + offset; y++) {
            candidates.add(coord.x - offset, y);
            candidates.add(coord.x + offset, y);
        }

        return candidates
            .list
            .filter(loc => loc.x >= 0 && loc.x < this._asteroidBelt[0].length)
            .filter(loc => loc.y >= 0 && loc.y < this._asteroidBelt.length);
    }

    public findBest(): LocationResult {
        let bestLocation = { x: -1, y: -1, canSee: -1 };

        return bestLocation;
    }
}

class DistinctList {
    private _list: Coord[] = [];
    get list() { return this._list; }

    public add(x: number, y: number) {
        if (this._list.filter(item => item.x == x && item.y == y).length > 0) {
            return;
        }

        this._list.push({ x, y });
    }
}
