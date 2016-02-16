import * as React from 'react';
import ReactDOM from 'react-dom';
//import KendoListItem from '../src/kendo-listitem';
//import KendoList from '../src/kendo-list';
import KendoAutoComplete from '../src/kendo-autocomplete';

const data = [
    { text: "foo1", value: 1 },
    { text: "foo2", value: 2 },
    { text: "asd", value: 3 },
    { text: "dsa", value: 4 },
    { text: "foo5", value: 5 },
    { text: "foo6", value: 6 }
];
const foo = (text) => {
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
    render(dataList);
};


const render = (data) => {
    ReactDOM.render(
        <KendoAutoComplete separator=", " textField="text" onSearch={foo} data={data} />,
        document.getElementById('app')
    );
}

foo();
