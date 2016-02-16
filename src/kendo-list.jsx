import * as React from 'react';
import KendoListItem from './kendo-listitem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoList extends React.Component {
    constructor(props) {
        super(props);
        this.clickAction = this.clickHandler.bind(this);
    }
    clickHandler(dataItem) {
        this.props.onClick(dataItem);
    }
    renderItems() {
        const renderer = this.props.renderer;
        const value = this.props.value || {};
        const textField = this.props.textField;
        const valueField = this.props.valueField;
        return this.props.data.map(item => (
            //TODO: assign unique key
            <KendoListItem
                dataItem={item}
                key={item.text}
                onClick={this.clickAction}
                renderer={renderer}
                selected={item[valueField] === value}
                textField={textField}
            />
        ));
    }
    render() {
        return (
            <ul className="k-list">{this.renderItems()}</ul>
        );
    }
}

KendoList.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    onClick: React.PropTypes.func,
    renderer: React.PropTypes.func,
    textField: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]),
    valueField: React.PropTypes.string
};
