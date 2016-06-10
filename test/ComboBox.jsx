import * as React from 'react';
import { shallow } from 'enzyme';
import { click, compareState } from './Helpers';
import StatefulComboBox from '../src/ComboBox';

import { ComboBox, List, ListItem, ListContainer, SearchBar, DropDownWrapper } from '../src/stateless/all';

describe('StatelessComboBox', () => {
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

    it('should render SearchBar', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(SearchBar).length).toEqual(1);
    });
});

describe('StatefulComboBox', () => {
    const data = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "asd", value: 3 },
        { text: "dsa", value: 4 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];

    const filteredData = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    const filteredPrimitives = [ "bar", "baz" ];

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

    it('should render stateless StatefulComboBox', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" valueField="value" />);
        expect(result.find(ComboBox).length).toEqual(1);
    });

    it('should have null value if it is not passed through props', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" valueField="value" />);
        compareState(result.state(), {
            value: undefined,
            data: data,
            dataItem: undefined,
            text: "",
            focused: -1,
            selected: -1,
            word: null,
            highlight: false
        });
    });

    it('should have null value if it is not passed through props (primitives)', () => {
        result = shallow(<StatefulComboBox data={primitives} />);
        compareState(result.state(), {
            value: undefined,
            data: primitives,
            dataItem: undefined,
            text: "",
            focused: -1,
            selected: -1,
            word: null,
            highlight: false
        });
    });

    it('should accept value when not filtering', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" value={3} valueField="value" />);
        compareState(result.state(), {
            value: 3,
            data: data,
            dataItem: data[2],
            text: data[2].text,
            focused: 2,
            selected: 2,
            word: null,
            highlight: false
        });
    });

    it('should accept value when not filtering (primitives)', () => {
        result = shallow(<StatefulComboBox data={primitives} value="baz" />);
        compareState(result.state(), {
            value: "baz",
            data: primitives,
            dataItem: "baz",
            text: "baz",
            focused: 2,
            selected: 2,
            word: null,
            highlight: false
        });
    });


    it('should ignore value property when filtering', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" value={3} valueField="value" />);
        const filter = "foo"

        //simulate filter
        result.setProps({
            filter: filter,
            data: filteredData
        });
        compareState(result.state(), {
            value: 3,
            data: filteredData,
            dataItem: data[2],
            text: filter,
            focused: 0,
            selected: -1,
            word: null
        });
    });

    it('should ignore value property when filtering (primitives)', () => {
        result = shallow(<StatefulComboBox data={primitives} value="baz" />);
        const filter = "ba"
        const previousValue = "baz";

        //simulate filter
        result.setProps({
            filter: filter,
            data: filteredPrimitives
        });
        compareState(result.state(), {
            value: previousValue,
            data: filteredPrimitives,
            dataItem: previousValue,
            text: filter,
            focused: 1,
            selected: 1,
            word: null
        });
    });

    it('should update state when item is selected from List (without initial value)', () => {
        const onChange = function(value) {
            result.setProps({
                value: value,
                filter: null
            });
        }
        result = shallow(<StatefulComboBox data={data} onChange={onChange} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);
        click(items.at(1).shallow());

        compareState(result.state(), {
            value: data[1].value,
            dataItem: data[1],
            focused: 1,
            selected: 1,
            word: null,
            highlight: false
        });
    });

    it('should update state when item is selected from List, then custom value entered', () => {
        const spy = {
            onChange : function(value) {
                result.setProps({
                    value: value,
                    filter: null
                })
            }
        }
        spyOn(spy, 'onChange');

        result = shallow(<StatefulComboBox data={data} onChange={spy.onChange} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(1).shallow());
        expect(spy.onChange).toHaveBeenCalledWith(data[1].value);

        result.setProps({
            filter: "testing custom value"
        });

        //simulate blur without triggering the input's native blur event,
        //as it refers to the window.document object which is not available in the test environment
        result.props().onSelect(result.props().text, result.props().dataItem);

        expect(spy.onChange).toHaveBeenCalledWith("testing custom value");
        expect(spy.onChange.calls.count()).toEqual(2);
    });

    it('should update state when item is selected from List (with initial value)', () => {
        const onChange = function(value) {
            result.setProps({
                value: value,
                filter: null
            });
        }
        result = shallow(<StatefulComboBox data={data} textField="text" onChange={onChange} valueField="value" value={3} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(1).shallow());
        compareState(result.state(), {
            value: data[1].value,
            dataItem: data[1],
            focused: 1,
            selected: 1,
            word: null,
            highlight: false
        });
    });

    it('should update state when item is selected from List after filter (with initial value)', () => {
        const onChange = function(value) {
            result.setProps({
                value: value,
                filter: null
            });
        }
        result = shallow(<StatefulComboBox data={data} onChange={onChange}  textField="text" valueField="value" value={3} />);
        
        const filter = "foo"
        const previousValue = 3;
        const previousDataItem = data[2];

        //simulate filter
        result.setProps({
            filter: filter,
            data: filteredData
        });

        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);
        click(items.at(1).shallow());

        compareState(result.state(), {
            value: filteredData[1].value,
            dataItem: filteredData[1],
            focused: 1,
            selected: 1,
            word: null,
            highlight: false
        });
    });

    it('should update state when item is selected from List (primitives)', () => {
        const onChange = function(value) {
            result.setProps({
                value: value,
                filter: null
            });
        }
        result = shallow(<StatefulComboBox onChange={onChange} data={primitives} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(1).shallow());
        expect(result.state('dataItem')).toEqual(primitives[1]);
        expect(result.state('value')).toEqual(primitives[1]);
    });

    it('should update state when item is selected from List after filter (primitives, with initial value)', () => {
        const onChange = function(value) {
            result.setProps({
                value: value,
                filter: null
            });
        }
        result = shallow(<StatefulComboBox onChange={onChange} data={primitives} value="foo" />);

        //simulate filter
        result.setProps({
            filter: "ba",
            data: filteredPrimitives
        });
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);
        click(items.at(1).shallow());

        compareState(result.state(), {
            value: filteredPrimitives[1],
            data: filteredPrimitives,
            dataItem: filteredPrimitives[1],
            text: filteredPrimitives[1],
            focused: 1,
            selected: 1,
            word: null
        });
    });

    it('should fire change event when item selected from the list', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<StatefulComboBox data={data} onChange={spy} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(3).shallow());
        expect(spy).toHaveBeenCalledWith(data[3].value);
    });

    it('should fire change event when item selected from the list (primitives)', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<StatefulComboBox data={primitives} onChange={spy} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(2).shallow());
        expect(spy).toHaveBeenCalledWith(primitives[2]);
    });


    it('should resolve word when filtering', () => {
        result = shallow(<StatefulComboBox data={data} suggest textField="text" value={3} valueField="value" />);

        //simulate filter
        result.setProps({
            filter: "f",
            data: filteredData
        });
        result.setProps({
            filter: "fo",
            data: filteredData
        });

        compareState(result.state(), {
            value: 3,
            data: filteredData,
            dataItem: data[2],
            text: "fo",
            focused: 0,
            selected: -1,
            word: filteredData[0].text
        });
    });

    // it('should fire filter event when typing', () => {
        // const spy = jasmine.createSpy('spy');
        // result = shallow(<StatefulComboBox data={data} onFilter={spy} textField="text" valueField="value" />);

        // expect(spy).toHaveBeenCalledWith(data[3].value);
    // });
});
