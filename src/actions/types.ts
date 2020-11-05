import { FooAction, BarAction } from './fooBar';

export enum ActionTypes {
  foo,
  bar,
}

export type Action = FooAction | BarAction;
