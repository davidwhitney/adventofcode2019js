export class Day1 {
    public calculate(...masses: number[]): number {
        let total = 0;
        for(const mass of masses){
            const step1 = mass / 3;
            const step2 = Math.floor(step1);
            total += step2 - 2;
        }
        return total;
    }

    
    public calculateWithFuel(...masses: number[]): number {
        let total = 0;
        for(const mass of masses){
            const step1 = mass / 3;
            const step2 = Math.floor(step1);
            const cost = step2 - 2;

            if (cost <= 0) {
                return total;
            }

            total += cost + this.calculateWithFuel(cost);
        }
        return total;
    }
}