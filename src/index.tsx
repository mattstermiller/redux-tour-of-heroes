import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { State, initialState } from './model';
import { Actions, HeroAction } from './actions';
import { reducer } from './reducers';
import rootSaga from './sagas';
import App from './App';

import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store: Store<State, HeroAction> = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(Actions.loadHeroes.request());
