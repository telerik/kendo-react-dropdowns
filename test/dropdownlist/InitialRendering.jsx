import * as React from 'react';
import { shallow } from 'enzyme';

import * as Helpers from '../Helpers';

import DropDownList from '../../src/DropDownList';

import * as Stateless from '../../src/stateless/main';

describe('DropDownList initialization', () => {
    const data = [
        { text: "foo", value: 1 },
        { text: "bar", value: 2 },
        { text: "baz", value: 3 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    let result;

    it('should render stateless DropDownList', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        expect(result.find(Stateless.DropDownList).length).toEqual(1);
    });

    it('should accept value', () => {
        result = shallow(<DropDownList data={data} textField="text" value={3} valueField="value" />);
        Helpers.compareState(result.state(), {
            dataItem: data[2],
            focused: 2,
            selected: 2
        });
    });

    it('should accept value (primitives)', () => {
        result = shallow(<DropDownList data={primitives} value="baz" />);
        Helpers.compareState(result.state(), {
            dataItem: "baz",
            focused: 2,
            selected: 2
        });
    });

    it('should select nothing if no value is provided', () => {
        result = shallow(<DropDownList data={data} textField="text" valueField="value" />);
        Helpers.compareState(result.state(), {
            dataItem: undefined,
            focused: -1,
            selected: -1
        });
    });

    it('should select nothing if no value is provided (primitives)', () => {
        result = shallow(<DropDownList data={primitives} />);
        Helpers.compareState(result.state(), {
            dataItem: undefined,
            focused: -1,
            selected: -1
        });
    });

    it('should select the defaultItem if no value is provided', () => {
        result = shallow(<DropDownList data={data} defaultItem={{ text: "select...", value: -1 }} textField="text" valueField="value" />);
        Helpers.compareState(result.state(), {
            dataItem: { text: "select...", value: -1 },
            focused: -1,
            selected: -1
        });
    });

    it('should select the defaultItem if no value is provided (primitives)', () => {
        result = shallow(<DropDownList data={primitives} defaultItem="select..." />);
        Helpers.compareState(result.state(), {
            dataItem: "select...",
            focused: -1,
            selected: -1
        });
    });

    it('should accept className', () => {
        result = shallow(<DropDownList className="foo" data={data} textField="text" valueField="value" />);
        expect(result.find(Stateless.DropDownList).hasClass('foo')).toEqual(true);
    });
});
