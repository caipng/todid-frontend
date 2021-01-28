import { config } from '../_constants';
import { authHeader, parseResponse } from '../_helpers';
import dayjs from 'dayjs';

export const todoService = {
  getTodos,
  getTodo,
  updateTodo
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  dueTime: dayjs.Dayjs | null;
  tags: string[];
  completed: boolean;
};

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${config.apiUrl}/todos`, { method: 'GET', headers: authHeader() });
  const data = await parseResponse(res);
  return data.map(
    ({
      id,
      title,
      description,
      due_time,
      tags,
      completed
    }: {
      id: number;
      title: string;
      description: string;
      due_time: string;
      tags: string | null;
      completed: boolean;
    }) => {
      const dueTime = due_time ? dayjs(due_time) : null;
      const separated_tags = tags ? tags.split(',') : [];
      return { id, title, description, dueTime, tags: separated_tags, completed };
    }
  );
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
