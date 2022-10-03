import { ErrorCode } from '../types/constants';

export default function (validator: RequestValidator, body: unknown) {
  const { error } = validator(body);

  if (error) throw new Error(`${ErrorCode.BadUserInput}: ${error.message}`);
}

// REST Api validator
// export default function (validator: RequestValidator) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     req.body.language = req.body.lang || 'en';

//     const { error } = validator(req.body);

//     if (error) return res.status(400).send(error.message);
//     next();
//   };
// }
