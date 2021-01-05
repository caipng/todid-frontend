import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({ authentication, alert });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
