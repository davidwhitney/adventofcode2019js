import {IntcodeVm as IntCodeVm} from "./IntCodeVm";

describe("Day 9", () => {
    it("Can use example 1", () => {
        const sut = new IntCodeVm(109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99);
        sut.pauseOnOutput = true;

        sut.execute();

        expect(sut.output[0]).toBe(109);
    });

    it("Can use example 2", () => {
        const sut = new IntCodeVm(1102,34915192,34915192,7,4,7,99,0);
        sut.execute();

        expect(sut.output[0].toString().length).toBe(16);
    });

    it("Can use example 3", () => {
        const sut = new IntCodeVm(104,1125899906842624,99);
        sut.execute();

        expect(sut.output[0]).toBe(1125899906842624);
    });

    it('Does puzzle 1', () => {
        const sut = IntCodeVm.withInput("./app/day9-input1.txt");
        sut.stdin = () => 1;

        sut.execute();

        expect(sut.output[0]).toBe(3507134798);
    });
});
