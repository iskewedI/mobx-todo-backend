type Todo = {
  description?: string;
  isCompleted?: boolean;
};

type PostBody = {
  body: TodoModel;
};

type EditTodoBody = {
  id: string;
  data: TodoModel;
};

type DeleteTodoBody = {
  id: string;
};

type DeletionResult = {
  success: boolean;
};

type RequestValidator = (input: T) => Joi.ValidationResult<any>;
