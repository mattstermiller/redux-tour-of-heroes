import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { State, initialState } from './model';
import { reducer } from './reducers';
import { getHeroes } from './HeroService'
import App from './App';

import './index.css';

const store: Store<State, any> = createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(getHeroes());
