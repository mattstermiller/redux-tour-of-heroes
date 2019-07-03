import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import * as actions from './actions';
import App from './App';
import Hero from './hero'
import * as HeroService from './HeroService'

import './index.css';

export interface State {
  heroes: Hero[],
  editHero: Hero | null,
}

const initialState : State = {
  heroes: [],
  editHero: null,
}

function reducer(state: State, action: actions.HeroAction): State {
  switch (action.type) {
    case actions.LOAD_HEROES:
      let heroes = HeroService.getHeroes();
      return { ...state, heroes: heroes };
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
