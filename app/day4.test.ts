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

    it("Can count valid passwords in range", () => {
        const sut = new Day4();
        
        let valid = 0;

        for(let i = 171309; i <= 643603; i++) {
            const asStr = i.toString();
            
            const result = sut.validPassword(asStr);
            if(result) {
                valid++;
            }
        }

        expect(valid).toBe(1625);
    });

});
