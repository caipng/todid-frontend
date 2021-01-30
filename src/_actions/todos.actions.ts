import { Todo } from './../_services/todo.services';
import { todosConstants } from './../_constants/todos.constants';

export type DefaultFiltersTypes =
  | todosConstants.COMPLETED_FILTER
  | todosConstants.INBOX_FILTER
  | todosConstants.TODAY_FILTER
  | todosConstants.UPCOMING_FILTER;

export type FiltersTypes = DefaultFiltersTypes | string;

export const todosActions = {
  new: (): TodosActionTypes => ({ type: todosConstants.NEW }),
  edit: (todo: Todo): TodosActionTypes => ({ type: todosConstants.EDIT, todo }),
  filter: (filterString: DefaultFiltersTypes): TodosActionTypes => ({
    type: todosConstants.FILTER,
    filterString
  }),
  filter_by_tag: (filterString: string): TodosActionTypes => ({
    type: todosConstants.FILTER_BY_TAG,
    filterString
  })
};

export type TodosActionTypes =
  | {
      type: todosConstants.FILTER | todosConstants.FILTER_BY_TAG;
      filterString: FiltersTypes;
    }
  | {
      type: todosConstants.NEW | todosConstants.EDIT;
      todo?: Todo;
    };
