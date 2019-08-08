import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { State, initialState } from './model';
import { Actions, HeroAction } from './actions';
import { reducer } from './reducers';
import rootEpic from './epics';
import App from './App';

import './index.css';

const epicMiddleware = createEpicMiddleware();
const store: Store<State, HeroAction> = createStore(reducer, initialState, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(Actions.loadHeroesBegin());
