import * as React from 'react';
import ReactDOM from 'react-dom';
import { ComboBox } from '../src/main';

const data = [
    { text: "Albania", value: "Alb" },
    { text: "Andorra", value: "And" },
    { text: "Armenia", value: "Arm" },
    { text: "Austria", value: "Aus" },
    { text: "Azerbaijan", value: "Aze" },
    { text: "Belarus", value: "Bls" },
    { text: "Belgium", value: "Blg" },
    { text: "Bosnia & Herzegovina", value: "Her" },
    { text: "Bulgaria", value: "Bul" },
    { text: "Croatia", value: "Cro" },
    { text: "Cyprus", value: "Cyp" },
    { text: "Czech Republic", value: "Rep" },
    { text: "Denmark", value: "Den" },
    { text: "Estonia", value: "Est" },
    { text: "Finland", value: "Fin" },
    { text: "France", value: "Fra" },
    { text: "Georgia", value: "Geo" },
    { text: "Germany", value: "Ger" },
    { text: "Greece", value: "Gre" },
    { text: "Hungary", value: "Hun" },
    { text: "Iceland", value: "Ice" },
    { text: "Ireland", value: "Ire" },
    { text: "Italy", value: "Ita" },
    { text: "Kosovo", value: "Kos" },
    { text: "Latvia", value: "Lat" },
    { text: "Liechtenstein", value: "Lie" },
    { text: "Lithuania", value: "Lit" },
    { text: "Luxembourg", value: "Lux" },
    { text: "Macedonia", value: "Mac" },
    { text: "Malta", value: "Mal" },
    { text: "Moldova", value: "Mol" },
    { text: "Monaco", value: "Mon" },
    { text: "Netherlands", value: "Net" },
    { text: "Norway", value: "Nor" },
    { text: "Poland", value: "Pol" },
    { text: "Portugal", value: "Por" },
    { text: "Romania", value: "Rom" },
    { text: "Russia", value: "Rus" },
    { text: "San Marino", value: "Mar" },
    { text: "Serbia", value: "Ser" },
    { text: "Slovenia", value: "Slo" },
    { text: "Spain", value: "Spa" },
    { text: "Sweden", value: "Swe" },
    { text: "Switzerland", value: "Swi" },
    { text: "Turkey", value: "Tur" },
    { text: "Ukraine", value: "Ukr" },
    { text: "United Kingdom", value: "Kin" },
    { text: "Vatican City", value: "VC" }
];

class ComboBoxContainer extends React.Component {
    state = {
        value: null,
        data: data,
        filter: null
    };

    handleFilter = (text) => {
        let result = [];
        if (text) {
            result = data.filter(function(item) {
                return item.text.toLowerCase().startsWith(text.toLowerCase());
            });
        } else {
            result = data;
        }

        this.setState({
            data:result,
            filter: text
        });
    };

    handleChange = (value) => {
        this.setState({
            value: value,
            filter: null
        });
    }
    
    resetValue = () => {
        this.setState({
            value: null,
            filter: null,
            data: data
        });
    }

    render() {
        return (
            <div className="example">
                <p>Country: 
                    <span>{this.state.value}</span>
                </p>
                <ComboBox
                    suggest
                    textField="text"
                    valueField="value"
                    placeholder="Select country"
                    data={this.state.data}
                    filter={this.state.filter}
                    onChange={this.handleChange}
                    onFilter={this.handleFilter}
                    value={this.state.value}
                />
                <br/>
                <button onClick={this.resetValue}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(
    <ComboBoxContainer />,
    document.getElementById('app')
);
