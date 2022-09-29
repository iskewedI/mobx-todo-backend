import { Request, Response, NextFunction } from 'express';

export default function (validator: RequestValidator) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body.language = req.body.lang || 'en';

    const { error } = validator(req.body);

    if (error) return res.status(400).send(error.message);
    next();
  };
}
