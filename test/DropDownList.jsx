import * as React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';

import { keyPress } from './Helpers';

import List from '../src/List';
import ListItem from '../src/ListItem';
import ListFilter from '../src/ListFilter';
import DropDownList from '../src/DropDownList';

describe('DropDownList', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    let result;

    it('should render List', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        expect(result.find(List).length).toEqual(1);
    });

    it('should accept value', () => {
        result = shallow(<DropDownList data={data} textField="text" value={3} valueField="value" />);
        expect(result.state('dataItem')).toBe(data[2]);
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
    });

    it('should accept value (primitives)', () => {
        result = shallow(<DropDownList data={primitives} value="baz" />);
        expect(result.state('dataItem')).toEqual("baz");
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
    });

    it('should accept index', () => {
        result = shallow(<DropDownList data={data} index={1} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(data[1]);
        expect(result.state('focused')).toEqual(1);
        expect(result.state('selected')).toEqual(1);
    });

    it('should accept index (primitives)', () => {
        result = shallow(<DropDownList data={primitives} index={1} />);
        expect(result.state('dataItem')).toEqual("bar");
        expect(result.state('focused')).toEqual(1);
        expect(result.state('selected')).toEqual(1);
    });

    it('should select nothing if no value or index', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(null);
    });

    it('should select the defaultItem if no value or index', () => {
        result = shallow(<DropDownList data={data} defaultItem={{ text: "select...", value: -1 }} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toEqual({ text: "select...", value: -1 });
        expect(result.state('focused')).toEqual(-1);
        expect(result.state('selected')).toEqual(-1);
    });

    it('should change state.dataItem when item is clicked', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const items = result.find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
    });

    it('should change state.dataItem when item is clicked (primitives)', () => {
        result = shallow(<DropDownList data={primitives} />);
        const items = result.find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual("bar");
    });

    it('should change state.selected when item is clicked', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const items = result.find(List).shallow().find(ListItem);

        expect(result.state('selected')).toEqual(null);
        items.at(1).shallow().simulate('click');
        expect(result.state('selected')).toEqual(1);
    });

    it('should change state.focused when item is clicked', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const items = result.find(List).shallow().find(ListItem);

        expect(result.state('focused')).toEqual(null);
        items.at(1).shallow().simulate('click');
        expect(result.state('focused')).toEqual(1);
    });

    it('should NOT change state of disabled component on click', () => {
        result = shallow(<DropDownList data={data} disabled textField="text" valueField="value" />);
        const items = result.find(List).shallow().find(ListItem);

        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual(null);
        expect(result.state('focused')).toEqual(null);
        expect(result.state('selected')).toEqual(null);
    });
});

describe('DropDownList keyboard navigation', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    let result;

    it('should increment state.focused when key "down" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={1} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.down });

        expect(result.state('focused')).toEqual(1);
    });

    it('should increment state.focused when key "right" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={1} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.down });

        expect(result.state('focused')).toEqual(1);
    });

    it('should decrement state.focused when key "up" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={2} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.up });

        expect(result.state('focused')).toEqual(0);
    });

    it('should decrement state.focused when key "left" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={2} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.up });

        expect(result.state('focused')).toEqual(0);
    });

    it('should focus first item when key "home" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={2} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.home });

        expect(result.state('focused')).toEqual(0);
    });

    it('should focus the default item when key "home" is pressed', () => {
        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                textField="text"
                value={2}
                valueField="value"
            />
        );
        result.simulate('keyDown', { keyCode: keycode.codes.home });

        expect(result.state('focused')).toEqual(-1);
    });

    it('should focus last item when key "home" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.end });

        expect(result.state('focused')).toEqual(data.length - 1);
    });

    it('should be able to focus the defaultItem', () => {
        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                textField="text"
                value={3}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.down });
        expect(result.state('focused')).toEqual(-1);
        result.simulate('keyDown', { keyCode: keycode.codes.down });
        expect(result.state('focused')).toEqual(0);
        result.simulate('keyDown', { keyCode: keycode.codes.up });
        expect(result.state('focused')).toEqual(-1);
    });

    it('should remove the deselected the current listItem when defaultItem is focused', () => {
        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                textField="text"
                value={1}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.up });
        const item = result.find(List).shallow().find(ListItem).at(0);

        expect(item.hasClass('k-state-selected')).toBe(false);
        expect(item.hasClass('k-state-focused')).toBe(false);
    });

    it('should select the focused item on enter', () => {
        result = shallow(
            <DropDownList
                data={data}
                textField="text"
                value={3}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.up });
        result.simulate('keyDown', { keyCode: keycode.codes.enter });
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
    });

    it('should select the focused default item on enter', () => {
        result = shallow(
            <DropDownList
                data={data}
                defaultItem={{ text: "select...", value: null }}
                textField="text"
                value={1}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.up });
        result.simulate('keyDown', { keyCode: keycode.codes.enter });
        expect(result.state('dataItem')).toEqual({ text: "select...", value: null });
    });

    it('should be able to move the focus from last to first item and vice versa', () => {
        result = shallow(
            <DropDownList
                data={data}
                textField="text"
                value={3}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.down });
        expect(result.state('focused')).toEqual(0);

        result.simulate('keyDown', { keyCode: keycode.codes.up });
        expect(result.state('focused')).toEqual(2);
    });

    it('should NOT focus if component is disabled', () => {
        result = shallow(
            <DropDownList
                data={data}
                disabled
                textField="text"
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.down });
        expect(result.state('focused')).toEqual(null);
        result.simulate('keyDown', { keyCode: keycode.codes.up });
        expect(result.state('focused')).toEqual(null);
    });

    it('should NOT select on enter if disabled', () => {
        result = shallow(
            <DropDownList
                data={data}
                disabled
                textField="text"
                value={3}
                valueField="value"
            />
        );

        result.simulate('keyDown', { keyCode: keycode.codes.up });
        result.simulate('keyDown', { keyCode: keycode.codes.enter });
        expect(result.state('dataItem')).toEqual({ text: "baz", value: 3 });
    });
});

