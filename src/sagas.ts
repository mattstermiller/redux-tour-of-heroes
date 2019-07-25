import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Actions } from './actions'
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

function* loadHeroes() {
  yield takeLatest(getType(Actions.loadHeroesBegin), function*() {
    try {
      const heroes: Hero[] = yield call(fetchJson, heroesApi);
      yield put(Actions.loadHeroesSuccess(heroes));
      yield put(Actions.addMessage("sagas: fetched heroes"));
    } catch (e) {
      yield put(Actions.loadHeroesError(e.message));
      yield put(Actions.addMessage("sagas: error attempting to fetch heroes"));
    }
  });
}

function* updateHero() {
  yield takeLatest(getType(Actions.updateHero), function*(action: ReturnType<typeof Actions.updateHero>) {
    try {
      const hero = action.payload;
      yield call(fetchJson, heroesApi, { method: 'PUT', body: JSON.stringify(hero) });
      yield put(Actions.addMessage("sagas: updated hero " + hero.id));
    } catch (e) {
      yield put(Actions.addMessage("sagas: error attempting to update hero"));
    }
  });
}

export default function* rootSaga() {
  yield all([
    loadHeroes(),
    updateHero(),
  ]);
}
