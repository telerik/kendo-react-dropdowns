import React from 'react';
import ReactDOM from 'react-dom';
import { DropDownList } from '../src/main';

const colors = [
    { text: "Blue", value: "#00007f" },
    { text: "Orange", value: "#ffa500" },
    { text: "Green", value: "#007f00" }
];

const sizes = [ 100, 110, 120, 130, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 300 ];

class BasicUsageExample extends React.Component {
    state = {
        color: "#00007f",
        size: 100
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

    reset = () => {
        this.setState({
            color: "#00007f",
            size: 100
        });
    }

    render() {
        const style = {
            backgroundColor: this.state.color,
            width: this.state.size + "px",
            height: this.state.size + "px"
        };

        return (
            <div className="example">
                <div style={{ width: "300px" }}>
                    <span>Color:</span>
                    <DropDownList
                        data={colors}
                        defaultItem={{ text: "select color", value: null }}
                        onChange={this.handleColorChange}
                        textField="text"
                        value={this.state.color}
                        valueField="value"
                    />
                </div>
                <div style={{ width: "300px" }}>
                    <span>Size:</span>
                    <DropDownList
                        data={sizes}
                        defaultItem="Select size"
                        height={250}
                        onChange={this.handleSizeChange}
                        value={this.state.size}
                    />
                </div>
                <div>
                    <button className="k-button" onClick={this.reset}>Reset</button>
                </div>
                <div style={{ margin: "20px auto", height: 340 }}>
                    <div id="square" style={style}></div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <BasicUsageExample />,
    document.getElementById('app')
);
