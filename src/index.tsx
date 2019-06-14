import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as actions from './actions';
import App from './App';
import Hero from './hero'
import { HEROES } from './mock-heroes';

import './index.css';

export interface State {
  heroes: Hero[],
  editHero: Hero | null,
}

const initialState : State = {
  heroes: HEROES,
  editHero: null,
}

function reducer(state: State, action: actions.HeroAction): State {
  switch (action.type) {
    case actions.NAME_CHANGE:
      if (state.editHero) {
        let editHero = {...state.editHero, name: action.name };
        let heroes = state.heroes.map(h => h.id === editHero.id ? editHero : h);
        return { ...state, editHero: editHero, heroes: heroes };
      } else {
        return state;
      }
    case actions.HERO_SELECT:
      return { ...state, editHero: action.hero };
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
