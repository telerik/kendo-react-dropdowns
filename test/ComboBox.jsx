import * as React from 'react';
import { shallow } from 'enzyme';
import List from '../src/List';
import ListItem from '../src/ListItem';
import ComboBox from '../src/ComboBox';
import ComboBoxContainer from '../src/ComboBoxContainer';
import SearchBar from '../src/SearchBar';
import ListContainer from '../src/ListContainer';

describe('ComboBox', () => {
    const data = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "asd", value: 3 },
        { text: "dsa", value: 4 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    const filterData = (text) => {
        let dataList;

        if (text) {
            dataList = data.filter(function(item) {
                return item.text.indexOf(text) > -1;
            });
        } else {
            dataList = data;
        }

        return shallow(<ComboBox data={dataList} />);
    };

    let result;

    it('should render List', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(List).length).toEqual(1);
    });

    it('should render SearchBar', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(SearchBar).length).toEqual(1);
    });

    it('should List with style height="inherit" if no height explicitly set', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(ListContainer).find(List).props().height).toEqual("inherit");
    });

    it('should update state when item is selected from List', () => {
        result = shallow(<ComboBoxContainer data={data} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        expect(result.state('value')).toEqual('');
        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual(data[1]);
        expect(result.state('value')).toEqual(data[1].value);
    });

    it('should update state when item is selected from List (primitives)', () => {
        result = shallow(<ComboBoxContainer data={primitives} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        expect(result.state('value')).toEqual('');
        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual(primitives[1]);
        expect(result.state('value')).toEqual(primitives[1]);
    });

    it('should fire change event when item selected from the list', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<ComboBoxContainer data={data} onChange={spy} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        items.at(3).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith(data[3].value);
    });

    it('should fire change event when item selected from the list (primitives)', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<ComboBoxContainer data={primitives} onChange={spy} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        items.at(2).shallow().simulate('click');
        expect(spy).toHaveBeenCalledWith(primitives[2]);
    });
});
