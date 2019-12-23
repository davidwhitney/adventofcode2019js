export class Coord {
    public x: number;
    public y: number;
    public obscured: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sameX = (other: Coord) => other.x == this.x;
    public sameY = (other: Coord) => other.y == this.y;
    public same = (other: Coord) => this.sameX(other) && this.sameY(other);
    public notSame = (other: Coord) => !this.same(other);
    public isAfter = (...others: Coord[]) => others.every(o => o.x < this.x);
    public isBefore = (...others: Coord[]) => others.every(o => o.x > this.x);
    public isAbove = (...others: Coord[]) => others.every(o => o.y > this.y);
    public isBelow = (...others: Coord[]) => others.every(o => o.y < this.y);
}

interface LocationResult { x: number; y: number; canSee: number; }

export default class StarfieldScanner {
    private readonly _asteroidBelt: string[];

    constructor(astroidBelt: string[]) {
        this._asteroidBelt = astroidBelt;
    }

    public canSee(coord: Coord): number {
        const asteroidsNearestFirst = this.discoverAsteroidsInField(coord);

        const visibleAsteroids = {};
        const outputList: Coord[] = [];

        for (const asteroid of asteroidsNearestFirst) {
            const degrees = StarfieldScanner.degreesBetweenPoints(coord, asteroid);

            if(!visibleAsteroids.hasOwnProperty(degrees)) {
                visibleAsteroids[degrees] = asteroid;
                outputList.push(asteroid);
            }
        }

        return outputList.length;
    }

    private static degreesBetweenPoints(startingPoint: Coord, endingPoint: Coord): number {
        const originPoint = { x: endingPoint.x - startingPoint.x, y: endingPoint.y - startingPoint.y };
        const bearingRadians = Math.atan2(originPoint.y, originPoint.x); // get bearing in radians
        let bearingDegrees = bearingRadians * (180.0 / Math.PI); // convert to degrees
        bearingDegrees = (bearingDegrees > 0.0 ? bearingDegrees : (360.0 + bearingDegrees)); // correct discontinuity
        return bearingDegrees;
    }

    public findBest(): LocationResult {
        let bestLocation = { x: -1, y: -1, canSee: -1 };

        return bestLocation;
    }

    private discoverAsteroidsInField(coord: Coord) {
        let dist = 1;
        let visitedLocations = 0;

        const discoveredAsteroids: Coord[] = [];
        const totalLocations = this._asteroidBelt.length * this._asteroidBelt[0].length;

        while (visitedLocations < totalLocations) {
            const neighbourLocations = this.getNeighboursUsingOffset(coord, dist);
            if (neighbourLocations.length == 0) {
                break;
            }

            for (const location of neighbourLocations) {
                const value = this._asteroidBelt[location.y][location.x];
                if (value != ".") {
                    discoveredAsteroids.push(location);
                }
            }

            visitedLocations += neighbourLocations.length;
            dist++;
        }
        return discoveredAsteroids;
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

        return candidates.list.filter(this.isValidCoord);
    }

    private isValidXY = (x: number, y: number) => this.isValidCoord(new Coord(x, y));
    private isValidCoord = (loc: Coord) => loc.x >= 0 && loc.x < this._asteroidBelt[0].length && loc.y >= 0 && loc.y < this._asteroidBelt.length;
}

class DistinctList {
    private _list: Coord[] = [];
    get list() { return this._list; }

    public add(x: number, y: number) {
        if (this._list.filter(item => item.x == x && item.y == y).length > 0) {
            return;
        }

        this._list.push(new Coord(x, y));
    }
}
