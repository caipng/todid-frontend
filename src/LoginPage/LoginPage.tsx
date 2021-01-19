import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
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
import { useInput } from '../_helpers';
import { User } from '../_services';

type LoginPageProps = {
  dispatch: ThunkDispatch<RootState, undefined, UserActionTypes>;
  loggingIn: boolean;
  loginError: string | undefined;
  signedUpUser: User | undefined;
};

function LoginPage({ dispatch, loggingIn, loginError, signedUpUser }: LoginPageProps) {
  const {
    value: email,
    setValue: setEmail,
    setError: setEmailError,
    props: emailProps
  } = useInput();
  const {
    value: password,
    setValue: setPassword,
    setError: setPasswordError,
    props: passwordProps
  } = useInput();

  const classes = useStyles();

  useEffect(() => {
    dispatch(userActions.logout());
    if (signedUpUser) setEmail(signedUpUser.email);
  }, []);

  useEffect(() => {
    if (loginError) {
      setPasswordError({ error: true });
      setEmailError({ error: true });
    }
  }, [loginError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined = undefined) => {
    e && e.preventDefault();
    if (email && password) {
      dispatch(userActions.login(email, password));
    } else {
      if (!email) setEmailError({ error: true, helperText: 'Email cannot be empty' });
      if (!password) setPasswordError({ error: true, helperText: 'Password cannot be empty' });
    }
  };

  const demoSignin = () => {
    setEmail('techlead@google.com');
    setPassword('password');
  };

  return (
    <Grid container component="main" className={classes.root}>
      {loggingIn && <LinearProgress className={classes.progress} />}
      <Grid item xs={false} sm={4} md={8} />
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
              {...emailProps}
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
              {...passwordProps}
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
              <Grid item xs>
                <Link onClick={demoSignin} className={classes.link} variant="body2">
                  Demo Account
                </Link>
              </Grid>
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
  loginError: state.authentication.error,
  signedUpUser: state.authentication.user
});
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
