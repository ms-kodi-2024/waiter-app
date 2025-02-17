import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import tablesReducer from './tablesRedux';

const subreducers = {
  tables: tablesReducer,
}

const reducer = combineReducers(subreducers);

const configureStore = (initialState) =>
  createStore(
    reducer,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
  );

export default configureStore;