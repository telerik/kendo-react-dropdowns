import React from 'react';
import ReactDOM from 'react-dom';
import StatefulDropDownList from '../src/StatefulDropDownList';

//sample data
const data = [
    { text: "foo", value: 1 },
    { text: "bar", value: 2 },
    { text: "baz", value: 3 },
    { text: "qux", value: 4 }
];

function mockDataProvider(filter) {
    let result;

    if (filter) {
        result = data.filter(function(item) {
            return item.text.toLowerCase().startsWith(filter.toLowerCase());
        });
    } else {
        result = data;
    }

    return result;
}

class DropDownTest extends React.Component {
    state = {
        data: mockDataProvider()
    };

    handleFilter = (text) => {
        this.setState({ data: mockDataProvider(text) });
    };

    handleChange = (value) => {
        console.log(value);
    };

    itemRenderer = (dataItem) => `.:: ${dataItem.text} ::.`;
    valueRenderer = (dataItem) => `== ${dataItem.value} ==`;

    render() {
        return (
            <StatefulDropDownList
                data={this.state.data}
                defaultItem={{ text: "select...", value: null }}
                delay={700}
                filterable
                height={400}
                itemRenderer={this.itemRenderer}
                onChange={this.handleChange}
                onFilter={this.handleFilter}
                textField="text"
                value={2}
                valueField="value"
                valueRenderer={this.valueRenderer}
            />
        );
    }
}

ReactDOM.render(
    <DropDownTest />,
    document.getElementById('app')
);
