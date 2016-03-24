import React, { PropTypes } from 'react';
import * as util from './Util';
import ListItem from './ListItem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        focused: PropTypes.number,
        height: PropTypes.number, //TODO: may change to something like popupProps: { style: { height: "" } }, to discuss after there is a popup prototype
        itemRenderer: PropTypes.func,
        onClick: PropTypes.func,
        selected: PropTypes.number,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        valueField: PropTypes.string,
        visible: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        let focused = this.refs.ul.children[this.props.focused];
        //TODO: check if already visible
        if (focused) {
            focused.scrollIntoView();
        }
    }

    clickHandler = (dataItem, index) => {
        this.props.onClick(dataItem, index);
    };

    renderItems() {
        const { itemRenderer, textField, valueField, focused, selected } = this.props;

        return this.props.data.map((item, index) => (
                //TODO: assign unique key
                <ListItem
                    dataItem={item}
                    focused={index === focused}
                    key={util.getter(item, valueField)}
                    index={index}
                    onClick={this.clickHandler}
                    renderer={itemRenderer}
                    selected={index === selected}
                    textField={textField}
                />
            )
        );
    }

    render() {
        const style = {
            height: 140,
            display: this.props.visible ? "block" : "none",
            height: this.props.height || 200,
            overflowY: "scroll" //TODO: remove after popup is added
        };

        const {
            focused,
            value,
            defaultItem,
            textField,
            itemRenderer
        } = this.props;

        const defaultItemProps = {
            focused: focused === -1,
            selected: value === undefined,
            textField: textField,
            dataItem: defaultItem,
            onClick: this.clickHandler,
            renderer: itemRenderer
        };

        return (
            <div className="k-list-scroller" style={style} unselectable="on">
                <ul className="k-list k-reset" ref="ul">{this.renderItems()}</ul>
            </div>
        );
    }
}
