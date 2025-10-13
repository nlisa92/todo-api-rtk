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
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task
      );
    },
    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.newTitle }
          : task
      );
    },
    toggleEditMode(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isEdit: !task.isEdit, editText: task.title }
          : task
      );
    },

    setEditText(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, editText: action.payload.text }
          : task
      );
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
