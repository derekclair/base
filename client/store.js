/* @flow */
/* eslint no-underscore-dangle: 0 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient } from 'react-apollo';

const client = new ApolloClient();

const store = createStore(
	combineReducers({
		apollo: client.reducer(),
	}),
	{}, // initial state
	compose(
		applyMiddleware(client.middleware()),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	)
);

export default store;
