import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "userInfo",
  initialState: undefined,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});
