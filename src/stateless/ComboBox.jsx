import * as React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import { List, ListContainer, SearchBar, DropDownWrapper } from './main';
import { Button } from '@telerik/kendo-react-buttons';
import buttonStyles from '@telerik/kendo-theme-default/styles/button/main';
import { getter, itemIndex } from '../Util';

export default class ComboBox extends React.Component {

    static propTypes = {
        className: React.PropTypes.string,
        data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string,
            React.PropTypes.number
        ])),
        dataItem: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.object,
            React.PropTypes.date,
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        show: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        focused: React.PropTypes.number,
        itemRenderer: React.PropTypes.func,
        height: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        word: React.PropTypes.string,
        highlight: React.PropTypes.bool,
        minLength: React.PropTypes.number,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        onNavigate: React.PropTypes.func,
        onTextUpdate: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        select: React.PropTypes.func,
        separator: React.PropTypes.string,
        suggest: React.PropTypes.bool,
        tabIndex: React.PropTypes.number,
        text: React.PropTypes.string,
        textField: React.PropTypes.string,
        toggle: React.PropTypes.func,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        valueField: React.PropTypes.string
    };

    static defaultProps = {
        delay: 500,
        height: 200,
        ignoreCase: true,
        minLength: 0,
        onBlur() {},
        onChange() {},
        onSelect() {},
        onFilter() {},
        onNavigate() {},
        onTextUpdate() {},
        onToggle() {}
    }

    constructor(props) {
        super(props);
    }

    handleBlur = () => {
        if (!this.props.dataItem && this.props.text) {
            this.selectFocused();
        }
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

    toggle = () => {
        this.refs.searchBar._input.focus();
        this.props.onToggle({
            show: !this.props.show,
            focused: this.props.focused ? this.props.focused : 0
        });
    };

    navigate = (keyCode) => {
        const max = this.props.data.length - 1;
        const { suggest, textField, valueField, disabled } = this.props;

        if (disabled) {
            return;
        }

        if (!this.props.data.length) {
            this.props.onFilter("");
            return;
        }

        let focused;
        if (keyCode === keycode.codes.up) {
            focused = this.props.focused ? this.props.focused - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            focused = (this.props.focused !== null && this.props.focused !== max) ? this.props.focused + 1 : 0;
        }

        const dataItem = this.props.data[focused];
        this.props.onNavigate(keyCode, {
            text: getter(dataItem, textField),
            value: getter(dataItem, valueField),
            word: null,
            focused: focused,
            highlight: suggest
        });
    };

    textUpdate = (text) => {
        const index = itemIndex(text, this.props.data, this.props.textField); //unfiltered data focused item
        const dataItem = this.props.data[index];

        this.props.onTextUpdate({
            show: index >= 0,
            value: null,
            dataItem: null,
            text: text,
            word: dataItem && this.props.suggest & text.length ? getter(dataItem, this.props.textField) : null,
            highlight: true,
            focused: index
        });
    };

    select = (dataItem, index) => {
        const value = dataItem ? getter(dataItem, this.props.valueField) : this.refs.searchBar._input.value;
        const text = dataItem ? getter(dataItem, this.props.textField) : this.refs.searchBar._input.value;
        this.props.onSelect({
            dataItem: dataItem ? dataItem : null,
            text: text,
            value: value,
            highlight: false,
            focused: index,
            show: false,
            word: null
        });
    };

    selectFocused = () => {
        const focused = this.props.focused;
        if (focused !== null) {
            this.select(this.props.data[focused], focused);
        }
    };

    render() {
        const searchBarProps = {
            blur: this.handleBlur,
            filter: this.handleFilter,
            change: this.textUpdate,
            navigate: this.navigate,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.text ? this.props.text : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.props.highlight,
            word: this.props.word
        };

        const buttonClasses = classNames({
            [buttonStyles.button]: true,
            'k-state-disabled': this.props.disabled,
            'k-select': true
        }, this.props.className);

        const buttonProps = {
            onClick: this.toggle,
            onMouseDown: function(event) {
                event.preventDefault();
            },
            className: buttonClasses,
            icon: "arrow-s"
        };

        const comboBoxClasses = classNames({
            // [styles.button]: true,
            'k-widget': true,
            'k-combobox': true,
            'k-header': true
        }, this.props.className);

        const comboBoxProps = {
            role: 'combobox',
            tabIndex: this.props.tabIndex || -1,
            className: comboBoxClasses
        };

        const listProps = {
            data: this.props.data,
            focused: this.props.focused,
            height: "inherit",
            itemRenderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.textField,
            valueField: this.props.valueField
        };

        const listContainerStyle = {
            height: this.props.height
        };

        const listContainerProps = {
            style: listContainerStyle,
            anchor: this.refs.anchor,
            show: this.props.show
        };

        return (
            <span ref="anchor" {...comboBoxProps}>
                <DropDownWrapper>
                    <SearchBar ref="searchBar" {...searchBarProps} />
                        <Button ref="" {...buttonProps} />
                </DropDownWrapper>
                <ListContainer {...listContainerProps}>
                    <List {...listProps} />
                </ListContainer>
            </span>
        );
    }
}
