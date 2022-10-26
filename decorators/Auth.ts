import jwt from 'jsonwebtoken';
import config from 'config';
import { ErrorCode } from '../types/constants';

export default function Auth(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value as Function;

  descriptor.value = function (body: unknown, context: ResolverContext) {
    const { Todos_Auth } = context.cookies;

    if (!Todos_Auth) throw new Error(`${ErrorCode.BadUserInput}: No token provided`);

    try {
      const user = jwt.verify(Todos_Auth, config.get('jwtPrivateKey')) as User;

      context.decodedData = { user };

      return original.call(this, body, context);
    } catch (error) {
      throw new Error(`${ErrorCode.BadUserInput}: The provided token is invalid`);
    }
  };
}
