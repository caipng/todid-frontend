import { alertConstants } from '../_constants';

export const alertActions = {
  success: (message: string): AlertActionTypes => ({ type: alertConstants.SUCCESS, message }),
  error: (message: string): AlertActionTypes => ({ type: alertConstants.ERROR, message }),
  clear: (): AlertActionTypes => ({ type: alertConstants.CLEAR })
};

export type AlertActionTypes = {
  type: alertConstants;
  message?: string;
};
