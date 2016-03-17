import React, { PropTypes } from 'react';
import keycode from 'keycode';
import * as util from './Util';
import List from './List';
import DropDownWrapper from './DropDownWrapper';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class DropDownList extends React.Component {

    static propTypes = {
        change: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object),
        defaultItem: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        delay: PropTypes.number,
        disabled: PropTypes.bool,
        height: PropTypes.number,
        ignoreCase: PropTypes.bool,
        index: PropTypes.number,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        onChange: PropTypes.func,
        onFilter: PropTypes.func,
        tabIndex: PropTypes.number,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            dataItem: null,
            selected: null,
            focused: null
        };

        this.word = "";
        this.last = "";
    }

    componentWillMount() {
        const { data, defaultItem, value, index, valueField } = this.props;
        let dataItem;

        if (value) {
            dataItem = util.resolveInitialValue(data, value, valueField);
            this.setState({
                dataItem: dataItem,
                selected: data.indexOf(dataItem),
                focused: data.indexOf(dataItem)
            });
        } else if (index) {
            dataItem = data[index];
            this.setState({
                dataItem: data[index],
                selected: index,
                focused: index
            });
        } else if (defaultItem) {
            dataItem = (typeof(defaultItem) === "object") ? defaultItem : null;
            this.setState({
                dataItem: dataItem,
                selected: dataItem ? -1 : null,
                focused: dataItem ? -1 : null
            });
        }
    }

    renderValue() {
        const dataItem = this.state.dataItem;
        const { textField , defaultItem = "", valueRenderer } = this.props;
        let value;

        if (dataItem) {
            value = dataItem[textField];
        } else if (typeof defaultItem === "object") {
            value = defaultItem[textField];
        } else {
            //do not execute the value template
            return defaultItem;
        }

        return (typeof(valueRenderer) === "function") ? valueRenderer(value) : value;
    }

    search() {
        clearTimeout(this.typingTimeout);

        //TODO: handle filter input scenrio

        this.typingTimeout = setTimeout(() => {
            this.word = "";
        }, this.props.delay);

        this.selectNext();
    }

    selectNext() {
        let data = this.props.data.slice();
        const dataLength = data.length + (this.props.defaultItem ? 1 : 0);
        const isInLoop = util.sameCharsOnly(this.word, this.last);
        let startIndex = this.state.selected;
        const { defaultItem, textField, valueField, ignoreCase } = this.props;
        const additionalItem = (typeof(defaultItem) === "object") ? defaultItem : { [textField]: defaultItem, [valueField]: null };

        let text, index;

        if (startIndex === -1) {
            startIndex = 0;
        } else {
            startIndex += isInLoop ? 1 : 0;
            startIndex = util.normalizeIndex(startIndex, dataLength);
        }

        data = util.shuffleData(data, startIndex, defaultItem, additionalItem);

        for (let idx = 0; idx < dataLength; idx++) {
            text = data[idx][textField];
            index = idx;

            if (isInLoop && util.matchText(text, this.last, ignoreCase)) {
                break;
            } else if (util.matchText(text, this.word, ignoreCase)) {
                break;
            }
        }

        if (index !== dataLength) {
            //oldFocusedItem = this._focus();

            this.selectByIndex(util.normalizeIndex(startIndex + index, dataLength));

            /* TODO: cancel-able event
            if (that.trigger("select", { item: that._focus() })) {
                that._select(oldFocusedItem);
            }
            */

            /* TODO: change event?
            if (!that.popup.visible()) {
                that._change();
            }
            */
        }
    }

    selectByIndex(index) {
        const defaultItem = this.props.defaultItem;
        let dataItem;

        if (index === -1) {
            dataItem = (typeof(defaultItem) === "object") ? defaultItem : null;
            this.setState({
                dataItem: dataItem,
                selected: index,
                focused: index
            });
        } else {
            this.select(this.props.data[defaultItem ? index - 1 : index]);
        }
    }

    select = (dataItem) => {
        if (!this.props.disabled) {
            this.setState({
                dataItem: dataItem,
                selected: this.props.data.indexOf(dataItem),
                focused: this.props.data.indexOf(dataItem)
            });
        }
    }

    onKeyDown = (event) => {
        const keyCode = event.keyCode;
        const data = this.props.data;
        const max = data.length - 1;
        const min = this.props.defaultItem ? -1 : 0;
        const disabled = this.props.disabled;
        let { focused } = this.state;
        let dataItem, handled;

        if (disabled) { return; }

        if (keyCode === keycode.codes.enter) {
            if (focused === -1) {
                dataItem = (typeof(this.props.defaultItem) === "object") ? this.props.defaultItem : null;
            } else {
                dataItem = this.props.data[focused];
            }

            handled = true;
        }

        if (keyCode === keycode.codes.up || keyCode === keycode.codes.left) {
            focused = (focused !== null && focused !== min) ? focused - 1 : max;
            handled = true;
        }

        if (keyCode === keycode.codes.down || keyCode === keycode.codes.right) {
            focused = (focused !== null && focused !== max) ? focused + 1 : min;
            handled = true;
        }

        if (keyCode === keycode.codes.home) {
            focused = min;
            handled = true;
        }

        if (keyCode === keycode.codes.end) {
            focused = max;
            handled = true;
        }

        if (handled) {
            this.setState({
                dataItem: dataItem || data[focused],
                focused: focused,
                selected: focused
            });
        }
    }

    onKeyPress = (event) => {
        if (event.which === 0 || event.keyCode === keycode.codes.enter) {
            return;
        }

        let character = String.fromCharCode(event.charCode || event.keyCode);

        if (this.props.ignoreCase) {
            character = character.toLowerCase();
        }

        if (character === " ") {
            event.preventDefault();
        }

        this.word += character;
        this.last = character;

        this.search();
    }

    render() {
        const {
            data,
            textField,
            valueField,
            value,
            height,
            itemRenderer,
            defaultItem,
            disabled
        } = this.props;

        const {
            selected,
            focused,
            dataItem
        } = this.state;

        const listProps = {
            data,
            textField,
            valueField,
            value: dataItem ? dataItem[valueField] : value,
            height,
            itemRenderer,
            defaultItem,
            onClick: this.select,
            focused,
            selected
        };

        const ariaAttributes = {
            'role': 'listbox',
            'aria-haspopup': true,
            'aria-expanded': false, //TODO: has to change when popup is toggled
            'aria-owns': "", //TODO: check if this is required, in react the popup will be placed in the widget container
            'aria-disabled': false, //TODO: has to change when the widget is enabled/disabled
            'aria-readonly': false, //TODO: check if this is required
            'aria-busy': false,
            'aria-activedescendant': "" //TODO: check if this is required
        };

        return (
            //TODO: aria attributes, title
            <span className="k-widget k-dropdown k-header"
                onKeyDown={this.onKeyDown}
                onKeyPress={this.onKeyPress}
                tabIndex="0"
                unselectable="on"
                {...ariaAttributes}
            >
                <DropDownWrapper disabled={disabled}>
                    <span className="k-input" unselectable="on">
                        {this.renderValue()}
                    </span>
                    <span className="k-select" unselectable="on">
                        <span className="k-icon k-i-arrow-s"></span>
                    </span>
                </DropDownWrapper>
                <List {...listProps} />
            </span>
        );
    }
}
