import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { reducer as loginReducer } from "./Login";

let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const reducer = combineReducers({
  login: loginReducer
});

export default createStore(reducer, applyMiddleware(...middlewares));