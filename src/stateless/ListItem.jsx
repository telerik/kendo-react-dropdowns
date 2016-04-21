import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as util from '../Util';
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

    handleMouseEnter = () => {
        this.refs.li.classList.add("k-state-hover");
    }

    handleMouseOut = () => {
        this.refs.li.classList.remove("k-state-hover");
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
            'k-item': true,
            'k-state-selected': this.props.selected,
            'k-state-focused': this.props.focused
        });

        const itemProps = {
            ref: "li",
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
