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
        onChange: React.PropTypes.func,
        onNavigate: React.PropTypes.func,
        onTextUpdate: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        suggest: React.PropTypes.bool,
        tabIndex: React.PropTypes.number,
        text: React.PropTypes.string,
        textField: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        valueField: React.PropTypes.string
    };

    static defaultProps = {
        height: 200,
        onChange() {},
        onSelect() {},
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

    toggle = () => {
        if (!this.props.disabled) {
            this.refs.SearchBar._input.focus();
            this.props.onToggle();
        }
    };

    navigate = (keyCode) => {
        const max = this.props.data.length - 1;
        const { disabled, selected } = this.props;

        if (disabled) {
            return;
        }

        let index;
        if (keyCode === keycode.codes.up) {
            index = selected ? selected - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            index = (selected !== null && selected !== max) ? selected + 1 : 0;
        }

        const dataItem = this.props.data[index];
        if (dataItem) {
            this.props.onNavigate(dataItem);
        }
    };

    select = (dataItem) => {
        const text = dataItem ? util.getter(dataItem, this.props.textField) : this.refs.SearchBar._input.value;
        this.props.onSelect(text, dataItem);
    };

    selectFocused = () => {
        const focused = this.props.selected || this.props.focused;
        this.select(this.props.data[focused]);
    };

    blur = () => {
        const { text, dataItem, onSelect } = this.props;
        onSelect(text, dataItem);
    };

    render() {
        const searchBarProps = {
            onBlur: this.blur,
            change: this.props.onTextUpdate,
            navigate: this.navigate,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.text,
            highlight: this.props.highlight,
            word: this.props.word
        };

        const buttonClasses = classNames({
            [styles.button]: true,
            [styles['state-disabled']]: this.props.disabled,
            [styles.select]: true
        }, this.props.className);

        const buttonProps = {
            tabIndex: -1,
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
