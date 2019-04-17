import { createStore, applyMiddleware } from 'redux';
import { middleware } from "../middleware/index";
import { rootReducer } from "../reducers/index";
const Middleware = applyMiddleware(...middleware);

/**
 * Global store for storing global states.
 * @type {Store<any>}
 */

 
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;