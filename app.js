const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();


app.use("/graphql", graphqlHTTP({
    //enables grapql GUI 
    graphiql: true,
}))

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
}
)