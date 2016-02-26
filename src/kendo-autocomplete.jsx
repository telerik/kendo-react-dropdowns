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
        suggest: PropTypes.bool,
        value: PropTypes.string,
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        minLength: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            value: [],
            text: "",
            suggest: ""
        };
        this.shouldSuggest = true;
        this.search = this.search.bind(this);
        this.textUpdate = this.textUpdate.bind(this);
        this.select = this.select.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, valueField } = nextProps;

        if (suggest && data.length && this.shouldSuggest) {
            this.setState({ suggest: data[0][valueField] });
        }
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
        this.shouldSuggest = true;
    }

    textUpdate(text) {
        this.setState({ text: text });
    }

    select(dataItem) {
        const index = this.refs.searchBar.indexOfWordAtCaret();
        let value = this.state.value;
        value = update(value, { $splice: [ [ index, 1, dataItem[this.props.valueField] ] ] });

        this.setState({
            value: value,
            text: value.join(this.props.separator)
        });

        this.shouldSuggest = false;
    }

    render() {
        const listProps = {
            data: this.props.data,
            renderer: this.props.itemRenderer,
            onSearch: this.search,
            onClick: this.select, //TODO: onChange or onClick? List is stateless!
            textField: this.props.valueField,
            valueField: this.props.valueField
        };

        const searchBarProps = {
            search: this.search,
            change: this.textUpdate,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            text: this.state.text,
            separator: this.props.separator,
            suggest: this.state.suggest
        };

        return (
            <span className="k-widget k-autocomplete k-header" tabIndex="-1">
                <KendoSearchBar ref="searchBar" {...searchBarProps} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

export default KendoAutoComplete;
