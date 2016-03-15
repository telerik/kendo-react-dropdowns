import * as React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';
import List from '../src/List';
import ListItem from '../src/ListItem';
import DropDownList from '../src/DropDownList/DropDownList';

describe('DropDownList', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

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

    it('should accept index', () => {
        result = shallow(<DropDownList data={data} index={1} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(data[1]);
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

    it('should have null state if the defaultItem is defined as string', () => {
        result = shallow(<DropDownList data={data} defaultItem="select ..." textField="text" valueField="value" />);
        expect(result.state('dataItem')).toEqual(null);
    });

    it('should change state.dataItem when item is clicked', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        const items = result.find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        items.at(1).shallow().simulate('click');
        expect(result.state('dataItem')).toEqual({ text: "bar", value: 2 });
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

    it('should decrement state.focused when key "up" is pressed', () => {
        result = shallow(<DropDownList data={data} textField="text" value={2} valueField="value" />);
        result.simulate('keyDown', { keyCode: keycode.codes.up });

        expect(result.state('focused')).toEqual(0);
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
