import { buildSchema } from 'graphql';

// If the query function doesn't have params, it goes without parenthesis

// TODO:  todo(id: String): Todo
// TODO:  user(id: String): User
// TODO:  FORGOT PASSWORD?
const schema = buildSchema(`
    type Query {
        user: User
        todo(id: String): Todo
        auth(email: String, password: String): AuthResult
    }

    type Mutation {
        createTodo(description: String, isCompleted: Boolean): Todo
        createUser(name: String, email: String, password: String): UserCreationResult
        editUser(name: String, password: String): User
        editTodo(id: String!, data: EditTodoInput): Todo
        deleteTodo(id: String!): Result
        addPoints(amount: Int): AddPointsResult
    }

    input EditTodoInput {
        description: String
        isCompleted: Boolean
        place: Int
    }

    type Todo {
        id: ID
        description: String
        isCompleted: Boolean
        place: Int
        user: String
    }

    type AuthResult {
        token: ID
        user: User
    }

    type User {
        name: String
        email: String
        points: Int
        todos: [Todo]
    }

    type UserCreationResult {
        name: String
        email: String
        token: String
    }

    type Result {
        success: Boolean
    }

    type AddPointsResult {
        currentPoints: Int
    }
`);

export default schema;
