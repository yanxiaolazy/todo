import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { reducer as loginReducer } from "./Login";
import { reducer as editProjectReducer } from "./EditProject";
import { reducer as moduleItemReducer } from "./ModuleItem";
import { reducer as fileModuleReducer } from "./FileModule";
import { reducer as textModuleReducer } from "./TextModule";

let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const reducer = combineReducers({
  login: loginReducer,
  project: editProjectReducer,
  moduleItem: moduleItemReducer,
  fileModule: fileModuleReducer,
  textModule:textModuleReducer
});

export default createStore(reducer, applyMiddleware(...middlewares));

