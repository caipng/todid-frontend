import { FiltersTypes } from './../_actions/todos.actions';
import { todosConstants } from './../_constants/todos.constants';
import { TodosActionTypes } from './../_actions/';
import { Todo } from '../_services';

export type TodosState = {
  editType?: todosConstants.NEW | todosConstants.EDIT;
  editTodo?: Todo;
  filterType?: todosConstants.FILTER | todosConstants.FILTER_BY_TAG;
  filterString?: FiltersTypes;
};

const initialState: TodosState = {
  filterType: todosConstants.FILTER,
  filterString: todosConstants.UPCOMING_FILTER
};

export function todos(state: TodosState = initialState, action: TodosActionTypes): TodosState {
  switch (action.type) {
    case todosConstants.FILTER:
    case todosConstants.FILTER_BY_TAG:
      return { ...state, filterType: action.type, filterString: action.filterString };
    case todosConstants.NEW:
      return { ...state, editType: todosConstants.NEW };
    case todosConstants.EDIT:
      return { ...state, editType: todosConstants.EDIT, editTodo: action.todo };
    default:
      return state;
  }
}
