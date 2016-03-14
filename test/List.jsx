import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../src/ListItem';
import DefaultItem from '../src/DefaultItem';
import List from '../src/List';

describe('List', () => {
    let result;
    let data = [ { text: "foo", value: 1 }, { text: "bar", value: 2 } ];

    it('should render a ul', () => {
        result = shallow(<List data={data} />);
        expect(result.find('ul').length).toEqual(1);
    });

    it('should render ListItems', () => {
        result = shallow(<List data={data} />);
        expect(result.find(ListItem).length).toEqual(2);
    });

    it('should select', () => {
        result = shallow(<List data={data} textField="text" value={2} valueField="value" />);
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

    it('should select defaultItem if no value', () => {
        result = shallow(<List data={data} defaultItem="select..." textField="text" valueField="value" />);
        const optionLabel = result.children().at(0).shallow();
        expect(optionLabel.hasClass('k-state-selected')).toBe(true);
    });

    it('should fire onClick', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<List data={data} onClick={spy} textField="text" valueField="value" />);
        const items = result.find(ListItem);

        items.at(0).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith({ text: 'foo', value: 1 });

        items.at(1).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith({ text: 'bar', value: 2 });
    });

    it('should fire onClick for the defaultItem', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <List
                data={data}
                defaultItem={{ text: "select...", value: -1 }}
                onClick={spy}
                textField="text"
                valueField="value"
            />
        );
        const defaultItem = result.find(DefaultItem);

        defaultItem.at(0).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith({ text: 'select...', value: -1 });
    });

    it('should pass null to the click handler if defaultItem is defined as string', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <List
                data={data}
                defaultItem="select ..."
                onClick={spy}
                textField="text"
                valueField="value"
            />
        );
        const defaultItem = result.find(DefaultItem);

        defaultItem.at(0).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith(null);
    });
});
