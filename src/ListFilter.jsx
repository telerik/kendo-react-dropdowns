import React, { PropTypes } from 'react';

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
            <span className="k-list-filter">
                <input className="k-textbox" onChange={this.onChange} onKeyPress={this.onKeyPress} />
                <span className="k-icon k-i-search" unselectable="on"></span>
            </span>
        );
    }
}
