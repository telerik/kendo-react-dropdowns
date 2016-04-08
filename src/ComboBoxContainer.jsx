import React, { PropTypes } from 'react';
import ComboBox from './ComboBox';
import { itemIndex, getter } from './Util';

export default class ComboBoxContainer extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string,
            React.PropTypes.number
        ])),
        itemRenderer: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        style: PropTypes.object, // eslint-disable-line
        suggest: React.PropTypes.bool,
        textField: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.object,
            React.PropTypes.date,
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
        this._oldText = "";
        this._oldValue = "";
        this.state = {
            dataItem: null,
            highlight: null,
            show: false,
            value: this.props.value || "",
            focused: null,
            text: null,
            word: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { suggest, data, textField } = nextProps;
        if (suggest && data.length) {
            this.setState({
                show: data.length > 0,
                word: getter(data[0], textField),
                highlight: true,
                focused: itemIndex(this.text, data, textField) //filtered data focused item
            });
        }
    }

    handleBlur = (state) => {
        this.setState(state, this.handleChange.bind(this, state.value));
    };

    handleSelect = (state) => {
        this.setState(state, this.handleChange.bind(this, state.value));
    };

    handleTextUpdate = (state) => {
        this.text = state.text;
        this.setState(state);
    };

    handleChange = (text) => {
        if (this._oldText === text || this._oldValue === this.state.value) {
            return;
        }

        this._oldText = this.state.text;
        this._oldValue = this.state.value;
        this.props.onChange(this.state.value);
    }

    handleFilter = (word) => {
        this.props.onFilter(word);
    }

    handleNavigate = (keyCode, state) => {
        this.setState(state);
    };

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
            show: this.state.show,
            word: this.state.word,
            //from props
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
            <div>
                <ComboBox {...comboBoxProps} />
            </div>
        );
    }
}
