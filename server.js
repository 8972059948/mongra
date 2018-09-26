'use strict';
import express from "express";
// import graphqlHTTP from 'express-graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import app from './src';
import schema from './src/graphql/Schema';
import cors from 'cors';

dotenv.config();

const server = express();
const ws = createServer(server);
const port = process.env.GRAPHQL_PORT || 3000;
const application_url = process.env.APPLICATION_URL;

process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.log('unhandledRejection', error.message);
});

ws.listen(port, () => {
	console.log('info', `GraphQL Server is now running on http://${application_url}:${port}`);
	new SubscriptionServer({
	  execute,
	  subscribe,
	  schema
	}, {
	  server: ws,
	  path: '/subscriptions',
	});
});

server.get('/', (req,res) => {
    res.send('GraphQL and Relay Modern');
});

app.get('/rest', cors(), bodyParser.json(), (req,res) => {
   res.send('Rest API');
})

app.listen(process.env.REST_PORT, () => console.log(`Rest API listening on port ${process.env.REST_PORT}!`));

server.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
	schema,
	graphiql: process.env.MODE == 'development'
}));

server.use('/graphiql', cors(), graphiqlExpress({
	schema,
	endpointURL: '/graphql',
	subscriptionsEndpoint: `ws://${application_url}:${port}/subscriptions`
}));