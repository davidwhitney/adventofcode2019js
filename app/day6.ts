export default class Day6 {
    private _celestials = {};

    constructor() {
    }

    public addRelationship(text: string): Day6 {
        const parts = text.split(")");

        if (!this._celestials.hasOwnProperty(parts[0])) {
            this._celestials[parts[0]] = new Celestial(parts[0]);
        }

        if (!this._celestials.hasOwnProperty(parts[1])) {
            this._celestials[parts[1]] = new Celestial(parts[1]);
        }

        this._celestials[parts[1]].Orbits = this._celestials[parts[0]];

        return this;
    }

    public countRelationships(): number {
        let total = 0;
        for(const key of Object.keys(this._celestials)) {
            let start = this._celestials[key] as Celestial;
            while (start.Orbits != null) {
                total++;
                start = start.Orbits;
            }
        }
        return total;
    }

    public distanceBetween(start: string, end: string): number {
        const startPath = this.getPathToRoot(this._celestials[start]);
        const endPath = this.getPathToRoot(this._celestials[end]);

        let distanceBetween = -4; // To hide the hops from "SAN" and "YOU" ad the dupe in the middle

        let sharedRoot = '';
        for(const location of startPath) {
            distanceBetween++;
            if(endPath.indexOf(location) != -1) {
                sharedRoot = location;
                break;
            }
        }

        for(const location of endPath) {
            distanceBetween++;
            if(location.indexOf(sharedRoot) != -1) {
                break;
            }
        }

        return distanceBetween;
    }

    private getPathToRoot(startLoc: Celestial): string[] {
        const path: string[] = [];
        let current = startLoc;
        while (current.Orbits != null) {
            path.push(current.id);
            current = current.Orbits;
        }
        return path;
    }
}

class Celestial {
    public id: string;
    public Orbits: Celestial | null;

    constructor(id: string) {
        this.id = id;
        this.Orbits = null;
    }
}
