import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
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
      map(() => {
        if (Math.random() > 0.5) {
          throw new Error("Failed to connect.");
        }
        return Actions.loadHeroesSuccess(HEROES);
      }),
      catchError(err => of(Actions.loadHeroesError(err.message)))
    )
  )
);

export default combineEpics(loadHeroes);
