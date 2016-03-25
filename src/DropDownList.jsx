import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import * as util from './Util';
import List from './List';
import ListContainer from './ListContainer';
import ListFilter from './ListFilter';
import ListDefaultItem from './ListDefaultItem';
import DropDownWrapper from './DropDownWrapper';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class DropDownList extends React.Component {

    static propTypes = {
        change: PropTypes.func,
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

    static defaultProps = {
        delay: 500,
        height: 200,
        ignoreCase: true
    };

    constructor(props) {
        super(props);
        this.state = {
            dataItem: null,
            selected: null,
            focused: null,
            expanded: false
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
            dataItem = defaultItem;
            this.setState({
                dataItem: dataItem,
                selected: dataItem ? -1 : null,
                focused: dataItem ? -1 : null
            });
        }
    }

    componentDidMount() {
        this.calculateListHeight();
    }

    componentDidUpdate() {
        this.calculateListHeight();
    }

    calculateListHeight() {
        const wrapper = ReactDOM.findDOMNode(this);
        if (wrapper) {
            const filterInput = wrapper.getElementsByClassName('k-list-filter')[0];
            const defaultItem = wrapper.getElementsByClassName('k-list-optionlabel')[0];
            const listHeight = this.props.height - (filterInput ? filterInput.offsetHeight : 0) - (defaultItem ? defaultItem.offsetHeight : 0);

            this.refs.list.setHeight(listHeight);
        }
    }

    renderValue() {
        const dataItem = this.state.dataItem;
        const { textField , defaultItem, valueRenderer } = this.props;
        let value;

        if (dataItem) {
            value = util.getter(dataItem, textField);
        } else if (defaultItem) {
            value = util.getter(defaultItem, textField);
        } else {
            return "";
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
        const { textField, valueField, defaultItem, ignoreCase } = this.props;
        const dataLength = data.length + (defaultItem ? 1 : 0);
        const isInLoop = util.sameCharsOnly(this.word, this.last);
        let startIndex = this.state.selected + (defaultItem ? 1 : 0);

        let text, index;

        startIndex += isInLoop ? 1 : 0;
        startIndex = util.normalizeIndex(startIndex, dataLength);

        data = util.shuffleData(data, startIndex, defaultItem);

        index = 0;
        for (; index < dataLength; index++) {
            text = util.getter(data[index], textField);

            if (isInLoop && util.matchText(text, this.last, ignoreCase)) {
                break;
            } else if (util.matchText(text, this.word, ignoreCase)) {
                break;
            }
        }

        if (index !== dataLength) {
            //oldFocusedItem = this._focus();

            if (defaultItem && util.getter(data[index], valueField) === util.getter(defaultItem, valueField)) {
                this.selectByIndex(-1);
            } else {
                this.selectByIndex(util.normalizeIndex(startIndex + index, dataLength));
            }

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
        if (index === -1) {
            this.setState({
                dataItem: this.props.defaultItem,
                selected: index,
                focused: index
            });
        } else {
            this.select(this.props.data[this.props.defaultItem ? index - 1 : index]);
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
    };

    toggle = () => {
        if (!this.props.disabled) {
            this.setState({ expanded: !this.state.expanded });
        }
    };

    listFilterChange = (text) => {
        this.setState({
            selected: null,
            focused: 0
        });
        this.props.onFilter(text);
    };

    onKeyDown = (event) => {
        const keyCode = event.keyCode;
        const { data, defaultItem, disabled } = this.props;
        const max = data.length - 1;
        const min = this.props.defaultItem ? -1 : 0;
        let { focused } = this.state;
        let dataItem, handled = false;

        if (disabled) { return; }

        if (keyCode === keycode.codes.enter) {
            dataItem = (focused === -1) ? defaultItem || null : this.props.data[focused];
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
    };

    onKeyPress = (event) => {
        if (event.which === 0 || event.keyCode === keycode.codes.enter) {
            return;
        }

        let character = String.fromCharCode(event.charCode || event.keyCode);

        if (!(this.props.ignoreCase === false)) {
            character = character.toLowerCase();
        }

        if (character === " ") {
            event.preventDefault();
        }

        this.word += character;
        this.last = character;

        this.search();
    };

    render() {
        const {
            data,
            textField,
            valueField,
            value,
            height,
            itemRenderer,
            defaultItem,
            disabled,
            filterable
        } = this.props;

        const {
            selected,
            focused,
            expanded
        } = this.state;

        const listProps = {
            data,
            textField,
            valueField,
            height,
            itemRenderer,
            onClick: this.select,
            focused,
            selected
        };

        const defaultItemProps = {
            focused: focused === -1,
            selected: value === undefined,
            textField: textField,
            dataItem: defaultItem,
            onClick: this.select,
            renderer: itemRenderer
        };

        const listFilterProps = {
            onChange: this.listFilterChange
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

        const style = {
            height: this.props.height
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
                    <span className="k-select" onClick={this.toggle} unselectable="on">
                        <span className="k-icon k-i-arrow-s"></span>
                    </span>
                </DropDownWrapper>
                <ListContainer style={style} visible={expanded}>
                    {filterable && <ListFilter {...listFilterProps} />}
                    {defaultItem && <ListDefaultItem {...defaultItemProps} />}
                    <List {...listProps} ref="list" />
                </ListContainer>
            </span>
        );
    }
}
