import React from 'react';
import ReactDOM from 'react-dom';
import StatefulDropDownList from '../src/StatefulDropDownList';

const colors = [
    { text: "Blue", value: "#00007f" },
    { text: "Orange", value: "#ffa500" },
    { text: "Green", value: "#007f00" }
];

const sizes = [ 100, 150, 200, 250, 300 ];

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
                <div id="square" style={style}></div>
                <StatefulDropDownList
                    data={colors}
                    onChange={this.handleColorChange}
                    textField="text"
                    value={this.state.color}
                    valueField="value"
                />
                <br />
                <StatefulDropDownList
                    data={sizes}
                    onChange={this.handleSizeChange}
                    value={this.state.size}
                />
                <br />
                <button className="k-button" onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(
    <BasicUsageExample />,
    document.getElementById('app')
);
