const graphql = require('graphql');
var _ = require('lodash');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
} = graphql;
// Create Types

var users = [
	{ id: '1', name: 'John Doe', age: 30, profession: 'Web Developer' },
	{ id: '2', name: 'Jane Doe', age: 25, profession: 'Web Designer' },
	{ id: '3', name: 'Jack Doe', age: 20, profession: 'Web Designer' },
];

var hobbies = [
    { id: '1', title: 'Coding', description: '1' },
    { id: '2', title: 'Reading', description: '1' },
    { id: '3', title: 'Sleeping', description: '2' },
    { id: '4', title: 'Eating', description: '2' },

]

var posts = [
    { id: '1', comment: 'Coding',userId: '1' },
    { id: '2', comment: 'Reading',userId: '2' },
    { id: '3', comment: 'Sleeping',userId: '3' },
    { id: '4', comment: 'Eating',userId: '1' },

]

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a user',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
	}),
});

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'This represents a hobby',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
	}),
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'This represents a Post',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
        user:{ type: UserType, 
            resolve(parent,args){
                return _.find(users,{id:parent.userId})

            } },
	}),
});


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root Query',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(users, { id: args.id });
			},
		},
        hobby:{
            type:HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(hobbies, { id: args.id });
			},

        },
        post:{
            type:PostType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(posts, { id: args.id });
			},

        }
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
