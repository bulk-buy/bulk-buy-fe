import { createSlice } from "@reduxjs/toolkit";
import { UsersTesting } from "constants/UsersTesting";

const initialState = {
  cognito: {},
  user: {
    ...UsersTesting[0],
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getCognitoInfo: (state) => {
      return state.cognito;
    },
    setCognitoInfo: (state, action) => {
      let newState = { ...state };
      newState.cognito = action.payload;
      return newState;
    },
    getUserInfo: (state) => {
      return state.user;
    },
    setUserInfo: (state, action) => {
      let newState = { ...state };
      newState.user = action.payload;
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
/* Getters */
export const { getCognitoInfo, getUserInfo } = userInfoSlice.actions;
/* Setters */
export const { setCognitoInfo, setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
