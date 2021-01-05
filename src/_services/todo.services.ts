import { config } from '../_constants';
import { authHeader, parseResponse } from '../_helpers';

export const todoService = {
  getTodos,
  getTodo,
  updateTodo
};

export type Todo = {
  id: number;
  title: string;
};

async function getTodos() {
  const res = await fetch(`${config.apiUrl}/todos`, { method: 'GET', headers: authHeader() });
  return (await parseResponse(res)) as Todo[];
}

async function getTodo(id: number) {
  const res = await fetch(`${config.apiUrl}/todos/${id}`, { method: 'GET', headers: authHeader() });
  return (await parseResponse(res)) as Todo;
}

async function updateTodo(id: number, updatedTodo: Todo) {
  const res = await fetch(`${config.apiUrl}/todos/${id}`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo)
  });
  return (await parseResponse(res)) as Todo;
}
