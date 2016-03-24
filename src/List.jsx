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
        const { itemRenderer, textField, valueField, focused, selected } = this.props;

        return this.props.data.map((item, index) => (
                //TODO: assign unique key
                <ListItem
                    dataItem={item}
                    focused={index === focused}
                    key={util.getter(item, valueField)}
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
            height: 140
        };

        return (
            <div className="k-list-scroller" style={style} unselectable="on">
                <ul className="k-list k-reset" ref="ul">{this.renderItems()}</ul>
            </div>
        );
    }
}
