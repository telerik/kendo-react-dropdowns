import React, { PropTypes } from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';

class KendoAutoComplete extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        disabled: PropTypes.bool,
        itemRenderer: PropTypes.func,
        minLength: PropTypes.number,
        onSearch: PropTypes.func,
        placeholder: PropTypes.string,
        separator: PropTypes.string,
        textField: PropTypes.string,
        value: PropTypes.string,
        valueRenderer: PropTypes.func
    };

    static defaultProps = {
        minLength: 1
    };

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
        const { minLength, separator } = this.props;
        if (separator) {
            searchText = text.split(separator);
            searchText = searchText[searchText.length - 1];
        } else {
            searchText = text;
        }

        if (searchText.length >= minLength) {
            this.props.onSearch(searchText);
        }
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

        const searchBarProps = {
            change: this.searchAction,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            searchText: this.state.value
        };

        return (
            <span>
                <KendoSearchBar {...searchBarProps} />
                <KendoList {...listProps} />
            </span>
        );
    }
}

export default KendoAutoComplete;
