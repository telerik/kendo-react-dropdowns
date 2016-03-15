import * as React from 'react';
import classNames from 'classnames';

const propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool
};

class DropDownWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const wrapperClasses = classNames({
            'k-dropdown-wrap': true,
            'k-state-default': !this.props.disabled,
            'k-state-disabled': this.props.disabled
        }, this.props.className);

        const wrapperProps = {
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
