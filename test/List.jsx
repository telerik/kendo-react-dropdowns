import * as React from 'react';
import { shallow } from 'enzyme';
import { click } from './Helpers';
import { List, ListItem } from '../src/stateless/all';

describe('List', () => {
    let result;
    const data = [ { text: "foo", value: 1 }, { text: "bar", value: 2 } ];
    const primitives = [ "foo", "bar", "baz" ];

    it('should render a ul', () => {
        result = shallow(<List data={data} />);
        expect(result.find('ul').length).toEqual(1);
    });

    it('should render ListItems', () => {
        result = shallow(<List data={data} />);
        expect(result.find(ListItem).length).toEqual(2);
    });

    it('should render ListItems (array of strings)', () => {
        result = shallow(<List data={primitives} />);
        expect(result.find(ListItem).length).toEqual(3);
    });

    it('should select', () => {
        result = shallow(<List data={data} selected={1} textField="text" valueField="value" />);
        const items = result.find(ListItem);
        expect(items.at(0).shallow().hasClass('k-state-selected')).toBe(false);
        expect(items.at(1).shallow().hasClass('k-state-selected')).toBe(true);
    });

    it('should select (array of strings)', () => {
        result = shallow(<List data={primitives} selected={1} />);
        const items = result.find(ListItem);
        expect(items.at(0).shallow().hasClass('k-state-selected')).toBe(false);
        expect(items.at(1).shallow().hasClass('k-state-selected')).toBe(true);
    });

    it('should focus', () => {
        result = shallow(<List data={data} focused={0} textField="text" valueField="value" />);
        const items = result.find(ListItem);
        expect(items.at(0).shallow().hasClass('k-state-focused')).toBe(true);
        expect(items.at(1).shallow().hasClass('k-state-focused')).toBe(false);
    });

    it('should fire onClick', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<List data={data} onClick={spy} textField="text" valueField="value" />);
        const items = result.find(ListItem);

        click(items.at(0).shallow());
        expect(spy).toHaveBeenCalledWith({ text: 'foo', value: 1 }, 0);

        click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith({ text: 'bar', value: 2 }, 1);
    });

    it('should fire onClick (array of strings)', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<List data={primitives} onClick={spy} />);
        const items = result.find(ListItem);

        click(items.at(0).shallow());
        expect(spy).toHaveBeenCalledWith("foo", 0);

        click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith("bar", 1);
    });
});
