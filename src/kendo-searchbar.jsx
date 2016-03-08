import React, { PropTypes } from 'react';
import { caretIndex, indexOfWordAtCaret, caretSelection, textReduced, replaceWordAtCaret, selectEndOfWord, wordAtCaret } from './util';

export default class KendoSearchBar extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        disabled: PropTypes.bool,
        highlight: PropTypes.bool,
        placeholder: PropTypes.string,
        search: PropTypes.func,
        separator: PropTypes.string,
        text: PropTypes.string,
        word: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.searchWord = "";

        this.change = this.change.bind(this);
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
        this.hasSelection = false;
    }

    componentDidUpdate() {
        if (this.props.word) {
            if (this.props.highlight) {
                //only when there is a word to suggest
                selectEndOfWord(this._input, this.caretIdx, this.props.separator);
                this.hasSelection = true;
            } else {
                //only when something is chosen from the list
                caretSelection(this._input, this._input.value.length);
            }
        } else {
            //in every other case
            this.caretIdx = caretIndex(this._input);
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

        if (word !== this.searchWord) {
            this.props.search(word, index);
            this.searchWord = word;
        }

        this.props.change(text);
    }

    render() {
        const { word, separator, text } = this.props;
        let value;

        if (text) {
            if (word && this.accept) {
                if (separator) {
                    value = replaceWordAtCaret(caretIndex(this._input), text, word, separator);
                } else {
                    value = word;
                }
                this.searchWord = word;
            } else {
                value = text;
                this.searchWord = wordAtCaret(this.caretIdx || text.length, text, separator);
            }
        }

        this._oldValue = value;

        return (
            <input
                className="k-input"
                disabled={this.props.disabled}
                onChange={this.change}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                type="text"
                value={value}
            />
        );
    }
}
