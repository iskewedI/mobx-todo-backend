import { Request, Response, NextFunction } from 'express';
import config from 'config';

export default function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', config.get<string>('client_url') || '');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
}
