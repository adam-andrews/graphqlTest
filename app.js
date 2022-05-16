const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const testSchema = require('./schema/test_schema');
const app = express();


app.use("/graphql", graphqlHTTP({
    //enables grapql GUI 
    graphiql: true,
    schema: testSchema,
}))

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
}
)