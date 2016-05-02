import React, { PropTypes } from 'react';
import * as util from './Util';
import * as Stateless from './stateless/main';

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
        index: PropTypes.number,
        itemRenderer: PropTypes.func,
        onChange: PropTypes.func,
        onFilter: PropTypes.func,
        onSelect: PropTypes.func,
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
        onFilter: function() {},
        onSelect: function() {}
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
            focused: this.props.highlightFirst ? 0 : null
        });

        this.props.onFilter(text);
    };

    onSelect = (dataItem) => {
        const { onSelect, valueField } = this.props;

        if (this.previous === util.getter(dataItem, valueField)) {
            return;
        }

        this.setState({
            dataItem: dataItem,
            selected: this.props.data.indexOf(dataItem),
            focused: this.props.data.indexOf(dataItem)
        });

        onSelect(util.getter(dataItem, valueField), dataItem);
        this.previous = util.getter(dataItem, valueField);
    };

    onChange = (dataItem) => {
        const { onChange, valueField } = this.props;
        const item = dataItem ? dataItem : this.state.dataItem;


        if (item) {
            this.onSelect(item);
            onChange(util.getter(item, valueField), item);
        }
    };

    onOpen = () => {
        this.setState({ show: true });
    };

    onClose = () => {
        this.setState({ show: false });
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
            index,
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
            index,
            itemRenderer,
            style,
            tabIndex,
            textField,
            valueField,
            valueRenderer,

            onSelect: this.onSelect,
            onChange: this.onChange,
            onFilter: this.onFilter,
            onOpen: this.onOpen,
            onClose: this.onClose
        };

        return (
            <Stateless.DropDownList {...dropDownListProps} {...this.state} />
        );
    }
}
