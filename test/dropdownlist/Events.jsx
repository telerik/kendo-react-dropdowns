import * as React from 'react';
import { shallow } from 'enzyme';

import * as Helpers from '../Helpers';
import DropDownList from '../../src/DropDownList';
import * as Stateless from '../../src/stateless/main';

describe('DropDownList change event', () => {
    const primitives = [ "foo", "bar", "baz" ];
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    let result;

    it('should not call onChange intially when value is provided', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={primitives} onChange={spy} value="baz" />);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should call onChange when item is clicked', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={primitives} onChange={spy} />);
        const items = result.find(Stateless.DropDownList).shallow().find(Stateless.List).shallow().find(Stateless.ListItem);

        Helpers.click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith("bar");
    });

    it('should call onChange when default item is clicked', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                onChange={spy}
                textField="text"
                value={2}
                valueField="value"
            />
        );
        const defaultItem = result.find(Stateless.DropDownList).shallow().find(Stateless.ListDefaultItem).shallow();

        Helpers.click(defaultItem);
        expect(spy).toHaveBeenCalledWith(null);
    });

    it('should call onChange when default item is clicked (primitives)', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={primitives} defaultItem="select..." value="foo" onChange={spy} />);
        const defaultItem = result.find(Stateless.DropDownList).shallow().find(Stateless.ListDefaultItem).shallow();

        Helpers.click(defaultItem);
        expect(spy).toHaveBeenCalledWith("select...");
    });
});

describe('DropDownList event handlers', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    const primitive = [ "foo", "bar", "baz" ];

    function onChange(value) {
        result.setProps({
            value: value
        });
    }

    let result;

    it('should change state after high order component updates the value', () => {
        result = shallow(<DropDownList data={data} onChange={onChange} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onChange')(data[1]);

        Helpers.compareState(result.state(), {
            dataItem: data[1],
            selected: 1,
            focused: 1
        });
    });

    it('should change state if the defaultItem is chosen', () => {
        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "Select...", value: null }}
                onChange={onChange}
                textField="text"
                valueField="value"
            />
        );
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onChange')(data[1]);

        Helpers.compareState(result.state(), {
            dataItem: data[1],
            selected: 1,
            focused: 1
        });

        dropDownList.prop('onChange')({ text: "Select...", value: null });

        Helpers.compareState(result.state(), {
            dataItem: { text: "Select...", value: null },
            selected: -1,
            focused: -1
        });
    });

    it('should change state if the defaultItem is chosen (primitive)', () => {
        result = shallow(<DropDownList data={primitive} defaultItem="select..." onChange={onChange} />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onChange')(primitive[1]);

        Helpers.compareState(result.state(), {
            dataItem: "bar",
            selected: 1,
            focused: 1
        });

        dropDownList.prop('onChange')("select...");

        Helpers.compareState(result.state(), {
            dataItem: undefined,
            selected: -1,
            focused: -1
        });
    });

    it('should change state.show onToggle(true)', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onToggle')(true);
        expect(result.state('show')).toEqual(true);
    });

    it('should change state.show onToggle(false)', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onToggle')(false);
        expect(result.state('show')).toEqual(false);
    });

    it('should reset selected item onFilter', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(result.state('selected')).toEqual(null);
    });

    it('should focus first item onFilter', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(result.state('focused')).toEqual(0);
    });

    it('should fire onFilter event', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={data} onFilter={spy} textField="text" valueField="value" />);
        const dropDownList = result.find(Stateless.DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(spy).toHaveBeenCalledWith("b");
    });
});
