import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as actions from './actions';
import App from './App';

import './index.css';

export interface State {
  languageName: string;
  enthusiasmLevel: number;
}

const initialState : State = {
  languageName: 'TypeScript',
  enthusiasmLevel: 1,
}

function reducer(state: State, action: actions.EnthusiasmAction): State {
  switch (action.type) {
    case actions.INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case actions.DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}

const store = createStore<State, any, any, any>(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
