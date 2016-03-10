import React, { PropTypes } from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';
import { keys } from './util';

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
            highlight: false,
            focused: null
        };

        this.navigate = this.navigate.bind(this);
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

        this.setState({ focused: null });
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

    navigate(keyCode) {
        const max = this.props.data.length - 1;
        const { suggest, valueField } = this.props;
        let focused;
        if (keyCode === keys.UP) {
            focused = this.state.focused ? this.state.focused - 1 : max;
        } else if (keyCode === keys.DOWN) {
            focused = (this.state.focused !== null && this.state.focused !== max) ? this.state.focused + 1 : 0;
        }

        this.setState({
            focused: focused,
            word: suggest ? this.props.data[focused][valueField] : null,
            highlight: suggest
        });
    }

    render() {
        const listProps = {
            data: this.props.data,
            focused: this.state.focused,
            renderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.valueField,
            valueField: this.props.valueField
        };

        const searchBarProps = {
            navigate: this.navigate,
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
