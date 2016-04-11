import ACTIONS from '../constants/ActionTypes';
import keycode from 'keycode';
import initialState from './../initialstate';
import * as util from './../util';

const filterData = (text, data) => {
    let dataList;
    if (text) {
        dataList = data.filter(function(item) {
            return item.text.toLowerCase().startsWith(text.toLowerCase());
        });
    } else {
        dataList = data;
    }
    return dataList;
};

export function getData(state, action) {
    switch (action.type) {
        case ACTIONS.FILTER:
            return filterData(action.query, initialState().complexItems);
    }
    return initialState().complexItems;
}

export function value(state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE:
            return action.value;
    }
    return initialState().comboValue;
}

