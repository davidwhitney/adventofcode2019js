import { IntcodeVm } from "./IntCodeVm";

describe("Day 5", () => {

    it("Example 0 - I/O", () => {
        const sut = new IntcodeVm(3, 0, 4, 0, 99);
        sut.stdin = () => 666;
        sut.execute();

        expect(sut._output[0]).toBe(666);
    });

    it("Example 1", () => {
        const sut = new IntcodeVm(1002, 4, 3, 4, 33);
        sut.execute();

        expect(sut._state[4]).toBe(99);
    });

    it("Example 2", () => {
        const sut = new IntcodeVm(1101, 100, -1, 4, 0);
        sut.execute();

        expect(sut._state[4]).toBe(99);
    });

    it("Puzzle 1", () => {
        const sut = IntcodeVm.withInput("./app/day5-input1.txt");
        sut.stdin = () => 1;
        sut.execute();

        console.log(sut._output);
        expect(sut._output[sut._output.length -1]).toBe(15097178);
    });

    it("Example 3 - new opcodes (position mode)", () => {
        const sut = new IntcodeVm(3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9);
        sut.stdin = () => 0;
        sut.execute();

        expect(sut._output[sut._output.length -1]).toBe(0);
    });

    it("Example 4 - new opcodes (immediate mode)", () => {
        const sut = new IntcodeVm(3,3,1105,-1,9,1101,0,0,12,4,12,99,1);
        sut.stdin = () => 0;
        sut.execute();

        expect(sut._output[sut._output.length -1]).toBe(0);
    });

    it("Example 5 - new opcodes - outputs 999 if input below 8", () => {
        const sut = new IntcodeVm(3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99);

        sut.stdin = () => 0;
        sut.execute();

        expect(sut._output[sut._output.length -1]).toBe(999);
    });

    it("Example 5 - new opcodes - outputs 1000 if input equals 8", () => {
        const sut = new IntcodeVm(3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99);

        sut.stdin = () => 8;
        sut.execute();

        expect(sut._output[sut._output.length -1]).toBe(1000);
    });

    it("Example 5 - new opcodes - outputs 1001 if input greater than 8", () => {
        const sut = new IntcodeVm(3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99);

        sut.stdin = () => 9;
        sut.execute();

        expect(sut._output[sut._output.length -1]).toBe(1001);
    });

    it("Puzzle 2", () => {
        const sut = IntcodeVm.withInput("./app/day5-input1.txt");
        sut.stdin = () => 5;
        sut.execute();

        console.log(sut._output);
        expect(sut._output[sut._output.length -1]).toBe(1558663);
    });
});
