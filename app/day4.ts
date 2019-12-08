export default class Day4 {

    public validPassword(chars: string): boolean {
        const rules = [
            (c: string) => this.mustBeSixCharactersLong(c),
            (c: string) => this.mustContainTwoAdjacentMatchingDigits(c),
            (c: string) => this.digitsMustNotDecreaseInValue(c),
        ];
        
        return rules.every(r => r(chars));
    }

    public validPasswordPart2(chars: string): boolean {
        const rules = [
            (c: string) => this.mustBeSixCharactersLong(c),
            (c: string) => this.mustContainAtLeastOneDoubleMatchingDigit(c),
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

        
    public mustContainAtLeastOneDoubleMatchingDigit(chars: string) {
        const parts: string[] = [];
        
        for (const letter of chars) {
            if (parts.length == 0) {
                parts.push(letter);
                continue;
            }

            const lastPart = parts[parts.length - 1];
            const lastLetterOfLastPart = lastPart[lastPart.length - 1];

            if (letter == lastLetterOfLastPart) {
                parts[parts.length -1] += letter;
            } else {
                parts.push(letter);
            }
        }

        return parts.some(item => item.length == 2);
    }
    
}
