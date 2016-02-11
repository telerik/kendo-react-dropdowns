import * as React from 'react';
import { shallow } from 'enzyme';
import KendoListItem from '../src/kendo-listitem';
//import KendoList from '../src/kendo-list';

describe('KendoAutoComplete', () => {
    let result;
    let dataItem = { text: "foo", index: 1 };

    beforeEach(() => { /* test setup */ });

    it('should render a li', () => {
        result = shallow(<KendoListItem dataItem={dataItem} />);
        expect(result.type()).toEqual('li');
    });
});
