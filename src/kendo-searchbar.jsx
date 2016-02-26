import React, { PropTypes } from 'react';
import { caretIndex, indexOfWordAtCaret, replaceWordAtCaret, selectEndOfWord, wordAtCaret } from './util';

export default class KendoSearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        search: PropTypes.func,
        separator: PropTypes.string,
        suggest: PropTypes.string,
        text: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.searchWord = "";
        this.shouldSuggest = true;

        this.change = this.change.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.getInput = function(input) { this._input = input; }.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ caretIdx: caretIndex(this._input) });
    }

    componentDidUpdate() {
        if (this._input !== null) {
            if (this.props.suggest && this.shouldSuggest) {
                selectEndOfWord(this._input, this.state.caretIdx, this._input.value, this.props.separator);
            } else {
                this._input.focus();
            }
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

        if (word !== this.searchWord) {
            this.props.search(word, index);
            this.searchWord = word;
        } else {
            this.shouldSuggest = false;
        }
    }

    keyDown(event) {
        const BACKSPACE = 8;
        const DELETE = 46;

        if (event.keyCode === BACKSPACE || event.keyCode === DELETE) {
            this.shouldSuggest = false;
        } else {
            this.shouldSuggest = true;
        }
    }

    render() {
        const { suggest, separator, text } = this.props;
        const value = suggest && this.shouldSuggest ? replaceWordAtCaret(caretIndex(this._input), text, suggest, separator) : text;
        return (
            <input
                className="k-input"
                disabled={this.props.disabled}
                onChange={this.change}
                onKeyDown={this.keyDown}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                type="text"
                value={value}
            />
        );
    }
}
