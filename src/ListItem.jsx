import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as util from './Util';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class ListItem extends React.Component {

    static propTypes = {
        dataItem: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.string
        ]),
        focused: PropTypes.bool,
        index: PropTypes.number,
        onClick: PropTypes.func,
        renderer: PropTypes.func,
        selected: PropTypes.bool,
        textField: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.focused !== this.props.focused;
    }

    renderer() {
        const { dataItem, textField, renderer } = this.props;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }

        return util.getter(dataItem, textField);
    }

    onMouseDown = (event) => {
        event.preventDefault();
    };

    onClick = () => {
        this.props.onClick(this.props.dataItem, this.props.index);
    };

    render() {
        const itemClasses = classNames({
            'k-item': true,
            'k-state-selected': this.props.selected,
            'k-state-focused': this.props.focused
        });

        return (
            <li className={itemClasses}
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
            >
                {this.renderer()}
            </li>
        );
    }
}
