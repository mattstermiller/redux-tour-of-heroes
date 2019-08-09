import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, map, mergeMap, debounceTime, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { Actions, HeroAction } from './actions';
import { Hero } from './model';

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

const searchHeroes: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.searchHeroesBegin)),
  filter(action => <any>action.payload),
  debounceTime(300),
  mergeMap(action =>
    from(fetchJson(heroesApi + `/?name=${encodeURIComponent(action.payload)}`)).pipe(
      mergeMap(heroes => of(
        Actions.searchHeroesSuccess(heroes),
        Actions.addMessage(`epics: found ${heroes.length} heroes matching "${action.payload}"`)
      )),
      catchError(e => of(Actions.addMessage("epics: error attempting to search heroes")))
    )
  )
);

const addHero: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.addHeroBegin)),
  mergeMap(action =>
    from(fetchJson(heroesApi, { method: 'POST', body: JSON.stringify(action.payload) })).pipe(
      mergeMap((newHero: Hero) => of(
        Actions.addHeroSuccess(newHero),
        Actions.addMessage("epics: added hero " + newHero.id)
      )),
      catchError(e => of(Actions.addMessage("epics: error attempting to add hero")))
    )
  )
);

const updateHero: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.updateHero)),
  mergeMap(action =>
    from(fetchJson(heroesApi, { method: 'PUT', body: JSON.stringify(action.payload) })).pipe(
      map(() => Actions.addMessage("epics: updated hero " + action.payload.id)),
      catchError(e => of(Actions.addMessage("epics: error attempting to update hero")))
    )
  )
);

const deleteHero: Epic<HeroAction> = action$ => action$.pipe(
  filter(isActionOf(Actions.deleteHeroBegin)),
  mergeMap(action =>
    from(fetchJson(`${heroesApi}/${action.payload.id}`, { method: 'DELETE' })).pipe(
      mergeMap(() => of(
        Actions.deleteHeroSuccess(action.payload),
        Actions.addMessage("epics: deleted hero " + action.payload.id)
      )),
      catchError(e => of(Actions.addMessage("epics: error attempting to delete hero")))
    )
  )
);

export default combineEpics(
  loadHeroes,
  searchHeroes,
  addHero,
  updateHero,
  deleteHero
);
