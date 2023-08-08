import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
  } from "redux";
  import { reducer as AppReducer } from "./AppReducer/Reducer";
  import { reducer as AuthReducer } from "./AuthReducer/Reducer";
  import { reducer as UserReducer } from "./UserReducer/Reducer";
  import thunk from "redux-thunk";

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
  
  const rootReducer = combineReducers({ AppReducer, AuthReducer, UserReducer });
  
  export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );