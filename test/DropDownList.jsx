import * as React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';

import { click, keyPress, lastCallArgs } from './Helpers';

import StatefulDropDownList from '../src/DropDownList';

import { DropDownList, List, ListItem, ListFilter, ListDefaultItem } from '../src/stateless/main';

describe('StatefulDropDownList initialization', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    let result;

    it('should render stateless DropDownList', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        expect(result.find(DropDownList).length).toEqual(1);
    });

    it('should accept value', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" value={3} valueField="value" />);
        expect(result.state('dataItem')).toBe(data[2]);
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
    });

    it('should accept value (primitives)', () => {
        result = shallow(<StatefulDropDownList data={primitives} value="baz" />);
        expect(result.state('dataItem')).toEqual("baz");
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
    });

    it('should accept index', () => {
        result = shallow(<StatefulDropDownList data={data} index={1} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(data[1]);
        expect(result.state('focused')).toEqual(1);
        expect(result.state('selected')).toEqual(1);
    });

    it('should accept index (primitives)', () => {
        result = shallow(<StatefulDropDownList data={primitives} index={1} />);
        expect(result.state('dataItem')).toEqual("bar");
        expect(result.state('focused')).toEqual(1);
        expect(result.state('selected')).toEqual(1);
    });

    it('should select nothing if no value or index', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(null);
        expect(result.state('focused')).toEqual(null);
        expect(result.state('selected')).toEqual(null);
    });

    it('should select nothing if no value or index (primitives)', () => {
        result = shallow(<StatefulDropDownList data={primitives} />);
        expect(result.state('dataItem')).toBe(null);
        expect(result.state('focused')).toEqual(null);
        expect(result.state('selected')).toEqual(null);
    });

    it('should select the defaultItem if no value or index', () => {
        result = shallow(<StatefulDropDownList data={data} defaultItem={{ text: "select...", value: -1 }} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toEqual({ text: "select...", value: -1 });
        expect(result.state('focused')).toEqual(-1);
        expect(result.state('selected')).toEqual(-1);
    });

    it('should select the defaultItem if no value or index (primitives)', () => {
        result = shallow(<StatefulDropDownList data={primitives} defaultItem="select..." />);
        expect(result.state('dataItem')).toEqual("select...");
        expect(result.state('focused')).toEqual(-1);
        expect(result.state('selected')).toEqual(-1);
    });

    it('should accept className', () => {
        result = shallow(<StatefulDropDownList className="foo" data={data} textField="text" valueField="value" />);
        expect(result.find(DropDownList).hasClass('foo')).toEqual(true);
    });
});

describe('StatefulDropDownList event handlers', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    let result;

    it('should change state.selected onSelect', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        expect(result.state('selected')).toEqual(null);
        dropDownList.prop('onSelect')(data[1]);
        expect(result.state('selected')).toEqual(1);
    });

    it('should change state.focused onSelect', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onSelect')(data[1]);
        expect(result.state('focused')).toEqual(1);
    });

    it('should change state.dataItem onSelect', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onSelect')(data[1]);
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
    });

    it('should change state.dataItem onChange', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onChange')(data[1]);
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
    });

    it('should change state.dataItem onChange if the defaultItem is chosen', () => {
        result = shallow(<StatefulDropDownList data={data} defaultItem={{ text: "Select...", value: null }} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onChange')(data[1]);
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
        dropDownList.prop('onChange')({ text: "Select...", value: null });
        expect(result.state('dataItem')).toEqual({ text: "Select...", value: null });
    });

    it('should change state.dataItem onChange if the defaultItem is chosen (primitive)', () => {
        const primitive = [ "foo", "bar", "baz" ];
        result = shallow(<StatefulDropDownList data={primitive} defaultItem="select..." />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onChange')(primitive[1]);
        expect(result.state('dataItem')).toEqual("bar");
        dropDownList.prop('onChange')("select...");
        expect(result.state('dataItem')).toEqual("select...");
    });

    it('should change state.show onOpen', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onToggle')(true);
        expect(result.state('show')).toEqual(true);
    });

    it('should change state.show onClose', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onToggle')(false);
        expect(result.state('show')).toEqual(false);
    });

    it('should reset selected item onFilter', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(result.state('selected')).toEqual(null);
    });

    it('should focus first item onFilter', () => {
        result = shallow(<StatefulDropDownList data={data} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(result.state('focused')).toEqual(0);
    });

    it('should fire onFilter event', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<StatefulDropDownList data={data} onFilter={spy} textField="text" valueField="value" />);
        const dropDownList = result.find(DropDownList);

        dropDownList.prop('onFilter')("b");
        expect(spy).toHaveBeenCalledWith("b");
    });
});

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

        click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith({ text: "bar", value: 2 });
    });

    it('should fire onChange event with dataItem when item is clicked (primitives)', () => {
        const spy = jasmine.createSpy('spy');
        const mock = function() {};
        result = shallow(<DropDownList data={primitives} onClose={mock} onChange={spy} />);
        const items = result.find(List).shallow().find(ListItem);

        click(items.at(1).shallow());
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

        click(items.at(1).shallow());
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

        click(result);
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

        click(result);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT fire onToggle on DropDownList click when the list has no data and no defaultItem', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={[]} onToggle={spy} textField="text" valueField="value" />);

        click(result);
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

        click(result);
        expect(spy).toHaveBeenCalledWith(true);
    });
});

