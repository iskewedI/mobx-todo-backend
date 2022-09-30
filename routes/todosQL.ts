import { Todo, validator } from '../models/todo';
import validateBody from '../middleware/validateBody';

export default class TodosResolver {
  async todos() {
    console.log('#');

    const todos = await Todo.find().sort('order');

    return todos;
  }

  async createTodo(body: Todo): Promise<Todo> {
    validateBody(validator, body);

    const { description, isCompleted } = body;

    const existingTodo = await Todo.findOne({ description: description });
    if (existingTodo)
      throw new Error(
        "BAD_USER_INPUT: There's another record with the same description received."
      );

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
