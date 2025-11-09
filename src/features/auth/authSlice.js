import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USERS_URL = import.meta.env.VITE_API_USERS;
const AUTH_URL = import.meta.env.VITE_API_AUTH;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${USERS_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          age: Number(formData.age),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Ошибка регистрации");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Вход
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Ошибка входа");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: null,
  token: tokenFromStorage || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addMatcher(isPending(registerUser, loginUser), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(isFulfilled(registerUser), (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isFulfilled(loginUser), (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addMatcher(isRejected(loginUser, registerUser), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
