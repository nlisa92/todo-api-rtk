import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

const inputSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
    zero(state) {
      state.value = "";
    },
  },
});

export const { change, zero } = inputSlice.actions;
export default inputSlice.reducer;
