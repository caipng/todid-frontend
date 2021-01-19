import { Container, Grid, TextField, Typography, Button, Link, Box } from '@material-ui/core';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { UserActionTypes, userActions } from '../_actions';
import { useInput } from '../_helpers';
import { RootState } from '../_reducers';
import useStyles from './styles';
import { Footer } from '../_components';
import LinearProgress from '@material-ui/core/LinearProgress';

type SignupPageProps = {
  dispatch: ThunkDispatch<RootState, undefined, UserActionTypes>;
  signingUp: boolean;
  signupError: string | undefined;
};

function SignupPage({ dispatch, signingUp, signupError }: SignupPageProps) {
  const {
    value: firstName,
    setError: setFirstNameError,
    props: firstNameProps
  } = useInput();
  const {
    value: lastName,
    setError: setLastNameError,
    props: lastNameProps
  } = useInput();
  const {
    value: password,
    setError: setPasswordError,
    props: passwordProps
  } = useInput();
  const {
    value: passwordConfirmation,
    setError: setPasswordConfirmationError,
    props: passwordConfirmationProps
  } = useInput();
  const {
    value: email,
    setError: setEmailError,
    props: emailProps
  } = useInput();

  useEffect(() => {
    if (signupError) {
      signupError.split('\n').forEach(error => {
        if (error.match(/email/i)) setEmailError({ error: true, helperText: error })
        if (error.match(/password/i)) setPasswordError({ error: true, helperText: error })
      });
    }
  }, [signupError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName && lastName && password && passwordConfirmation && password === passwordConfirmation && email) {
      dispatch(userActions.signup({ name: `${firstName} ${lastName}`, password, email}))
    } else {
      if (!firstName) setFirstNameError({ error: true, helperText: 'First Name cannot be empty'});
      if (!lastName) setLastNameError({ error: true, helperText: 'Last Name cannot be empty'});
      if (!password) setPasswordError({ error: true, helperText: 'Password cannot be empty'});
      if (!passwordConfirmation) setPasswordConfirmationError({ error: true, helperText: 'Password confirmation cannot be empty'});
      if (passwordConfirmation && password !== passwordConfirmation) setPasswordConfirmationError({ error: true, helperText: 'Password confirmation does not match password'});
      if (!email) setEmailError({ error: true, helperText: 'Email cannot be empty'});
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      {signingUp && <LinearProgress className={classes.progress} />}
          <img src="/logo.png" alt="logo" className={classes.logo} />
        <Typography component="h1" variant="h4" className={classes.title}>
          Create Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...firstNameProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="First Name"
                {...lastNameProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...emailProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                {...passwordProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                autoComplete="password"
                {...passwordConfirmationProps}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
              <Footer />
            </Box>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  signingUp: !!state.authentication.signingUp,
  signupError: state.authentication.error
})
const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage };
