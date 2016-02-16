import * as React from 'react';
import { shallow } from 'enzyme';
import KendoListItem from '../src/kendo-listitem';
import KendoList from '../src/kendo-list';
import KendoAutoComplete from '../src/kendo-autocomplete';
import KendoSearchBar from '../src/kendo-searchbar';
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

});

describe('KendoAutoComplete', () => {
    const data = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "asd", value: 3 },
        { text: "dsa", value: 4 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];
    const filterData = (text) => {
        let dataList;

        if(text) {
            dataList = data.filter(function(item, index, array) {
                if(item.text.indexOf(text) > -1) {
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            dataList = data;
        }
        return shallow(<KendoAutoComplete data={dataList} />);
    };
    let result;

    it('should render KendoList', () => {
        result = shallow(<KendoAutoComplete data={data} />);
        expect(result.find(KendoList).length).toEqual(1);
    });

    it('should render KendoSearchBar', () => {
        result = shallow(<KendoAutoComplete data={data} />);
        expect(result.find(KendoSearchBar).length).toEqual(1);
    });

    /* it('should trigger onSearch', () => {
       let spy = jasmine.createSpy('search');
       result = shallow(<KendoAutoComplete data={data} onSearch={spy}/>);
       console.log(result.find(KendoSearchBar), 1);
       result.find(KendoSearchBar).simulate('keypress', {
       which: 97,
       keyCode: 97
       });
       expect(spy).toHaveBeenCalled();
       });
     */
});
