import * as React from 'react';
import { shallow } from 'enzyme';

import * as Helpers from '../Helpers';
import { DropDownList, List, ListItem } from '../../src/stateless/main';

describe('DropDownList list click', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    let result;

    it('should fire onChange event with dataItem when item is clicked', () => {
        const spy = jasmine.createSpy('spy');
        const mock = function() {};
        result = shallow(
            <DropDownList
                data={data}
                onClose={mock}
                onChange={spy}
                textField="text"
                valueField="value"
            />
        );
        const items = result.find(List).shallow().find(ListItem);

        Helpers.click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith({ text: "bar", value: 2 });
    });

    it('should fire onChange event with dataItem when item is clicked (primitives)', () => {
        const spy = jasmine.createSpy('spy');
        const mock = function() {};
        result = shallow(<DropDownList data={primitives} onClose={mock} onChange={spy} />);
        const items = result.find(List).shallow().find(ListItem);

        Helpers.click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith("bar");
    });

    it('should NOT fire onChange for disabled component on click', () => {
        const spy = jasmine.createSpy('spy');
        const mock = function() {};
        result = shallow(
            <DropDownList
                data={data}
                disabled
                onClose={mock}
                onChange={spy}
                textField="text"
                valueField="value"
            />
        );
        const items = result.find(List).shallow().find(ListItem);

        Helpers.click(items.at(1).shallow());
        expect(spy).not.toHaveBeenCalled();
    });

    it('should fire onToggle on DropDownList click', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                onToggle={spy}
                textField="text"
                valueField="value"
            />
        );

        Helpers.click(result);
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should NOT fire onToggle for disabled component on DropDownList click', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                disabled
                onToggle={spy}
                textField="text"
                valueField="value"
            />
        );

        Helpers.click(result);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT fire onToggle on DropDownList click when the list has no data and no defaultItem', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={[]} onToggle={spy} textField="text" valueField="value" />);

        Helpers.click(result);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should fire onToggle on DropDownList click when the list has no data but is filterable', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={[]}
                filterable
                onToggle={spy}
                textField="text"
                valueField="value"
            />
        );

        Helpers.click(result);
        expect(spy).toHaveBeenCalledWith(true);
    });
});
