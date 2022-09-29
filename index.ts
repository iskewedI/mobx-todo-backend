import express, { Express } from 'express';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

require('./startup/logging')(); //Logger initialization
require('./startup/routes')(app); //Routes settings
require('./startup/db')(); //Database initialization
require('./startup/config')(); //Logger initialization
require('./startup/prod')(app); //Middlewares needed to PROD app

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
