import { makeStyles, fade } from '@material-ui/core/styles';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItem from '@material-ui/core/ListItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Dispatch } from 'redux';
import { DefaultFiltersTypes, todosActions, TodosActionTypes } from '../_actions';
import { connect } from 'react-redux';
import { todosConstants } from '../_constants';
import { TodosState } from '../_reducers/todos.reducer';
import { RootState } from '../_reducers';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { stringToColor } from '../_helpers';
import { TodoForm } from '../_components';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerPaper: {
    width: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  tagsTitle: {
    fontSize: 16,
    padding: 20
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

type NavigationProps = {
  dispatch: Dispatch<TodosActionTypes>;
  tags: string[];
  filter: TodosState;
  filtersCounts: {
    defaultFiltersCounts: { [filter in DefaultFiltersTypes]: number };
    tagFiltersCounts: { [filter: string]: number };
  };
};

const Navigation = ({
  dispatch,
  tags,
  filter: { filterString, filterType },
  filtersCounts: { defaultFiltersCounts, tagFiltersCounts }
}: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [todoFormOpen, setTodoFormOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    const filter = e.currentTarget.id;
    switch (filter) {
      case todosConstants.TODAY_FILTER:
      case todosConstants.UPCOMING_FILTER:
      case todosConstants.INBOX_FILTER:
      case todosConstants.COMPLETED_FILTER:
        dispatch(todosActions.filter(filter));
        break;
      default:
        dispatch(todosActions.filter_by_tag(filter));
        break;
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img src="/logo.png" alt="logo" className={classes.logo} />
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Todid
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key="today"
          id={todosConstants.TODAY_FILTER}
          onClick={handleClick}
          selected={filterString === todosConstants.TODAY_FILTER}
        >
          <ListItemIcon>
            <Badge
              badgeContent={defaultFiltersCounts[todosConstants.TODAY_FILTER]}
              max={99}
              showZero
            >
              <ScheduleIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>
        <ListItem
          button
          key="upcoming"
          id={todosConstants.UPCOMING_FILTER}
          onClick={handleClick}
          selected={filterString === todosConstants.UPCOMING_FILTER}
        >
          <ListItemIcon>
            <Badge
              badgeContent={defaultFiltersCounts[todosConstants.UPCOMING_FILTER]}
              max={99}
              showZero
            >
              <DateRangeIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Upcoming" />
        </ListItem>
        <ListItem
          button
          key="inbox"
          id={todosConstants.INBOX_FILTER}
          onClick={handleClick}
          selected={filterString === todosConstants.INBOX_FILTER}
        >
          <ListItemIcon>
            <Badge
              badgeContent={defaultFiltersCounts[todosConstants.INBOX_FILTER]}
              max={99}
              showZero
            >
              <InboxIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          key="completed"
          id={todosConstants.COMPLETED_FILTER}
          onClick={handleClick}
          selected={filterString === todosConstants.COMPLETED_FILTER}
        >
          <ListItemIcon>
            <Badge
              badgeContent={defaultFiltersCounts[todosConstants.COMPLETED_FILTER]}
              max={99}
              showZero
            >
              <AssignmentTurnedInIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Completed" />
        </ListItem>
      </List>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.tagsTitle}>
        TAGS
      </Typography>
      <Divider />
      <List>
        {tags.map(tag => (
          <ListItem
            button
            key={tag}
            id={tag}
            onClick={handleClick}
            selected={filterType === todosConstants.FILTER_BY_TAG && filterString === tag}
          >
            <ListItemIcon>
              <FiberManualRecordIcon style={{ color: stringToColor(tag), fontSize: 14 }} />
            </ListItemIcon>

            <ListItemText primary={tag} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* Upcoming */}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <IconButton color="inherit" onClick={() => setTodoFormOpen(true)}>
            <Tooltip title="New Todo">
              <AddIcon />
            </Tooltip>
          </IconButton>

          <TodoForm
            open={todoFormOpen}
            handleClose={() => setTodoFormOpen(false)}
            title={'New Todo'}
          />

          <IconButton color="inherit">
            <Tooltip title="About">
              <HelpOutlineIcon />
            </Tooltip>
          </IconButton>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={e => setAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <Tooltip title="Account">
                <PersonIcon />
              </Tooltip>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                <RouterLink to="/login">Logout</RouterLink>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={() => setOpen(!open)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = ({ todos: filter }: RootState) => ({ filter });
const connectedNavigation = connect(mapStateToProps)(Navigation);
export { connectedNavigation as Navigation };
