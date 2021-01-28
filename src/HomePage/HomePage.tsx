import { Todo, todoService, User } from '../_services';
import { Link } from 'react-router-dom';
import { RootState } from '../_reducers';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { TodoList } from '../TodoList';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Footer, Navigation } from '../_components';
import Box from '@material-ui/core/Box';
import dayjs from 'dayjs';
import { TodosState } from '../_reducers/todos.reducer';
import { todosConstants } from '../_constants';

type HomePageProps = { user: User | undefined; filter: TodosState };

const filterFunctions = {
  all: () => true,
  today: (todo: Todo) => !!todo.dueTime && todo.dueTime.isSame(dayjs(), 'day'),
  upcoming: (todo: Todo) => !!todo.dueTime,
  completed: (todo: Todo) => todo.completed,
  inbox: (todo: Todo) => todo.tags.length === 0,
  byTag: (tag: string) => (todo: Todo) => todo.tags.includes(tag)
};

export default function HomePage({
  user,
  filter: { type: filterType, filter: filterString }
}: HomePageProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<(todo: Todo) => boolean>(() => filterFunctions.all);
  const classes = useStyles();

  useEffect(() => {
    switch (filterType) {
      case todosConstants.FILTER:
        switch (filterString) {
          case todosConstants.TODAY_FILTER:
            setFilter(() => filterFunctions.today);
            break;
          case todosConstants.UPCOMING_FILTER:
            setFilter(() => filterFunctions.upcoming);
            break;
          case todosConstants.INBOX_FILTER:
            setFilter(() => filterFunctions.inbox);
            break;
          case todosConstants.COMPLETED_FILTER:
            setFilter(() => filterFunctions.completed);
            break;
          default:
            setFilter(() => filterFunctions.all);
            break;
        }
        break;
      case todosConstants.FILTER_BY_TAG:
        if (filterString) setFilter(() => filterFunctions.byTag(filterString));
        else setFilter(() => filterFunctions.all);
        break;
      default:
        setFilter(() => filterFunctions.all);
        break;
    }
  }, [filterType, filterString]);

  useEffect(() => {
    (async () => {
      setTodos(await todoService.getTodos());
    })();
  }, []);

  const tagsSet = new Set<string>();
  todos.forEach(todo => todo.tags.forEach(tag => tagsSet.add(tag)));

  const defaultFiltersCounts = {
    [todosConstants.TODAY_FILTER]: todos.filter(filterFunctions.today).length,
    [todosConstants.UPCOMING_FILTER]: todos.filter(filterFunctions.upcoming).length,
    [todosConstants.INBOX_FILTER]: todos.filter(filterFunctions.inbox).length,
    [todosConstants.COMPLETED_FILTER]: todos.filter(filterFunctions.completed).length
  };

  const tags = Array.from(tagsSet);
  const tagFiltersCounts: { [filter: string]: number } = {};
  tags.forEach(tag => {
    tagFiltersCounts[tag] = todos.filter(filterFunctions.byTag(tag)).length;
  });

  return (
    <div className={classes.root}>
      <Navigation tags={tags} filtersCounts={{ defaultFiltersCounts, tagFiltersCounts }} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} variant="outlined">
                <TodoList title="Upcoming" todos={todos.filter(filter)} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Hi {user && user.name}</h1>
  //     <Link to="/login">Logout</Link>
  //   </div>
  // );
}

function mapStateToProps({ authentication: { user }, todos }: RootState) {
  return { user, filter: todos };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
