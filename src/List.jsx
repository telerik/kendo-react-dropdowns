import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ListItem from './ListItem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

const OptionLabel = ({ text, selected, focused }) => {
    const labelClasses = classNames({
        'k-list-optionlabel': true,
        'k-state-selected': selected,
        'k-state-focused': focused
    });

    return (
        <div className={labelClasses}>{text}</div>
    );
};

export default class List extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        focused: PropTypes.number,
        height: PropTypes.number, //TODO: may change to something like popupProps: { style: { height: "" } }, to discuss after there is a popup prototype
        onClick: PropTypes.func,
        optionLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
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
    }

    clickHandler = (dataItem) => {
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
                    onClick={this.clickHandler}
                    renderer={renderer}
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

        const optionLabelProps = {
            focused: this.props.focused === -1,
            selected: this.props.value === undefined,
            text: this.props.optionLabel
        };

        return (
            <div className="k-list-container k-popup k-group k-reset" style={style}>
                {this.props.optionLabel && <OptionLabel {...optionLabelProps} />}
                <div className="k-list-scroller" unselectable="on">
                    <ul className="k-list k-reset">{this.renderItems()}</ul>
                </div>
            </div>
        );
    }
}
