import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dateContainer: {
    display: 'flex'
  },
  date: {
    flexGrow: 100,
    textAlign: 'right',
    padding: '20px 40px'
  },
  day: {
    padding: '20px 40px'
  },
  todosContainer: {
    paddingTop: 20
  }
}));

export default useStyles;
