import React, { PropTypes } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import * as util from '../Util';
import { List, ListContainer, SearchBar } from './main';

class AutoComplete extends React.Component {

    static propTypes = {
        className: React.PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        disabled: PropTypes.bool,
        height: React.PropTypes.number,
        highlight: React.PropTypes.bool,
        show: React.PropTypes.bool,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        placeholder: PropTypes.string,
        separator: PropTypes.string,
        focused: React.PropTypes.number,
        suggest: PropTypes.bool,
        tabIndex: React.PropTypes.number,
        value: PropTypes.string,
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func,
        word: PropTypes.string,
        //handlers
        onNavigate: React.PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFilter: PropTypes.func,
        onTextUpdate: React.PropTypes.func,
        onSelect: React.PropTypes.func
    };

    static defaultProps = {
        height: 200,
        minLength: 0,
        onBlur() {},
        onChange() {},
        onFilter() {},
        onNavigate() {},
        onTextUpdate() {},
        onSelect() {}
    };

    constructor(props) {
        super(props);
        this.value = "";
    }

    componentDidUpdate() {
        if (this.props.show && this.refs.List) {
            this.refs.List.scrollToItem();
        }
    }

    handleBlur = () => {
        // if (!this.props.dataItem && this.props.text) {
        this.selectFocused();
        // }
        this.props.onBlur({
            show: false
        });
    };

    handleFilter = (word) => {
        const minLength = this.props.minLength;
        if (word.length >= minLength) {
            this.props.onFilter(word);
        }
    };

    textUpdate = (text) => {
        this.value = text;
        this.props.onTextUpdate({
            value: text,
            word: null,
            highlight: false
        });
    };

    select = (dataItem/*, index*/) => {
        this.props.onSelect({
            highlight: false,
            show: false,
            word: util.getter(dataItem, this.props.valueField),
            value: this.value
        });
    };

    selectFocused = () => {
        const focused = this.props.focused;
        if (focused !== null) {
            this.select(this.props.data[focused], focused);
        }
    };

    navigate = (keyCode) => {
        const max = this.props.data.length - 1;
        const { suggest, valueField } = this.props;
        let focused;
        if (keyCode === keycode.codes.up) {
            focused = this.props.focused ? this.props.focused - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            focused = (this.props.focused !== null && this.props.focused !== max) ? this.props.focused + 1 : 0;
        }

        this.props.onNavigate(keyCode, {
            focused: focused,
            word: suggest ? util.getter(this.props.data[focused], valueField) : null,
            highlight: suggest
        });
    };

    render() {
        const autocompleteClasses = classNames({
            'k-widget': true,
            'k-autocomplete': true,
            'k-header': true
        }, this.props.className);

        const autocompleteProps = {
            role: 'autocomplete',
            tabIndex: this.props.tabIndex || -1,
            className: autocompleteClasses
        };

        const searchBarProps = {
            blur: this.handleBlur,
            change: this.textUpdate,
            navigate: this.navigate,
            filter: this.handleFilter,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.value ? this.props.value : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.props.highlight,
            word: this.props.word
        };

        const listContainerProps = {
            anchor: this.refs.anchor,
            show: this.props.show
        };

        const listProps = {
            height: this.props.height,
            data: this.props.data,
            focused: this.props.focused,
            renderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.valueField,
            valueField: this.props.valueField
        };

        return (
            <span ref="anchor" {...autocompleteProps}>
                <SearchBar ref="searchBar" {...searchBarProps} />
                <ListContainer {...listContainerProps}>
                    <List ref="List" {...listProps} />
                </ListContainer>
            </span>
        );
    }
}

export default AutoComplete;
