import React, { PropTypes } from 'react';
import keycode from 'keycode';
import classNames from 'classnames';
import * as util from '../Util';
import { List, ListContainer, ListFilter, ListDefaultItem, DropDownWrapper } from './main';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class DropDownList extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        dataItem: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ]),
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
        filter: PropTypes.string,
        filterable: PropTypes.bool,
        focused: PropTypes.number,
        height: PropTypes.number,
        ignoreCase: PropTypes.bool,
        itemRenderer: PropTypes.func,
        onChange: PropTypes.func,
        onNavigate: PropTypes.func,
        onFilter: PropTypes.func,
        onToggle: PropTypes.func,
        selected: PropTypes.number,
        show: PropTypes.bool,
        style: PropTypes.object, // eslint-disable-line
        tabIndex: PropTypes.number,
        textField: PropTypes.string,
        valueField: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        delay: 500,
        height: 200,
        ignoreCase: true,
        tabIndex: 0,
        onChange: function() {},
        onFilter: function() {},
        onNavigate: function() {}
    };

    constructor(props) {
        super(props);

        this.word = "";
        this.last = "";
    }

    componentDidMount() {
        if (this.props.show) {
            document.documentElement.addEventListener('mousedown', this.detectBlur, true);
        }

        if (this.props.show && this.refs.list) {
            this.refs.list.scrollToItem();
        }
    }

    componentDidUpdate() {
        if (this.props.show) {
            document.documentElement.addEventListener('mousedown', this.detectBlur, true);

            const listContainer = this.refs.ListContainer;
            const list = this.refs.List;

            util.resizeList(list.refs.element, listContainer.refs.element, this.props.height);
            list.scrollToItem();
        } else {
            document.documentElement.removeEventListener('mousedown', this.detectBlur, true);
        }
    }

    componentWillUnmount() {
        document.documentElement.removeEventListener('mousedown', this.detectBlur, true);
    }

    renderValue() {
        const { dataItem, textField, defaultItem, valueRenderer } = this.props;
        let value;

        if (dataItem) {
            value = util.getter(dataItem, textField);
        } else if (defaultItem) {
            value = util.getter(defaultItem, textField);
        } else {
            return "";
        }

        return valueRenderer ? valueRenderer(dataItem) : value;
    }

    listFilterChange = (text) => {
        if (this.prevFilterWord !== text) {
            this.prevFilterWord = text;
            this.props.onFilter(text);
        }
    };

    search() {
        clearTimeout(this.typingTimeout);

        if (!this.props.filterable) {
            this.typingTimeout = setTimeout(() => {
                this.word = "";
            }, this.props.delay);

            this.selectNext();
        }
    }

    selectNext() {
        let data = this.props.data.slice();
        const { textField, valueField, defaultItem, ignoreCase } = this.props;
        const dataLength = data.length + (defaultItem ? 1 : 0);
        const isInLoop = util.sameCharsOnly(this.word, this.last);
        let startIndex = this.props.selected || 0 + (defaultItem ? 1 : 0);

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
            if (defaultItem && util.getter(data[index], valueField) === util.getter(defaultItem, valueField)) {
                this.selectByIndex(-1);
            } else {
                this.selectByIndex(util.normalizeIndex(startIndex + index, dataLength));
            }
        }
    }

    selectByIndex = (index) => {
        if (index === -1) {
            this.select(this.props.defaultItem);
        } else {
            this.select(this.props.data[this.props.defaultItem ? index - 1 : index]);
        }
    };

    change = (dataItem) => {
        if (!this.props.disabled) {
            this.props.onChange(dataItem);
        }
    };

    select = (dataItem) => {
        if (!this.props.disabled) {
            this.props.onNavigate(dataItem);
        }
    };

    allowOpening = () => {
        const { defaultItem, filterable, data } = this.props;
        return defaultItem || filterable || data.length;
    };

    toggle = () => {
        if (!this.props.disabled) {
            if (this.props.show) {
                this.props.onToggle(false);
            } else {
                if (this.allowOpening()) {
                    this.props.onToggle(true);
                }
            }
        }
    };

    detectBlur = (event) => {
        if (!this.refs.anchor.contains(event.target)) {
            this.blur();
        }
    };

    blur = () => {
        this.props.onChange(this.props.dataItem);
    };

    onKeyDown = (event) => {
        const keyCode = event.keyCode;
        const { data, defaultItem, disabled, show } = this.props;
        const max = data.length - 1;
        const min = this.props.defaultItem ? -1 : 0;
        let focused = this.props.focused;
        let dataItem, handled = false;

        if (disabled) { return; }

        if (event.altKey && keyCode === keycode.codes.down) {
            event.preventDefault();

            if (!show) {
                this.props.onToggle(true);
            }
            return;
        }

        if ((event.altKey && keyCode === keycode.codes.up) || (keyCode === keycode.codes.esc)) {
            event.preventDefault();

            if (show) {
                this.props.onToggle(false);
            }
            return;
        }

        if (keyCode === keycode.codes.enter) {
            event.preventDefault();

            dataItem = (focused === -1) ? defaultItem || null : this.props.data[focused];
            this.change(dataItem || (data[focused] || defaultItem));

            return;
        }

        if (keyCode === keycode.codes.tab) {
            this.blur();
            return;
        }

        if (keyCode === keycode.codes.up || keyCode === keycode.codes.left) {
            if (focused === null) {
                focused = max;
            } else {
                focused = focused !== min ? focused - 1 : min;
            }
            handled = true;
        }

        if (keyCode === keycode.codes.down || keyCode === keycode.codes.right) {
            if (focused === null) {
                focused = min;
            } else {
                focused = focused !== max ? focused + 1 : max;
            }
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
            event.preventDefault();
            this.select(dataItem || (data[focused] || defaultItem));
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
            height,
            itemRenderer,
            defaultItem,
            disabled,
            filter,
            filterable,
            selected,
            focused,
            show,
            style,
            tabIndex
        } = this.props;

        const listProps = {
            data,
            textField,
            valueField,
            height,
            itemRenderer,
            onClick: this.change,
            focused,
            selected
        };

        const defaultItemProps = {
            focused: focused === -1,
            selected: selected === -1,
            textField: textField,
            dataItem: defaultItem,
            onClick: this.change,
            renderer: itemRenderer
        };

        const listFilterProps = {
            onChange: this.listFilterChange,
            focused: show,
            filter: filter
        };

        const wrapperClasses = classNames({
            [styles.widget]: true,
            [styles.dropdown]: true,
            [styles.header]: true
        }, this.props.className);

        const ariaAttributes = {
            'role': 'listbox',
            'aria-haspopup': true,
            'aria-show': show,
            'aria-owns': "", //TODO: check if this is required, in react the popup will be placed in the widget container
            'aria-disabled': disabled,
            'aria-activedescendant': "" //TODO: check if this is required
        };

        const dropDownListProps = {
            className: wrapperClasses,
            onKeyDown: this.onKeyDown,
            onKeyPress: this.onKeyPress,
            onClick: this.toggle,
            style: style,
            tabIndex: tabIndex,
            ...ariaAttributes
        };

        const listContainerProps = {
            anchor: this.refs.anchor,
            show: show
        };

        return (
            //TODO: aria attributes, title
            <span {...dropDownListProps} ref="anchor" unselectable="on">
                <DropDownWrapper disabled={disabled}>
                    <span className={styles.input} unselectable="on">
                        {this.renderValue()}
                    </span>
                    <span className={styles.select} unselectable="on">
                        <span className={classNames(styles.icon, styles['i-arrow-s'])}></span>
                    </span>
                </DropDownWrapper>
                <ListContainer ref="ListContainer"{...listContainerProps}>
                    {filterable && <ListFilter {...listFilterProps} />}
                    {defaultItem && <ListDefaultItem {...defaultItemProps} />}
                    <List ref="List" {...listProps} />
                </ListContainer>
            </span>
        );
    }
}
