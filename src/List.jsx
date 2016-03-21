import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import DefaultItem from './DefaultItem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        defaultItem: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        focused: PropTypes.number,
        height: PropTypes.number, //TODO: may change to something like popupProps: { style: { height: "" } }, to discuss after there is a popup prototype
        itemRenderer: PropTypes.func,
        onClick: PropTypes.func,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        valueField: PropTypes.string
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

    clickHandler = (dataItem) => {
        this.props.onClick(dataItem);
    };

    renderItems() {
        const { itemRenderer, textField, valueField, focused } = this.props;
        const value = this.props.value || {};

        return this.props.data.map((item, index) => (
                //TODO: assign unique key
                <ListItem
                    dataItem={item}
                    focused={index === focused}
                    key={item.text}
                    onClick={this.clickHandler}
                    renderer={itemRenderer}
                    selected={item[valueField] === value}
                    textField={textField}
                />
            )
        );
    }

    render() {
        const style = {
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
            <div className="k-list-container k-popup k-group k-reset" style={style}>
                {defaultItem && <DefaultItem {...defaultItemProps} />}
                <div className="k-list-scroller" unselectable="on">
                    <ul className="k-list k-reset" ref="ul">{this.renderItems()}</ul>
                </div>
            </div>
        );
    }
}
