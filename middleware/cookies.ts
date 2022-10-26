import { Request, Response, NextFunction } from 'express';
import { IncomingMessage } from 'http';
import winston from 'winston';

export interface RequestWithContext extends Request {
  context?: ResolverContext;
}

export interface ExpressRequestWithContext extends IncomingMessage {
  url: string;
  context?: ResolverContext;
}

export default function (req: RequestWithContext, res: Response, next: NextFunction) {
  if (!req.cookies) {
    winston.error('Failed parsing the cookies object');
    next();
  }

  req.context = { cookies: req.cookies };

  next();
}
