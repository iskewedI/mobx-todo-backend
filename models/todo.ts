import mongoose from 'mongoose';
import Joi from 'joi';

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true, minlength: 3, maxlength: 40 },
  isCompleted: { type: Boolean, required: true },
  place: { type: Number, required: true },
  user: { type: String, required: true, minlength: 10, maxlength: 40 },
});

todoSchema.plugin(require('mongoose-beautiful-unique-validation'));

const Todo = mongoose.model('todos', todoSchema);

function validator(todo: Todo) {
  const schema = Joi.object({
    description: Joi.string().min(3).max(40).required(),
    isCompleted: Joi.boolean(),
    place: Joi.number(),
  }).options({ allowUnknown: true });

  return schema.validate(todo);
}

export { Todo, validator, todoSchema };
