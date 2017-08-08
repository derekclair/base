/* @noflow */

import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
	SubscriptionClient,
	addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';

/******************************************************************************/

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3030;
const GRAPHQL_PATH = '/subscriptions';

const wsClient = new SubscriptionClient(`ws://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`, {
	reconnect: true,
});

const networkInterface = addGraphQLSubscriptions(
	createNetworkInterface({
		uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
	}),
	wsClient
);

const client = new ApolloClient({ networkInterface });

/******************************************************************************/

export default client;
