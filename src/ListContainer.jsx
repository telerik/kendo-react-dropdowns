import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class ListContainer extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object // eslint-disable-line
    };

    constructor(props) {
        super(props);
    }

    render() {
        const containerClasses = classNames({
            'k-list-container': true,
            'k-popup': true,
            'k-group': true,
            'k-reset': true
        });

        return (
            <div className={containerClasses} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}
