import * as React from 'react';
import classNames from 'classnames';

const propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
};

class DropDownWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const wrapperClasses = classNames({
            'k-dropdown-wrap': true,
            'k-state-default': true
        }, this.props.className);

        const wrapperProps = {
            className: wrapperClasses,
            tabIndex: -1,
            unselectable: true
        };

        return (
            <span {...wrapperProps}>
                {this.props.children}
            </span >
        );
    }
}

DropDownWrapper.propTypes = propTypes;

export default DropDownWrapper;