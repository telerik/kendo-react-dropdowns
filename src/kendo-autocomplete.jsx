import React, { PropTypes } from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';
import { keys } from './util';
// import styles from '@telerik/kendo-theme-default/styles/autocomplete/main';
import classNames from 'classnames';

class KendoAutoComplete extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        className: React.PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object),
        disabled: PropTypes.bool,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        onChange: PropTypes.func,
        onSearch: PropTypes.func,
        placeholder: PropTypes.string,
        separator: PropTypes.string,
        suggest: PropTypes.bool,
        tabIndex: React.PropTypes.number,
        value: PropTypes.string,
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        minLength: 0,
        onChange() {},
        onSearch() {}
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
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.textUpdate = this.textUpdate.bind(this);
        this.select = this.select.bind(this);
        this.selectFocused = this.selectFocused.bind(this);
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

    handleChange(value) {
        this.props.onChange(value);
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

    selectFocused() {
        const focused = this.state.focused;

        if (focused !== null) {
            this.select(this.props.data[focused]);
        }
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
        let autocompleteClasses = classNames({
            // [styles.button]: true,
            'k-widget': true,
            'k-autocomplete': true,
            'k-header': true
        }, this.props.className);

        let autocompleteProps = {
            role: 'autocomplete',
            tabIndex: this.props.tabIndex || -1,
            className: autocompleteClasses
        };

        const listProps = {
            data: this.props.data,
            focused: this.state.focused,
            renderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.valueField,
            valueField: this.props.valueField
        };

        const searchBarProps = {
            handleChange: this.handleChange,
            navigate: this.navigate,
            search: this.search,
            change: this.textUpdate,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            text: this.state.text ? this.state.text : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.state.highlight,
            word: this.state.word
        };

        return (
            <span {...autocompleteProps}>
                <KendoSearchBar ref="searchBar" {...searchBarProps} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

export default KendoAutoComplete;
