import * as React from 'react';
import ReactDOM from 'react-dom';
//import KendoListItem from '../src/kendo-listitem';
import KendoList from '../src/kendo-list';

const foo = (dataItem) => {
    return dataItem.value;
};

const data = [ { text: "foo1", value: 1 }, { text: "foo2", value: 2 } ];

ReactDOM.render(
  <KendoList data={data} selectedIndex={1}/>,
  document.getElementById('app')
);
