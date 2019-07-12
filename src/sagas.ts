import { put, takeLatest, all } from 'redux-saga/effects';
import { HEROES } from './mock-heroes';
import { Actions } from './actions'

function sleep(ms: number) {
  return new Promise(f => setTimeout(f, ms));
}

function* loadHeroes() {
  yield sleep(1000);
  yield put(Actions.loadHeroesSuccess(HEROES));
}

function* watchLoadHeroes() {
  yield takeLatest(Actions.loadHeroesBegin().type, loadHeroes);
}

export default function* rootSaga() {
  yield all([
    watchLoadHeroes(),
  ]);
}
