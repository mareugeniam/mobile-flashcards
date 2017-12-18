import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import decks from '../reducers'

export let store = null;

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  store = createStore(
    decks, 
    composeEnhancers(
      applyMiddleware(thunk)));

  return store;
}