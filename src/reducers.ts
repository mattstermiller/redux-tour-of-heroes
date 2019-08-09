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
      let i = state.heroes.findIndex(h => h.id === action.payload.id);
      if (i >= 0) {
        let heroes = state.heroes.slice();
        heroes[i] = {...heroes[i], name: action.payload.newName };
        return { ...state, heroes: heroes };
      } else {
        return state;
      }
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
