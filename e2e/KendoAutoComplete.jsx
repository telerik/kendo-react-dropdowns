import React from 'react';
import ReactDOM from 'react-dom';
import KendoAutoComplete from '../src/kendo-autocomplete';

// e2e-utils is a module exposed from react-tasks
// it exports `$` and `withRoot` - higher order function for describe (example below)
import { withRoot } from 'e2e-utils';

// `root` parameter is a jQuery object which includes chai-jquery in it.
// chai-jquery adds a should method to the jQuery object.
// See https://github.com/chaijs/chai-jquery#assertions for available assertions.
describe('KendoAutoComplete', withRoot(root => {

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

    const render = (filter) => {
        let dataList;

        if (filter) {
            dataList = data.filter(function(item) {
                return item.text.toLowerCase().startsWith(filter.toLowerCase());
            });
        } else {
            dataList = data;
        }

        ReactDOM.render( <KendoAutoComplete data={dataList} {...props} />, root[0]);
    };

    const type = function(input, value) {
        const event = new Event('input', { bubbles: true });
        input.value = value;
        input.dispatchEvent(event);
    };

    let props;

    it('should autofill when typing', () => {
        props = { suggest: true, valueField: "text", onSearch: render };
        render("");

        const input = root.find("input")[0];

        type(input, "f");
        expect(input.value).toEqual("Finland");
    });

    it('should render the provided data', () => {
        props = { valueField: "text" };
        render("f");

        const list = root.find("ul");

        expect(list.children().length).toEqual(2);
        list.children().each(function(idx, element) {
            expect(element.textContent.toLowerCase().startsWith("f")).toBe(true);
        });
    });

    //fails due to a bug! works only if a separator is provided
    it('should assert selection of suggested part of the word', () => {
        props = { valueField: "text", onSearch: render, suggest: true };
        render("");

        const input = root.find("input")[0];

        type(input, "b");
        expect(input.value.substring(input.selectionStart, input.selectionEnd)).toEqual("elarus");
    });

    it('should delete suggested text selection on backspace', () => {
        props = { valueField: "text", onSearch: render, suggest: true, separator: ", " };
        render("");

        const input = root.find("input")[0];

        type(input, "Be");
        expect(input.value).toEqual("Belarus");

        type(input, "B");
        expect(input.value).toEqual("B");
    });
}));
