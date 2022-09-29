import mongoose from 'mongoose';
import Joi from 'joi';

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true, minlength: 3, maxlength: 25 },
  isCompleted: { type: Boolean, required: false },
});

todoSchema.plugin(require('mongoose-beautiful-unique-validation'));

const Todo = mongoose.model('todos', todoSchema);

function validator(todo: Todo) {
  const schema = Joi.object({
    description: Joi.string().min(3).max(25).required(),
    isCompleted: Joi.boolean(),
  }).options({ allowUnknown: true });

  return schema.validate(todo);
}

export { Todo, validator };
