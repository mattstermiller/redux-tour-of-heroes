import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { State, initialState } from './model';
import * as actions from './actions';
import { reducer } from './reducers';
import App from './App';

import './index.css';

const store: Store<State, actions.HeroAction> = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(actions.loadHeroes());
