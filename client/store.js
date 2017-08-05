/* @noflow */
/* eslint no-underscore-dangle: 0 */

import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux';

import {
	routerReducer as router,
	routerMiddleware,
	// push, // Example: store.dispatch(push('/foo'))
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import state from './reducers.js';

/******************************************************************************/

const initialState = {
	state: [],
};

/******************************************************************************/

export const history = createHistory();

const store = createStore(
	combineReducers({
		state,
		router,
	}),
	initialState,
	compose(
		applyMiddleware(routerMiddleware(history)),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
);

export default store;
