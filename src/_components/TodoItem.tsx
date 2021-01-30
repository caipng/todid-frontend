import React, { Dispatch, useState } from 'react';
import { Todo, todoService } from '../_services';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import calendar from 'dayjs/plugin/calendar';
import dayjs from 'dayjs';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { stringToColor } from '../_helpers';
import { todosActions, TodosActionTypes } from '../_actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

dayjs.extend(calendar);

type TodoProps = {
  todo: Todo;
  isExpanded: boolean;
  onChange: (e: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  dispatch: Dispatch<TodosActionTypes>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    todoSummaryContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    todoSummary: {
      flexGrow: 1
    },
    dueTime: {
      ...theme.typography.button,
      marginRight: 'auto',
      paddingLeft: 10
    },
    overDueTime: {
      ...theme.typography.button,
      marginRight: 'auto',
      paddingLeft: 10,
      color: theme.palette.error.main
    }
  })
);

function TodoItem({ todo, isExpanded, onChange, dispatch }: TodoProps) {
  const classes = useStyles();
  const { id, title, description, dueTime, tags } = todo;
  const [ completed, setCompleted ] = useState(todo.completed);
  const history = useHistory();

  return (
    <Accordion expanded={isExpanded} onChange={onChange}>
      <AccordionSummary aria-label="Expand" aria-controls={`${id}content`} id={`${id}`}>
        <div className={classes.todoSummaryContainer}>
          <FormControlLabel
            aria-label="Complete"
            onClick={e => {
              e.stopPropagation();
              todoService.updateTodo(id, { ...todo, completed: !todo.completed});
              setCompleted(!completed);
              history.go(0);
            }}
            onFocus={e => e.stopPropagation()}
            control={<Checkbox />}
            label=""
            checked={completed}
          />
          <Typography className={classes.todoSummary}>{title}</Typography>
          {tags.map(tag => (
            <Chip
              label={tag}
              key={tag}
              variant="outlined"
              style={{ marginLeft: 5, borderColor: stringToColor(tag), color: stringToColor(tag) }}
            />
          ))}
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        <Typography>{description}</Typography>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        {dueTime && (
          <Typography
            className={dayjs().diff(dayjs(dueTime)) < 0 ? classes.dueTime : classes.overDueTime}
          >
            {dayjs(dueTime).calendar()}
          </Typography>
        )}
        <Button size="small" onClick={e => onChange(e, false)}>
          Cancel
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(todosActions.edit(todo))}>
          Edit
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

const connectedTodoItem = connect()(TodoItem);
export { connectedTodoItem as TodoItem };
