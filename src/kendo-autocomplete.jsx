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
        let searchText;
        const separator = this.props.separator;
        if (separator) {
            searchText = text.split(separator);
            searchText = searchText[searchText.length - 1];
        } else {
            searchText = text;
        }

        this.props.onSearch(searchText);
        this.setState( { value: text } );
    }
    changeHandler(dataItem) {
        const separator = this.props.separator;
        const oldValue = this.state.value;
        if (!separator || !oldValue) {
            this.setState( { value: dataItem[this.props.textField] + separator } );
        } else {
            let newValue;
            newValue = this.state.value.split(separator);
            newValue[newValue.length - 1] = dataItem[this.props.textField];
            this.setState( { value: newValue.join(separator) + separator } );
        }
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
                <KendoSearchBar change={listProps.onSearch} placeholder={this.props.placeholder} searchText={this.state.value} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

KendoAutoComplete.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    itemRenderer: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    separator: React.PropTypes.string,
    textField: React.PropTypes.string,
    value: React.PropTypes.string,
    valueRenderer: React.PropTypes.func
};
