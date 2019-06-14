import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as actions from './actions';
import App from './App';
import Hero from './hero'

import './index.css';

export interface State {
  hero: Hero
}

const initialState : State = {
  hero: {
    id: 1,
    name: "Windstorm",
  }
}

function reducer(state: State, action: actions.HeroAction): State {
  switch (action.type) {
    case actions.NAME_CHANGE:
      return { ...state, hero: {...state.hero, name: action.name } };
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
