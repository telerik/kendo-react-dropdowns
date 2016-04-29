import * as React from 'react';
import { shallow } from 'enzyme';
import { AutoComplete, Stateless } from '../src/main';

describe('AutoComplete', () => {
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

        return shallow(<AutoComplete data={dataList} />);
    };

    let result;

    it('should render List', () => {
        result = shallow(<AutoComplete data={data} />);
        expect(result.find(Stateless.AutoComplete).shallow().find(Stateless.List).length).toEqual(1);
    });

    it('should render SearchBar', () => {
        result = shallow(<AutoComplete data={data} />);
        expect(result.find(Stateless.AutoComplete).shallow().find(Stateless.SearchBar).length).toEqual(1);
    });

    it('should disable the search bar if disabled prop is passed', () => {
        result = shallow(<AutoComplete data={data} disabled />);
        expect(result.find(Stateless.AutoComplete).shallow().find(Stateless.SearchBar).prop('disabled')).toBe(true);
    });
});
