import * as React from 'react';
import * as ReactRedux from "react-redux";
import * as actionCreators from './../actions';
import * as util from '../util';
import ComboBox from '../../../src/ComboBox';

const propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.string,
        React.PropTypes.number
    ])),
};

export class ComboBoxContainer extends React.Component {
    render() {
        return (
            <ComboBox {...this.props} />
        );
    }
}

ComboBoxContainer.propTypes = propTypes;

const mapStateToProps = function(state) {
    return { 
        data: state.data
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        onChange: function(data) { dispatch(actionCreators.onChange(data)); },
        onFilter: function(data) { dispatch(actionCreators.onFilter(data)); }
    };
};

export const ComboBoxDataContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboBoxContainer);