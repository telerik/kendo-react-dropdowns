import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class ListFilter extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        focused: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.refs.input && this.props.focused) {
            this.onMouseDown();
        }
    }

    componentDidUpdate() {
        if (this.refs.input && this.props.focused) {
            this.onMouseDown();
        }
    }

    onMouseDown = () => {
        this.refs.input.focus();
    };

    onKeyUp = (event) => {
        event.stopPropagation();
        this.props.onChange(event.target.value);
    };

    onClick = (event) => {
        event.stopPropagation();
    }

    render() {
        return (
            <span className={styles['list-filter']}>
                <input
                    ref="input"
                    className={styles['textbox']}
                    onBlur={this.onBlur}
                    onClick={this.onClick}
                    onKeyUp={this.onKeyUp}
                />
                <span className={classNames(styles.icon, styles['i-search'])} unselectable="on"></span>
            </span>
        );
    }
}
