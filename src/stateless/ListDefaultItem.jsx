import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class ListDefaultItem extends React.Component {

    static propTypes = {
        dataItem: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        focused: PropTypes.bool,
        onClick: PropTypes.func,
        renderer: PropTypes.func,
        selected: PropTypes.bool,
        textField: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    renderer() {
        const { dataItem, textField, renderer } = this.props;

        if (typeof(renderer) === "function") {
            return renderer(dataItem);
        }

        return (typeof(dataItem) === "object") ? dataItem[textField] : dataItem;
    }

    onMouseDown = (event) => {
        event.preventDefault();
    };

    onClick = (event) => {
        event.preventDefault();
        const dataItem = this.props.dataItem;
        this.props.onClick((typeof(dataItem) === "object" ? dataItem : null));
    };

    render() {
        const { selected, focused } = this.props;
        const itemClasses = classNames({
            [styles['list-optionlabel']]: true,
            [styles['state-selected']]: selected,
            [styles['state-focused']]: focused
        });

        return (
            <div className={itemClasses} onClick={this.onClick} onMouseDown={this.onMouseDown}>
                {this.renderer()}
            </div>
        );
    }
}
