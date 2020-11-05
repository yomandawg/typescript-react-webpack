import { ActionTypes, Action, FooBar } from '../actions';

export const fooBarsReducer = (state: FooBar[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.foo:
      return action.payload;
    case ActionTypes.bar:
      return state.filter((fooBar: FooBar) => fooBar.id !== action.payload);
    default:
      return state;
  }
};
