import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos?isCompleted=false",
        {
          headers: {
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTasks = createAsyncThunk(
  "tasks/createTasks",
  async (taskText, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
          },
          body: JSON.stringify({ title: taskText }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${store.auth.token}` },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleDone = createAsyncThunk(
  "tasks/toggleDone",
  async ({ id, isDone }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const response = await fetch(
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

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || `Ошибка при обновлении задачи`);
      }

      const updated = await response.json();
      return { id: updated.id, isDone: updated.isCompleted };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = { tasks: [], status: "idle", error: null };
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(createTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.tasks.unshift(action.payload);
      })
      .addCase(createTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("Удалена задача с id:", action.payload);
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(toggleDone.pending, (state, action) => {
        const { id, isDone } = action.meta.arg;
        const task = state.tasks.find((t) => t.id === id);
        if (task) task.isCompleted = !isDone;
      })
      .addCase(toggleDone.rejected, (state, action) => {
        const { id, isDone } = action.meta.arg;
        const task = state.tasks.find((t) => t.id === id);
        if (task) task.isCompleted = isDone;
      });
  },
});

export const { editTask, toggleEditMode, setEditText } = tasksSlice.actions;
export default tasksSlice.reducer;
