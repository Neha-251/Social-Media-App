import { legacy_createStore as createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';
// import {rootReducer} from './reducers/index'
import { composeWithDevTools } from "@redux-devtools/extension";

import { combineReducers } from 'redux';

import { userReducer } from './reducer/userReducer'


const rootReducer = combineReducers({
    userData: userReducer
})

export const store = createStore(
    rootReducer,
    {},
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeWithDevTools(applyMiddleware(thunk))
)
