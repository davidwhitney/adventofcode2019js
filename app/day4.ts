export default class Day4 {

    public validPassword(chars: string): boolean {
        const rules = [
            (c: string) => this.mustBeSixCharactersLong(c),
            (c: string) => this.mustContainTwoAdjacentMatchingDigits(c),
            (c: string) => this.digitsMustNotDecreaseInValue(c),
        ];
        
        return rules.every(r => r(chars));
    } 
    
    private mustBeSixCharactersLong(chars: string) {
        if (chars.length != 6) {
            return false;
        }
        return true;
    }
    
    private mustContainTwoAdjacentMatchingDigits(chars: string) {        
        let lastLetter = '';
        for(const letter of chars) {
            if(letter == lastLetter) {
                return true;
            }
            lastLetter = letter;
        }
        return false;
    }
    
    private digitsMustNotDecreaseInValue(chars: string) {        
        let highestDigitSoFar = 0;
        for(const letter of chars) {
            const asInt = parseInt(letter);
            if(asInt < highestDigitSoFar) { 
                return false;
            }
            highestDigitSoFar = asInt;
        }
        return true;
    }
}