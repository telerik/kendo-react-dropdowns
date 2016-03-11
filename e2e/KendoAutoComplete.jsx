import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../src/AutoComplete';

import { type } from './Util';

// e2e-utils is a module exposed from react-tasks
// it exports `$` and `withRoot` - higher order function for describe (example below)
import { withRoot } from 'e2e-utils';

const data = [
    { text: "Albania", value: "Alb" },
    { text: "Andorra", value: "And" },
    { text: "Belarus", value: "Blg" },
    { text: "Belgium", value: "Bls" },
    { text: "Finland", value: "Fin" },
    { text: "France", value: "Fra" },
    { text: "Georgia", value: "Geo" },
    { text: "Germany", value: "Ger" },
    { text: "Greece", value: "Gre" },
    { text: "Hungary", value: "Hun" },
    { text: "Iceland", value: "Ice" },
    { text: "Ireland", value: "Ire" },
    { text: "Italy", value: "Ita" }
];

// `root` parameter is a jQuery object which includes chai-jquery in it.
// chai-jquery adds a should method to the jQuery object.
// See https://github.com/chaijs/chai-jquery#assertions for available assertions.
describe('AutoComplete', withRoot(root => {

    function render(filter) {
        let dataList;

        if (filter) {
            dataList = data.filter(function(item) {
                return item.text.toLowerCase().startsWith(filter.toLowerCase());
            });
        } else {
            dataList = data;
        }

        ReactDOM.render( <AutoComplete data={dataList} {...props} />, root[0]);
    }

    let props;

    it('should render the provided data', () => {
        props = { valueField: "text" };
        render("f");

        const list = root.find("ul");

        expect(list.children().length).toEqual(2);
        list.children().each(function(idx, element) {
            expect(element.textContent.toLowerCase().startsWith("f")).toBe(true);
        });
    });

    it('should fire onSearch event when typing', () => {
        props = {
            onSearch: function(filter) {
                expect(filter).toEqual("f");
            },
            valueField: "text"
        };
        render();

        const input = root.find("input")[0];
        type(input, "f");
    });

    it('should NOT fire onSearch when typing separator characters', () => {
        props = {
            onSearch: function() {
                expect(false).toBe(true);
            },
            separator: ", ",
            valueField: "text"
        };
        render("Belarus");

        const input = root.find("input")[0];
        type(input, input.value + ",");
    });

    it('should autofill when typing', () => {
        props = { suggest: true, valueField: "text", onSearch: render };
        render("");

        const input = root.find("input")[0];

        type(input, "f");
        expect(input.value).toEqual("Finland");
    });

    //fails due to a bug! works only if a separator is provided
    it('should assert selection of suggested part of the word', () => {
        props = { valueField: "text", onSearch: render, suggest: true };
        render("");

        const input = root.find("input")[0];

        type(input, "b");
        expect(input.value.substring(input.selectionStart, input.selectionEnd)).toEqual("elarus");
    });

    it('should NOT suggest when deleting', () => {
        props = { valueField: "text", onSearch: render, suggest: true, separator: ", " };
        render("");

        const input = root.find("input")[0];

        type(input, "Be");
        expect(input.value).toEqual("Belarus");

        type(input, "B");
        expect(input.value).toEqual("B");
    });
}));
