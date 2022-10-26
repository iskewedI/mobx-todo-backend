// --------- NEW SCHEMA

type ResolverContext = {
  cookies: {
    Todos_Auth: string;
  };

  decodedData?: {
    user: User;
  };
};

type NewUser = {
  name: string;
  email: string;
  password: string;
};

type NewTodo = {
  description: string;
  isCompleted: Boolean;
};

// ------- END NEW SCHEMA

// Todo
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

// User
type User = {
  _id?: string;
  name: string;
  email: string;
  todos: string[];
};

type UserInput = {
  name?: String;
  email: string;
  password: string;
};

interface UserSchema {
  name: string;
  email: string;
  password: string;
  todos: Array;
  generateAuthToken: () => string;
}
