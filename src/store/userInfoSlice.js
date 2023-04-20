import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload;
    },
    getUserInfo: (state) => {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions;
export const { getUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
