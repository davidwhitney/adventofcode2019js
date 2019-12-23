export class Coord {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
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
            if(!visibleAsteroids.hasOwnProperty(asteroid["degreesFromOrigin"])) {
                visibleAsteroids[asteroid["degreesFromOrigin"]] = asteroid;
                outputList.push(asteroid);
            }
        }

        return outputList.length;
    }

    private static degreesBetweenPoints(startingPoint: Coord, endingPoint: Coord): number {
        const originPoint = { x: endingPoint.x - startingPoint.x, y: endingPoint.y - startingPoint.y };
        const bearingRadians = Math.atan2(originPoint.y, originPoint.x);
        let bearingDegrees = bearingRadians * (180.0 / Math.PI);
        bearingDegrees = (bearingDegrees > 0.0 ? bearingDegrees : (360.0 + bearingDegrees));
        return bearingDegrees;
    }

    public findBest(): LocationResult {
        const asteroids = this.discoverAsteroidsInField();

        let bestLocation;
        let bestLocationCanSee = 0;

        for (const asteroid of asteroids) {
            const numberCanSee = this.canSee(asteroid);
            if(numberCanSee > bestLocationCanSee) {
                bestLocation = asteroid;
                bestLocationCanSee = numberCanSee;
            }
        }

        return {
            x: bestLocation.x,
            y: bestLocation.y,
            canSee: bestLocationCanSee
        };
    }

    private discoverAsteroidsInField(coord?: Coord) {
        coord = coord ?? new Coord(-1, -1);
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
                    location["degreesFromOrigin"] = StarfieldScanner.degreesBetweenPoints(coord, location);
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
