import { HEROES } from './mock-heroes';
import { Actions, Dispatcher } from './actions'

function sleep(ms: number) {
  return new Promise(f => setTimeout(f, ms));
}

export function getHeroes() {
  return async (dispatch: Dispatcher) => {
    dispatch(Actions.loadHeroesBegin())
    await sleep(1000);
    if (Math.random() > 0.5) {
      return dispatch(Actions.loadHeroesError("Failed to connect"));
    }
    return dispatch(Actions.loadHeroesSuccess(HEROES));
  }
}
