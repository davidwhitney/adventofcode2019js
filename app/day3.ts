type Direction = "U" | "D" | "L" | "R";

class Coord  {  
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static equals(first: Coord, second: Coord): boolean {
        return  first.x == second.x && first.y == second.y;
    }

    public static isStartPosition(first: Coord): boolean {
        return this.equals(first, { x:0, y: 0 })
    }
};

export class Day3 {
    private _wires: Wire[] = [];
    get lines() { return this._wires; };

    public plot(...commands: string[]): void {
        let currX = 0;
        let currY = 0;

        const wires: WirePart[] = [];

        for(const command of commands) {
            const direction = <Direction>command.split('')[0];
            const distance = parseInt(command.substr(1));
            
            const line = new WirePart(
                { x: currX, y: currY },
                { x: currX, y: currY }
            );

            const targetProperty = ["L", "R"].indexOf(direction) != -1 ? "x" : "y";
            const directionAdjust = ["L", "D"].indexOf(direction) != -1 ? -1 : 1;
            line.to[targetProperty] += (distance * directionAdjust);
                
            wires.push(line);

            currX = line.to.x;
            currY = line.to.y;
        }

        this._wires.push(new Wire(...wires));
    }

    public intersections(): Coord[] {
        const intersections: Coord[] = [];
        
        for(const wire of this._wires) {
            const otherWires = this._wires.slice().filter(w => w != wire);

            for(const otherWire of otherWires) {
                const pointsThatIntersect = otherWire.intersections(wire);
                intersections.push(...pointsThatIntersect);
            }
        }

        let result = intersections.filter(location => !Coord.isStartPosition(location));
        const distinct: Coord[] = [];

        for(const item of result) {
            if(!distinct.some(other => Coord.equals(item, other))) {
                distinct.push(item);
            }
        }

        return distinct;
    }

    public closestIntersection(): number {
        const allIntersections = this.intersections();
        let distances = allIntersections.map(thisOne => Math.abs(0-thisOne.x) + Math.abs(0-thisOne.y));
        distances = distances.sort((n1,n2) => n1 - n2);
        return distances[0];
    }

    public distanceToClosestIntersection(): number {        
        const allIntersections = this.intersections();

        let intersectionByDistance: any[] = [];
        console.log(allIntersections);
        for(const intersection of allIntersections) {
            const distanceTo = this.distanceTo(intersection);
            intersectionByDistance.push({
                target: intersection,
                totalDistance: distanceTo
            });
        }


        intersectionByDistance = intersectionByDistance.sort((n1,n2) => n1.totalDistance - n2.totalDistance); 
        return intersectionByDistance[0].totalDistance;
    }

    private distanceTo(coord: Coord): number {
        let distance = 0;
        
        for(const wire of this._wires) {
            distance += this.distanceToLocationInWire(wire, coord);
        }

        return distance;
    }

    private distanceToLocationInWire(wire: Wire, coord: Coord) {
        let distance = 0;
        for (const part of wire) {
            const steps = part.nodes().slice(1);

            for (const node of steps) {
                distance++;
                if (Coord.equals(coord, node)) {
                    return distance;
                }
            }
        }

        return distance;
    }
}

export interface IWirePart {
    from: Coord,
    to: Coord
}

export class Wire extends Array<WirePart> {
    constructor(...wireParts: WirePart[]) {
        super();
        super.push(...wireParts);
    }

    public intersects(other: Wire): boolean {
        return this.intersections(other).length > 0;
    }

    public intersections(other: Wire): Coord[] {

        const intersectingPoints: Coord[] = []; 

        for(const myPart of this) {   
            for(const otherPart of other) {
                const points = myPart.intersections(otherPart);
                intersectingPoints.push(...points);
            }
        }

        return intersectingPoints;     
    }
}

export class WirePart implements IWirePart {
    from: Coord;
    to: Coord;

    constructor(from: Coord, to: Coord) {
        this.from = from;
        this.to = to;
    }

    public intersections(other: IWirePart): Coord[] {
        const myPositions = this.allPositionsBetween(this.from, this.to);
        const theirPositions = this.allPositionsBetween(other.from, other.to);

        const intersections: Coord[] = [];
        for(const position of myPositions) {            
            const intersectingParts = theirPositions.filter(other => Coord.equals(other, position));
            intersections.push(...intersectingParts);
        }

        return intersections;
    }

    public nodes(): Coord[] {
        return this.allPositionsBetween(this.from, this.to);
    }

    private allPositionsBetween(first: Coord, second: Coord): Coord[] {
        // This is so nasty, I'm sorry.
        const positions: Coord[] = [];

        if(first.x == second.x) { 
            if(first.y < second.y) {
                for(let y = first.y; y <= second.y; y++) {
                    positions.push({x: first.x, y});
                }
            } else {
                for(let y = first.y; y >= second.y; y--) {
                    positions.push({x: first.x, y});
                }
            }            
        }

        if(first.y == second.y) { 
            if(first.x < second.x) {
                for(let x = first.x; x <= second.x; x++) {
                    positions.push({x, y: first.y});
                }
            } else {
                for(let x = first.x; x >= second.x; x--) {
                    positions.push({x, y: first.y});
                }
            }                        
        }

        return positions;
    }
}
