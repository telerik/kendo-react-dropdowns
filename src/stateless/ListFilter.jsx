import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/packages/dropdowns';

export default class ListFilter extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        focused: PropTypes.bool,
        value: PropTypes.string
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

    onClick = (event) => {
        event.stopPropagation();
    }

    onChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <span className={styles['list-filter']}>
                <input
                    ref="input"
                    className={styles['textbox']}
                    onClick={this.onClick}
                    onChange={this.onChange}
                    value={this.props.value}
                />
                <span className={classNames(styles.icon, styles['i-search'])} unselectable="on"></span>
            </span>
        );
    }
}
