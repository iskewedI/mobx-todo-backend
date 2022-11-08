import mongoose from 'mongoose';
import Joi from 'joi';
import config from 'config';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema<UserSchema>({
  name: { type: String, required: true, minlength: 3, maxlength: 13 },
  email: { type: String, unique: true, required: true, minlength: 3, maxlength: 30 }, // Hashed password
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  points: { type: Number, required: false, min: 0, max: 999, default: 0 },
  todos: { type: Array, default: [], max: 99 },
});

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      //   isAdmin: this.isAdmin,
    },
    config.get('jwtPrivateKey')
  );
};

const User = mongoose.model('users', userSchema);

function validator(user: UserInput) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(13).required(),
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().min(5).max(18).required(),
    points: Joi.number().min(0).max(999),
  }).options({ allowUnknown: true });

  return schema.validate(user);
}

function partialValidator(user: Partial<UserInput>) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(13),
    email: Joi.string().email().min(3).max(30),
    password: Joi.string().min(5).max(18),
    points: Joi.number().min(0).max(999),
  }).options({ allowUnknown: true });

  return schema.validate(user);
}

export { User, validator, partialValidator };
