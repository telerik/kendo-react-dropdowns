import * as React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';

import * as Helpers from '../Helpers';

import { DropDownList } from '../../src/stateless/main';

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
                onNavigate={spy}
                selected={data.indexOf(dataItem)}
                textField="text"
                valueField="value"
            />
        );
    }

    it('should fire onNavigate with next item when key "down" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        Helpers.keyDown(result, keycode.codes.down);
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should fire onNavigate with next item when key "right" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        Helpers.keyDown(result, keycode.codes.right);
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should fire onNavigate with previous item when key "up" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        Helpers.keyDown(result, keycode.codes.up);
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onNavigate with previous item when key "left" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        Helpers.keyDown(result, keycode.codes.left);
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onNavigate with first item when key "home" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        Helpers.keyDown(result, keycode.codes.home);
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should fire onNavigate with defaultItem when key "home" is pressed', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy, defaultItem);

        Helpers.keyDown(result, keycode.codes.home);
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should fire onNavigate with last item when key "end" is pressed', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[1], spy);

        Helpers.keyDown(result, keycode.codes.end);
        expect(spy).toHaveBeenCalledWith(data[2]);
    });

    it('should be able to focus the defaultItem (first > default)', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, defaultItem);

        Helpers.keyDown(result, keycode.codes.up);
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should select the focused item on enter', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy);

        Helpers.keyDown(result, keycode.codes.up);
        Helpers.keyDown(result, keycode.codes.enter);
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should select the focused default item on enter', () => {
        const defaultItem = { text: "select...", value: null };
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, defaultItem);

        Helpers.keyDown(result, keycode.codes.up);
        Helpers.keyDown(result, keycode.codes.enter);
        expect(spy).toHaveBeenCalledWith(defaultItem);
    });

    it('should NOT be able to move the focus from last to first', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy);

        Helpers.keyDown(result, keycode.codes.down);
        expect(spy).toHaveBeenCalledWith(data[2]);
    });

    it('should NOT be able to move the focus from first to last', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy);

        Helpers.keyDown(result, keycode.codes.up);
        expect(spy).toHaveBeenCalledWith(data[0]);
    });

    it('should NOT focus if component is disabled', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[0], spy, undefined, true);

        Helpers.keyDown(result, keycode.codes.down);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT select on enter if disabled', () => {
        const spy = jasmine.createSpy('spy');
        result = create(data[2], spy, undefined, true);

        Helpers.keyDown(result, keycode.codes.up);
        Helpers.keyDown(result, keycode.codes.enter);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should fire onToggle on alt + down', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={data} onToggle={spy} textField="text" valueField="value" />);

        Helpers.keyDown(result, keycode.codes.down, true);
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

        Helpers.keyDown(result, keycode.codes.down, true);
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

        Helpers.keyDown(result, keycode.codes.up, true);
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

        Helpers.keyDown(result, keycode.codes.esc);
        expect(spy).toHaveBeenCalledWith(false);
    });

    it('should fire onChange on tab', () => {
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

        Helpers.keyDown(result, keycode.codes.tab);
        expect(spy).toHaveBeenCalled();
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
