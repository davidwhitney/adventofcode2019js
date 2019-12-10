import { IntcodeVm as IntCodeVm } from "./IntCodeVm";
import * as fs from 'fs';

describe("Day 5", () => {
    it("Can support add opcodes", () => {
        const sut = new IntCodeVm(1, 1, 2, 4);
        sut.stdin = () => 0;
        sut.execute(); 
        expect(sut.state[4]).toBe(3);
    });

    it("Can support multiply opcodes", () => {
        const sut = new IntCodeVm(2, 0, 0, 3);
        sut.execute();
        expect(sut.state[3]).toBe(4);
    });

    it("Can support halting opcodes", () => {
        const sut = new IntCodeVm(99, 3, 3, 4);        
        sut.execute();
        expect(sut.state[4]).toBeUndefined();
    });

    it("Can support input opcode", () => {
        const sut = new IntCodeVm(3, 50);
        sut.stdin = () => 666;       
        sut.execute();

        expect(sut.state[50]).toBe(666);
    });

    it("Can support output opcode", () => {
        let output = -1;

        const sut = new IntCodeVm(4, 50);
        sut.state[50] = 555;
        sut.stdout = (value: number) => { output = value; };  
        sut.execute();
        
        expect(output).toBe(555);
    });

    it("Supports relative bases", () => {
        const sut = new IntCodeVm(109,19);
        sut.relativeBase = 2000;

        sut.execute();

        expect(sut.relativeBase).toBe(2019);
    });
});
