import React, { PropTypes } from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';
import { caretPosition, wordAtCaret, replaceWordAtCaret } from './util';

class KendoAutoComplete extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        disabled: PropTypes.bool,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        onSearch: PropTypes.func,
        placeholder: PropTypes.string,
        separator: PropTypes.string,
        textField: PropTypes.string,
        value: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        minLength: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || null
        };
        this.search = this.search.bind(this);
        this.selectValue = this.selectValue.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    getInput(searchBar) {
        this._input = searchBar._input; //used to determine the caret position
    }

    renderValue() {
        const value = this.state.value;
        const renderer = this.props.valueRenderer;

        if (typeof(renderer) === "function") {
            return renderer(value);
        }

        return value;
    }

    search(text) {
        const { minLength, separator } = this.props;
        const searchText = separator ? wordAtCaret(caretPosition(this._input), text, separator) : text;

        if (searchText.length >= minLength) {
            this.props.onSearch(searchText);
        }

        this.setState({ value: text });
    }

    selectValue(dataItem) {
        const { separator, textField } = this.props;
        let value = this.state.value;

        if (separator && value) {
            value = replaceWordAtCaret(caretPosition(this._input), value, dataItem[textField], separator);
        } else {
            value = dataItem[textField];
        }

        this.setState({ value: value });
    }

    render() {
        const listProps = {
            data: this.props.data,
            renderer: this.props.itemRenderer,
            onSearch: this.search,
            onClick: this.selectValue, //TODO: onChange or onClick? List is stateless!
            textField: this.props.textField
        };

        const searchBarProps = {
            change: this.search,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            searchText: this.state.value
        };

        return (
            <span>
                <KendoSearchBar ref={this.getInput} {...searchBarProps} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

export default KendoAutoComplete;
