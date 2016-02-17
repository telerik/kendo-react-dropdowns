import React, { PropTypes } from 'react';
import KendoList from './kendo-list';
import KendoSearchBar from './kendo-searchbar';

const propTypes = {
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

const defaultProps = {
    minLength: 1
};

class KendoAutoComplete extends React.Component {
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
        const minLength = this.props.minLength;
        const separator = this.props.separator;
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

KendoAutoComplete.propTypes = propTypes;
KendoAutoComplete.defaultProps = defaultProps;

export default KendoAutoComplete;
