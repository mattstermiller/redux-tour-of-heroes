import { State } from './model'
import { Actions, HeroAction } from './actions';
import { getType } from 'typesafe-actions'

export function reducer(state: State, action: HeroAction): State {
  switch (action.type) {
    case getType(Actions.loadHeroesBegin):
      return { ...state, heroes: [], isLoadingHeroes: true, loadHeroesError: null };
    case getType(Actions.loadHeroesSuccess):
      return { ...state, heroes: action.payload, isLoadingHeroes: false };
    case getType(Actions.loadHeroesError):
      return { ...state, loadHeroesError: action.payload, isLoadingHeroes: false };
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
    case getType(Actions.addMessage):
      let messages = state.messages.slice();
      messages.push(action.payload)
      return { ...state, messages: messages };
    case getType(Actions.clearMessages):
      return { ...state, messages: [] };
    default:
      return state;
  }
}
