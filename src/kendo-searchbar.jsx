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
                onChange={this.changeAction}
                value={searchText}
            />
        );
    }
}

KendoSearchBar.propTypes = {
    change: React.PropTypes.func,
    searchText: React.PropTypes.string
};
