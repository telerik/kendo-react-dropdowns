import React from 'react';
import ReactDOM from 'react-dom';
import { DropDownList } from '../src/main';

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
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
    ];

    class DropDownListContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: null,
                data: data
            };
        }

        onSelect = (value) => {
            console.log("select", value)
        }

        onChange = (value) => {
            this.setState({
                value: value,
                data: data
            });
        }

        onFilter = (text) => {
            let result;

            if (text) {
                result = data.filter(function(item) {
                    return item.toLowerCase().startsWith(text.toLowerCase());
                });
            } else {
                result = data;
            }

            this.setState({
                data: result
            });
        }

        render() {
            const { data, value } = this.state;

            return (
                <div>
                    <DropDownList
                        data={data}
                        filterable
                        onChange={this.onChange}
                        onFilter={this.onFilter}
                        onSelect={this.onSelect}
                        value={value}
                    />
                    <span>Value: <span style={{ color: "#f00" }}>{value}</span></span>
                </div>
            );
        }
    }

    ReactDOM.render(
        <DropDownListContainer />,
        document.getElementById('app')
    );
