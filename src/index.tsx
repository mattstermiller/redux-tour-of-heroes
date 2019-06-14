import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as actions from './actions';
import Hello from './Hello';

import './index.css';

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

const initialState : StoreState = {
  languageName: 'TypeScript',
  enthusiasmLevel: 1,
}

function reducer(state: StoreState, action: actions.EnthusiasmAction): StoreState {
  switch (action.type) {
    case actions.INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case actions.DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}

const store = createStore<StoreState, any, any, any>(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
