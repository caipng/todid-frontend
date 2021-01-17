import { Todo, todoService, User } from '../_services';
import { Link } from 'react-router-dom';
import { RootState } from '../_reducers';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import TodoList from '../TodoList/TodoList';

type HomePageProps = { user: User };

export default function HomePage({ user }: HomePageProps) {
  const [todos, updateTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      updateTodos(await todoService.getTodos());
    })();
  }, []);
  return (
    <div>
      <h1>Hi {user && user.name}</h1>
      <Link to="/login">Logout</Link>
      <TodoList title="Upcoming" todos={todos} />
    </div>
  );
}

function mapStateToProps(state: RootState) {
  const {
    authentication: { user }
  } = state;
  return user ? { user } : { user: {} as User };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
