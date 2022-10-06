type Todo = {
  description?: string;
  isCompleted?: boolean;
  place?: number;
};

type PostBody = {
  body: Todo;
};

type EditTodoBody = {
  id: string;
  data: Todo;
};

type DeleteTodoBody = {
  id: string;
};

type DeletionResult = {
  success: boolean;
};

type RequestValidator = (input: T) => Joi.ValidationResult<any>;
