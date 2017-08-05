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

import client from './client';
import state from './reducers';

/******************************************************************************/

const initialState = {
	state: [],
};

/******************************************************************************/

export const history = createHistory();

const store = createStore(
	combineReducers({
		apollo: client.reducer(),
		state,
		router,
	}),
	initialState,
	compose(
		applyMiddleware(client.middleware()),
		applyMiddleware(routerMiddleware(history)),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
);

export default store;
