import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { State, initialState } from './model';
import * as actions from './actions';
import App from './App';
import { getHeroes } from './HeroService'

import './index.css';

function reducer(state: State, action: actions.HeroAction): State {
  switch (action.type) {
    case actions.LOAD_HEROES:
      return { ...state, heroes: getHeroes() };
    case actions.CHANGE_NAME:
      if (state.editHero) {
        let editHero = {...state.editHero, name: action.name };
        let heroes = state.heroes.map(h => h.id === editHero.id ? editHero : h);
        return { ...state, editHero: editHero, heroes: heroes };
      } else {
        return state;
      }
    case actions.SELECT_HERO:
      return { ...state, editHero: action.hero };
    default:
      return state;
  }
}

const store: Store<State, actions.HeroAction> = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(actions.loadHeroes());
