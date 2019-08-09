import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, mergeMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Actions, HeroAction } from './actions';

const heroesApi = 'http://localhost:5000/heroes';

async function fetchJson(input: RequestInfo, init?: RequestInit | undefined) {
  const response = await fetch(input, init);
  if (response.ok) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(text);
  }
}

const loadHeroes: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.loadHeroesBegin)),
  mergeMap(action =>
    from(fetchJson(heroesApi)).pipe(
      mergeMap(heroes => of(
        Actions.loadHeroesSuccess(heroes),
        Actions.addMessage("epics: fetched heroes")
      )),
      catchError(e => of(
        Actions.loadHeroesError(e.message),
        Actions.addMessage("epics: error attempting to fetch heroes")
      ))
    )
  )
);

export default combineEpics(loadHeroes);
