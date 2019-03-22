import { ADDLIST, CHANGEVALUE, DELETELAST, CHANGECOLOR } from './actions';
import { combineReducers } from 'redux';

const colors = ['black', 'blue', 'red', 'green']
let i = 0;

const initialState = {
    value: '',
    lists: ['1', '2'],
    color: {
        color: colors[i],
    }
}

const add = (state = initialState, action) => {
    switch (action.type) {
        case ADDLIST:
            return {
                ...state,
                lists: state.lists.concat(action.list), // push
            }
        case CHANGEVALUE:
            return {
                ...state,
                value: action.value,
            }
        case DELETELAST:
            return {
                ...state,
                lists: state.lists.slice(0, state.lists.length - 1)
            }
        case CHANGECOLOR:
            i = ++i % colors.length
            return {
                ...state,
                color: { color: colors[i] }
            }
        default:
            return state;
    }
}

const reducersApp = combineReducers({
    add,
})

export default reducersApp;