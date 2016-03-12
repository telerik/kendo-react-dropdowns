import React, { PropTypes } from 'react';
import keycode from 'keycode';
import { caretIndex, indexOfWordAtCaret, caretSelection, textReduced, replaceWordAtCaret, selectEndOfWord, wordAtCaret } from './Util';

export default class SearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        filter: PropTypes.func,
        handleChange: PropTypes.func,
        highlight: PropTypes.bool,
        navigate: PropTypes.func,
        placeholder: PropTypes.string,
        selectFocused: PropTypes.func,
        separator: PropTypes.string,
        value: PropTypes.string,
        word: PropTypes.string
    };

    //TODO add defaultProps
    constructor(props) {
        super(props);

        this.filterWord = "";

        this.getInput = function(input) { this._input = input; }.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const highlight = nextProps.highlight;

        if (highlight) { //suggested
            this.accept = !textReduced(nextProps.value, this.hasSelection ? this.props.value : this._oldValue);
        } else { //selected from list
            this.accept = true;
        }

        this.caretIdx = caretIndex(this._input);
    }

    componentDidUpdate() {
        if (this.props.word) {
            if (this.props.highlight) {
                //only when there is a word to suggest
                selectEndOfWord(this._input, this.caretIdx, this.props.separator);
            } else {
                //only when something is chosen from the list
                caretSelection(this._input, this._input.value.length);
                this.props.handleChange(this._input.value);
            }
        } else {
            //in every other case
            this.caretIdx = caretIndex(this._input);
        }
    }

    onSelectionChange = () => {
        this.hasSelection = this._input.selectionStart !== this._input.selectionEnd;
    };

    onFocus = () => {
        window.document.addEventListener("selectionchange", this.onSelectionChange);
    };

    onBlur = () => {
        window.document.removeEventListener("selectionchange", this.onSelectionChange);
        //only when NOT chosen from list
        if (!this.props.word || (this.props.word && this.props.highlight)) {
            this.props.handleChange(this._input.value);
        }
    };

    onKeyDown = (event) => {
        if (event.keyCode === keycode.codes.up || event.keyCode === keycode.codes.down) {
            event.preventDefault();
            this.props.navigate(event.keyCode);
        }

        if (event.keyCode === keycode.codes.enter) {
            this.props.selectFocused();
        }
    };

    onChange = (event) => {
        const value = event.target.value;
        const separator = this.props.separator;
        const word = separator ? wordAtCaret(caretIndex(this._input), value, separator) : value;
        const index = indexOfWordAtCaret(caretIndex(this._input), value, separator);

        if (word !== this.filterWord) {
            this.props.filter(word, index);
            this.filterWord = word;
        }

        this.props.change(value);
    };

    render() {
        const { word, separator, value } = this.props;
        let newValue;

        //if (text) {
        if (word && this.accept) {
            if (separator) {
                newValue = replaceWordAtCaret(caretIndex(this._input), value, word, separator);
            } else {
                newValue = word;
            }
            this.filterWord = word;
        } else {
            newValue = value;
            this.filterWord = value ? wordAtCaret(this.caretIdx || value.length, value, separator) : "";
        }
        //}

        this._oldValue = newValue;

        return (
            <input
                className="k-input"
                disabled={this.props.disabled}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onKeyDown={this.onKeyDown}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                type="text"
                value={newValue}
            />
        );
    }
}
