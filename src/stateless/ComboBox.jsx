import * as React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import { List, ListContainer, SearchBar, DropDownWrapper } from './main';
import { Button } from '@telerik/kendo-react-buttons';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';
import * as util from '../Util';

export default class ComboBox extends React.Component {

    static propTypes = {
        className: React.PropTypes.string,
        data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string,
            React.PropTypes.number
        ])),
        dataItem: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        show: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        focused: React.PropTypes.number,
        selected: React.PropTypes.number,
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

    componentDidMount() {
        if (this.props.show && this.refs.List) {
            this.refs.List.scrollToItem();
        }
    }

    componentDidUpdate() {
        if (this.props.show && this.refs.List) {
            this.refs.List.scrollToItem();
        }
    }

    handleBlur = () => {
        this.props.onBlur();
    };

    handleFilter = (word) => {
        const minLength = this.props.minLength;
        if (word.length >= minLength) {
            this.props.onFilter(word);
        }
    };

    toggle = () => {
        if (!this.props.disabled) {
            this.refs.SearchBar._input.focus();
            this.props.onToggle({
                show: !this.props.show,
                focused: this.props.selected ? null : this.props.focused || 0
            });
        }
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

        let selected;
        if (keyCode === keycode.codes.up) {
            selected = this.props.selected ? this.props.selected - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            selected = (this.props.selected !== null && this.props.selected !== max) ? this.props.selected + 1 : 0;
        }

        const dataItem = this.props.data[selected];
        this.props.onNavigate(keyCode, {
            text: util.getter(dataItem, textField),
            value: util.getter(dataItem, valueField),
            word: null,
            focused: selected,
            selected: selected,
            highlight: suggest,
            dataItem: dataItem
        });
    };

    textUpdate = (input) => {
        let { suggest, data, textField, text } = this.props;
        text = text || "";

        const index = util.itemIndex(input, data, textField); //unfiltered data selected item
        const dataItem = data[index];
        const word = dataItem && suggest && input.length ? util.getter(dataItem, textField) : "";
        const reducedOrEqual = util.textReduced(input.toLowerCase(), text.toLowerCase()) || input.length === text.length;

        this.props.onTextUpdate({
            text: input,
            value: null,
            focused: data.length ? util.itemIndex(input, data, textField) : -1,
            selected: null,
            dataItem: null,
            show: index >= 0,
            word: (dataItem && reducedOrEqual) ? null : word,
            highlight: (dataItem && reducedOrEqual) ? false : true
        });
    };

    select = (dataItem, index) => {
        const value = dataItem ? util.getter(dataItem, this.props.valueField) : this.refs.SearchBar._input.value;
        const text = dataItem ? util.getter(dataItem, this.props.textField) : this.refs.SearchBar._input.value;
        this.props.onSelect({
            dataItem: dataItem ? dataItem : null,
            text: text,
            value: value,
            highlight: false,
            focused: index,
            selected: index,
            show: false,
            word: null
        });
    };

    selectFocused = () => {
        const focused = this.props.selected || this.props.focused;
        this.select(this.props.data[focused], focused);
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
            [styles.button]: true,
            [styles['state-disabled']]: this.props.disabled,
            [styles.select]: true
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
            [styles.widget]: true,
            [styles.combobox]: true,
            [styles.header]: true
        }, this.props.className);

        const comboBoxProps = {
            role: 'combobox',
            tabIndex: this.props.tabIndex || -1,
            className: comboBoxClasses
        };

        const listProps = {
            data: this.props.data,
            focused: this.props.focused,
            selected: this.props.selected,
            height: this.props.height,
            itemRenderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.textField,
            valueField: this.props.valueField
        };

        const listContainerProps = {
            anchor: this.refs.anchor,
            show: this.props.show
        };
        return (
            <span ref="anchor" {...comboBoxProps}>
                <DropDownWrapper>
                    <SearchBar ref="SearchBar" {...searchBarProps} />
                        <Button {...buttonProps} />
                </DropDownWrapper>
                <ListContainer {...listContainerProps}>
                    <List ref="List" {...listProps} />
                </ListContainer>
            </span>
        );
    }
}
