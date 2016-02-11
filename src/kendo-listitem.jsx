import * as React from 'react';
import classNames from 'classnames';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoListItem extends React.Component {
    constructor() {
        super();
    }
    renderer(dataItem) {
        const renderer = this.props.renderer;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }
        return (
            <span>{dataItem.text}</span>
        );
    }
    render() {
        const itemClasses = classNames({
            'k-item': true,
            'k-state-selected': this.props.selected
        });
        const content = this.renderer(this.props.dataItem);
        return (
            <li className={itemClasses}>{content}</li>
        );
    }
}

KendoListItem.propTypes = {
    dataItem: React.PropTypes.object, //eslint-disable-line react/forbid-prop-types
    renderer: React.PropTypes.func,
    selected: React.PropTypes.bool
};
