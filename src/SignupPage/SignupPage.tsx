import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { UserActionTypes, userActions } from '../_actions';
import { RootState } from '../_reducers';

type SignupPageProps = {
  dispatch: ThunkDispatch<RootState, undefined, UserActionTypes>;
};

type SignupPageState = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  submitted: boolean;
};

class SignupPage extends React.Component<SignupPageProps, SignupPageState> {
  constructor(props: SignupPageProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    this.setState(state => ({ ...state, [name]: value }));
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { submitted, ...userDetails } = this.state;
    const { dispatch } = this.props;
    // ensure that all fields are not empty
    if (Object.values(userDetails).reduce((A, i) => A && i, true))
      dispatch(userActions.signup(userDetails));
  }

  render() {
    const { name, email, password, password_confirmation, submitted } = this.state;
    return (
      <div>
        <h2>Sign Up</h2>
        <Link to="/login">Login</Link>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} />
            {submitted && !name && <div>Name is required</div>}
          </div>

          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email && <div>email is required</div>}
          </div>

          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div>Password is required</div>}
          </div>

          <div className={'form-group' + (submitted && !password_confirmation ? ' has-error' : '')}>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />
            {submitted && !password && <div>Password Confirmation is required</div>}
          </div>

          <div className="form-group">
            <button className="btn">Signup</button>
          </div>
        </form>
      </div>
    );
  }
}

const connectedSignupPage = connect()(SignupPage);
export { connectedSignupPage as SignupPage };
