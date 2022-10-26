import mongoose from 'mongoose';
import { Todo, validator } from '../models/todo';
import validateBody from '../middleware/validateBody';
import { ErrorCode } from '../types/constants';
import { VerticalDirection } from '../types/enums';
import Auth from '../decorators/Auth';
import { User } from '../models/user';

export default class TodosResolver {
  @Auth
  async todos(body: unknown, context: ResolverContext) {
    const todos = await Todo.find({ user: context.decodedData?.user._id }).sort('order');

    return todos;
  }

  @Auth
  async createTodo(body: NewTodo, context: ResolverContext): Promise<Todo> {
    validateBody(validator, body);

    const { description, isCompleted } = body;
    const userId = context.decodedData?.user._id;

    const existingTodo = await Todo.findOne({ description: description });
    if (existingTodo)
      throw new Error(
        `${ErrorCode.BadUserInput}: There's another record with the same description received.`
      );

    const todosCount = await Todo.count();

    // Generate a new record
    const todo = new Todo({
      description: description,
      isCompleted: isCompleted ?? false,
      place: todosCount + 1,
      user: userId,
    });

    await todo.save();

    await User.updateOne({ _id: userId }, { $addToSet: { todos: todo._id } });

    return todo;
  }

  @Auth
  async editTodo({ id, data }: EditTodoBody, context: ResolverContext): Promise<Todo> {
    if (!data)
      throw new Error(`${ErrorCode.BadUserInput}: The data property should be provided`);

    const incomingId = new mongoose.Types.ObjectId(id);
    const { description, isCompleted, place } = data;

    if (place) {
      const oldTodo = await Todo.findById(id);
      if (oldTodo) {
        let condition;
        let direction: VerticalDirection;

        if (oldTodo.place < place) {
          // Down direction
          // Get all the todos with place lesser than this new order.
          condition = { $lte: place };
          direction = VerticalDirection.Down;
        } else {
          // Upper direction
          // Get all the todos with place greater than this new order.
          condition = { $gte: place };
          direction = VerticalDirection.Up;
        }

        const toUpdateTodos = await Todo.find({
          place: condition,
          user: context.decodedData?.user._id,
        });

        toUpdateTodos.forEach((todo, i, arr) => {
          if (direction === VerticalDirection.Down) {
            if (todo.place - 1 >= 0) {
              todo.place -= 1;
            }
          } else {
            if (i < arr.length - 1) {
              todo.place += 1;
            }
          }
        });

        try {
          await Todo.bulkSave(toUpdateTodos);
        } catch (er) {
          console.error(er);
        }
      }
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: incomingId },
      {
        description: description,
        isCompleted: isCompleted,
        place,
      },
      { new: true }
    );

    if (!todo)
      throw new Error(
        `${ErrorCode.BadUserInput}: Couldn't find a record with the requested id`
      );

    return todo;
  }

  @Auth
  async deleteTodo(
    { id }: DeleteTodoBody,
    context: ResolverContext
  ): Promise<DeletionResult> {
    const incomingId = new mongoose.Types.ObjectId(id);
    const userId = context.decodedData?.user._id;

    const deleteResult = await Todo.deleteOne({ _id: incomingId, user: userId });

    const updateResult = await User.updateOne(
      { _id: userId },
      { $pull: { todos: incomingId } }
    );

    const result: DeletionResult = {
      success: deleteResult.deletedCount === 1 && updateResult.modifiedCount === 1,
    };

    return result;
  }
}
