import { put, takeLatest, all } from 'redux-saga/effects';
import { HEROES } from './mock-heroes';
import { Actions } from './actions'

function sleep(ms: number) {
  return new Promise(f => setTimeout(f, ms));
}

function* loadHeroes() {
  yield sleep(1000);
  if (Math.random() > 0.5) {
    yield put(Actions.loadHeroesError("Failed to connect."));
    yield put(Actions.addMessage("sagas: error attempting to fetch heroes"));
  } else {
    yield put(Actions.loadHeroesSuccess(HEROES));
    yield put(Actions.addMessage("sagas: fetched heroes"));
  }
}

function* watchLoadHeroes() {
  yield takeLatest(Actions.loadHeroesBegin().type, loadHeroes);
}

export default function* rootSaga() {
  yield all([
    watchLoadHeroes(),
  ]);
}