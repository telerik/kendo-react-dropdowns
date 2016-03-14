import * as React from 'react';
import { shallow } from 'enzyme';
import List from '../src/List';
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
    });

    it('should accept index', () => {
        result = shallow(<DropDownList data={data} index={1} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(data[1]);
    });

    it('should select nothing if no value or index', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toBe(null);
    });

    it('should select the defaultItem if no value or index', () => {
        result = shallow(<DropDownList data={data} defaultItem={{ text: "select...", value: -1 }} textField="text" valueField="value" />);
        expect(result.state('dataItem')).toEqual({ text: "select...", value: -1 });
    });

    it('should have null state if the defaultItem is defined as string', () => {
        result = shallow(<DropDownList data={data} defaultItem="select ..." textField="text" valueField="value" />);
        expect(result.state('dataItem')).toEqual(null);
    });
});
