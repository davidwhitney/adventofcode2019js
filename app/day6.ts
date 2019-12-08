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
}

class Celestial {
    public id: string;
    public Orbits: Celestial | null;

    constructor(id: string) {
        this.id = id;
        this.Orbits = null;
    }
}
