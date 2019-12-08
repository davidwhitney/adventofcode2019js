import * as fs from 'fs';

export class IntcodeVm {
    get state() { return this._state };
    public stdin(): number { throw new Error("Input not wired up"); }
    public stdout(value: number) { this._output.push(value); }

    _instructionPointer: number = 0;
    _output: number[] = [];
    _state: number[] = [];

    constructor(...values: number[]) {
        this._state = [ ...values ];
    }

    public execute(): void {
        const operations = {
            0: Operations.noOp(),
            1: Operations.add,
            2: Operations.multiply,
            3: Operations.storeInput,
            4: Operations.writeOutput,
            5: Operations.jumpIfTrue,
            6: Operations.jumpIfFalse,
            7: Operations.lessThan,
            8: Operations.equals
        };

        let opCode = this.parseOpCodeFromInstructionPointer();

        while (operations[opCode.value] != null) {
            if (opCode.isHalt()) {
                break;
            }

            const operation = operations[opCode.value];
            this._instructionPointer = operation(this, opCode);
            opCode = this.parseOpCodeFromInstructionPointer();
        }
    }

    private parseOpCodeFromInstructionPointer(): OpCode {
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

    public static withInput = (path: string) => IntcodeVm.withInputString(fs.readFileSync(path, "utf8"));
    public static withInputString = (testData: string) => new IntcodeVm(...testData.split(',').map(asString => parseInt(asString)));
}

class OpCode {
    public value: number;
    public accessMask: string;

    constructor(opCode: number, accessMask: string) {
        this.value = opCode;
        this.accessMask = accessMask;
    }

    public accessModeForParameter(paramOffset: number): number {
        const offset = this.accessMask.length - paramOffset;
        return offset < 0 ? 0 : parseInt(this.accessMask[offset]);
    }

    public static fromPackedValue(value: string) {
        const opCode = parseInt(value.slice(value.length - 2));
        const accessMask = value.slice(0, value.length - 2);
        return new OpCode(opCode, accessMask);
    }

    public isHalt = ()  => this.value == 0 || this.value == 99;
    public static allPositionMode = (opCode: number) => new OpCode(opCode, "000000000000000000");
    public static haltExecution = () => OpCode.allPositionMode(0);
}

class Operations {
    public static noOp = () => {};

    public static add(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 + p2;
        return ctx._instructionPointer + 4;
    }

    public static multiply(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 * p2;
        return ctx._instructionPointer + 4;
    }

    public static storeInput(ctx: IntcodeVm, opcode: OpCode): number {
        const target = ctx._state[ctx._instructionPointer + 1];
        ctx._state[target] = ctx.stdin();
        return ctx._instructionPointer + 2;
    }

    public static writeOutput(ctx: IntcodeVm, opcode: OpCode): number {
        const value = Operations.getValue(ctx, opcode, 1);
        ctx.stdout(value);
        return ctx._instructionPointer + 2;
    }

    public static jumpIfTrue(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        return ctx._instructionPointer = p1 != 0 ? p2 : ctx._instructionPointer + 3;
    }

    public static jumpIfFalse(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        return ctx._instructionPointer = p1 == 0 ? p2 : ctx._instructionPointer + 3;
    }

    public static lessThan(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 < p2 ? 1 : 0;
        return ctx._instructionPointer + 4;
    }

    public static equals(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = ctx._state[ctx._instructionPointer + 3];
        ctx._state[target] = p1 == p2 ? 1 : 0;
        return ctx._instructionPointer + 4;
    }

    private static getValue(ctx: IntcodeVm, opcode: OpCode, paramNumber: number): number {
        const identifier = ctx._instructionPointer + paramNumber;
        const accessMode = opcode.accessModeForParameter(paramNumber);
        return accessMode == 1 ? ctx._state[identifier] : ctx._state[ctx._state[identifier]];
    }
}
