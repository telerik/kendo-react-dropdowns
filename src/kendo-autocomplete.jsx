import * as React from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';

export default class KendoAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || null
        };
        this.searchAction = this.searchHandler.bind(this);
        this.changeAction = this.changeHandler.bind(this);
    }
    renderValue() {
        const value = this.state.value;
        const renderer = this.props.valueRenderer;

        if (typeof(renderer) === "function") {
            return renderer(value);
        }

        return value;
    }
    searchHandler(text) {
        this.props.onSearch(text);
        this.setState( { value: text } );
    }
    changeHandler(dataItem) {
        this.setState( { value: dataItem[this.props.textField] } );
    }
    render() {
        const listProps = {
            data: this.props.data,
            renderer: this.props.itemRenderer,
            onSearch: this.searchAction,
            onClick: this.changeAction, //TODO: onChange or onClick? List is stateless!
            textField: this.props.textField
        };

        return (
            <span>
                <KendoSearchBar change={listProps.onSearch} searchText={this.state.value} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

KendoAutoComplete.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    itemRenderer: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    textField: React.PropTypes.string,
    value: React.PropTypes.string,
    valueRenderer: React.PropTypes.func
};
