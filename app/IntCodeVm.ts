import * as fs from 'fs';

export class IntcodeVm {
    _instructionPointer: number = 0;
    _output: number[] = [];
    _state: number[] = [];
    _audit: string[] = [];

    constructor(...values: number[]) {
        this._state = [ ...values ];
    }

    get state() { return this._state };
    get output() { return this._state[0]; }

    public execute(): void {
        const operations = {
            0: (ctx) => { /* No-Op */ },
            1: IntcodeVm.add,
            2: IntcodeVm.multiply,
            3: IntcodeVm.storeInput,
            4: IntcodeVm.writeOutput
        };

        let opCode = this.evaluateCurrentOpcode();

        while (operations[opCode.code] != null) {
            if (opCode.halt()) {
                break;
            }

            const operation = operations[opCode.code];
            this._audit.push(operation.name);

            operation(this, opCode);

            opCode = this.evaluateCurrentOpcode();
        }
    }

    public stdin(): number {
        throw new Error("Input not wired up");
    }

    public stdout(value: number) {
        this._output.push(value);
    }

    private static add(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = IntcodeVm.getValue(ctx, ctx._instructionPointer + 1, opcode, 1);
        const p2 = IntcodeVm.getValue(ctx, ctx._instructionPointer + 2, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];

        ctx._state[target] = p1 + p2;
        ctx._instructionPointer += 4;
    }

    private static multiply(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = IntcodeVm.getValue(ctx, ctx._instructionPointer + 1, opcode, 1);
        const p2 = IntcodeVm.getValue(ctx, ctx._instructionPointer + 2, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];

        ctx._state[target] = p1 * p2;
        ctx._instructionPointer += 4;
    }

    private static storeInput(ctx: IntcodeVm, opcode: OpCode) {
        const value = ctx.stdin();
        const target = ctx._state[ctx._instructionPointer + 1];
        ctx._state[target] = value;

        ctx._instructionPointer += 2;
    }

    private static writeOutput(ctx: IntcodeVm, opcode: OpCode) {        
        const pointer = ctx._state[ctx._instructionPointer + 1];
        const value = ctx.state[pointer];
        ctx.stdout(value);
        ctx._instructionPointer += 2;
    }
        
    private evaluateCurrentOpcode(): OpCode { 
        const value = this._state[this._instructionPointer];
        if (value == null) {
            return OpCode.haltExecution();
        }

        const valueStr = value.toString();
        if (valueStr.length > 2) { 
            return OpCode.fromPackedValue(valueStr);
        }

        return OpCode.allPositionMode(value);
    }

    private static getValue(ctx: IntcodeVm, identifier: number, opcode: OpCode, paramNumber: number): number {
        if(opcode.accessModeForParameter(paramNumber) == 1) {
            return ctx._state[identifier];
        }
        const pointer = ctx._state[identifier];
        return ctx._state[pointer];
    }

    public resetStateUsing(noun: number, verb: number): IntcodeVm {        
        this._state[1] = noun;
        this._state[2] = verb;
        return this;
    }

    public static withInput(path: string) {
        const testData: string = fs.readFileSync(path, "utf8");      
        return this.withInputString(testData);
    }

    public static withInputString(testData: string) {
        const dataItems = testData.split(',').map(asString => parseInt(asString));        
        return new IntcodeVm(...dataItems);
    }
}


type ParameterMode = 0 | 1;

class OpCode {
    public code: number;
    public accessMask: string;

    constructor(opCode: number, accessMask: string) {
        this.code = opCode;
        this.accessMask = accessMask;
    }

    public halt() {
        return this.code == 0 || this.code == 99;
    }

    public accessModeForParameter(paramOffset: number): ParameterMode {
        const offset = this.accessMask.length - paramOffset;
        if (offset < 0) {
            return 0;
        }

        return <ParameterMode> parseInt(this.accessMask[offset]);
    }

    public static fromPackedValue(value: string) {
        const opCode = parseInt(value.slice(value.length - 2));
        const accessMask = value.slice(0, value.length - 2);
        return new OpCode(opCode, accessMask);
    }

    public static allPositionMode(opCode: number) {
        return new OpCode(opCode, "000000000000000000");
    }

    public static haltExecution() {
        return this.allPositionMode(0);
    }
}
