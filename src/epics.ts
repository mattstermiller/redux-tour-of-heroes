import { Epic, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Actions, HeroAction } from './actions';
import { HEROES } from './mock-heroes';

function sleep(ms: number) {
  return new Promise(f => setTimeout(f, ms));
}

const loadHeroes: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.loadHeroesBegin)),
  mergeMap(action =>
    from(sleep(1000)).pipe(
      map(() => Actions.loadHeroesSuccess(HEROES))
    )
  )
);

export default combineEpics(loadHeroes);
