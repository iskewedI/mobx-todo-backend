import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

import todoSchema from '../schemas/todoSchema';
// import todosRoute from '../routes/todos';
import todosRoute from '../routes/todosQL';

import error from '../middleware/error';
import { apiVersion, endpoints } from '../config.json';

const getApiEndpoint = (endpoint: string) => `/api/${apiVersion}/${endpoint}`;

module.exports = function (app: Express) {
  app.use(express.json());

  // app.use(getApiEndpoint(endpoints.Todos), todosRoute);
  app.use(
    getApiEndpoint(endpoints.Todos),
    graphqlHTTP({ schema: todoSchema, rootValue: new todosRoute(), graphiql: true })
  );

  // Middlewares
  app.use(error);
};
