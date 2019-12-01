export class Day1 {
    calculate(...masses: number[]) {
        let total = 0;
        for(const mass of masses){
            const step1 = mass / 3;
            const step2 = Math.floor(step1);
            total += step2 - 2;
        }
        return total;
    }
}