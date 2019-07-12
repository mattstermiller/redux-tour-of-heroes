import { State } from './model'
import { Actions, HeroAction } from './actions';
import { getHeroes } from './HeroService'
import { getType } from 'typesafe-actions'

export function reducer(state: State, action: HeroAction): State {
  switch (action.type) {
    case getType(Actions.loadHeroes):
      return { ...state, heroes: getHeroes() };
    case getType(Actions.changeName):
      if (state.editHero) {
        let editHero = {...state.editHero, name: action.payload };
        let heroes = state.heroes.map(h => h.id === editHero.id ? editHero : h);
        return { ...state, editHero: editHero, heroes: heroes };
      } else {
        return state;
      }
    case getType(Actions.selectHero):
      return { ...state, editHero: action.payload };
    default:
      return state;
  }
}
