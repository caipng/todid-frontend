import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { userActions, UserActionTypes } from '../_actions';
import { RootState } from '../_reducers';

type LoginPageProps = {
  dispatch: ThunkDispatch<RootState, undefined, UserActionTypes>;
  loggingIn: boolean;
};

type LoginPageState = {
  email: string;
  password: string;
  submitted: boolean;
};

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = { email: '', password: '', submitted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    this.setState(state => ({ ...state, [name] : value }));
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <Link to="/signup">Sign up</Link>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email && <div>Email is required</div>}
          </div>

          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div>Password is required</div>}
          </div>

          <div className="form-group">
            <button className="btn">Login</button>
            {loggingIn && <span>Logging In!</span>}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ loggingIn: !!state.authentication.loggingIn })
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
