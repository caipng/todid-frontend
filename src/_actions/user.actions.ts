import { UserSignupDetails } from './../_services/user.services';
import { userConstants } from '../_constants';
import { User, userService } from '../_services';
import { Dispatch } from 'redux';
import { history } from '../_helpers';
import { alertActions, AlertActionTypes } from './alert.actions';
import { AppThunk } from '../_helpers/store';

export const userActions = {
  login,
  logout,
  signup
};

export type UserActionTypes = {
  type: userConstants;
  userSignupDetails?: UserSignupDetails;
  user?: User;
  email?: string;
  error?: string;
};

function login(email: string, password: string): AppThunk {
  const request = (email: string): UserActionTypes => ({
    type: userConstants.LOGIN_REQUEST,
    email
  });
  const success = (user: User): UserActionTypes => ({
    type: userConstants.LOGIN_SUCCESS,
    user
  });
  const failure = (error: string): UserActionTypes => ({
    type: userConstants.LOGIN_FAILURE,
    error
  });

  return (dispatch: Dispatch<UserActionTypes | AlertActionTypes>) => {
    dispatch(request(email));
    userService.login(email, password).then(
      user => {
        dispatch(success(user));
        dispatch(alertActions.success('signed in'));
        history.push('/');
      },
      error => {
        const errorMessage: string = error.message || error;
        dispatch(failure(errorMessage));
        dispatch(alertActions.error(errorMessage));
      }
    );
  };
}

function logout(): UserActionTypes {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function signup(userSignupDetails: UserSignupDetails): AppThunk {
  const request = (userSignupDetails: UserSignupDetails): UserActionTypes => ({
    type: userConstants.SIGNUP_REQUEST,
    userSignupDetails
  });
  const success = (user: User): UserActionTypes => ({
    type: userConstants.SIGNUP_SUCCESS,
    user
  });
  const failure = (error: string): UserActionTypes => ({
    type: userConstants.SIGNUP_FAILURE,
    error
  });

  return (dispatch: Dispatch<UserActionTypes | AlertActionTypes>) => {
    dispatch(request(userSignupDetails));
    userService.signup(userSignupDetails).then(
      user => {
        dispatch(success(user));
        history.push('/');
        dispatch(alertActions.success('Sign up successful, you may now login.'));
      },
      error => {
        const errorMessage: string = error.message || error;
        dispatch(failure(errorMessage));
        dispatch(alertActions.error('Please check your details.'));
      }
    );
  };
}
