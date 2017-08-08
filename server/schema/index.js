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
		user(root, args, context) {
			const { opticsContext, ...ctx } = context;

			console.log('root', root);
			console.log('context', ctx);

			context.postgres(args.id);

			return { id: 1 };
		},
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
