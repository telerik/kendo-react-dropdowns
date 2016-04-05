import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class ListFilter extends React.Component {

    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    onMouseDown = (event) => {
        event.preventDefault();
    };

    onKeyPress = (event) => {
        event.stopPropagation();
    };

    onChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <span className={styles['list-filter']}>
                <input className={styles['textbox']} onChange={this.onChange} onKeyPress={this.onKeyPress} />
                <span className={classNames(styles.icon, styles['i-search'])} unselectable="on"></span>
            </span>
        );
    }
}