describe('DropDownList keyboard navigation', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    let result;

    function create(dataItem, spy, defaultItem, disabled) {
        return shallow(
            <DropDownList
                data={data}
                dataItem={dataItem}
                defaultItem={defaultItem}
                disabled={disabled}
                focused={data.indexOf(dataItem)}
                onClose={function() { }}
                onSelect={spy}
                selected={data.indexOf(dataItem)}
                textField="text"
                valueField="value"
            />
        );
    }

    it('should fire onSelect with next item when key "down" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.down, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should fire onSelect with next item when key "right" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.right, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should fire onSelect with previous item when key "up" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onSelect with previous item when key "left" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.left, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onSelect with first item when key "home" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.home, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onSelect with defaultItem when key "home" is pressed', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy, defaultItem);

        result.simulate('keyDown', { keyCode: keycode.codes.home, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should fire onSelect with last item when key "end" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.end, preventDefault: function() {} });

        expect(spy).toHaveBeenCalledWith(data[2]);
    });

    it('should be able to focus the defaultItem (first > default)', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, defaultItem);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should select the focused item on enter', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        result.simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should select the focused default item on enter', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, defaultItem);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        result.simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should NOT be able to move the focus from last to first', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.down, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[2]);
    });

    it('should NOT be able to move the focus from first to last', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should NOT focus if component is disabled', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, undefined, true);

        result.simulate('keyDown', { keyCode: keycode.codes.down, preventDefault: function() {} });
        expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT select on enter if disabled', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy, undefined, true);

        result.simulate('keyDown', { keyCode: keycode.codes.up, preventDefault: function() {} });
        result.simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault: function() {} });
        expect(spy).not.toHaveBeenCalled();
    });

    it('should fire onToggle on alt + down', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={data} onToggle={spy} textField="text" valueField="value" />);

        result.simulate('keyDown', { keyCode: keycode.codes.down, altKey: true, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should NOT fire onToggle on alt + down if the list is already opened', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                onToggle={spy}
                show
                textField="text"
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.down, altKey: true, preventDefault: function() {} });
        expect(spy).not.toHaveBeenCalled();
    });

    it('should fire onToggle on alt + up', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                onToggle={spy}
                show
                textField="text"
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.up, altKey: true, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(false);
    });

    it('should fire onToggle on esc', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                onToggle={spy}
                show
                textField="text"
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.esc, preventDefault: function() {} });
        expect(spy).toHaveBeenCalledWith(false);
    });

    /* TODO: create e2e test for this case
    it('should fire onChange on blur', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList
                data={data}
                onChange={spy}
                show
                textField="text"
                valueField="value"
            />
        );

        result.simulate('blur', {});
        expect(spy).toHaveBeenCalled();
    });
    */
});

