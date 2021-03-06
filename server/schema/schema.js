const graphql = require('graphql');
var _ = require('lodash');
const {
	GraphQLObjectType,
    GraphQLList,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
} = graphql;
// Create Types

const User = require('../models/user');
const Post = require('../models/post');
const Hobby = require('../models/hobby');


// var users = [
// 	{ id: '1', name: 'John Doe', age: 30, profession: 'Web Developer' },
// 	{ id: '2', name: 'Jane Doe', age: 25, profession: 'Web Designer' },
// 	{ id: '3', name: 'Jack Doe', age: 20, profession: 'Web Designer' },
// ];

// var hobbies = [
// 	{ id: '1', title: 'Coding', description: '1', userId: '1' },
// 	{ id: '2', title: 'Reading', description: '1', userId: '1' },
// 	{ id: '3', title: 'Sleeping', description: '2', userId: '3' },
// 	{ id: '4', title: 'Eating', description: '2', userId: '2' },
// ];

// var posts = [
// 	{ id: '1', comment: 'Coding', userId: '1' },
// 	{ id: '2', comment: 'Reading', userId: '2' },
// 	{ id: '3', comment: 'Sleeping', userId: '3' },
// 	{ id: '4', comment: 'Eating', userId: '1' },
// ];

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a user',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
        posts : {
            type : new GraphQLList(PostType),
            resolve(parent, args){
                return _.filter(posts, {userId: parent.id}); 
            }
        },
        hobbies : {
            type : new GraphQLList(HobbyType),
            resolve(parent, args){
                return _.filter(hobbies, {userId: parent.id}); 
            }
        }
	}),
});

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'This represents a hobby',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(users, { id: parent.userId });
			},
		},
	}),
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'This represents a Post',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(users, { id: parent.userId });
			},
		},
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
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return users;
            }
        },

		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(hobbies, { id: args.id });
			},
		},
        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return hobbies;
            }
        },
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parents, args) {
				//we resolve with daya
				// get and return data with source
				return _.find(posts, { id: args.id });
			},
		},
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return posts;
            }
        },
	},
});

//Mutations

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = User({
                    id: args.id,
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                });
                return user.save();
            }
        },
        addHobby: {
            type: HobbyType,
            args: {
                //id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let hobby = Hobby({
                    //id: args.id,
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                })
                return hobby.save();
            }
        },

        addPost:{
            type: PostType,
            args: {
                id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLString },
            },
            resolve(parent, args) {
                let post = Post({
                    //id: args.id,
                    comment: args.comment,
                    userId: args.userId,
                })
                return post.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
	query: RootQuery,
    mutation: Mutation,
});
