import * as React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import List from './List';
import SearchBar from './SearchBar';
// import Button from 'kendo-react-buttons';
// import styles from '@telerik/kendo-theme-default/styles/ComboBox/main';
import buttonStyles from '@telerik/kendo-theme-default/styles/button/main';

export default class ComboBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || null,
            focused: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, textField } = nextProps;

        if (suggest && data.length) {
            this.setState({
                word: data[0][textField],
                highlight: true
            });
        }

        this.setState({ focused: null });
    }

    handleChange = (value) => {
        this.props.onChange(value);
    }

    filter = (word) => {
        const minLength = this.props.minLength;
        if (word.length >= minLength) {
            this.props.onFilter(word);
        }
    }

    toggle = () => {
        //this.setState({
        //  expanded: !this.state.expanded
        // });
    }

    navigate = (keyCode) => {
        const max = this.props.data.length - 1;
        const { suggest, textField, valueField } = this.props;
        let focused;
        if (keyCode === keycode.codes.up) {
            focused = this.state.focused ? this.state.focused - 1 : max;
        } else if (keyCode === keycode.codes.down) {
            focused = (this.state.focused !== null && this.state.focused !== max) ? this.state.focused + 1 : 0;
        }

        const dataItem = this.props.data[focused];
        this.setState({
            text: suggest ? dataItem[textField] : null,
            value: suggest ? dataItem[valueField] : null,
            word: suggest ? dataItem[textField] : null,
            focused: focused,
            highlight: suggest
        });
    }

    valueUpdate = (value) => {
        this.setState({
            value: value,
            word: null,
            highlight: false
        });
    }

    select = (dataItem) => {
        this.setState({
            text: dataItem[this.props.textField],
            value: dataItem[this.props.valueField],
            word: dataItem[this.props.textField],
            highlight: false
        });
    }

    selectFocused = () => {
        const focused = this.state.focused;

        if (focused !== null) {
            this.select(this.props.data[focused]);
        }
    }

    render() {
        const searchBarProps = {
            handleChange: this.handleChange,
            navigate: this.navigate,
            filter: this.filter,
            change: this.valueUpdate,
            selectFocused: this.selectFocused,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.state.text ? this.state.text : this.props.value || "",
            separator: this.props.separator || "",
            highlight: this.state.highlight,
            word: this.state.word
        };

        const buttonClasses = classNames({
            [buttonStyles.button]: true,
            'k-state-disabled': this.props.disabled
        }, this.props.className);

        const buttonProps = {
            onClick: this.toggle,
            className: buttonClasses
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
            focused: this.state.focused,
            renderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.textField,
            valueField: this.props.valueField
        };

        return (
            <span {...comboBoxProps}>
                <SearchBar ref="searchBar" {...searchBarProps} />
                {/*<Button ref="" {...buttonProps}></Button>*/}
                <button {...buttonProps}>toggle</button>
                <List {...listProps} />
            </span>
        );
    }
}
ComboBox.defaultProps = {
    minLength: 0,
    onChange() {},
    onFilter() {}
};

ComboBox.propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.object),
        React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    disabled: React.PropTypes.bool,
    filter: React.PropTypes.func,
    itemRenderer: React.PropTypes.func,
    minLength: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onFilter: React.PropTypes.func,
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
    valueField: React.PropTypes.string,
    valueUpdate: React.PropTypes.func
};
