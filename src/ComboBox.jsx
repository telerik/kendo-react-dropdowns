import * as React from 'react';
import * as util from './Util';
import classNames from 'classnames';
import keycode from 'keycode';
import List from './List';
import ListContainer from './ListContainer';
import SearchBar from './SearchBar';
import DropDownWrapper from './DropDownWrapper';
import { Button } from '@telerik/kendo-react-buttons';
// import styles from '@telerik/kendo-theme-default/styles/ComboBox/main';
import buttonStyles from '@telerik/kendo-theme-default/styles/button/main';
import { itemIndex } from './Util';

const propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.string,
        React.PropTypes.number
    ])),
    disabled: React.PropTypes.bool,
    itemRenderer: React.PropTypes.func,
    height: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]),
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

const defaultProps = {
    delay: 500,
    height: 200,
    ignoreCase: true,
    minLength: 0,
    onChange() {},
    onFilter() {}
};

class ComboBox extends React.Component {
    constructor(props) {
        super(props);
        this._oldText = "";
        this._oldValue = "";
        this.state = {
            dataItem: null,
            expanded: false,
            value: this.props.value || "",
            focused: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, textField } = nextProps;
        if (suggest && data.length) {
            this.setState({
                expanded: data.length > 0,
                word: util.getter(data[0], textField),
                highlight: true,
                focused: itemIndex(this.text, data, textField) //filtered data focused item
            });
        }
    }

    handleChange = (text) => {
        if (this._oldText === text || this._oldValue === this.state.value) {
            return;
        }

        this._oldText = this.state.text;
        this._oldValue = this.state.value;
        this.props.onChange(this.state.value);
    }

    handleBlur = () => {
        if (!this.state.dateItem) {
            this.selectFocused();
        }
    };

    handleFilter = (word) => {
        const minLength = this.props.minLength;
        if (word.length >= minLength) {
            this.props.onFilter(word);
        }
    };

    toggle = () => {
        this.setState({
            expanded: this.props.data.length ? !this.state.expanded : false
        });
        if (!this.props.data.length) {
            this.handleFilter("");
        }
    };

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
            text: suggest ? util.getter(dataItem, textField) : null,
            value: suggest ? util.getter(dataItem, valueField) : null,
            word: null,
            focused: focused,
            highlight: suggest
        });
    };

    textUpdate = (text) => {
        const index = itemIndex(text, this.props.data, this.props.textField); //unfiltered data focused item
        const dataItem = this.props.data[index];

        this.text = text;
        this.setState({
            expanded: index >= 0,
            text: text,
            word: dataItem && this.props.suggest ? util.getter(dataItem, this.props.textField) : null,
            highlight: true,
            focused: index
        });
    };

    select = (dataItem, index) => {
        const value = dataItem ? util.getter(dataItem, this.props.valueField) : this.refs.searchBar._input.value;
        const text = dataItem ? util.getter(dataItem, this.props.textField) : this.refs.searchBar._input.value;

        this.setState({
            dataItem: dataItem ? dataItem : null,
            text: text,
            value: value,
            highlight: false,
            focused: index,
            expanded: false
        }, function() {
            this.handleChange(value);
        }.bind(this));
    };

    selectFocused = () => {
        const focused = this.state.focused;
        if (focused !== null) {
            this.select(this.props.data[focused], focused);
        }
    };

    render() {
        const searchBarProps = {
            blur: this.handleBlur,
            filter: this.handleFilter,
            change: this.textUpdate,
            handleChange: this.handleChange,
            navigate: this.navigate,
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
            focused: this.state.focused,
            height: "inherit",
            itemRenderer: this.props.itemRenderer,
            onClick: this.select,
            textField: this.props.textField,
            valueField: this.props.valueField
        };

        const listContainerStyle = {
            height: this.props.height
        };

        return (
            <span {...comboBoxProps}>
                <DropDownWrapper>
                    <SearchBar ref="searchBar" {...searchBarProps} />
                    <span className="k-select">
                        <Button ref="" {...buttonProps} />
                    </span>
                </DropDownWrapper>
                <ListContainer style={listContainerStyle} visible={this.state.expanded}>
                    <List {...listProps} />
                </ListContainer>
            </span>
        );
    }
}

ComboBox.defaultProps = defaultProps;
ComboBox.propTypes = propTypes;

export default ComboBox;
