import { ErrorCode } from '../types/constants';

export default function (validator: RequestValidator, body: unknown) {
  const { error } = validator(body);

  if (error) throw new Error(`${ErrorCode.BadUserInput}: ${error.message}`);
}
