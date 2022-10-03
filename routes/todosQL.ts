import mongoose from 'mongoose';
import { Todo, validator } from '../models/todo';
import validateBody from '../middleware/validateBody';
import { ErrorCode } from '../types/constants';

export default class TodosResolver {
  async todos() {
    const todos = await Todo.find().sort('order');

    return todos;
  }

  async createTodo(body: Todo): Promise<Todo> {
    validateBody(validator, body);

    const { description, isCompleted } = body;

    const existingTodo = await Todo.findOne({ description: description });
    if (existingTodo)
      throw new Error(
        `${ErrorCode.BadUserInput}: There's another record with the same description received.`
      );

    // Generate a new record
    const todo = new Todo({
      description: description,
      isCompleted: isCompleted ?? false,
    });

    await todo.save();

    return todo;
  }

  async editTodo({ id, data }: EditTodoBody): Promise<Todo> {
    if (!data)
      throw new Error(`${ErrorCode.BadUserInput}: The data property should be provided`);

    const incomingId = new mongoose.Types.ObjectId(id);
    const { description, isCompleted } = data;

    const todo = await Todo.findOneAndUpdate(
      { _id: incomingId },
      {
        description: description,
        isCompleted: isCompleted,
      },
      { new: true }
    );

    if (!todo)
      throw new Error(
        `${ErrorCode.BadUserInput}: Couldn't find a record with the requested id`
      );

    return todo;
  }

  async deleteTodo({ id }: DeleteTodoBody): Promise<DeletionResult> {
    const incomingId = new mongoose.Types.ObjectId(id);

    const deleteResult = await Todo.deleteOne({ _id: incomingId });

    const result: DeletionResult = {
      success: deleteResult.deletedCount === 1,
    };

    return result;
  }
}
