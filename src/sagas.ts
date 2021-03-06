import { put, call, takeLatest, all, debounce } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Actions } from './actions';
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
  yield takeLatest(getType(Actions.loadHeroes.request), function*() {
    try {
      const heroes: Hero[] = yield call(fetchJson, heroesApi);
      yield put(Actions.loadHeroes.success(heroes));
      yield put(Actions.addMessage("sagas: fetched heroes"));
    } catch (e) {
      yield put(Actions.loadHeroes.failure(e.message));
      yield put(Actions.addMessage("sagas: error attempting to fetch heroes"));
    }
  });
}

function* searchHeroes() {
  yield debounce(300, getType(Actions.searchHeroes.request), function*(action: ReturnType<typeof Actions.searchHeroes.request>) {
    try {
      const terms = action.payload;
      if (!terms) return;
      const heroes: Hero[] = yield call(fetchJson, heroesApi + `/?name=${encodeURIComponent(terms)}`);
      yield put(Actions.searchHeroes.success(heroes));
      yield put(Actions.addMessage(`sagas: found ${heroes.length} heroes matching "${terms}"`));
    } catch (e) {
      yield put(Actions.addMessage("sagas: error attempting to search heroes"));
    }
  });
}

function* addHero() {
  yield takeLatest(getType(Actions.addHero.request), function*(action: ReturnType<typeof Actions.addHero.request>) {
    try {
      const hero = action.payload;
      const newHero: Hero = yield call(fetchJson, heroesApi, { method: 'POST', body: JSON.stringify(hero) });
      yield put(Actions.addHero.success(newHero));
      yield put(Actions.addMessage("sagas: added hero " + newHero.id));
    } catch (e) {
      yield put(Actions.addMessage("sagas: error attempting to add hero"));
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

function* deleteHero() {
  yield takeLatest(getType(Actions.deleteHero.request), function*(action: ReturnType<typeof Actions.deleteHero.request>) {
    try {
      const hero = action.payload;
      yield call(fetchJson, `${heroesApi}/${hero.id}`, { method: 'DELETE' });
      yield put(Actions.deleteHero.success(hero));
      yield put(Actions.addMessage("sagas: deleted hero " + hero.id));
    } catch (e) {
      yield put(Actions.addMessage("sagas: error attempting to delete hero"));
    }
  });
}

export default function* rootSaga() {
  yield all([
    loadHeroes(),
    searchHeroes(),
    addHero(),
    updateHero(),
    deleteHero(),
  ]);
}
