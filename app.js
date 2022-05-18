const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const testSchema = require('./server/schema/types_schema');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 4001;
dotenv.config();
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen({ port: port }, () => {
			console.log('connected to mongo');
			console.log(process.env.MONGO_URL);
			console.log(process.env.PORT);
		});
	 })
	.catch((err) => console.log(err));
app.use(
	'/graphql',
	graphqlHTTP({
		//enables grapql GUI
		graphiql: true,
		schema: testSchema,
	})
);

