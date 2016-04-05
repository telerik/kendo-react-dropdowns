import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as util from '../Util';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

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
        return (nextProps.focused !== this.props.focused) || (nextProps.selected !== this.props.selected);
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.dataItem, this.props.index);
    }

    renderer() {
        const { dataItem, textField, renderer } = this.props;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }

        return util.getter(dataItem, textField);
    }

    render() {
        const itemClasses = classNames({
            [styles.item]: true,
            [styles['state-selected']]: this.props.selected,
            [styles['state-focused']]: this.props.focused
        });

        const itemProps = {
            className: itemClasses,
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseOut: this.handleMouseOut
        };

        return (
            <li {...itemProps} >
                {this.renderer()}
            </li>
        );
    }
}
