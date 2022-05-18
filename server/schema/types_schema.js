const graphql = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString,GraphQLInt,GraphQLBoolean,GraphQLFloat,GraphQLNonNull } = graphql;

//Scalar Type
/*
String 
Int 
Float
Boolean
ID

mongodb+srv://admin:<password>@cluster0.wndit.mongodb.net/?retryWrites=true&w=majority
*/

const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a person',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type:new GraphQLNonNull( GraphQLString) },
        age: { type: GraphQLInt },
        isMarried: { type: GraphQLBoolean },
        gpa:{ type: GraphQLFloat },

        justAType: {
            type: Person,
            resolve(parent, args){
                return parent
            }
            
        },

        justAge: {
            type: GraphQLInt,
            resolve(parent, args){
                return 30
            }
            
        }
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root Query',
	fields: {
        person:{
            type: Person,

            resolve(parent, args){
                return {
                    id: 1,
                    name: null,
                    age: 30,
                    isMarried: true,
                    gpa: 3.5,


                }
            }
        }
    },
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
