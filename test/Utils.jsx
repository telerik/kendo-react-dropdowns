import * as util from '../src/util';

/*

function textReduced(newValue = "", oldValue = "") {
    return newValue.length <= oldValue.length;
}

*/

describe('Util', () => {
    it('indexOfWordAtCaret', () => {
        const table = [
            { text: "foo",              caretIdx: 3,    expected: 0, separator: ", " },
            { text: "foo",              caretIdx: 0,    expected: 0, separator: ""   },
            { text: "foo, bar",         caretIdx: 8,    expected: 1, separator: ", " },
            { text: "foo, bar",         caretIdx: 3,    expected: 0, separator: ", " },
            { text: "foo, bar",         caretIdx: 1,    expected: 0, separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 13,   expected: 2, separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 10,   expected: 2, separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 8,    expected: 1, separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 6,    expected: 1, separator: ", " }
        ];

        table.forEach(function(element, index) {
            expect(util.indexOfWordAtCaret(element.caretIdx, element.text, element.separator)).toEqual(element.expected, `table row ${index} failed` );
        });
    });

    it('trim', () => {
        const table = [
            { text: "foo",      expected: "foo", separator: ", " },
            { text: "foo,",     expected: "foo", separator: ", " }
        ];

        table.forEach(function(element, index) {
            expect(util.trim(element.text, element.separator)).toEqual(element.expected, `table row ${index} failed` );
        });
    });

    it('wordAtCaret', () => {
        const table = [
            { text: "foo",              caretIdx: 3,    expected: "foo", separator: ", " },
            { text: "foo",              caretIdx: 0,    expected: "foo", separator: ", " },
            { text: "foo, bar",         caretIdx: 8,    expected: "bar", separator: ", " },
            { text: "foo, bar",         caretIdx: 3,    expected: "foo", separator: ", " },
            { text: "foo, bar",         caretIdx: 1,    expected: "foo", separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 13,   expected: "baz", separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 10,   expected: "baz", separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 8,    expected: "bar", separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 6,    expected: "bar", separator: ", " }
        ];

        table.forEach(function(element, index) {
            expect(util.wordAtCaret(element.caretIdx, element.text, element.separator)).toEqual(element.expected, `table row ${index} failed` );
        });
    });

    it('replaceWordAtCaret', () => {
        const table = [
            { text: "foo",              caretIdx: 3,    word: "zoo",    expected: "zoo",            separator: ", " },
            { text: "foo, bar",         caretIdx: 8,    word: "zoo",    expected: "foo, zoo",       separator: ", " },
            { text: "foo, bar",         caretIdx: 3,    word: "zoo",    expected: "zoo, bar",       separator: ", " },
            { text: "foo, bar",         caretIdx: 1,    word: "zoo",    expected: "zoo, bar",       separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 13,   word: "zoo",    expected: "foo, bar, zoo",  separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 10,   word: "zoo",    expected: "foo, bar, zoo",  separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 8,    word: "zoo",    expected: "foo, zoo, baz",  separator: ", " },
            { text: "foo, bar, baz",    caretIdx: 6,    word: "zoo",    expected: "foo, zoo, baz",  separator: ", " }
        ];

        table.forEach(function(element, index) {
            expect(util.replaceWordAtCaret(element.caretIdx, element.text, element.word, element.separator)).toEqual(element.expected, `table row ${index} failed` );
        });
    });

    it('textReduced', () => {
        const table = [
            { oldValue: undefined, newValue: "fo", expected: false},
            { oldValue: "f", newValue: "fo", expected: false},
            { oldValue: "foo", newValue: "fo", expected: true},
            { oldValue: "foo", newValue: "f", expected: true},
            { oldValue: "foo", newValue: "bar", expected: true}
        ];

        table.forEach(function(element, index) {
            expect(util.textReduced(element.newValue, element.oldValue)).toEqual(element.expected, `table row ${index} failed` );
        });
    });
});
