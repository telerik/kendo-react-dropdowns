import React, { PropTypes } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import * as util from './Util';
import List from './List';
import SearchBar from './SearchBar';
// import styles from '@telerik/kendo-theme-default/styles/autocomplete/main';

class AutoComplete extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        className: React.PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        disabled: PropTypes.bool,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        onChange: PropTypes.func,
        onFilter: PropTypes.func,
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
        onFilter() {}
    };

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            word: null,
            highlight: false,
            focused: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, valueField } = nextProps;

        if (suggest && data.length) {
            this.setState({
                word: util.getter(data[0], valueField),
                highlight: true
            });
        }

        this.setState({ focused: null });
    }

    handleChange = (value) => {
        this.props.onChange(value);
    };

    filter = (word) => {
        const minLength = this.props.minLength;

        if (word.length >= minLength) {
            this.props.onFilter(word);
        }
    };

    valueUpdate = (value) => {
        this.setState({
            value: value,
            word: null,
            highlight: false
        });
    };

    select = (dataItem) => {
        this.setState({
            word: util.getter(dataItem, this.props.valueField),
            highlight: false
        });
    };

    selectFocused = () => {
        const focused = this.state.focused;

        if (focused !== null) {
            this.select(this.props.data[focused]);
        }
    };

    navigate = (keyCode) => {
        const max = this.props.data.length - 1;
        const { suggest, valueField } = this.props;
        let focused;
        if (keyCode === keycode.codes.up) {
            focused = this.state.focused ? this.state.focused - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            focused = (this.state.focused !== null && this.state.focused !== max) ? this.state.focused + 1 : 0;
        }

        this.setState({
            focused: focused,
            word: suggest ? util.getter(this.props.data[focused], valueField) : null,
            highlight: suggest
        });
    };

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
            filter: this.filter,
            change: this.valueUpdate,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.state.value ? this.state.value : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.state.highlight,
            word: this.state.word
        };

        return (
            <span {...autocompleteProps}>
                <SearchBar ref="searchBar" {...searchBarProps} />
                <List {...listProps} />
            </span>
        );
    }
}

export default AutoComplete;
