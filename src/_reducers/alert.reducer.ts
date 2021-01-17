import { AlertActionTypes } from '../_actions';
import { alertConstants } from '../_constants';

export type AlertState = {
  type?: 'success' | 'error';
  message?: string;
};

const initialState: AlertState = {};

export function alert(state: AlertState = initialState, action: AlertActionTypes): AlertState {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return { type: 'success', message: action.message };
    case alertConstants.ERROR:
      return { type: 'error', message: action.message };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
