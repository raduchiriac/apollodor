import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import shop from './reducers/shop';

export default (client) => createStore(
  combineReducers({
    apollo: client.reducer(),
    shop
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);