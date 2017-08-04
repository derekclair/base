/* @flow */

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { PubSub } from 'graphql-subscriptions';
// import OpticsAgent from 'optics-agent';
import {
	execute,
	subscribe,
	printSchema,
} from 'graphql';

import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import { magenta } from 'chalk';

import schema from './schema.graphql';

/******************************************************************************/

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || 'localhost';

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3030;
const GRAPHQL_PATH = '/subscriptions';

/*******************************************************************************
	Express Server
*******************************************************************************/

const app = express();

// app.use('*', cors({
// 	// origin: `http://localhost:${GRAPHQL_PORT}`,
// 	origin: 'http://localhost:3000',
// }));

app.use('/graphql', bodyParser.json());

// app.use('/graphql', OpticsAgent.middleware());

app.use('/graphql', graphqlExpress(() => ({
	context: {
	},
	schema,
	allowUndefinedInResolve: true,
	pretty: true,
	formatError: error => ({
		message: error.message,
		locations: error.locations,
		stack: error.stack,
		path: error.path,
	}),
	// validationRules?: ?Array < any >,
	graphiql: true,
})));


/*******************************************************************************
	GraphiQL
*******************************************************************************/

app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
	subscriptionsEndpoint: `ws://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`,
}));


/*******************************************************************************
	GraphQL Schema
*******************************************************************************/

app.use('/schema', (req, res) => {
	res.set('Content-Type', 'text/plain');
	res.send(printSchema(schema));

	console.log('app.use(schema)');
});


/*******************************************************************************
	Subscriptions Server
*******************************************************************************/

const server = app.listen(GRAPHQL_PORT, () => {
	console.log(magenta(
		`GraphQL: is running on 'http://${ROOT_DOMAIN}:${GRAPHQL_PORT}'`)
	);
});

/******************************************************************************/

// const pubsub = new PubSub();

function onConnect(connection, webSocket) { // eslint-disable-line no-unused-vars
	console.log('CONNECTION', connection);
}

new SubscriptionServer({ execute, schema, subscribe }, { server, onConnect });

/******************************************************************************/

process.on('SIGINT', server.close);

