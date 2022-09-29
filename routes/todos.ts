import express from 'express';
import { Todo, validator } from '../models/todo';
import validateBody from '../middleware/validateBody';

const Router = express.Router();

Router.get('/', async (req, res) => {
  const todos = await Todo.find().sort('order');

  res.send(todos);
});

Router.post('/', validateBody(validator), async ({ body }: PostBody, res) => {
  const existingTodo = await Todo.findOne({ description: body.description });
  if (existingTodo) return res.status(400).send("Can't create duplicated record.");

  // Generate a new record
  const todo = new Todo({
    description: body.description,
    isCompleted: body.isCompleted ?? false,
  });

  await todo.save();

  res.send({ description: todo.description, isCompleted: todo.isCompleted });
});

export default Router;
