import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { TodoItem } from '../_components/TodoItem';
import { Todo } from '../_services';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';
import { TodoForm } from '../_components';
import { RootState } from '../_reducers';
import { connect } from 'react-redux';
import { todosConstants } from '../_constants';
import dayjs from 'dayjs';

type TodoListProps = {
  todos: Todo[];
  editType: todosConstants.NEW | todosConstants.EDIT | undefined;
  editTodo: Todo | undefined;
};

const TodoList = ({ todos, editType, editTodo }: TodoListProps) => {
  const classes = useStyles();
  const [expandedTodoId, setExpandedTodoId] = useState(-1);
  const [todoFormOpen, setTodoFormOpen] = useState(false);

  useEffect(() => {
    setTodoFormOpen(editType === todosConstants.EDIT);
  }, [editType]);

  const dateFormat = 'DD/MM/YYYY';
  const noDueTime = 'no due time';
  const sortedTodos: { [key: string]: Todo[] } = {};
  todos.forEach(todo => {
    const key = todo.dueTime ? todo.dueTime.format(dateFormat) : noDueTime;
    if (sortedTodos[key]) {
      sortedTodos[key].push(todo);
    } else {
      sortedTodos[key] = [todo];
    }
  });

  return (
    <React.Fragment>
      <div className={classes.todosContainer}>
        <TodoForm
          open={todoFormOpen}
          handleClose={() => setTodoFormOpen(false)}
          title={'Edit Todo'}
          todo={editTodo}
        />
        {Object.keys(sortedTodos)
          .sort((a, b) =>
            a === noDueTime
              ? 1
              : b === noDueTime
              ? 1
              : dayjs(a, dateFormat).unix() - dayjs(b, dateFormat).unix()
          )
          .map(date => (
            <div key={date}>
              {date !== noDueTime && (
                <div className={classes.dateContainer}>
                  <Typography variant="h5" component="h3" className={classes.day}>
                    {dayjs(date, dateFormat).format('dddd')}
                  </Typography>
                  <Typography variant="h5" component="h3" className={classes.date}>
                    {dayjs(date, dateFormat).format('D MMM YYYY')}
                  </Typography>
                </div>
              )}
              {sortedTodos[date].map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isExpanded={expandedTodoId === todo.id}
                  onChange={(
                    e: React.ChangeEvent<{}> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    isExpanded: boolean
                  ) => setExpandedTodoId(isExpanded ? todo.id : -1)}
                />
              ))}
              <Divider variant="middle" style={{ marginTop: 20, marginBottom: 40 }} />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ todos: { editType, editTodo } }: RootState) => ({ editType, editTodo });
const connectedTodoList = connect(mapStateToProps)(TodoList);
export { connectedTodoList as TodoList };
