import React, { PropTypes } from 'react';
import keycode from 'keycode';
import { caretIndex, indexOfWordAtCaret, caretSelection, textReduced, replaceWordAtCaret, selectEndOfWord, wordAtCaret } from '../Util';
import styles from '@telerik/kendo-theme-default/styles/packages/dropdowns';

export default class SearchBar extends React.Component {

    static propTypes = {
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onNavigate: PropTypes.func,
        onFilter: PropTypes.func,
        disabled: PropTypes.bool,
        highlight: PropTypes.bool,
        placeholder: PropTypes.string,
        separator: PropTypes.string,
        value: PropTypes.string,
        word: PropTypes.string
    };

    static defaultProps = {
        onBlur() {},
        onChange() {},
        onNavigate() {},
        onFilter() {},
        separator: ""
    };

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
            }
        } else {
            //in every other case
            this.caretIdx = caretIndex(this._input);
        }
    }

    onSelectionChange = () => {
        this.hasSelection = this._input.selectionStart !== this._input.selectionEnd;
    };

    handleFocus = () => {
        window.document.addEventListener("selectionchange", this.onSelectionChange);
    };

    handleBlur = () => {
        this.props.onBlur();
        window.document.removeEventListener("selectionchange", this.onSelectionChange);
    };

    onKeyDown = (event) => {
        if (event.keyCode === keycode.codes.up ||
            event.keyCode === keycode.codes.down ||
            event.keyCode === keycode.codes.enter) {
            event.preventDefault();
            this.props.onNavigate(event.keyCode);
        }
    };

    handleChange = (event) => {
        const value = event.target.value;
        const separator = this.props.separator;
        const word = separator ? wordAtCaret(caretIndex(this._input), value, separator) : value;
        const index = indexOfWordAtCaret(caretIndex(this._input), value, separator);

        if (word !== this.filterWord) {
            this.props.onFilter(word, index);
            this.filterWord = word;
        }

        this.props.onChange(value);
    };

    render() {
        const { word, separator, value } = this.props;
        let newValue;

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

        this._oldValue = newValue;

        return (
            <input
                className={styles.input}
                disabled={this.props.disabled}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onKeyDown={this.onKeyDown}
                placeholder={this.props.placeholder}
                ref={this.getInput}
                type="text"
                value={newValue}
            />
        );
    }
}
