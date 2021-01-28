import { todosConstants } from './../_constants/todos.constants';
import { TodosActionTypes } from './../_actions/';

export type TodosState = TodosActionTypes;

const initialState: TodosState = {
  filter: todosConstants.UPCOMING_FILTER,
  type: todosConstants.FILTER
};

export function todos(state: TodosState = initialState, action: TodosActionTypes): TodosState {
  switch (action.type) {
    case todosConstants.FILTER:
    case todosConstants.FILTER_BY_TAG:
      return action;
    default:
      return state;
  }
}
