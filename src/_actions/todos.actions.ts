import { Todo } from './../_services/todo.services';
import { todosConstants } from './../_constants/todos.constants';

export type DefaultFiltersTypes =
  | todosConstants.COMPLETED_FILTER
  | todosConstants.INBOX_FILTER
  | todosConstants.TODAY_FILTER
  | todosConstants.UPCOMING_FILTER;

export type FiltersTypes = DefaultFiltersTypes | string;

export const todosActions = {
  new: () => ({ type: todosConstants.NEW }),
  edit: (todo: Todo) => ({ type: todosConstants.EDIT, todo }),
  filter: (filter: DefaultFiltersTypes): TodosActionTypes => ({
    type: todosConstants.FILTER,
    filter
  }),
  filter_by_tag: (filter: string): TodosActionTypes => ({
    type: todosConstants.FILTER_BY_TAG,
    filter
  })
};

export type TodosActionTypes = {
  type: todosConstants.FILTER | todosConstants.FILTER_BY_TAG;
  filter?: FiltersTypes;
  todo?: Todo;
}
