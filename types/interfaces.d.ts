type Todo = {
  description?: string;
  isCompleted?: boolean;
};

type PostBody = {
  body: Todo;
};

type EditTodoBody = {
  id: string;
  data: Todo;
};
type RequestValidator = (input: T) => Joi.ValidationResult<any>;
