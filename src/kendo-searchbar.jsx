import React, { PropTypes } from 'react';
import { caretIndex, indexOfWordAtCaret, wordAtCaret } from './util';

export default class KendoSearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        search: PropTypes.func,
        separator: PropTypes.string,
        text: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.getInput = function(input) { this._input = input; }.bind(this);
    }

    componentDidUpdate() {
        if (this._input !== null) {
            this._input.focus();
        }
    }

    indexOfWordAtCaret() {
        const separator = this.props.separator;
        return separator ? indexOfWordAtCaret(caretIndex(this._input), this._input.value, separator) : 0;
    }

    change(event) {
        const text = event.target.value;
        const separator = this.props.separator;
        const word = separator ? wordAtCaret(caretIndex(this._input), text, separator) : text;
        const index = indexOfWordAtCaret(caretIndex(this._input), text, separator);

        this.props.change(text);
        this.props.search(word, index);
    }

    keyDown(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <input
                disabled={this.props.disabled}
                onChange={this.change}
                onKeyDown={this.keyDown}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                value={this.props.text}
            />
        );
    }
}
