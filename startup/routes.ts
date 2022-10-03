import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

import todoSchema from '../schemas/todoSchema';
import todosRoute from '../routes/todosQL';

import { apiVersion, endpoints } from '../config.json';
import cors from '../middleware/cors';
import error from '../middleware/error';

const getApiEndpoint = (endpoint: string) => `/api/${apiVersion}/${endpoint}`;

module.exports = function (app: Express) {
  app.use(express.json());

  app.use(cors);

  app.use(
    getApiEndpoint(endpoints.Todos),
    graphqlHTTP({ schema: todoSchema, rootValue: new todosRoute(), graphiql: true })
  );

  app.use(error);
};
