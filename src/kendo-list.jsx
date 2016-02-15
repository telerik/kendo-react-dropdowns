import * as React from 'react';
import KendoListItem from './kendo-listitem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || null
        };
    }
    clickHandler(dataItem) {
        this.setState({ value: dataItem.value });
        this.props.onChange(dataItem);
    }
    renderItems() {
        const renderer = this.props.renderer;
        const value = this.state.value;
        return this.props.data.map(item => (
            //TODO: assign unique key
            <KendoListItem
                dataItem={item}
                key={item.text}
                onClick={this.clickHandler.bind(this)}
                renderer={renderer}
                selected={item.value === value}
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
    //dataItem: React.PropTypes.object,
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    onChange: React.PropTypes.func,
    renderer: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};
