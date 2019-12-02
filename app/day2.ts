export class Day2 {
    _instructionPointer: number = 0;
    _state: number[];
    _validOpcodes = [1, 2];

    get state() { return this._state };
    get currentOpcode() { return this._state[this._instructionPointer]; }
    get output() { return this._state[0]; }

    constructor(...values: number[]) {
        this._state = [ ...values ];
    }

    public resetTo1202alarmState(): Day2 {        
        this._state[1] = 12;
        this._state[2] = 2;
        return this;
    }

    public execute(): void {
        while (this._validOpcodes.indexOf(this.currentOpcode) != -1) {
            this.stepOnce(this.currentOpcode);
        }
    }

    private stepOnce(opcode: number): void {
        const loc1 = this._state[this._instructionPointer + 1];
        const loc2 = this._state[this._instructionPointer + 2];
        const target = this._state[this._instructionPointer + 3];

        if (opcode == 1) {
            this._state[target] = this._state[loc1] + this._state[loc2];
            this._instructionPointer += 4;
            return;
        }

        if (opcode == 2) {
            this._state[target] = this._state[loc1] * this._state[loc2];
            this._instructionPointer += 4;
            return;
        }
    }  
}