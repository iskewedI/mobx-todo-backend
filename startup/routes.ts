import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

import rootSchema from '../schemas/rootSchema';
import rootResolver from '../resolvers/rootResolver';

import { apiVersion, endpoints } from '../config.json';
import cors from '../middleware/cors';
import error from '../middleware/error';
import cookies, { ExpressRequestWithContext } from '../middleware/cookies';
import cookieParser from 'cookie-parser';

const getApiEndpoint = (endpoint: string) => `/api/${apiVersion}/${endpoint}`;

module.exports = function (app: Express) {
  app.use(express.json());

  app.use(cors);

  app.use(
    getApiEndpoint(endpoints.Todos),
    cookieParser(),
    cookies,
    graphqlHTTP((request: ExpressRequestWithContext) => ({
      schema: rootSchema,
      rootValue: new rootResolver(),
      graphiql: true,
      context: request.context,
    }))
  );

  app.use(error);
};
