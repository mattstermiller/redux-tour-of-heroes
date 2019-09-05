import { State } from './model'
import { Actions, HeroAction } from './actions';
import { getType } from 'typesafe-actions'

export function reducer(state: State, action: HeroAction): State {
  switch (action.type) {
    case getType(Actions.loadHeroes.request):
      return { ...state, heroes: [], isLoadingHeroes: true, loadHeroesError: null };
    case getType(Actions.loadHeroes.success):
      return { ...state, heroes: action.payload, isLoadingHeroes: false };
    case getType(Actions.loadHeroes.failure):
      return { ...state, loadHeroesError: action.payload, isLoadingHeroes: false };
    case getType(Actions.searchHeroes.request):
      return { ...state, searchInput: action.payload, searchResults: [] };
    case getType(Actions.searchHeroes.success):
      return { ...state, searchResults: action.payload };
    case getType(Actions.addHero.success):
      const heroes = state.heroes.slice();
      heroes.push(action.payload);
      heroes.sort((a, b) => a.name.localeCompare(b.name));
      return { ...state, heroes };
    case getType(Actions.updateHero):
      const hero = action.payload;
      return { ...state, heroes: state.heroes.map(h => h.id === hero.id ? hero : h) };
    case getType(Actions.deleteHero.success):
      return { ...state, heroes: state.heroes.filter(h => h.id !== action.payload.id) };
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
