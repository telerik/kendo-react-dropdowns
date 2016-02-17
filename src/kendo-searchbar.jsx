import React from 'react';

export default class KendoSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.changeAction = this.change.bind(this);
    }

    change(event) {
        this.props.change(event.target.value);
    }

    render() {
        const { searchText } = this.props;

        return (
            <input
                disabled={this.props.disabled}
                onChange={this.changeAction}
                placeholder={this.props.placeholder}
                value={searchText}
            />
        );
    }
}

KendoSearchBar.propTypes = {
    change: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    searchText: React.PropTypes.string
};
