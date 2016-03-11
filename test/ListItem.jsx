import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../src/ListItem';

describe('ListItem', () => {
    let result;
    const dataItem = { text: "foo", value: 1 };

    it('should render a li', () => {
        result = shallow(<ListItem dataItem={dataItem} />);
        expect(result.type()).toEqual('li');
    });

    it('should accept custom render function', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<ListItem dataItem={dataItem} renderer={spy} />);
        expect(spy).toHaveBeenCalledWith({ text: 'foo', value: 1 });
    });

    it('should add selected state class if selected prop is true', () => {
        result = shallow(<ListItem dataItem={dataItem} selected />);
        expect(result.hasClass('k-state-selected')).toBe(true);
    });

    it('should not add selected state class if selected prop is false', () => {
        result = shallow(<ListItem dataItem={dataItem} />);
        expect(result.hasClass('k-state-selected')).toBe(false);
    });

    it('should add focused state class if focused prop is true', () => {
        result = shallow(<ListItem dataItem={dataItem} focused />);
        expect(result.hasClass('k-state-focused')).toBe(true);
    });

    it('should not add focused state class if focused prop is false', () => {
        result = shallow(<ListItem dataItem={dataItem} />);
        expect(result.hasClass('k-state-focused')).toBe(false);
    });

    it('should pass dataItem to the click handler', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<ListItem dataItem={dataItem} onClick={spy} />);
        result.simulate('click');
        expect(spy).toHaveBeenCalledWith({ text: 'foo', value: 1 });
    });
});
