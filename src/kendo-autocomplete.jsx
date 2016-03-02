import React, { PropTypes } from 'react';
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
        minLength: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            word: null,
            highlight: false
        };
        this.search = this.search.bind(this);
        this.textUpdate = this.textUpdate.bind(this);
        this.select = this.select.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //data is received, should I suggest?
        const { suggest, data, valueField } = nextProps;

        if (suggest && data.length) {
            this.setState({
                word: data[0][valueField],
                highlight: true
            });
        }
    }

    search(word) {
        //suggest during search
        const minLength = this.props.minLength;

        if (word.length >= minLength) {
            this.props.onSearch(word);
        }
    }

    textUpdate(text) {
        this.setState({
            text: text,
            word: null,
            highlight: false
        });
    }

    select(dataItem) {
        this.setState({
            word: dataItem[this.props.valueField],
            highlight: false
        });
    }

    render() {
        const listProps = {
            data: this.props.data,
            renderer: this.props.itemRenderer,
            //onSearch: this.search,
            onClick: this.select,
            textField: this.props.valueField,
            valueField: this.props.valueField
        };

        const searchBarProps = {
            search: this.search,
            change: this.textUpdate,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            text: this.state.text ? this.state.text : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.state.highlight,
            word: this.state.word
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
