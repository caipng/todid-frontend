import React from 'react';
import { Todo } from '../_services';
import calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';

dayjs.extend(calendar);

type TodoProps = {
  todo: Todo;
};

export default function TodoItem({ todo: { id, title, description, dueTime, tags } }: TodoProps) {
  return (
    <li>
      <h4>{title}</h4>
      <div>{description}</div>
      {dueTime && <div>{dayjs(dueTime).calendar()}</div>}
      {tags && (
        <div>
          {tags.map((tag, idx) => (
            <b key={idx}> | {tag}</b>
          ))}
        </div>
      )}
    </li>
  );
}
