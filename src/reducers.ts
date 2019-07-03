import { State } from './model'
import * as actions from './actions';
import { getHeroes } from './HeroService'

export function reducer(state: State, action: actions.HeroAction): State {
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
