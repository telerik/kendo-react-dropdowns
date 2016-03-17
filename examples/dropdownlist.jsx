import * as React from 'react';
import ReactDOM from 'react-dom';
import DropDownList from '../src/DropDownList';

const data = [
    { text: "foo", value: 1 },
    { text: "bar", value: 2 },
    { text: "baz", value: 3 },
    { text: "qux", value: 4 }
];

const foo = (text) => {
    let dataList;

    if (text) {
        dataList = data.filter(function(item) {
            return item.text.toLowerCase().startsWith(text.toLowerCase());
        });
    } else {
        dataList = data;
    }
    render(dataList);
};

const renderer = (dataItem) => `foo ${dataItem.text} bar`;

const render = (data) => {
    ReactDOM.render(
        <div>
            <DropDownList data={data} textField="text" value={1} valueField="value" />
        </div>,
        document.getElementById('app')
    );
};

foo();
