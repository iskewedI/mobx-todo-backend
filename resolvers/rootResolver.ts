import { applyMixins } from '../util/mixins';
import TodosResolver from './todos';
import UsersResolver from './users';

class RootResolver {}

interface RootResolver extends TodosResolver, UsersResolver {}

applyMixins(RootResolver, [TodosResolver, UsersResolver]);

export default RootResolver;
