export class Day1 {
    public calculate(...masses: number[]): number {
        return masses.map(mass => this.costOf(mass)).reduce((n1: number, n2: number) => n1 + n2);
    }
    
    public calculateWithFuel(...masses: number[]): number {
        let total = 0;
        for(const mass of masses) {
            const cost = this.costOf(mass);

            if (cost <= 0) {
                return total;
            }

            total += cost + this.calculateWithFuel(cost);
        }
        return total;
    }

    private costOf = (mass: number) => Math.floor(mass / 3) - 2;
}