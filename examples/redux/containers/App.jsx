import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from "react-redux";
import ReactDOM from 'react-dom';
import * as ComboReducers from '../reducers/comboBox';
import { ComboBoxDataContainer } from '../containers/ComboBoxDataContainer';
import initialState from './../initialstate';


const reducer = Redux.combineReducers({
    data: ComboReducers.getData,
    value: ComboReducers.value
});
const store = (window.devToolsExtension ? window.devToolsExtension()(Redux.createStore) : Redux.createStore)(reducer);


const propTypes = {
    children: React.PropTypes.element
};

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ReactRedux.Provider store={store}>
                    <ComboBoxDataContainer 
                        suggest 
                        textField="text" 
                        valueField="value"
                    />
                </ReactRedux.Provider>
            </div>
        );
    }
}

App.propTypes = propTypes;
