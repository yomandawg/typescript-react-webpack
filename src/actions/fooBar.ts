import axios from 'axios';
import { Dispatch } from 'redux';

import { ActionTypes } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export interface FooBar {
  id: number;
  title: string;
  completed: boolean;
}

export interface FooAction {
  type: ActionTypes.foo;
  payload: FooBar[];
}

export interface BarAction {
  type: ActionTypes.bar;
  payload: number;
}

export const foo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<FooBar[]>(API_URL);
      dispatch<FooAction>({
        type: ActionTypes.foo,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const bar = (id: number): BarAction => {
  return {
    type: ActionTypes.bar,
    payload: id,
  };
};
