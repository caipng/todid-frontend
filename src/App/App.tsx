import React, { useEffect, useState } from 'react';
import { alertActions, AlertActionTypes } from '../_actions';
import { Dispatch } from 'redux';
import { AlertState } from '../_reducers/alert.reducer';
import { history } from '../_helpers';
import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from '../_components/';
import { connect } from 'react-redux';
import { RootState } from '../_reducers';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { SignupPage } from '../SignupPage';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { capitalize } from '../_helpers';

type AppProps = {
  dispatch: Dispatch<AlertActionTypes>;
  alert: AlertState;
};

function App({ dispatch, alert }: AppProps) {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setAlertOpen(true);
    }
  }, [alert.message]);

  const handleClose = (_: any, reason: string = '') => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
    setTimeout(() => dispatch(alertActions.clear()), 500);
  };
  return (
    <div className="app-container">
      <Snackbar
        open={alertOpen}
        autoHideDuration={alert.type === 'error' ? 6000 : 1200}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={alert.type}>
          {alert.message && capitalize(alert.message)}
        </Alert>
      </Snackbar>
      <Router history={history}>
        <div>
          <Switch>
            <PrivateRoute exact path="/">
              <HomePage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ alert: state.alert });
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
