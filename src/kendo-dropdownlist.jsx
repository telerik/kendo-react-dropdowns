import * as React from 'react';
import KendoList from './kendo-list';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoDropDownList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || null
        };
    }
    renderValue() {
        const value = this.state.value;
        const renderer = this.props.valueRenderer;

        if (typeof(renderer) === "function") {
            return renderer(value);
        }

        return value;
    }
    changeHandler(dataItem) {
        this.setState({ value: dataItem.value });
    }
    render() {
        let listProps = {
            data: this.props.data,
            value: this.props.value,
            renderer: this.props.itemRenderer,
            onChange: this.changeHandler.bind(this)
        };

        return (
            <span>
                {this.renderValue()}
                <KendoList {...listProps} />
            </span>
        );
    }
}

KendoDropDownList.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    itemRenderer: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    valueRenderer: React.PropTypes.func
};