describe('DropDownList search', () => {
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 }
    ];

    let result;

    function statefulBuilder(data) {
        const stateful = {
            select: (dataItem) => {
                result.setProps({
                    dataItem: dataItem,
                    selected: data.indexOf(dataItem),
                    focused: data.indexOf(dataItem)
                });
            }
        };

        spyOn(stateful, 'select').and.callThrough();

        return stateful;
    }

    it('should select first match', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={data} onSelect={spy} textField="text" valueField="value" />);

        keyPress(result, "b");
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should search select item if text is number', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 10, value: 2 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={myData} onSelect={spy} textField="text" valueField="value" />);
        keyPress(result, 1);

        expect(spy).toHaveBeenCalledWith(myData[1]);
    });

    it('should search text if text is 0', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 0, value: 2 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={myData} onSelect={spy} textField="text" valueField="value" />);
        keyPress(result, 0);

        expect(spy).toHaveBeenCalledWith(myData[1]);
    });

    it('should support case sensitive search', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: "Bar", value: 2 },
            { text: "baz", value: 3 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(
            <DropDownList
                data={myData}
                ignoreCase={false}
                onSelect={spy}
                textField="text"
                valueField="value"
            />
        );

        keyPress(result, "b");
        expect(spy).toHaveBeenCalledWith(myData[2]);
    });

    it('should select next item if it starts with the same character', () => {
        const stateful = statefulBuilder(data);

        result = shallow(<DropDownList data={data} onSelect={stateful.select} textField="text" valueField="value" />);
        keyPress(result, "b");
        keyPress(result, "b");

        expect(lastCallArgs(stateful.select)).toEqual(data[2]);
    });

    it('should select specific item if typed matches', () => {
        const myData = [
            { text: "Foo1", value: 1 },
            { text: "Foo2", value: 2 },
            { text: "Foo3", value: 3 }
        ];
        const stateful = statefulBuilder(myData);

        result = shallow(<DropDownList data={myData} onSelect={stateful.select} textField="text" valueField="value" />);

        keyPress(result, "f");
        keyPress(result, "o");
        keyPress(result, "o");
        keyPress(result, "2");

        expect(lastCallArgs(stateful.select)).toEqual(myData[1]);
    });

    it('should select a specific item after loop', () => {
        const primitives = [ "tt1", "t", "ttt", "tt3", "tt", "tttt" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onSelect={stateful.select} />);

        keyPress(result, "t");
        keyPress(result, "t");
        keyPress(result, "1");

        expect(lastCallArgs(stateful.select)).toEqual(primitives[0]);
    });

    it('should stays on the same item if changed but still in loop', () => {
        const primitives = [ "text1", "text2", "text3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} defaultItem="select..." onSelect={stateful.select} />);

        keyPress(result, "t"); //select text2
        keyPress(result, "t"); //select text3
        keyPress(result, "e");
        keyPress(result, "x");
        keyPress(result, "t");
        keyPress(result, "2"); //resulting text is text2

        expect(lastCallArgs(stateful.select)).toEqual("text2");
    });

    it('should select next item if it starts with same characeter (default item)', () => {
        const primitives = [ "text1", "text2" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} defaultItem="select..." onSelect={stateful.select} />);

        keyPress(result, "t");
        keyPress(result, "t");

        expect(lastCallArgs(stateful.select)).toEqual("text2");
    });

    it('should be able to find and select the defaultItem', () => {
        const primitives = [ "text1", "text2" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(
            <DropDownList
                data={primitives}
                dataItem="text2"
                defaultItem="select..."
                onSelect={stateful.select}
            />
        );

        keyPress(result, "s");

        expect(stateful.select).toHaveBeenCalledWith("select...");
    });

    it('should keep selection if typed text is same as current data item', () => {
        const primitives = [ "test", "500.122", "500.123" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onSelect={stateful.select} />);

        keyPress(result, "5");

        expect(stateful.select).toHaveBeenCalledWith("500.122");

        keyPress(result, "0");
        keyPress(result, "0");

        expect(lastCallArgs(stateful.select)).toEqual("500.122");
    });

    it('should keep selection if typed text differs', () => {
        const primitives = [ "test", "500.122", "500.123" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onSelect={stateful.select} />);

        keyPress(result, "5");

        expect(stateful.select).toHaveBeenCalledWith("500.122");

        keyPress(result, "0");
        keyPress(result, "0");
        keyPress(result, "0");

        expect(lastCallArgs(stateful.select)).toEqual("500.122");
    });

    it('should honor ignoreCase option', () => {
        const primitives = [ "text1", "Text2", "Text3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} dataItem="Text2" ignoreCase={false} onSelect={stateful.select} />);

        keyPress(result, "t");
        keyPress(result, "t");

        expect(lastCallArgs(stateful.select)).toEqual("text1");
    });

    it('should NOT move to next item if typing same letters', () => {
        const primitives = [ "Bill 1", "Bill 2", "Label" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} dataItem="Bill 1" onSelect={stateful.select} />);

        keyPress(result, "b");
        keyPress(result, "i");
        keyPress(result, "l");
        keyPress(result, "l");

        expect(lastCallArgs(stateful.select)).toEqual("Bill 2");
    });

    it('should support space', () => {
        const primitives = [ "Bill 1", "Bill 2", "Bill 3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onSelect={stateful.select} />);

        keyPress(result, "b");
        keyPress(result, "i");
        keyPress(result, "l");
        keyPress(result, "l");
        keyPress(result, " ");
        keyPress(result, "2");

        expect(lastCallArgs(stateful.select)).toEqual("Bill 2");
    });

    it('should NOT search if filterable', () => {
        const primitives = [ "foo", "bar", "baz" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} filterable onSelect={stateful.select} />);

        keyPress(result, "b");

        expect(stateful.select).not.toHaveBeenCalled();
    });
});

