import { combineReducers } from 'redux';
import { fooBarsReducer } from './fooBar';
import { FooBar } from '../actions';

export interface StoreState {
  fooBars: FooBar[];
}

export const reducers = combineReducers<StoreState>({
  fooBars: fooBarsReducer,
});
