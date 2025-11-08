import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ==== Thunks ====

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await fetch(
        "https://todo-redev.herokuapp.com/api/todos?isCompleted=false",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
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
      const res = await fetch("https://todo-redev.herokuapp.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ title: taskText }),
      });
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
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${auth.token}` },
      });
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
      const res = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ isCompleted: !isDone }),
        }
      );
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
      const t = state.tasks.find((t) => t.id === id);
      if (t) {
        t.title = newTitle;
        t.isEdit = false;
      }
    },
    toggleEditMode(state, action) {
      const t = state.tasks.find((t) => t.id === action.payload);
      if (t) {
        t.isEdit = !t.isEdit;
        t.editText = t.title;
      }
    },
    setEditText(state, action) {
      const { taskId, text } = action.payload;
      const t = state.tasks.find((t) => t.id === taskId);
      if (t) t.editText = text;
    },
    toggleDoneOptimistic: (state, action) => {
      const t = state.tasks.find((t) => t.id === action.payload);
      if (t) t.isCompleted = !t.isCompleted;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==== getTasks ====
      .addCase(getTasks.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loadingList = false;
        state.tasks.length = 0;
        state.tasks.push(...action.payload);
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload;
      })

      // ==== createTasks ====
      .addCase(createTasks.pending, (state) => {
        state.loadingMutation = true;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.loadingMutation = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTasks.rejected, (state, action) => {
        state.loadingMutation = false;
        state.error = action.payload;
      })

      // ==== deleteTask ====
      .addCase(deleteTask.pending, (state, action) => {
        state.loadingMutation = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loadingMutation = false;
        const idx = state.tasks.findIndex((t) => t.id === action.payload);
        if (idx !== -1) state.tasks.splice(idx, 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loadingMutation = false;
        state.error = action.payload;
      })

      // ==== toggleDone ====

      .addCase(toggleDone.fulfilled, (state, action) => {
        const { id, isCompleted } = action.payload;
        const t = state.tasks.find((t) => t.id === id);
        if (t) t.isCompleted = isCompleted;
      });
  },
});

export const { editTask, toggleEditMode, setEditText, toggleDoneOptimistic } =
  tasksSlice.actions;
export default tasksSlice.reducer;
