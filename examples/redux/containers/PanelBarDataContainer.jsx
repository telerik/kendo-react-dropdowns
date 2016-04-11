import * as React from 'react';
import * as ReactRedux from "react-redux";
import PanelBar from '../../../src/panelbar/PanelBar';
import * as actionCreators from './../actions';
import * as panelBarUtils from '../util';

const propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    onSelect: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
};

export class PanelBarContainer extends React.Component {
    render() {
        const itemsByParentId = panelBarUtils.mapItemsByParentId(this.props.items);

        return (
            <PanelBar {...this.props }>
                {panelBarUtils.mapDataToComponents(itemsByParentId)}
            </PanelBar>
        );
    }
}

PanelBarContainer.propTypes = propTypes;

const mapStateToProps = function(state) {
    return { items: state.panelBarItems };
};

const mapDispatchToProps = function(dispatch) {
    return {
        onSelect: function(data) { dispatch(actionCreators.onSelect(data)); },
        onKeyDown: function(data) { dispatch(actionCreators.onKeyDown(data)); },
        onFocus: function(data) { dispatch(actionCreators.onFocus(data)); },
        onBlur: function(data) { dispatch(actionCreators.onBlur(data)); }
    };
};

export const PanelBarDataContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PanelBarContainer);
