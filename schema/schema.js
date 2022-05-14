const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
    GraphQLSchema
} = graphql;
// Create Types

const userType = new graphql.GraphQLObjectType({
	name: 'User',
	description: 'This represents a user',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
	}),
});


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    description:'Root Query',
    fields:{
        user:{
            type:userType,
            args:{id:{type:GraphQLString}},
            resolve(parents,args){
                //we resolve with daya
                // get and return data with source
            }
        }
    }, 
})

modeule.exports = new GraphQLSchema({
    query:RootQuery,
}) 