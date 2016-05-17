import React, { PropTypes } from 'react';
import * as Stateless from './stateless/main';
import * as util from './Util';

export default class ComboBox extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string,
            React.PropTypes.number
        ])),
        height: React.PropTypes.number,
        minLength: React.PropTypes.number,
        itemRenderer: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        filter: React.PropTypes.string,
        style: PropTypes.object, // eslint-disable-line
        suggest: React.PropTypes.bool,
        textField: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        valueField: React.PropTypes.string
    };

    static defaultProps = {
        onChange() {}
    };

    constructor(props) {
        super(props);

        this.prevText = "";
        this.prevValue = null;

        this.state = {
            value: null,
            text: "",
            dataItem: null,
            word: null,
            show: false,
            focused: -1,
            selected: -1,
            highlight: false
        };
    }

    componentWillMount() {
        this.resolveState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.resolveState(nextProps);
    }

    resolveState(props) {
        const { filter, suggest, data, textField, value } = props;
        const filtering = Boolean(filter !== null && filter !== undefined);

        this.prevText = this.state.text;
        if (filtering) {
            const itemIndex = data.indexOf(this.state.dataItem);
            const reducedOrEqual = util.textReduced(filter.toLowerCase(), this.prevText.toLowerCase()) || filter.length === this.prevText.length;
            const shouldSuggest = Boolean(!reducedOrEqual && suggest && filter.length);
            this.setState({
                show: Boolean(data.length),
                data: data,
                text: filter,
                focused: itemIndex === -1 ? 0 : itemIndex,
                selected: itemIndex,
                word: shouldSuggest ? util.getter(data[0], textField) : null,
                highlight: shouldSuggest
            });
        } else {
            const result = util.resolveValue(props);
            this.setState({
                value: value,
                data: data,
                dataItem: result.dataItem,
                text: util.getter(result.dataItem, textField) || value || "",
                focused: result.focused,
                selected: result.selected,
                word: null,
                highlight: false
            });
        }
    }

    handleSelect = (text, dataItem) => {
        this.handleChange(text, dataItem);
    }

    handleTextUpdate = (text) => {
        if (typeof this.props.onFilter === "function" ) {
            this.props.onFilter(text);
        } else {
            this.prevText = this.state.text;
            this.setState({ text: text });
        }
    }

    handleChange = (text, dataItem) => {
        const { textField, valueField } = this.props;
        let param;
        if (dataItem) {
            if (text !== util.getter(dataItem, textField)) {
                param = text;
            } else if (this.state.text !== util.getter(dataItem, textField)) {
                param = util.getter(dataItem, valueField);
            }
        } else {
            if (this.prevText !== text) {
                param = text;
            }
        }
        if (param !== undefined) {
            this.props.onChange(param);
        }
        this.setState({ show: false });
    }

    handleFilter = (filter) => {
        if (typeof this.props.onFilter === "function" ) {
            this.props.onFilter(filter);
        }
    }

    handleNavigate = (dataItem) => {
        this.props.onChange(util.getter(dataItem, this.props.valueField));
    }

    handleToggle = () => {
        if (!this.props.data.length) {
            this.handleFilter("");
        }
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const comboBoxProps = {
            //from state
            dataItem: this.state.dataItem,
            text: this.state.text,
            value: this.state.value,
            highlight: this.state.highlight,
            focused: this.state.focused,
            selected: this.state.selected,
            show: this.state.show,
            word: this.state.word,
            //from props
            disabled: this.props.disabled,
            minLength: this.props.minLength,
            height: this.props.height,
            suggest: this.props.suggest,
            data: this.props.data,
            placeholder: this.props.placeholder,
            valueField: this.props.valueField,
            textField: this.props.textField,
            itemRenderer: this.props.itemRenderer,
            //handlers
            onChange: this.handleChange,
            onTextUpdate: this.handleTextUpdate,
            onSelect: this.handleSelect,
            onToggle: this.handleToggle,
            onNavigate: this.handleNavigate
        };

        return (
            <Stateless.ComboBox {...comboBoxProps} />
        );
    }
}

