import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { userActions, UserActionTypes } from '../_actions';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { RootState } from '../_reducers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Footer } from '../_components';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

type LoginPageProps = {
  dispatch: ThunkDispatch<RootState, undefined, UserActionTypes>;
  loggingIn: boolean;
  loginError: string | undefined;
};

function LoginPage({ dispatch, loggingIn, loginError }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({});
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({});
  const classes = useStyles();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  useEffect(() => {
    if (loginError) {
      setPasswordError({ error: true });
      setEmailError({ error: true });
    }
  }, [loginError]);

  const handleChange = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'email':
        setEmail(value);
        setEmailError({});
        break;
      case 'password':
        setPassword(value);
        setPasswordError({});
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(userActions.login(email, password));
    } else {
      if (!email) {
        setEmailError({ error: true, helperText: 'Email cannot be empty' });
      }
      if (!password) {
        setPasswordError({ error: true, helperText: 'Email cannot be empty' });
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      {loggingIn && <LinearProgress className={classes.progress} />}
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        className={classes.paperContainer}
      >
        <div className={classes.paper}>
          <img src="/logo.png" alt="logo" className={classes.logo} />
          <Typography component="h1" variant="h4" className={classes.welcome}>
            Welcome Back
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={email}
              {...emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={password}
              {...passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: RootState) => ({
  loggingIn: !!state.authentication.loggingIn,
  loginError: state.authentication.error
});
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
