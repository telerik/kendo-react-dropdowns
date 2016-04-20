import React, { PropTypes } from 'react';
import * as util from '../Util';
import ListItem from './ListItem';

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ])),
        focused: PropTypes.number,
        //TODO: may change to something like popupProps: { style: { height: "" } }, to discuss after there is a popup prototype
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        itemRenderer: PropTypes.func,
        onClick: PropTypes.func,
        selected: PropTypes.number,
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
        if (focused) {
            focused.scrollIntoViewIfNeeded();
        }
    }

    setHeight(height) {
        this.refs.wrapper.style.height = height;
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
                    index={index}
                    key={util.getter(item, valueField) || item}
                    onClick={this.clickHandler}
                    renderer={itemRenderer}
                    selected={index === selected}
                    textField={textField}
                />
            )
        );
    }

    render() {
        return (
            <div className="k-list-scroller" ref="wrapper" style={{ height: this.props.height }} unselectable="on">
                <ul className="k-list k-reset" ref="ul">{this.renderItems()}</ul>
            </div>
        );
    }
}
