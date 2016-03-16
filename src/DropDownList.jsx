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
        disabled: PropTypes.bool,
        height: PropTypes.number,
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
        const max = this.props.data.length - 1;
        const min = this.props.defaultItem ? -1 : 0;
        const disabled = this.props.disabled;
        let { focused } = this.state;
        let dataItem;

        if (disabled) { return; }

        if (keyCode === keycode.codes.enter) {
            if (focused === -1) {
                dataItem = (typeof(this.props.defaultItem) === "object") ? this.props.defaultItem : null;
            } else {
                dataItem = this.props.data[focused];
            }
            this.setState({
                dataItem: dataItem,
                selected: focused
            });

            return;
        }

        if (keyCode === keycode.codes.up) {
            focused = (focused !== null && focused !== min) ? focused - 1 : max;
        }

        if (keyCode === keycode.codes.down) {
            focused = (focused !== null && focused !== max) ? focused + 1 : min;
        }

        this.setState({
            focused: focused
        });
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
