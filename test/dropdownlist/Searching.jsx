import * as React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';

import * as Helpers from '../Helpers';

import { DropDownList } from '../../src/stateless/main';

describe('DropDownList search', () => {
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 }
    ];

    let result;

    function statefulBuilder(data) {
        const stateful = {
            select: (dataItem) => {
                result.setProps({
                    dataItem: dataItem,
                    selected: data.indexOf(dataItem),
                    focused: data.indexOf(dataItem)
                });
            }
        };

        spyOn(stateful, 'select').and.callThrough();

        return stateful;
    }

    it('should select first match', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<DropDownList data={data} onNavigate={spy} textField="text" valueField="value" />);

        Helpers.keyPress(result, "b");
        expect(spy).toHaveBeenCalledWith(data[1]);
    });

    it('should search select item if text is number', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 10, value: 2 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={myData} onNavigate={spy} textField="text" valueField="value" />);
        Helpers.keyPress(result, 1);

        expect(spy).toHaveBeenCalledWith(myData[1]);
    });

    it('should search text if text is 0', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: 0, value: 2 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(<DropDownList data={myData} onNavigate={spy} textField="text" valueField="value" />);
        Helpers.keyPress(result, 0);

        expect(spy).toHaveBeenCalledWith(myData[1]);
    });

    it('should support case sensitive search', () => {
        const myData = [
            { text: "Foo", value: 1 },
            { text: "Bar", value: 2 },
            { text: "baz", value: 3 }
        ];
        const spy = jasmine.createSpy('spy');

        result = shallow(
            <DropDownList
                data={myData}
                ignoreCase={false}
                onNavigate={spy}
                textField="text"
                valueField="value"
            />
        );

        Helpers.keyPress(result, "b");
        expect(spy).toHaveBeenCalledWith(myData[2]);
    });

    it('should select next item if it starts with the same character', () => {
        const stateful = statefulBuilder(data);

        result = shallow(<DropDownList data={data} onNavigate={stateful.select} textField="text" valueField="value" />);
        Helpers.keyPress(result, "b");
        Helpers.keyPress(result, "b");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual(data[2]);
    });

    it('should select specific item if typed matches', () => {
        const myData = [
            { text: "Foo1", value: 1 },
            { text: "Foo2", value: 2 },
            { text: "Foo3", value: 3 }
        ];
        const stateful = statefulBuilder(myData);

        result = shallow(<DropDownList data={myData} onNavigate={stateful.select} textField="text" valueField="value" />);

        Helpers.keyPress(result, "f");
        Helpers.keyPress(result, "o");
        Helpers.keyPress(result, "o");
        Helpers.keyPress(result, "2");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual(myData[1]);
    });

    it('should select a specific item after loop', () => {
        const primitives = [ "tt1", "t", "ttt", "tt3", "tt", "tttt" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onNavigate={stateful.select} />);

        Helpers.keyPress(result, "t");
        Helpers.keyPress(result, "t");
        Helpers.keyPress(result, "1");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual(primitives[0]);
    });

    it('should stays on the same item if changed but still in loop', () => {
        const primitives = [ "text1", "text2", "text3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} defaultItem="select..." onNavigate={stateful.select} />);

        Helpers.keyPress(result, "t"); //select text2
        Helpers.keyPress(result, "t"); //select text3
        Helpers.keyPress(result, "e");
        Helpers.keyPress(result, "x");
        Helpers.keyPress(result, "t");
        Helpers.keyPress(result, "2"); //resulting text is text2

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("text2");
    });

    it('should select next item if it starts with same characeter (default item)', () => {
        const primitives = [ "text1", "text2" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} defaultItem="select..." onNavigate={stateful.select} />);

        Helpers.keyPress(result, "t");
        Helpers.keyPress(result, "t");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("text2");
    });

    it('should be able to find and select the defaultItem', () => {
        const primitives = [ "text1", "text2" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(
            <DropDownList
                data={primitives}
                dataItem="text2"
                defaultItem="select..."
                onNavigate={stateful.select}
            />
        );

        Helpers.keyPress(result, "s");

        expect(stateful.select).toHaveBeenCalledWith("select...");
    });

    it('should keep selection if typed text is same as current data item', () => {
        const primitives = [ "test", "500.122", "500.123" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onNavigate={stateful.select} />);

        Helpers.keyPress(result, "5");

        expect(stateful.select).toHaveBeenCalledWith("500.122");

        Helpers.keyPress(result, "0");
        Helpers.keyPress(result, "0");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("500.122");
    });

    it('should keep selection if typed text differs', () => {
        const primitives = [ "test", "500.122", "500.123" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onNavigate={stateful.select} />);

        Helpers.keyPress(result, "5");

        expect(stateful.select).toHaveBeenCalledWith("500.122");

        Helpers.keyPress(result, "0");
        Helpers.keyPress(result, "0");
        Helpers.keyPress(result, "0");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("500.122");
    });

    it('should honor ignoreCase option', () => {
        const primitives = [ "text1", "Text2", "Text3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} dataItem="Text2" ignoreCase={false} onNavigate={stateful.select} />);

        Helpers.keyPress(result, "t");
        Helpers.keyPress(result, "t");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("text1");
    });

    it('should NOT move to next item if typing same letters', () => {
        const primitives = [ "Bill 1", "Bill 2", "Label" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} dataItem="Bill 1" onNavigate={stateful.select} />);

        Helpers.keyPress(result, "b");
        Helpers.keyPress(result, "i");
        Helpers.keyPress(result, "l");
        Helpers.keyPress(result, "l");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("Bill 2");
    });

    it('should support space', () => {
        const primitives = [ "Bill 1", "Bill 2", "Bill 3" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} onNavigate={stateful.select} />);

        Helpers.keyPress(result, "b");
        Helpers.keyPress(result, "i");
        Helpers.keyPress(result, "l");
        Helpers.keyPress(result, "l");
        Helpers.keyPress(result, " ");
        Helpers.keyPress(result, "2");

        expect(Helpers.lastCallArgs(stateful.select)).toEqual("Bill 2");
    });

    it('should NOT search if filterable', () => {
        const primitives = [ "foo", "bar", "baz" ];
        const stateful = statefulBuilder(primitives);

        result = shallow(<DropDownList data={primitives} filterable onNavigate={stateful.select} />);

        Helpers.keyPress(result, "b");

        expect(stateful.select).not.toHaveBeenCalled();
    });
});
