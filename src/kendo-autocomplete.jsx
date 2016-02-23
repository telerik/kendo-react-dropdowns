import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';

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
            value: [],
            text: ""
        };
        this.search = this.search.bind(this);
        this.textUpdate = this.textUpdate.bind(this);
        this.select = this.select.bind(this);
    }

    renderValue() {
        const value = this.state.value;
        const renderer = this.props.valueRenderer;

        if (typeof(renderer) === "function") {
            return renderer(value);
        }

        return value;
    }

    search(word, index) {
        const minLength = this.props.minLength;

        if (word.length >= minLength) {
            this.props.onSearch(word);
        }

        this.setState({ value: update(this.state.value, { $splice: [ [ index, 1, word ] ] }) });
    }

    textUpdate(text) {
        this.setState({ text: text });
    }

    select(dataItem) {
        const index = this.refs.searchBar.indexOfWordAtCaret();
        let value = this.state.value;
        value = update(value, { $splice: [ [ index, 1, dataItem[this.props.textField] ] ] });

        this.setState({
            value: value,
            text: value.join(this.props.separator)
        });
    }

    render() {
        const listProps = {
            data: this.props.data,
            renderer: this.props.itemRenderer,
            onSearch: this.search,
            onClick: this.select, //TODO: onChange or onClick? List is stateless!
            textField: this.props.textField
        };

        const searchBarProps = {
            search: this.search,
            change: this.textUpdate,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            text: this.state.text,
            separator: this.props.separator
        };

        return (
            <span>
                <KendoSearchBar ref="searchBar" {...searchBarProps} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

export default KendoAutoComplete;
