import * as React from 'react';
import classNames from 'classnames';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

const propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    focused: React.PropTypes.bool,
    onClick: React.PropTypes.function
};

class DropDownWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleFocus = () => {
            this.refs.span.classList.add(styles['state-focused']);
        };
        this.handleBlur = () => {
            this.refs.span.classList.remove(styles['state-focused']);
        };
    }

    render() {
        const wrapperClasses = classNames({
            [styles['dropdown-wrap']]: true,
            [styles['state-default']]: !this.props.disabled,
            [styles['state-disabled']]: this.props.disabled
        }, this.props.className);

        const wrapperProps = {
            ref: "span",
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.props.onClick,
            className: wrapperClasses,
            tabIndex: -1,
            unselectable: true
        };

        return (
            <span {...wrapperProps} unselectable="on">
                {this.props.children}
            </span>
        );
    }
}

DropDownWrapper.propTypes = propTypes;

export default DropDownWrapper;
