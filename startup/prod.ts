import { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';

module.exports = function (app: Express) {
  app.use(helmet());
  app.use(compression());
};
