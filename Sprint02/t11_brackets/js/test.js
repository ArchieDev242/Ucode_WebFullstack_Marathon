describe('Bracket Validator', () => {
    const assert = chai.assert;
    
    const invalid_cases = [
        { input: NaN, reason: "NaN" },
        { input: 123, reason: "number" },
        { input: {}, reason: "object" },
        { input: 'Hello', reason: "no brackets" },
        { input: null, reason: "null" }
    ];
    
    invalid_cases.forEach(test => {
        it(`returns -1 for ${test.reason}`, () => {
            assert.equal(checkBrackets(test.input), -1);
        });
    });

    const tests_scenarios = [
        { input: '()', expected: 0, desc: "perfect balance" },
        { input: '(()', expected: 1, desc: "unclosed bracket" },
        { input: ')(', expected: 2, desc: "inverted brackets" },
        { input: '1)()(())2(()', expected: 2, desc: "example from requirements" },
        { input: ')))', expected: 3, desc: "only closing brackets" },
        { input: '((()', expected: 2, desc: "nested brackets" },
        { input: '())(', expected: 3, desc: "error combination" },
        { input: 'a(b)c)d(e(f)g', expected: 2, desc: "characters between brackets" },
        { input: '((())))(', expected: 3, desc: "deep nesting" },
        { input: '))((', expected: 4, desc: "mirrored brackets" }
    ];

    tests_scenarios.forEach(({ input, expected, desc }) => {
        it(`${desc}: ${input} → ${expected}`, () => {
            assert.equal(checkBrackets(input), expected);
        });
    });
});