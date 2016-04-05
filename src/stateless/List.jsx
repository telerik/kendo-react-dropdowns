import React, { PropTypes } from 'react';
import * as util from '../Util';
import ListItem from './ListItem';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        focused: PropTypes.number,
        selected: PropTypes.number,
        //TODO: may change to something like popupProps: { style: { height: "" } }, to discuss after there is a popup prototype
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        itemRenderer: PropTypes.func,
        onClick: PropTypes.func,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        valueField: PropTypes.string
    };

    static defaultProps = {
        onClick() {}
    };

    constructor(props) {
        super(props);
    }

    scrollToItem(index) {
        let item;
        if (index) {
            item = this.refs.ul.children[index];
        } else {
            if (this.props.selected !== null) {
                item = this.refs.ul.children[this.props.selected];
            }
            if (this.props.focused !== null) {
                item = this.refs.ul.children[this.props.focused];
            }
        }
        if (item) {
            item.scrollIntoViewIfNeeded();
        }
    }

    clickHandler = (dataItem, index) => {
        this.props.onClick(dataItem, index);
    }

    renderItems() {
        const { itemRenderer, textField, valueField, focused, selected } = this.props;

        return this.props.data.map((item, index) => (
                <ListItem
                    dataItem={item}
                    focused={index === focused}
                    selected={index === selected}
                    index={index}
                    key={util.getter(item, valueField) || item}
                    onClick={this.clickHandler}
                    renderer={itemRenderer}
                    textField={textField}
                />
            )
        );
    }

    render() {
        return (
            <div ref="element" className={styles['list-scroller']} style={{ maxHeight: this.props.height || "none" }} unselectable="on">
                <ul className={classNames(styles.list, styles.reset)} ref="ul">
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}
