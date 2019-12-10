import * as fs from 'fs';

export class IntcodeVm {
    get state() { return this._state };
    get instructionPointer() { return this._instructionPointer; }

    public pauseOnOutput: boolean = false;
    public relativeBase: number = 0;

    public output: number[] = [];
    private _instructionPointer: number = 0;
    private readonly _state: number[] = [];

    constructor(...values: number[]) {
        this._state = [ ...values ];
    }

    public execute(): boolean {
        const operations = {
            0: Operations.noOp,
            1: Operations.add,
            2: Operations.multiply,
            3: Operations.storeInput,
            4: Operations.writeOutput,
            5: Operations.jumpIfTrue,
            6: Operations.jumpIfFalse,
            7: Operations.lessThan,
            8: Operations.equals,
            9: Operations.adjustRelativeBase
        };

        let opCode = this.parseOpCodeFromInstructionPointer();

        while (operations[opCode.value] != null) {
            if (opCode.isHalt()) {
                return true;
            }

            const operation = operations[opCode.value];
            this._instructionPointer = operation(this, opCode);

            if (opCode.isOutput() && this.pauseOnOutput) {
                return false;
            }

            opCode = this.parseOpCodeFromInstructionPointer();
        }

        return true;
    }

    public inputBuffer: number[] = [];
    public stdin(): number {
        return <number>this.inputBuffer.shift();
    }

    public stdout(value: number) {
        this.output.push(value);
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
    public static withInputString = (data: string) => new IntcodeVm(...data.split(',').map(s => parseInt(s)));
    public static create(quantity: number, factoryFunc: CallableFunction) {
        return Array(quantity).fill({}).map(() => factoryFunc());
    }
}

class Operations {
    public static noOp = () => {};

    public static add(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        let target = Operations.getTarget(ctx, opcode, 3);
        ctx.state[target] = p1 + p2;
        return ctx.instructionPointer + 4;
    }

    public static multiply(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = Operations.getTarget(ctx, opcode, 3);
        ctx.state[target] = p1 * p2;
        return ctx.instructionPointer + 4;
    }

    public static storeInput(ctx: IntcodeVm, opcode: OpCode): number {
        const target = Operations.getTarget(ctx, opcode, 1);
        ctx.state[target] = ctx.stdin();
        return ctx.instructionPointer + 2;
    }

    public static writeOutput(ctx: IntcodeVm, opcode: OpCode): number {
        const value = Operations.getValue(ctx, opcode, 1);
        ctx.stdout(value);
        return ctx.instructionPointer + 2;
    }

    public static jumpIfTrue(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        return p1 != 0 ? p2 : ctx.instructionPointer + 3;
    }

    public static jumpIfFalse(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        return p1 == 0 ? p2 : ctx.instructionPointer + 3;
    }

    public static lessThan(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = Operations.getTarget(ctx, opcode, 3);
        ctx.state[target] = p1 < p2 ? 1 : 0;
        return ctx.instructionPointer + 4;
    }

    public static equals(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        const p2 = Operations.getValue(ctx, opcode, 2);
        const target = Operations.getTarget(ctx, opcode, 3);
        ctx.state[target] = p1 == p2 ? 1 : 0;
        return ctx.instructionPointer + 4;
    }

    public static adjustRelativeBase(ctx: IntcodeVm, opcode: OpCode): number {
        const p1 = Operations.getValue(ctx, opcode, 1);
        ctx.relativeBase += p1;
        return ctx.instructionPointer + 2;
    }

    private static getTarget(ctx: IntcodeVm, opcode: OpCode, paramNumber: number): number {
        let target = ctx.state[ctx.instructionPointer + paramNumber];
        return opcode.accessModeForParameter(paramNumber) == 2 ? target + ctx.relativeBase : target;
    }

    private static getValue(ctx: IntcodeVm, opcode: OpCode, paramNumber: number): number {
        const identifier = ctx.instructionPointer + paramNumber;
        const accessMode = opcode.accessModeForParameter(paramNumber);

        if (accessMode === 0) {
            return ctx.state[ctx.state[identifier]];
        }

        if (accessMode === 1) {
            return ctx.state[identifier];
        }

        if (accessMode === 2) {
            const adjusted = ctx.state[identifier] + ctx.relativeBase;
            return ctx.state[adjusted];
        }

        throw new Error("Unsupported access mode.");
    }
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
    public isOutput = ()  => this.value == 4;
    public static allPositionMode = (opCode: number) => new OpCode(opCode, "000000000000000000");
    public static haltExecution = () => OpCode.allPositionMode(0);
}
