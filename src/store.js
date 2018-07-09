import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {browserHistory} from 'react-router';
import {routerMiddleware } from "react-router-redux";
import rootReducer from './rootReducer.jsx';

const initialState = {};
const enhancers = [];

// Create a history of your choosing (we're using a browser history in this case)
export const routeHistory = browserHistory;

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(routeHistory);

const middleware = [thunk, historyMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;