import * as React from 'react';
import classNames from 'classnames';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.clickAction = this.clickHandler.bind(this);
    }
    renderer() {
        const dataItem = this.props.dataItem;
        const renderer = this.props.renderer;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }

        return dataItem[this.props.textField];
    }
    clickHandler() {
        this.props.onClick(this.props.dataItem);
    }
    render() {
        const itemClasses = classNames({
            'k-item': true,
            'k-state-selected': this.props.selected
        });
        const content = this.renderer();
        return (
            <li className={itemClasses} onClick={this.clickAction}>{content}</li>
        );
    }
}

KendoListItem.propTypes = {
    dataItem: React.PropTypes.object, //eslint-disable-line react/forbid-prop-types
    onClick: React.PropTypes.func,
    renderer: React.PropTypes.func,
    selected: React.PropTypes.bool,
    textField: React.PropTypes.string
};
