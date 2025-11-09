import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TODOS_URL = import.meta.env.VITE_API_TODOS;

// ==== Thunks ====
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await fetch(`${BASE_URL}${TODOS_URL}?isCompleted=false`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Ошибка при получении задач");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createTasks = createAsyncThunk(
  "tasks/createTasks",
  async (taskText, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await fetch(`${BASE_URL}${TODOS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ title: taskText }),
      });
      if (!res.ok) throw new Error("Ошибка при создании задачи");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await fetch(`${BASE_URL}${TODOS_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (!res.ok) throw new Error("Ошибка при удалении задачи");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleDone = createAsyncThunk(
  "tasks/toggleDone",
  async ({ id, isDone }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await fetch(`${BASE_URL}${TODOS_URL}/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ isCompleted: !isDone }),
      });
      if (!res.ok) throw new Error("Ошибка при обновлении задачи");
      const updated = await res.json();
      return { id: updated.id, isCompleted: updated.isCompleted };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ==== Slice ====
const initialState = {
  tasks: [],
  loadingList: false,
  loadingMutation: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
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
    toggleDoneOptimistic(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==== Fulfilled ====
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loadingList = false;
        state.tasks = action.payload;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.loadingMutation = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loadingMutation = false;
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(toggleDone.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) task.isCompleted = action.payload.isCompleted;
      })
      .addMatcher(
        isPending(getTasks, createTasks, deleteTask),
        (state, action) => {
          if (action.type.startsWith("tasks/getTasks"))
            state.loadingList = true;
          else state.loadingMutation = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(getTasks, createTasks, deleteTask),
        (state, action) => {
          state.loadingList = false;
          state.loadingMutation = false;
          state.error = action.payload;
        }
      );
  },
});

export const { editTask, toggleEditMode, setEditText, toggleDoneOptimistic } =
  tasksSlice.actions;
export default tasksSlice.reducer;
