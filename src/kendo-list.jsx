import * as React from 'react';
import KendoListItem from './kendo-listitem';
//import styles from '@telerik/kendo-theme-default-base/styles/main';

export default class KendoList extends React.Component {
    constructor() {
        super();
    }
    renderItems() {
        const renderer = this.props.renderer;
        const selectedIndex = this.props.selectedIndex;
        return this.props.data.map((item, index) => {
            //TODO: assign unique key
            const selected = selectedIndex === index;
            return <KendoListItem dataItem={item} key={item.text} renderer={renderer} selected={selected} />;
        });
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
    renderer: React.PropTypes.func,
    selectedIndex: React.PropTypes.number
};
