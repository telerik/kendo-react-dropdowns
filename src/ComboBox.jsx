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
        style: PropTypes.object, // eslint-disable-line
        suggest: React.PropTypes.bool,
        text: React.PropTypes.string,
        textField: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        valueField: React.PropTypes.string,
        visible: PropTypes.bool
    };

    static defaultProps = {
        onChange() {},
        onFilter() {}
    };

    constructor(props) {
        super(props);
        this.text = "";
        this._oldText = "";
        this._oldValue = "";
        this.state = {
            dataItem: null,
            highlight: null,
            show: false,
            value: this.props.value || "",
            focused: null,
            selected: null,
            text: null,
            word: null
        };
    }

    componentWillMount() {
        this.setValue(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, textField } = nextProps;
        this.setValue(nextProps);
        this.setState({
            show: data.length > 0,
            highlight: suggest,
            selected: null,
            focused: data.length ? util.itemIndex(this.text, data, textField) : -1 //filtered data focused item
        });
    }

    setValue(props) {
        const state = util.resolveValue(props);
        if (state) {
            if (state.dataItem && props.textField && props.valueField) {
                state.text = state.dataItem[props.textField];
                state.value = state.dataItem[props.valueField];
                this._oldText = state.text;
                this._oldValue = state.value;
            } else {
                state.value = this._oldValue = props.value;
                state.text = this._oldText = state.value ? state.value.toString() : "";
            }
            this.setState(state);
        }
    }

    handleBlur = (state) => {
        this.setState(state, this.handleChange.bind(this, state.value));
    }

    handleSelect = (state) => {
        this.setState(state, this.handleChange.bind(this, state.value));
    }

    handleTextUpdate = (state) => {
        this.text = state.text;
        this.setState(state);
    }

    handleChange = (text) => {
        if (this._oldText === text || this._oldValue === this.state.value) {
            return;
        }

        this._oldText = this.state.text;
        this._oldValue = this.state.value;
        this.props.onChange(this.state.value);
    }

    handleFilter = (word) => {
        const reducedOrEqual = util.textReduced(word.toLowerCase(), this.text.toLowerCase()) || word.length === this.text.length;
        if (!reducedOrEqual) {
            this.props.onFilter(word);
        }
    }

    handleNavigate = (keyCode, state) => {
        this.setState(state);
    }

    handleToggle = (state) => {
        if (!this.props.data.length) {
            this.handleFilter("");
        }
        this.setState(state);
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
            onFilter: this.handleFilter,
            onTextUpdate: this.handleTextUpdate,
            onSelect: this.handleSelect,
            onBlur: this.handleBlur,
            onToggle: this.handleToggle,
            onNavigate: this.handleNavigate
        };

        return (
            <div >
                <Stateless.ComboBox {...comboBoxProps} />
            </div>
        );
    }
}

