import { applyMixins } from '../util/mixins';
import AuthResolver from './auth';
import TodosResolver from './todos';
import UsersResolver from './users';

class RootResolver {}

interface RootResolver extends TodosResolver, UsersResolver, AuthResolver {}

applyMixins(RootResolver, [AuthResolver, TodosResolver, UsersResolver]);

export default RootResolver;
