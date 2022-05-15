const graphql = require('graphql');
var _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
// Create Types

var users = [
	{ id: "1", name: 'John Doe', age: 30 },
	{ id: "2", name: 'Jane Doe', age: 25 },
	{ id: "3", name: 'Jack Doe', age: 20 },
];

const userType = new graphql.GraphQLObjectType({
	name: 'User',
	description: 'This represents a user',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root Query',
	fields: {
		user: {
			type: userType,
			args: { id: { type: GraphQLString } },
			resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(users, { id: args.id });
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
