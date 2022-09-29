import { Todo, validator } from '../models/todo';
import validateBody from '../middleware/validateBody';

export default class TodosResolver {
  async todos() {
    console.log('#');

    const todos = await Todo.find().sort('order');

    return todos;
  }

  async createTodo({ description, isCompleted }: Todo): Promise<Todo> {
    // validateBody(validator);

    // const existingTodo = await Todo.findOne({ description: body.description });
    // if (existingTodo) return res.status(400).send("Can't create duplicated record.");

    // Generate a new record
    const todo = new Todo({
      description: description,
      isCompleted: isCompleted ?? false,
    });

    await todo.save();

    const result = { description: todo.description, isCompleted: todo.isCompleted };

    return result;
  }
}
