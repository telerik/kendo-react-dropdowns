import * as React from 'react';
import { PanelBarContainer } from './PanelBarDataContainer';

const propTypes = {
    children: React.PropTypes.element,
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    location: React.PropTypes.object,
    routes: React.PropTypes.array
};

const contextTypes = {
    router: React.PropTypes.object
};

export default class PanelBarNavContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectHandler = this.onSelect.bind(this);
    }

    onSelect(eventData) {
        const { router } = this.context;
        router.push(eventData.id);
    }

    mapRoutesToData(items, route, parentId) {
        if (route.childRoutes && route.childRoutes.length) {
            let isItemSelected = false;

            route.childRoutes.forEach((item) => {
                let isChildSelected = this.mapRoutesToData(items, item, item.path);

                let isCurrentPath = item.path === this.props.location.pathname;
                isItemSelected = isCurrentPath || isItemSelected;

                items.push({
                    id: item.path,
                    title: item.path.replace('/', '') || "home",
                    parentId: parentId,
                    selected: isCurrentPath,
                    expanded: isCurrentPath || isChildSelected
                });
            });

            return isItemSelected;
        }
    }

    render() {
        let items = [];
        this.mapRoutesToData(items, this.props.routes[0], null);

        return (
            <div className="layout">
                <div className="navigation-pane"><PanelBarContainer items={items} onSelect={this.onSelectHandler} /></div>
                <div className="content-pane">{this.props.children}</div>
            </div>
        );
    }
}

PanelBarNavContainer.propTypes = propTypes;
PanelBarNavContainer.contextTypes = contextTypes;
