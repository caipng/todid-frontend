import { UserActionTypes } from '../_actions';
import { userConstants } from '../_constants';
import { User } from '../_services';

type AuthenticationState = {
  loggingIn?: boolean;
  signingUp?: boolean;
  error?: string;
  loggedIn?: boolean;
  user?: User;
  email?: string;
};

const text = localStorage.getItem('user');
const initialState: AuthenticationState =
  text == null ? {} : { loggedIn: true, user: JSON.parse(text) as User };

export function authentication(
  state: AuthenticationState = initialState,
  action: UserActionTypes
): AuthenticationState {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { loggingIn: true, email: action.email };
    case userConstants.SIGNUP_REQUEST:
      return { signingUp: true };
    case userConstants.SIGNUP_SUCCESS:
      return { user: action.user };
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case userConstants.SIGNUP_FAILURE:
    case userConstants.LOGIN_FAILURE:
      return { error: action.error };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
