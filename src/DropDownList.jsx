import React, { PropTypes } from 'react';
import { DropDownsUtil as util } from '@telerik/kendo-dropdowns-common';
import * as Stateless from './stateless/all';

export default class DropDownList extends React.Component {
    static propTypes = {
        className: PropTypes.string,
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
        highlightFirst: PropTypes.bool,
        ignoreCase: PropTypes.bool,
        itemRenderer: PropTypes.func,
        onChange: PropTypes.func,
        onFilter: PropTypes.func,
        style: PropTypes.object, // eslint-disable-line
        tabIndex: PropTypes.number,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        highlightFirst: true,
        onChange: function() {},
        onFilter: function() {}
    };

    state = {
        dataItem: null,
        selected: null,
        focused: null,
        show: false
    };

    componentWillMount() {
        this.setValue(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setValue(nextProps);
    }

    setValue(props) {
        const state = util.resolveValue(props);
        if (state) {
            this.setState(state);
        }
    }

    onFilter = (text) => {
        this.setState({
            selected: null,
            focused: this.props.highlightFirst ? 0 : null,
            filter: text
        });

        this.props.onFilter(text);
    };

    onNavigate = (dataItem) => {
        const { valueField } = this.props;
        const value = util.getter(dataItem, valueField);
        const current = util.getter(this.state.dataItem, valueField);

        if (value !== current) {
            this.props.onChange(value);
        }
    };

    onChange = (dataItem) => {
        const { valueField } = this.props;
        const value = util.getter(dataItem, valueField);
        const current = util.getter(this.state.dataItem, valueField);

        this.setState({
            show: false,
            filter: ""
        });

        if (value !== current) {
            this.props.onChange(value);
        }

        if (this.props.filterable) {
            this.props.onFilter("");
        }
    };

    onToggle = (show) => {
        this.setState({ show: show });
    };

    render() {
        const {
            className,
            data,
            defaultItem,
            delay,
            disabled,
            filterable,
            height,
            ignoreCase,
            itemRenderer,
            style,
            tabIndex,
            textField,
            valueField,
            valueRenderer
        } = this.props;

        const dropDownListProps = {
            className,
            data,
            defaultItem,
            delay,
            disabled,
            filterable,
            height,
            ignoreCase,
            itemRenderer,
            style,
            tabIndex,
            textField,
            valueField,
            valueRenderer,

            onNavigate: this.onNavigate,
            onChange: this.onChange,
            onFilter: this.onFilter,
            onToggle: this.onToggle
        };

        return (
            <Stateless.DropDownList {...dropDownListProps} {...this.state} />
        );
    }
}
