import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, mergeMap, catchError } from 'rxjs/operators';
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
      mergeMap(() => {
        if (Math.random() > 0.5) {
          throw new Error("Failed to connect.");
        }
        return of(
          Actions.loadHeroesSuccess(HEROES),
          Actions.addMessage("epics: fetched heroes")
        );
      }),
      catchError(e => of(
        Actions.loadHeroesError(e.message),
        Actions.addMessage("epics: error attempting to fetch heroes")
      ))
    )
  )
);

export default combineEpics(loadHeroes);
