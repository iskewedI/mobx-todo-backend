import { buildSchema } from 'graphql';

// If the query function doesn't have params, it goes without parenthesis
const schema = buildSchema(`
    type Query {
        todos: [Todo]
    }

    type Mutation {
        createTodo(description: String,  isCompleted: Boolean): Todo
    }

    type Todo {
        description: String
        isCompleted: Boolean
    }
`);

export default schema;
