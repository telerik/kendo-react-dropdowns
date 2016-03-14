import React, { PropTypes } from 'react';
import * as util from './Util';
import List from '../List';
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
            dataItem: null
        };
    }

    componentWillMount() {
        const { data, defaultItem, value, index, valueField } = this.props;

        if (value) {
            this.setState({ dataItem: util.resolveInitialValue(data, value, valueField) });
        } else if (index) {
            this.setState({ dataItem: data[index] });
        } else if (defaultItem) {
            this.setState({ dataItem: (typeof(defaultItem) === "object") ? defaultItem : null });
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
        this.setState({ dataItem: dataItem });
    }

    render() {
        const {
            data,
            textField,
            valueField,
            value,
            height,
            itemRenderer,
            defaultItem
        } = this.props;

        const listProps = {
            data,
            textField,
            valueField,
            value,
            height,
            itemRenderer,
            defaultItem,
            onClick: this.select
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
            <span className="k-widget k-dropdown k-header" tabIndex="0" unselectable="on" {...ariaAttributes}>
                <span className="k-dropdown-wrap k-state-default" unselectable="on">
                    <span className="k-input" unselectable="on">
                        {this.renderValue()}
                    </span>
                    <span className="k-select" unselectable="on">
                        <span className="k-icon k-i-arrow-s"></span>
                    </span>
                    <List {...listProps} />
                </span>
            </span>
        );
    }
}
