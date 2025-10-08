import { legacy_createStore as createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import inputTextReducer from "./reducers/InputReducer";
import tasksReducer from "./reducers/tasksReducer";

const rootReducer = combineReducers({
  text: inputTextReducer,
  tasks: tasksReducer,
});


const store = createStore(rootReducer, devToolsEnhancer());

export default store;