describe('DropDownList search', () => {
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 }
    ];

    let result;

    it('should select first match', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        keyPress(result, "b");

        expect(result.state()).toEqual({
            dataItem: { text: "Bar", value: 2 },
            focused: 1,
            selected: 1
        });
    });

    it('should search select item if text is number', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 10, value: 2 }
        ];

        result = shallow(<DropDownList data={myData} textField="text" valueField="value" />);
        keyPress(result, 1);

        expect(result.state()).toEqual({
            dataItem: { text: 10, value: 2 },
            focused: 1,
            selected: 1
        });
    });

    it('should search text if text is 0', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 0, value: 2 }
        ];

        result = shallow(<DropDownList data={myData} textField="text" valueField="value" />);
        keyPress(result, 0);

        expect(result.state()).toEqual({
            dataItem: { text: 0, value: 2 },
            focused: 1,
            selected: 1
        });
    });

    it('should support case sensitive search', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: "Bar", value: 2 },
            { text: "baz", value: 3 }
        ];

        result = shallow(<DropDownList data={myData} ignoreCase={false} textField="text" valueField="value" />);
        keyPress(result, "b");

        expect(result.state()).toEqual({
            dataItem: { text: "baz", value: 3 },
            focused: 2,
            selected: 2
        });
    });

    it('should select next item if it starts with the same characeter', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        keyPress(result, "b");
        keyPress(result, "b");

        expect(result.state()).toEqual({
            dataItem: { text: "Baz", value: 3 },
            focused: 2,
            selected: 2
        });
    });

    it('should select specific item if typed matches', () => {
        const myData = [
            { text: "Foo1", value: 1 },
            { text: "Foo2", value: 2 },
            { text: "Foo3", value: 3 }
        ];

        result = shallow(<DropDownList data={myData} textField="text" valueField="value" />);
        keyPress(result, "f");
        keyPress(result, "o");
        keyPress(result, "o");
        keyPress(result, "2");

        expect(result.state()).toEqual({
            dataItem: { text: "Foo2", value: 2 },
            focused: 1,
            selected: 1
        });
    });

    it('should select a specific item after loop', () => {
        const primitives = [ "tt1", "t", "ttt", "tt3", "tt", "tttt" ];

        result = shallow(<DropDownList data={primitives} />);
        keyPress(result, "t");
        keyPress(result, "t");
        keyPress(result, "1");

        expect(result.state()).toEqual({
            dataItem: "tt1",
            focused: 0,
            selected: 0
        });
    });

    it('should stays on the same item if changed but still in loop', () => {
        const primitives = [ "text1", "text2", "text3" ];

        result = shallow(<DropDownList data={primitives} defaultItem="select..." />);

        keyPress(result, "t"); //select text2
        keyPress(result, "t"); //select text3
        keyPress(result, "e");
        keyPress(result, "x");
        keyPress(result, "t");
        keyPress(result, "2"); //resulting text is text2

        expect(result.state()).toEqual({
            dataItem: "text2",
            focused: 1,
            selected: 1
        });
    });

    it('should select next item if it starts with same characeter (default item)', () => {
        const primitives = [ "text1", "text2" ];

        result = shallow(<DropDownList data={primitives} defaultItem="select..." />);

        keyPress(result, "t");
        keyPress(result, "t");

        expect(result.state()).toEqual({
            dataItem: "text2",
            focused: 1,
            selected: 1
        });
    });

    it('should be able to find and select the defaultItem', () => {
        const primitives = [ "text1", "text2" ];

        result = shallow(
            <DropDownList
                data={primitives}
                defaultItem="select..."
                value={1}
            />
        );

        keyPress(result, "s");

        expect(result.state()).toEqual({
            dataItem: "select...",
            focused: -1,
            selected: -1
        });
    });

    it('should keep selection if typed text is same as current data item', () => {
        const primitives = [ "test", "500.122", "500.123" ];

        result = shallow(<DropDownList data={primitives} />);

        keyPress(result, "5");

        expect(result.state()).toEqual({
            dataItem: "500.122",
            focused: 1,
            selected: 1
        });

        keyPress(result, "0");
        keyPress(result, "0");

        expect(result.state()).toEqual({
            dataItem: "500.122",
            focused: 1,
            selected: 1
        });
    });

    it('should keep selection if typed text differs', () => {
        const primitives = [ "test", "500.122", "500.123" ];

        result = shallow(<DropDownList data={primitives} />);

        keyPress(result, "5");

        expect(result.state()).toEqual({
            dataItem: "500.122",
            focused: 1,
            selected: 1
        });

        keyPress(result, "0");
        keyPress(result, "0");
        keyPress(result, "0");

        expect(result.state()).toEqual({
            dataItem: "500.122",
            focused: 1,
            selected: 1
        });
    });

    //it('should trigger change when searching') line 184

    it('should honor ignoreCase option', () => {
        const primitives = [ "text1", "Text2", "Text3" ];

        result = shallow(<DropDownList data={primitives} index={1} />);

        keyPress(result, "t");
        keyPress(result, "t");

        expect(result.state()).toEqual({
            dataItem: "text1",
            focused: 0,
            selected: 0
        });
    });

    it('should NOT move to next item if typing same letters', () => {
        const primitives = [ "Bill 1", "Bill 2", "Label" ];

        result = shallow(<DropDownList data={primitives} index={1} />);

        keyPress(result, "b");
        keyPress(result, "i");
        keyPress(result, "l");
        keyPress(result, "l");

        expect(result.state()).toEqual({
            dataItem: "Bill 1",
            focused: 0,
            selected: 0
        });
    });

    it('should support space', () => {
        const primitives = [ "Bill 1", "Bill 2", "Bill 3" ];

        result = shallow(<DropDownList data={primitives} />);

        keyPress(result, "b");
        keyPress(result, "i");
        keyPress(result, "l");
        keyPress(result, "l");
        keyPress(result, " ");
        keyPress(result, "2");

        expect(result.state()).toEqual({
            dataItem: "Bill 2",
            focused: 1,
            selected: 1
        });
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
                <DropDownList {...this.state} />
            );
        }
    }

    let result;

    it('should fire the onFilter event on user input', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList data={data}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });

        expect(spy).toHaveBeenCalledWith("o");
    });

    it('should fire the onFilter event with empty string argument when the user clears input value', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList data={data}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });
        input.simulate("change", { target: { value: "" } });

        expect(spy).toHaveBeenCalledWith("");
    });

    it('should NOT update selected dataItem on filter', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <DropDownList data={data}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });
        expect(result.state('dataItem')).toEqual(null);
    });

    it('should keep selected dataItem after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });
        expect(result.state('dataItem')).toEqual({ text: "Grey", value: "3" });
    });

    it('should focus the first item after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });
        expect(result.state('focused')).toEqual(0);
    });

    it('should NOT select the first item after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(ListFilter).shallow().find('input');

        input.simulate("change", { target: { value: "o" } });
        expect(result.state('selected')).toEqual(null);
    });

    //should update popup height when no items are found

});
