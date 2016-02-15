import * as React from 'react';
import ReactDOM from 'react-dom';
//import KendoListItem from '../src/kendo-listitem';
//import KendoList from '../src/kendo-list';
import KendoDropDownList from '../src/kendo-dropdownlist';

const foo = (dataItem) => {
    return dataItem.value + " custom template";
};

const data = [
    { text: "foo1", value: 1 },
    { text: "foo2", value: 2 },
    { text: "foo3", value: 3 },
    { text: "foo4", value: 4 },
    { text: "foo5", value: 5 },
    { text: "foo6", value: 6 }
];

ReactDOM.render(
  <KendoDropDownList data={data} value={1} />,
  document.getElementById('app')
);
