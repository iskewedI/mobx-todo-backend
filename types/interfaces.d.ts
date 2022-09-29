type Todo = {
  description?: string;
  isCompleted?: boolean;
};

type PostBody = {
  body: Todo;
};

type RequestValidator = (input: T) => Joi.ValidationResult<any>;
