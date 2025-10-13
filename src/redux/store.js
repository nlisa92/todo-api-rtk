import { configureStore, combineReducers } from "@reduxjs/toolkit";

import inputTextReducer from "./slice/inputSlice";
import tasksReducer from "./slice/tasksSlice";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextReducer,
    tasks: tasksReducer,
  }),
});

export default store;
