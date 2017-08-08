/* @noflow */
/* eslint import/no-named-as-default: 0 */

import {
	// addMockFunctionsToSchema,
	makeExecutableSchema,
} from 'graphql-tools';

import typeDefs from './schema.graphql';

/******************************************************************************/

const resolvers = {
	Query: {
		messages: () => [{ id: 1 }],
		user: id => ({ id }),
	},
	Mutation: {
		upvoteMessage: id => ({ id }),
	},
	// Subscription,
};


/******************************************************************************/

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

/******************************************************************************/

// addMockFunctionsToSchema({ schema });

/******************************************************************************/

export default schema;
