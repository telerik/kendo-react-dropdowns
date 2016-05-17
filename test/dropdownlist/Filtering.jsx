import * as React from 'react';
import { shallow } from 'enzyme';

import * as Helpers from '../Helpers';
import DropDownList from '../../src/DropDownList';
import * as Stateless from '../../src/stateless/main';

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
                delay: 0,
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
            <Stateless.DropDownList data={data}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const listFilter = result.find(Stateless.ListFilter);
        listFilter.prop('onChange')("o");

        expect(spy).toHaveBeenCalledWith("o");
    });

    it('should fire the onFilter event with empty string argument when the user clears input value', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <Stateless.DropDownList data={data}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const listFilter = result.find(Stateless.ListFilter);

        listFilter.prop('onChange')("o");
        listFilter.prop('onChange')("");

        expect(spy).toHaveBeenCalledWith("");
    });

    it('should NOT update selected dataItem on filter', () => {
        const filter = jasmine.createSpy('filter');
        const select = jasmine.createSpy('select');
        result = shallow(
            <Stateless.DropDownList data={data}
                filterable
                onFilter={filter}
                onSelect={select}
                textField="text"
                valueField="value"
            />
        );
        const listFilter = result.find(Stateless.ListFilter);

        listFilter.prop('onChange')("o");

        expect(select).not.toHaveBeenCalled();
    });

    it('should keep selected dataItem after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const listFilter = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter);

        listFilter.prop('onChange')("o");

        expect(result.state('dataItem')).toEqual({ text: "Grey", value: "3" });
    });

    it('should focus the first item after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const listFilter = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter);

        listFilter.prop('onChange')("o");
        expect(result.state('focused')).toEqual(0);
    });

    it('should NOT select the first item after filter', () => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const listFilter = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter);

        listFilter.prop('onChange')("o");
        expect(result.state('selected')).toEqual(null);
    });

    //should update popup height when no items are found
});
