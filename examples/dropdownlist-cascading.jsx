import React from 'react';
import ReactDOM from 'react-dom';
import { DropDownList } from '../src/main';

const locations = [ "Europe", "North America", "Asia" ];

const towns = [
    { name: "Paris", location: "Europe", zipCode: 1 },
    { name: "London", location: "Europe", zipCode: 2 },
    { name: "Barcelona", location: "Europe", zipCode: 3 },
    { name: "Los Angeles", location: "North America", zipCode: 4 },
    { name: "Boston", location: "North America", zipCode: 5 },
    { name: "Ottawa", location: "North America", zipCode: 6 },
    { name: "Beijing", location: "Asia", zipCode: 7 },
    { name: "Hong Kong", location: "Asia", zipCode: 8 }
];


class CascadingDropDownListsExample extends React.Component {
    state = {
        location: null,
        zipCode: null,
        towns: towns,
        hasLocation: false
    };

    getTown = (location) => {
        let result = [];
        if (location) {
            result = towns.filter(function(item) {
                return item.location.toLowerCase() === location.toLowerCase();
            });
        } else {
            result = towns;
        }

        return result;
    };

    locationChange = (newLocation) => {
        const result = this.getTown(newLocation);
        let hasLocation;

        if (newLocation === this.state.location) {
            return;
        }

        if (result.length === towns.length) {
            hasLocation = false;
        } else if (result.length === 0) {
            hasLocation = false;
        } else {
            hasLocation = true;
        }

        this.setState({
            location: newLocation,
            towns: result,
            hasLocation: hasLocation,
            zipCode: null
        });
    }

    handleTownSelect = (zipCode) => {
        this.setState({
            zipCode: zipCode
        });
    }

    render() {
        return (
            <div className="example">
                <p>Cascading DropDowns</p>
                <label>Location: <DropDownList data={locations} defaultItem="Choose location" onChange={this.locationChange} value={this.state.location} /></label>
                <label>Town:
                    <DropDownList
                        data={this.state.towns}
                        defaultItem={{ name: "Choose city", zipCode: null }}
                        disabled={!this.state.hasLocation}
                        onChange={this.handleTownSelect}
                        textField="name"
                        value={this.state.zipCode}
                        valueField="zipCode"
                    />
                </label>
                <p>ZipCode: <span>{this.state.zipCode}</span></p>
            </div>
        );
    }
}

ReactDOM.render(
    <CascadingDropDownListsExample />,
    document.getElementById('app')
);
