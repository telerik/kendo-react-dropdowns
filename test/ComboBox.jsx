import * as React from 'react';
import { shallow } from 'enzyme';
import List from '../src/List';
import ComboBox from '../src/ComboBox';
import SearchBar from '../src/SearchBar';

describe('ComboBox', () => {
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

        if (text) {
            dataList = data.filter(function(item) {
                return item.text.indexOf(text) > -1;
            });
        } else {
            dataList = data;
        }

        return shallow(<ComboBox data={dataList} />);
    };

    let result;

    it('should render List', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(List).length).toEqual(1);
    });

    it('should render SearchBar', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(SearchBar).length).toEqual(1);
    });
});
