import * as React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../src/AutoComplete';

const data = [
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Belarus",
    "Belgium",
    "Bosnia & Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Norway"
];

const foo = (text) => {
    let dataList;

    if (text) {
        dataList = data.filter(function(item) {
            return item.toLowerCase().startsWith(text.toLowerCase());
        });
    } else {
        dataList = data;
    }
    render(dataList);
};

const onChange = (e) => {
    console.log("change event triggered: ", e);
};

const render = (data) => {
    ReactDOM.render(
        <div>
            {/*
            <p>suggest: false, separator: false</p>
            <AutoComplete
                data={data}
                onSearch={foo}
                placeholder="awesome autocomplete!"
                valueField="text"
            />
            <p>suggest: false, separator: true</p>
            <AutoComplete
                data={data}
                onSearch={foo}
                placeholder="awesome autocomplete!"
                suggest
                valueField="text"
                separator=", "
            />
            <p>suggest: true, separator: true</p>
            <AutoComplete
                data={data}
                onSearch={foo}
                placeholder="awesome autocomplete!"
                separator=", "
                suggest
                valueField="text"
            />

            */}
            <p>suggest: true, separator: false</p>
            <AutoComplete
                data={data}
                onChange={onChange}
                onFilter={foo}
                placeholder="awesome autocomplete!"
                separator=", "
                suggest
            />
        </div>,
        document.getElementById('app')
    );
};

foo();
