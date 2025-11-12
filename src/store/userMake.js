import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userMake = createSlice({
  name: "userMake",
  initialState,
  reducers: {
    setUser: (state, change) => {
      state.value = change.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userMake.actions;

export default userMake.reducer;
