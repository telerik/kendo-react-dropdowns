import React from 'react';
import ReactDOM from 'react-dom';
import { DropDownList } from '../src/bundle';

const colors = [
    { text: "Blue", value: "#00007f" },
    { text: "Orange", value: "#ffa500" },
    { text: "Green", value: "#007f00" }
];

const sizes = [ 100, 150, 200, 250, 300 ];

const brands = [ "Sprint", "Cross", "RAM" ];

const models = [
    { text: "HT 1", brand: "RAM", value: "ht-1" },
    { text: "HT 2", brand: "RAM", value: "ht-2" },
    { text: "XC Race", brand: "RAM", value: "xc-race" },
    { text: "AM 1", brand: "RAM", value: "am-1" },
    { text: "Apolon", brand: "Sprint", value: "apolon" },
    { text: "Active", brand: "Sprint", value: "active" },
    { text: "Elite FT", brand: "Sprint", value: "elite" },
    { text: "Avalon", brand: "Cross", value: "avalon" },
    { text: "Fusion", brand: "Cross", value: "fusion" },
    { text: "Grip", brand: "Cross", value: "grip" }
];

const frameSizes = [ 14, 16, 18, 19, 21, 23 ];

class BasicUsageExample extends React.Component {
    state = {
        color: "#00007f",
        size: 100,

        brand: undefined,
        model: undefined,
        frameSize: undefined,

        modelDisabled: true,
        frameSizeDisabled: true
    };

    getModels = (brand) => {
        let result = [];
        if (brand) {
            result = models.filter(function(item) {
                return item.brand.toLowerCase() === brand.toLowerCase();
            });
        } else {
            result = models;
        }

        return result;
    };

    handleColorChange = (value) => {
        this.setState({
            color: value
        });
    };

    handleSizeChange = (value) => {
        this.setState({
            size: value
        });
    };

    handleBrandChange = (value) => {
        this.setState({
            brand: value,
            modelDisabled: false
        });
    };

    handleModelChange = (value) => {
        this.setState({
            model: value,
            frameSizeDisabled: false
        });
    };

    handleFrameSizeChange = (value) => {
        this.setState({
            frameSize: value
        });
    };

    reset = () => {
        this.setState({
            color: "#00007f",
            size: 100
        });
    }

    selectChange = () => {
        console.log("change")
    }

    render() {
        const style = {
            backgroundColor: this.state.color,
            width: this.state.size + "px",
            height: this.state.size + "px"
        };

        const modelsData = this.getModels(this.state.brand);

        return (
            <div className="example">
                <div style={{ float: "left", width: "400px" }}>
                    <div id="square" style={style}></div>
                </div>
                <div style={{ float: "left", width: "300px" }}>
                    <DropDownList
                        data={colors}
                        defaultItem={{ text: "select color", value: null }}
                        onChange={this.handleColorChange}
                        textField="text"
                        value={this.state.color}
                        valueField="value"
                    />
                    <br />
                    <DropDownList
                        data={sizes}
                        defaultItem="-"
                        onChange={this.handleSizeChange}
                        value={this.state.size}
                    />
                    <br />
                    <button className="k-button" onClick={this.reset}>Reset</button>
                </div>
                <hr style={{ width: "100%" }} />
                <br />
                <p>Cascading DropDowns</p>
                <label>Brand: <DropDownList data={brands} onChange={this.handleBrandChange} value={this.state.brand} /></label>
                <label>Model:
                    <DropDownList
                        data={modelsData}
                        disabled={this.state.modelDisabled}
                        filterable
                        onChange={this.handleModelChange}
                        textField="text"
                        value={this.state.model}
                        valueField="value"
                    />
                </label>
                <label>Size: <DropDownList data={frameSizes} disabled={this.state.frameSizeDisabled} onChange={this.handleFrameSizeChange} value={this.state.frameSize} /></label>
                <br />
                <select onChange={this.selectChange}>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                </select>
            </div>
        );
    }
}

ReactDOM.render(
    <BasicUsageExample />,
    document.getElementById('app')
);
