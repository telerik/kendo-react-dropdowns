import React, { PropTypes } from 'react';
import classNames from 'classnames';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoListItem extends React.Component {

    static propTypes = {
        dataItem: PropTypes.object, //eslint-disable-line react/forbid-prop-types
        focused: PropTypes.bool,
        onClick: PropTypes.func,
        renderer: PropTypes.func,
        selected: PropTypes.bool,
        textField: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.clickAction = this.clickHandler.bind(this);
    }

    renderer() {
        const { dataItem, textField, renderer } = this.props;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }

        return dataItem[textField];
    }

    clickHandler() {
        this.props.onClick(this.props.dataItem);
    }

    render() {
        const itemClasses = classNames({
            'k-item': true,
            'k-state-selected': this.props.selected,
            'k-state-focused': this.props.focused
        });

        return (
            <li className={itemClasses} onClick={this.clickAction}>{this.renderer()}</li>
        );
    }
}
