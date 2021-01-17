import React from 'react';
import TodoItem from '../_components/TodoItem';
import { Todo } from '../_services';

type TodoListProps = {
  title: string;
  todos: Todo[];
};

export default class TodoList extends React.Component<TodoListProps, {}> {
  render() {
    const { todos, title } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    );
  }
}
