import { HEROES } from './mock-heroes';
import { Actions, Dispatcher } from './actions'

function sleep(ms: number) {
  return new Promise(f => setTimeout(f, ms));
}

export function getHeroes() {
  return async (dispatch: Dispatcher) => {
    dispatch(Actions.loadHeroesBegin())
    await sleep(1000);
    return dispatch(Actions.loadHeroesSuccess(HEROES));
  }
}
