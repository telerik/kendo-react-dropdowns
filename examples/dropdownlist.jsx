import * as React from 'react';
import ReactDOM from 'react-dom';
import DropDownList from '../src/DropDownList';

//sample data
const data = [
    { text: "foo", value: 1 },
    { text: "bar", value: 2 },
    { text: "baz", value: 3 },
    { text: "baz", value: 4 },
    { text: "baz", value: 5 },
    { text: "baz", value: 6 },
    { text: "baz", value: 7 },
    { text: "baz", value: 8 },
    { text: "qux", value: 9 }
];

//sample primitive data
const primitives = [ "foo", "bar", "baz" ];

class DropDownContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data,
            value: 2,
            filterable: true,
            onFilter: this.onFilter,
            defaultItem: { text: "select...", value: null },
            textField: "text",
            valueField: "value",
            renderer: this.itemRenderer
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

    itemRenderer = (dataItem) => `renderer: ${dataItem.text}`

    render() {
        return (
            <DropDownList {...this.state} />
        );
    }
}

ReactDOM.render(
    <DropDownContainer />,
    document.getElementById('app')
);
