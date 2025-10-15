import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const newTask = {
        id: Date.now(),
        title: action.payload,
        isDone: false,
        isEdit: false,
        editText: "",
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleDone(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    editTask(state, action) {
      const { id, newTitle } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = newTitle;
        task.isEdit = false;
      }
    },
    toggleEditMode(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isEdit = !task.isEdit;
        task.editText = task.title;
      }
    },

    setEditText(state, action) {
      const { taskId, text } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) task.editText = text;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleDone,
  editTask,
  toggleEditMode,
  setEditText,
} = tasksSlice.actions;
export default tasksSlice.reducer;
