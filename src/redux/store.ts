import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  data: dataReducer,
  // Add other reducers here
});

const composedEnhancers = composeWithDevTools();

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
