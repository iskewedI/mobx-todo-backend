import { User } from '../models/user';
import { ErrorCode } from '../types/constants';
import bcrypt from 'bcrypt';

export default class AuthResolver {
  async auth(body: UserInput) {
    const user = await User.findOne({ email: body.email });
    if (!user)
      throw new Error(`${ErrorCode.BadUserInput}: No user registered with this email`);

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      throw new Error(`${ErrorCode.BadUserInput}: Wrong email and password combinations`);

    const token = user.generateAuthToken();

    return { token };
  }
}
