import { User, validator, partialValidator } from '../models/user';
import validateBody from '../middleware/validateBody';
import bcrypt from 'bcrypt';
import { ErrorCode } from '../types/constants';
import Auth from '../decorators/Auth';
import { Todo } from '../models/todo';

export default class UsersResolver {
  async users() {
    const users = await User.find().sort('name');

    return users;
  }

  @Auth
  async user(body: unknown, context: ResolverContext) {
    const user = await User.findById(context.decodedData?.user._id).select('-password');

    if (!user) return null;

    const todos = await Todo.find({ _id: user.todos });

    return { name: user.name, email: user.email, todos, points: user.points };
  }

  async createUser(body: NewUser) {
    validateBody(validator, body);

    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new Error(
        `${ErrorCode.BadUserInput}: There's another user with the same email`
      );

    // Generate a new record
    const user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    return { token, name: user.name, email: user.email };
  }

  @Auth
  async editUser(body: Partial<NewUser>, context: ResolverContext) {
    validateBody(partialValidator, body);

    const { name, password } = body;

    const newUser: Partial<NewUser> = { name };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
    }

    const result = await User.findOneAndUpdate(
      { _id: context.decodedData?.user._id },
      newUser
    ).select('-password');

    if (!result)
      throw new Error(`${ErrorCode.BadUserInput}: No user found with the token provided`);

    return {
      name: result.name,
      email: result.email,
      todos: result.todos,
      points: result.points,
    };
  }

  @Auth
  async addPoints(body: AddPointsInput, context: ResolverContext) {
    const user = await User.findById(context.decodedData?.user._id).select('-password');

    if (!user) throw new Error(`${ErrorCode.BadUserInput}: Invalid token`);

    user.points += body.amount;

    await user.save();

    return { currentPoints: user.points };
  }

  // TODO: deleteUser
}
