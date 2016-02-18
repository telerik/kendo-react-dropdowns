import React, { PropTypes } from 'react';
//import caret from './util';

export default class KendoSearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.changeAction = this.change.bind(this);
        this.getInput = function(input) { this._input = input; }.bind(this);
    }

    componentDidUpdate() {
        if (this._input !== null) {
            this._input.focus();
        }
    }


    change(event) {
        this.props.change(event.target.value);
    }

    render() {
        return (
            <input
                disabled={this.props.disabled}
                onChange={this.changeAction}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                value={this.props.searchText}
            />
        );
    }
}
