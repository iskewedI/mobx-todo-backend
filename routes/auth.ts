import Express, { Request } from 'express';
import Joi from 'joi';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import config from 'config';

const router = Express.Router();

router.post('/', async ({ body }, res) => {
  const { error } = validate(body);

  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: body.email });
  if (!user) return res.status(400).send('No user registered with this email.');

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) return res.status(400).send('Wrong email & password combination.');

  const token = user.generateAuthToken();

  res.cookie(config.get('auth_cookie_name'), token, { maxAge: 86400000, httpOnly: true });

  res.send({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

router.delete('/', async (req, res) => {
  res.cookie(config.get('auth_cookie_name'), '', { maxAge: -1, httpOnly: true });

  res.status(200).send('OK.');
});

function validate(req: Request) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  }).options({ allowUnknown: true });
  return schema.validate(req);
}

export default router;
