import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class ListFilter extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        preventBlur: PropTypes.func,
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
        this.props.preventBlur(true);
        this.refs.input.focus();
    };

    onKeyUp = (event) => {
        event.stopPropagation();
        this.props.onChange(event.target.value);
    };

    onBlur = () => {
        this.props.preventBlur(false);
    }

    render() {
        return (
            <span className={styles['list-filter']}>
                <input
                    ref="input"
                    className={styles['textbox']}
                    onBlur={this.onBlur}
                    onKeyUp={this.onKeyUp}
                    onMouseDown={this.onMouseDown}
                />
                <span className={classNames(styles.icon, styles['i-search'])} unselectable="on"></span>
            </span>
        );
    }
}
