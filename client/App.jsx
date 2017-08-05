/* @flow */

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './client.js';
import store from './store.js';

const Home = () => (<h1>Home</h1>);
const NewsFeed = () => (<h1>News Feed</h1>);

const App = () => (
	<ApolloProvider client={client} store={store}>
		<Router>
			<div>
				<h1>Client</h1>
				<Link to="news">to news</Link>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/news" component={NewsFeed} />
				</div>
			</div>
		</Router>
	</ApolloProvider>
);

export default App;
