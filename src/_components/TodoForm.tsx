import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { useInput } from '../_helpers';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import dayjs, { Dayjs } from 'dayjs';
import DayjsUtils from '@date-io/dayjs';
import ChipInput from 'material-ui-chip-input';
import Tooltip from '@material-ui/core/Tooltip';
import { Todo, todoService } from '../_services';
import { useHistory } from 'react-router'

type TodoFormProps = {
  handleClose: () => void;
  title: string;
  open: boolean;
  todo?: Todo | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   '& .MuiTextField-root': {
      //     margin: theme.spacing(1)
      //   }
    }
  })
);

export const TodoForm = ({ handleClose, title: formTitle, open, todo }: TodoFormProps) => {
  const classes = useStyles();
  const {
    value: title,
    setValue: setTitle,
    setError: setTitleError,
    props: titleProps
  } = useInput();
  const {
    value: description,
    setValue: setDescription,
    setError: setDescriptionError,
    props: descriptionProps
  } = useInput();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
        setTags(todo.tags);
        setSelectedDate(todo.dueTime);
    }
  }, [todo]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
      if (!title) {
        setTitleError({ error: true, helperText: 'Title is required'});
      } else {
        const newTodo = {
            id: todo ? todo.id : -1,
            title,
            description,
            dueTime: selectedDate,
            tags,
            completed: false
        }

        if (todo) todoService.updateTodo(todo.id, newTodo);
        else todoService.createTodo(newTodo);

        clearForm();
        handleClose();
        history.go(0);
      }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setSelectedDate(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your Todo details below:</DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="title"
              name="title"
              label="Title"
              required
              fullWidth
              {...titleProps}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              multiline
              rows={2}
              fullWidth
              {...descriptionProps}
            />
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Use enter to add a tag and backspace to delete">
              <ChipInput
                label="Tags"
                value={tags}
                onAdd={newTag => setTags([...tags, newTag])}
                onDelete={deletedTag => setTags(tags.filter(t => t !== deletedTag))}
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD MMM YYYY"
                margin="normal"
                id="date-picker-inline"
                label="Due Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                emptyLabel="None"
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            clearForm();
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
        >
          Add / Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
