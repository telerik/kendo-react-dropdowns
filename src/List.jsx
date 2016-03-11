import React, { PropTypes } from 'react';
import ListItem from './ListItem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        focused: PropTypes.number,
        onClick: PropTypes.func,
        renderer: PropTypes.func,
        textField: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        valueField: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.clickAction = this.clickHandler.bind(this);
    }

    clickHandler(dataItem) {
        this.props.onClick(dataItem);
    }

    renderItems() {
        const { renderer, textField, valueField, focused } = this.props;
        const value = this.props.value || {};

        return this.props.data.map((item, index) => (
                //TODO: assign unique key
                <ListItem
                    dataItem={item}
                    focused={index === focused}
                    key={item.text}
                    onClick={this.clickAction}
                    renderer={renderer}
                    selected={item[valueField] === value}
                    textField={textField}
                />
            )
        );
    }

    render() {
        return (
            <ul className="k-list k-reset">{this.renderItems()}</ul>
        );
    }
}
