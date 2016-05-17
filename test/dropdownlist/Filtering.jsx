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

    it('should fire the onFilter event on user input', (done) => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <Stateless.DropDownList data={data}
                delay={0}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith("o");
            done();
        }, 0);
    });

    it('should fire the onFilter event with empty string argument when the user clears input value', (done) => {
        const spy = jasmine.createSpy('spy');
        result = shallow(
            <Stateless.DropDownList data={data}
                delay={0}
                filterable
                onFilter={spy}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });
        input.simulate("keyUp", { target: { value: "" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith("");
            done();
        }, 0);
    });

    it('should NOT update selected dataItem on filter', (done) => {
        const filter = jasmine.createSpy('filter');
        const select = jasmine.createSpy('select');
        result = shallow(
            <Stateless.DropDownList data={data}
                delay={0}
                filterable
                onFilter={filter}
                onSelect={select}
                textField="text"
                valueField="value"
            />
        );
        const input = result.find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(select).not.toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should keep selected dataItem after filter', (done) => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('dataItem')).toEqual({ text: "Grey", value: "3" });
            done();
        }, 0);
    });

    it('should focus the first item after filter', (done) => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('focused')).toEqual(0);
            done();
        }, 0);
    });

    it('should NOT select the first item after filter', (done) => {
        result = shallow(<DropDownContainer />).find(DropDownList).shallow();
        const input = result.find(Stateless.DropDownList).shallow().find(Stateless.ListFilter).shallow().find('input');

        input.simulate("keyUp", { target: { value: "o" }, stopPropagation: function() {} });

        setTimeout(() => {
            expect(result.state('selected')).toEqual(null);
            done();
        }, 0);
    });

    //should update popup height when no items are found
});
