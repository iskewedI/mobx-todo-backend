import { buildSchema } from 'graphql';

// If the query function doesn't have params, it goes without parenthesis
const schema = buildSchema(`
    type Query {
        todos: [Todo]
    }

    type Mutation {
        createTodo(description: String, isCompleted: Boolean): Todo
        editTodo(id: String!, data: EditInput): Todo
        deleteTodo(id: String!): DeletionResult
    }

    input EditInput {
        description: String
        isCompleted: Boolean
    }

    type Todo {
        description: String
        isCompleted: Boolean
        id: ID
    }

    type DeletionResult {
        success: Boolean
    }
`);

export default schema;
