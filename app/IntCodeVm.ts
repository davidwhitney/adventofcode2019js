import * as fs from 'fs';

export class IntcodeVm {
    _instructionPointer: number = 0;
    _output: number[] = [];
    _state: number[] = [];

    get state() { return this._state };

    constructor(...values: number[]) {
        this._state = [ ...values ];
    }

    public stdin(): number { throw new Error("Input not wired up"); }
    public stdout(value: number) { this._output.push(value); }

    public execute(): void {
        const operations = {
            0: () => { /* No-Op */ },
            1: Operations.add,
            2: Operations.multiply,
            3: Operations.storeInput,
            4: Operations.writeOutput,
            5: Operations.jumpIfTrue,
            6: Operations.jumpIfFalse,
            7: Operations.lessThan,
            8: Operations.equals
        };

        let opCode = this.evaluateCurrentOpcode();

        while (operations[opCode.code] != null) {
            if (opCode.halt()) {
                break;
            }

            const operation = operations[opCode.code];
            operation(this, opCode);
            opCode = this.evaluateCurrentOpcode();
        }
    }

    private evaluateCurrentOpcode(): OpCode { 
        const value = this._state[this._instructionPointer];
        if (value == null) {
            return OpCode.haltExecution();
        }

        return value.toString().length > 2
            ? OpCode.fromPackedValue(value.toString())
            : OpCode.allPositionMode(value);
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

    public accessModeForParameter(paramOffset: number): number {
        const offset = this.accessMask.length - paramOffset;
        if (offset < 0) {
            return 0;
        }

        return parseInt(this.accessMask[offset]);
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

class Operations {

    public static add(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];

        ctx._state[target] = p1 + p2;
        ctx._instructionPointer += 4;
    }

    public static multiply(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];

        ctx._state[target] = p1 * p2;
        ctx._instructionPointer += 4;
    }

    public static storeInput(ctx: IntcodeVm, opcode: OpCode) {
        const value = ctx.stdin();
        const target = ctx._state[ctx._instructionPointer + 1];

        ctx._state[target] = value;
        ctx._instructionPointer += 2;
    }

    public static writeOutput(ctx: IntcodeVm, opcode: OpCode) {
        const value = Operations.getValue(ctx, opcode, 1);
        ctx.stdout(value);
        ctx._instructionPointer += 2;
    }

    public static jumpIfTrue(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        ctx._instructionPointer = p1 != 0 ? p2 : ctx._instructionPointer + 3;
    }

    public static jumpIfFalse(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        ctx._instructionPointer = p1 == 0 ? p2 : ctx._instructionPointer + 3;
    }

    public static lessThan(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 < p2 ? 1 : 0;
        ctx._instructionPointer += 4;
    }

    public static equals(ctx: IntcodeVm, opcode: OpCode) {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 == p2 ? 1 : 0;
        ctx._instructionPointer += 4;
    }

    private static getValue(ctx: IntcodeVm, opcode: OpCode, paramNumber: number): number {
        const identifier = ctx._instructionPointer + paramNumber;
        const accessMode = opcode.accessModeForParameter(paramNumber);

        if (accessMode == 1) {
            return ctx._state[identifier];
        }

        const pointer = ctx._state[identifier];
        return ctx._state[pointer];
    }
}
