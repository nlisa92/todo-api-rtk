import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import inputTextReducer from "../features/input/inputSlice";
import tasksReducer from "../features/tasks/tasksSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    text: inputTextReducer,
    tasks: tasksReducer,
  }),
});

export default store;