describe('DropDownList filter', () => {
    const data = [
        { text: "Black", value: "1" },
        { text: "Orange", value: "2" },
        { text: "Grey", value: "3" }
    ];

    class DropDownContainer extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                data: data,
                delay: 0,
                value: "3",
                filterable: true,
                onFilter: this.onFilter,
                textField: "text",
                valueField: "value"
            };
        }

        onFilter = (text) => {
            let result;

            if (text) {
                result = data.filter(function(item) {
                    return item.text.toLowerCase().startsWith(text.toLowerCase());
                });
            } else {
                result = data;
            }

            this.setState({ data: result });
        }

        render() {
            return (
                <StatefulDropDownList {...this.state} />
            );
        }
    }

    let result;

    it('should fire the onFilter event on user input', (done) => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList data={data}
                delay={0}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith("o");
            done();
        }, 0);
    });

    it('should fire the onFilter event with empty string argument when the user clears input value', (done) => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList data={data}
                delay={0}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });
        input.simulate("keyUp", { target: { value: "" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith("");
            done();
        }, 0);
    });

    it('should NOT update selected dataItem on filter', (done) => {
        const filter = jasmine.createSpy('filter');
        const select = jasmine.createSpy('select');
        result = shallow(
            <DropDownList data={data}
                delay={0}
                filterable
                onFilter={filter}
                onSelect={select}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(select).not.toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should keep selected dataItem after filter', (done) => {
        result = shallow(<DropDownContainer />).find(StatefulDropDownList).shallow();
        const input = result.find(DropDownList).shallow().find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('dataItem')).toEqual({ text: "Grey", value: "3" });
            done();
        }, 0);
    });

    it('should focus the first item after filter', (done) => {
        result = shallow(<DropDownContainer />).find(StatefulDropDownList).shallow();
        const input = result.find(DropDownList).shallow().find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('focused')).toEqual(0);
            done();
        }, 0);
    });

    it('should NOT select the first item after filter', (done) => {
        result = shallow(<DropDownContainer />).find(StatefulDropDownList).shallow();
        const input = result.find(DropDownList).shallow().find(ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('selected')).toEqual(null);
            done();
        }, 0);
    });

    //should update popup height when no items are found
});

describe('DropDownList events', () => {
    const primitives = [ "foo", "bar", "baz" ];
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    let result;

    it('should not fire change event on load when value is selected by index', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} index={2} onChange={spy} />);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should not fire change event on load when value is selected by value', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} onChange={spy} value="baz" />);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should trigger change when item is clicked', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} onChange={spy} />);
        const items = result.find(DropDownList).shallow().find(List).shallow().find(ListItem);

        click(items.at(1).shallow());
        expect(spy).toHaveBeenCalledWith("bar", "bar");
    });

    it('should trigger change when default item is clicked', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(
            <StatefulDropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                onChange={spy}
                textField="text"
                valueField="value"
            />
        );
        const defaultItem = result.find(DropDownList).shallow().find(ListDefaultItem).shallow();

        click(defaultItem);
        expect(spy).toHaveBeenCalledWith(null, { text: "select...", value: null });
    });

    it('should trigger change when default item is clicked (primitives)', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} defaultItem="select..." onChange={spy} />);
        const defaultItem = result.find(DropDownList).shallow().find(ListDefaultItem).shallow();

        click(defaultItem);
        expect(spy).toHaveBeenCalledWith("select...", "select...");
    });

    it('should trigger select when searching', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} onSelect={spy} />);
        const dropDown = result.find(DropDownList).shallow();

        keyPress(dropDown, "b");
        expect(spy).toHaveBeenCalledWith("bar", "bar");
    });

    it('should trigger select when searching default item', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} defaultItem="select..." onSelect={spy} />);
        const dropDown = result.find(DropDownList).shallow();

        keyPress(dropDown, "s");
        expect(spy).toHaveBeenCalledWith("select...", "select...");
    });

    it('should NOT trigger select when searching but value does not change', () => {
        const spy = jasmine.createSpy('spy');

        result = shallow(<StatefulDropDownList data={primitives} onSelect={spy} />);
        const dropDown = result.find(DropDownList).shallow();

        keyPress(dropDown, "f");
        keyPress(dropDown, "f");
        expect(spy.calls.count()).toEqual(1);
    });
});
