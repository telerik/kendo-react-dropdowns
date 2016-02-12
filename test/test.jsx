import * as React from 'react';
import { shallow } from 'enzyme';
import KendoListItem from '../src/kendo-listitem';
import KendoList from '../src/kendo-list';
//import KendoList from '../src/kendo-list';

describe('KendoListItem', () => {
    let result;
    let dataItem = { text: "foo", value: 1 };
    let clickHandler = function(dataItem) {
        expect(dataItem).not.toBeUndefined();
        expect(dataItem.value).toEqual(1);
    };
    let renderer = function(dataItem) {
        return `${dataItem.text}bar`;
    };

    it('should render a li', () => {
        result = shallow(<KendoListItem dataItem={dataItem} />);
        expect(result.type()).toEqual('li');
    });

    it('should accept custom render function', () => {
        result = shallow(<KendoListItem dataItem={dataItem} renderer={renderer} />);
        expect(result.text()).toEqual('foobar');
    });

    it('should add selected state class if selected prop is true', () => {
        result = shallow(<KendoListItem dataItem={dataItem} selected />);
        expect(result.hasClass('k-state-selected')).toBe(true);
    });

    it('should not add selected state class if selected prop is false', () => {
        result = shallow(<KendoListItem dataItem={dataItem} />);
        expect(result.hasClass('k-state-selected')).toBe(false);
    });

    it('should pass dataItem to the click handler', () => {
        result = shallow(<KendoListItem dataItem={dataItem} onClick={clickHandler} />);
        result.simulate('click');
    });
});

describe('KendoList', () => {
    let result;
    let data = [ { text: "foo", value: 1 }, { text: "bar", value: 2 } ];

    it('should render a ul', () => {
        result = shallow(<KendoList data={data} />);
        expect(result.type()).toEqual('ul');
    });

    it('should render KendoListItems', () => {
        result = shallow(<KendoList data={data} />);
        expect(result.find(KendoListItem).length).toEqual(2);
    });

    it('should have a value state', () => {
        result = shallow(<KendoList data={data} value={1} />);
        expect(result.state("value")).toEqual(1);
    });
});
