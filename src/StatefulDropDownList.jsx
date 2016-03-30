import React, { PropTypes } from 'react';
import * as util from './Util';
import DropDownList from './DropDownList';

export default class StatefulDropDownList extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        defaultItem: function(props, propName, componentName) {
            if (props.defaultItem && props.valueField && typeof props.defaultItem !== "object") {
                return new Error(`
                    ${componentName} invalid configuration.
                    DefaultItem type should match the data items type!
                    Define the defaultItem as an object with ${props.textField} and ${props.valueField} fields!
                `);
            }
        },
        delay: PropTypes.number,
        disabled: PropTypes.bool,
        filterable: PropTypes.bool,
        height: PropTypes.number,
        ignoreCase: PropTypes.bool,
        index: PropTypes.number,
        itemRenderer: PropTypes.func,
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
    }

    state = {
        dataItem: null,
        selected: null,
        focused: null,
        expanded: false
    };

    componentWillMount() {
        const state = util.resolveInitialValue(this.props);
        if (state) {
            this.setState(state);
        }
    }

    onFilter = (text) => {
        this.setState({
            selected: null,
            focused: 0
        });

        if (this.props.onFilter) {
            this.props.onFilter(text);
        }
    };

    onSelect = (dataItem) => {
        this.setState({
            dataItem: dataItem,
            selected: this.props.data.indexOf(dataItem),
            focused: this.props.data.indexOf(dataItem)
        });
        //TODO: fire change
    };

    onToggle = (isOpen) => {
        this.setState({ expanded: isOpen });
    };

    render() {
        const {
            data,
            defaultItem,
            delay,
            disabled,
            filterable,
            height,
            ignoreCase,
            index,
            itemRenderer,
            tabIndex,
            textField,
            valueField,
            valueRenderer
        } = this.props;

        const dropDownListProps = {
            data,
            defaultItem,
            delay,
            disabled,
            filterable,
            height,
            ignoreCase,
            index,
            itemRenderer,
            tabIndex,
            textField,
            valueField,
            valueRenderer,

            onSelect: this.onSelect,
            onFilter: this.onFilter,
            onToggle: this.onToggle
        };

        return (
            <DropDownList {...dropDownListProps} {...this.state} />
        );
    }
}
