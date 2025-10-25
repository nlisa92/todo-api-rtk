import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import inputTextReducer from "./slice/inputSlice";
import tasksReducer from "./slice/tasksSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    text: inputTextReducer,
    tasks: tasksReducer,
  }),
});

export default store;
