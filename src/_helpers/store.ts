import { AnyAction, createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from '../_reducers';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export function configureStore() {
  const logger = createLogger();
  const middleware = applyMiddleware(
    thunkMiddleware as ThunkMiddleware<RootState, AnyAction>,
    logger
  );
  const store: Store<RootState> = createStore(rootReducer, middleware);
  return store;
}
