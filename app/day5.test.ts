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
});
