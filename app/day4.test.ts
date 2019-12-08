import Day4 from "./day4";

describe("Day 4", () => {

    it("validPassword invalidates password too short", () => {
        const sut = new Day4();
        const result = sut.validPassword("12345");
        expect(result).toBe(false);
    });

    it("validPassword invalidates password too long", () => {
        const sut = new Day4();
        const result = sut.validPassword("1234567");
        expect(result).toBe(false);
    });

    it("validPassword validates password of six digits", () => {
        const sut = new Day4();
        const result = sut.validPassword("123466");
        expect(result).toBe(true);
    });

    it("validPassword must contain two adjacent digits that are the same", () => {
        const sut = new Day4();

        expect(sut.validPassword("111111")).toBe(true);
        expect(sut.validPassword("123466")).toBe(true);
    });

    it("validPassword invalidates password without two adjacent digits", () => {
        const sut = new Day4();

        expect(sut.validPassword("123456")).toBe(false);
        expect(sut.validPassword("123789")).toBe(false);
    });

    it("validPassword invalidates password with decreasing digits", () => {
        const sut = new Day4();

        expect(sut.validPassword("223450")).toBe(false);
    });

    it("two adjacent matching digits are not part of a larger group of matching digits", () => {
        const sut = new Day4();

        expect(sut.mustContainAtLeastOneDoubleMatchingDigit("112233")).toBe(true);
        expect(sut.mustContainAtLeastOneDoubleMatchingDigit("111122")).toBe(true);
        expect(sut.mustContainAtLeastOneDoubleMatchingDigit("123444")).toBe(false);
    });

    it("Can count valid passwords in range", () => {
        const sut = new Day4();
        
        let valid = 0;

        for(let i = 171309; i <= 643603; i++) {            
            const result = sut.validPassword(i.toString());
            if(result) {
                valid++;
            }
        }

        expect(valid).toBe(1625);
    });

    it("Can count valid passwords in range part 2", () => {
        const sut = new Day4();
        
        let valid = 0;

        for(let i = 171309; i <= 643603; i++) {            
            const result = sut.validPasswordPart2(i.toString());
            if(result) {
                valid++;
            }
        }

        expect(valid).toBe(1111);
    });

});
