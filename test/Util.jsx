/* eslint-disable no-multi-spaces */
import * as util from '../src/Util';

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
            { oldValue: undefined, newValue: "fo", expected: false },
            { oldValue: "f", newValue: "fo", expected: false },
            { oldValue: "foo", newValue: "fo", expected: true },
            { oldValue: "foo", newValue: "f", expected: true },
            { oldValue: "foo", newValue: "bar", expected: false }
        ];

        table.forEach(function(element, index) {
            expect(util.textReduced(element.newValue, element.oldValue)).toEqual(element.expected, `table row ${index} failed` );
        });
    });

    it('endOfWordIndex', () => {
        const table = [
            { text: "foo",            startIndex: 1,  expected: 3, separator: "" },
            { text: "foo, bar",       startIndex: 6,  expected: 8, separator: ", " },
            { text: "foo, bar",       startIndex: 6,  expected: 8, separator: "" },
            { text: "foo, bar",       startIndex: 0,  expected: 3, separator: ", " },
            { text: "foo, bar, baz",  startIndex: 5,  expected: 8, separator: ", " },
            { text: "foo, bar, baz",  startIndex: 0,  expected: 13, separator: "" },
            { text: "foo, bar, baz",  startIndex: 11,  expected: 13, separator: ", " },
            { text: "foo, bar, baz",  startIndex: 0,  expected: 3, separator: ", " }

        ];

        table.forEach(function(element, index) {
            expect(util.endOfWordIndex(element.text, element.startIndex, element.separator)).toEqual(element.expected, `table row ${index} failed` );
        });
    });
    it('itemIndex (array of objects)', () => {
        const data = [
            { text: "Albania", value: "Alb" },
            { text: "Andorra", value: "And" },
            { text: "Armenia", value: "Arm" },
            { text: "Austria", value: "Aus" },
            { text: "Azerbaijan", value: "Aze" },
            { text: "Belarus", value: "Blg" },
            { text: "Belgium", value: "Bls" },
            { text: "Bosnia & Herzegovina", value: "Her" },
            { text: "Bulgaria", value: "Bul" },
            { text: "Croatia", value: "Cro" },
            { text: "Cyprus", value: "Cyp" },
            { text: "Czech Republic", value: "Rep" },
            { text: "Denmark", value: "Den" },
            { text: "Estonia", value: "Est" },
            { text: "Finland", value: "Fin" },
            { text: "France", value: "Fra" },
            { text: "Georgia", value: "Geo" },
            { text: "Germany", value: "Ger" },
            { text: "Greece", value: "Gre" },
            { text: "Hungary", value: "Hun" },
            { text: "Iceland", value: "Ice" },
            { text: "Ireland", value: "Ire" },
            { text: "Italy", value: "Ita" },
            { text: "Kosovo", value: "Kos" },
            { text: "Latvia", value: "Lat" },
            { text: "Liechtenstein", value: "Lie" },
            { text: "Lithuania", value: "Lit" },
            { text: "Luxembourg", value: "Lux" },
            { text: "Macedonia", value: "Mac" },
            { text: "Malta", value: "Mal" },
            { text: "Moldova", value: "Mol" },
            { text: "Monaco", value: "Mon" },
            { text: "Montenegro", value: "Mon" },
            { text: "Netherlands", value: "Net" },
            { text: "Norway", value: "Nor" },
            { text: "Poland", value: "Pol" },
            { text: "Portugal", value: "Por" },
            { text: "Romania", value: "Rom" },
            { text: "Russia", value: "Rus" },
            { text: "San Marino", value: "Mar" },
            { text: "Serbia", value: "Ser" },
            { text: "Slovenia", value: "Slo" },
            { text: "Spain", value: "Spa" },
            { text: "Sweden", value: "Swe" },
            { text: "Switzerland", value: "Swi" },
            { text: "Turkey", value: "Tur" },
            { text: "Ukraine", value: "Ukr" },
            { text: "United Kingdom", value: "Kin" },
            { text: "Vatican City", value: "VC" }
        ];
        const table = [
            { text: "g",   expected: 16 },
            { text: "GR",  expected: 18 },
            { text: "a",   expected: 0  },
            { text: "au",  expected: 3  },
            { text: "po",  expected: 35 },
            { text: "pos", expected: -1 },
            { text: "mO",  expected: 30 },
            { text: "mon", expected: 31 }

        ];

        table.forEach(function(item, index) {
            expect(util.itemIndex(item.text, data, "text")).toEqual(item.expected, `table row ${index} failed` );
        });
    });

});
