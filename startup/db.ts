import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

module.exports = function () {
  const db = config.get<string>('db');

  mongoose.connect(db).then(() => winston.info(`Connected to ${db}`));
};
