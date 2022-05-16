const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLInt,GraphQLBoolean,GraphQLFloat } = graphql;

//Scalar Type
/*
String 
Int 
Float
Boolean
ID
*/

const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a person',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
        age: { type: GraphQLInt },
        isMarried: { type: GraphQLBoolean },
        gpa:{ type: GraphQLFloat },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root Query',
	fields: {},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
