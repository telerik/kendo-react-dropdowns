import * as React from 'react';
import ReactDOM from 'react-dom';
import DropDownList from '../src/DropDownList';

//sample data
const data = [
    { text: "foo", value: 1 },
    { text: "bar", value: 2 },
    { text: "baz", value: 3 },
    { text: "qux", value: 4 },
    { text: "test1", value: 10 },
    { text: "test2", value: 11 },
    { text: "test3", value: 12 },
    { text: "test4", value: 13 }
];

//sample primitive data
const primitives = [ "foo", "bar", "baz" ];

class DropDownContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data,
            value: 1,
            onFilter: this.onFilter,
            onChange: this.onChange,
            defaultItem: { text: "select...", value: null },
            textField: "text",
            valueField: "value"
            /*
            renderer: this.itemRenderer
            */
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

    onChange = (dataItem) => {
        console.log(dataItem);
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
