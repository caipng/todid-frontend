import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import TodoItem from '../_components/TodoItem';
import { Todo } from '../_services';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';

type TodoListProps = {
  title: string;
  todos: Todo[];
};

export const TodoList = ({ todos, title }: TodoListProps) => {
  const classes = useStyles();
  const [expandedTodoId, setExpandedTodoId] = useState(-1);

  return (
    <React.Fragment>
      <div className={classes.dateContainer}>
        <Typography variant="h4" component="h1" className={classes.day}>
          Tuesday
        </Typography>
        <Typography variant="h4" component="h1" className={classes.date}>
          19 Jan 2021
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.todosContainer}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isExpanded={expandedTodoId === todo.id}
            onChange={(e: React.ChangeEvent<{}>, isExpanded: boolean) =>
              setExpandedTodoId(isExpanded ? todo.id : -1 )
            }
          />
        ))}
      </div>
    </React.Fragment>
  );
};
