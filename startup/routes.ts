import express, { Express } from 'express';
import todosRoute from '../routes/todos';
import error from '../middleware/error';
// import cors from '../middleware/cors';

import { apiVersion, endpoints } from '../config.json';

const getApiEndpoint = (endpoint: string) => `/api/${apiVersion}/${endpoint}`;

module.exports = function (app: Express) {
  app.use(express.json());

  //   app.use(cors);

  app.use(getApiEndpoint(endpoints.Todos), todosRoute);

  //Error Middleware, always LAST middleware used
  app.use(error);
};
