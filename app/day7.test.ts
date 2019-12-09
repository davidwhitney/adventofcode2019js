import { IntcodeVm as IntcodeVm } from "./IntCodeVm";

describe("Amp", () => {

    it("Example 1", () => {
        const output = chainAmpsWithProgram(
            [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0],
            [ 4, 3, 2, 1, 0 ]
        );

        expect(output).toBe(43210);
    });

    it("Example 2", () => {
        const output = chainAmpsWithProgram(
            [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0],
            [ 0, 1, 2, 3, 4 ]
        );

        expect(output).toBe(54321);
    });

    it("Example 3", () => {
        const output = chainAmpsWithProgram(
            [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33, 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0],
            [ 1, 0, 4, 3, 2 ]
        );

        expect(output).toBe(65210);
    });

    it("Puzzle 1", () => {
        let highest = 0;

        const permutations = permute([ 0, 1, 2, 3, 4 ]);
        for (const permutation of permutations) {

            const amps = Array(5)
                .fill({})
                .map(() => IntcodeVm.withInput("./app/day7-input1.txt"));

            const output = runEachAmpOnce(amps, permutation);

            if (output > highest) {
                highest = output;
            }
        }

        expect(highest).toBe(17440);
    });


    it("Example 4 - feedback", () => {
        const output = chainAmpsWithProgram(
            [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5],
            [ 9,8,7,6,5 ]
        );

        expect(output).toBe(139629729);
    });
});

function chainAmpsWithProgram(program: number[], phaseSettings: number[]): number {
    const amps = Array(5)
        .fill({})
        .map(() => new IntcodeVm(...program));

    return runEachAmpOnce(amps, phaseSettings);
}

function runEachAmpOnce(amplifiers: IntcodeVm[], phaseSettings: number[]): number {
    const inputQueue = [ 0 ];
    for (const amp of amplifiers) {

        const inputsForThisAmp = [
            phaseSettings.shift(),
            <number>inputQueue.shift()
        ];

        amp.stdin = () => <number>inputsForThisAmp.shift();
        amp.stdout = (output) => inputQueue.push(output);
        amp.execute();
    }

    return <number>inputQueue.shift();
}

const permArr: number[][] = [];
const used: number[] = [];

function permute(input: number[]) {
    let i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        used.push(ch);
        if (input.length == 0) {
            permArr.push(used.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        used.pop();
    }
    return permArr
}