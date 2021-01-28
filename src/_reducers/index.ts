import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { todos } from './todos.reducer';

const rootReducer = combineReducers({ authentication, alert, todos });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
