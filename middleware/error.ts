import { Request, Response, NextFunction } from 'express';
const winston = require('winston');

export default function (ex: Error, req: Request, res: Response, next: NextFunction) {
  //Levels => First Argument => error -> warn -> info -> verbose -> debug -> silly
  //Will log errors up to the level we assign => Ex. choosen "verbose" will log Errors Warnings Infos & Verbose logs
  //   winston.log("error", ex.message);
  winston.error(ex.message, ex);
  res.status(500).send('Something failed.');
}
