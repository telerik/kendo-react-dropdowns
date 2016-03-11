import React, { PropTypes } from 'react';
import { keys, caretIndex, indexOfWordAtCaret, caretSelection, textReduced, replaceWordAtCaret, selectEndOfWord, wordAtCaret } from './Util';

export default class SearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        handleChange: PropTypes.func,
        highlight: PropTypes.bool,
        navigate: PropTypes.func,
        placeholder: PropTypes.string,
        search: PropTypes.func,
        selectFocused: PropTypes.func,
        separator: PropTypes.string,
        text: PropTypes.string,
        word: PropTypes.string
    };

    //TODO add defaultProps
    constructor(props) {
        super(props);

        this.searchWord = "";

        this.getInput = function(input) { this._input = input; }.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const highlight = nextProps.highlight;

        if (highlight) { //suggested
            this.accept = !textReduced(nextProps.text, this.hasSelection ? this.props.text : this._oldValue);
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
        if (event.keyCode === keys.UP || event.keyCode === keys.DOWN) {
            event.preventDefault();
            this.props.navigate(event.keyCode);
        }

        if (event.keyCode === keys.ENTER) {
            this.props.selectFocused();
        }
    };

    onChange = (event) => {
        const text = event.target.value;
        const separator = this.props.separator;
        const word = separator ? wordAtCaret(caretIndex(this._input), text, separator) : text;
        const index = indexOfWordAtCaret(caretIndex(this._input), text, separator);

        if (word !== this.searchWord) {
            this.props.search(word, index);
            this.searchWord = word;
        }

        this.props.change(text);
    };

    render() {
        const { word, separator, text } = this.props;
        let value;

        //if (text) {
        if (word && this.accept) {
            if (separator) {
                value = replaceWordAtCaret(caretIndex(this._input), text, word, separator);
            } else {
                value = word;
            }
            this.searchWord = word;
        } else {
            value = text;
            this.searchWord = text ? wordAtCaret(this.caretIdx || text.length, text, separator) : "";
        }
        //}

        this._oldValue = value;

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
                value={value}
            />
        );
    }
}
