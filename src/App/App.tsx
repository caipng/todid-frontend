import React from 'react';
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

type AppProps = {
  dispatch: Dispatch<AlertActionTypes>;
  alert: AlertState;
};

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => dispatch(alertActions.clear()));
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="app-container">
        {alert.message && <pre className={`alert ${alert.type}`}>{alert.message}</pre>}
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
}

const mapStateToProps = (state: RootState) => ({ alert: state.alert });
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
