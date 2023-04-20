import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "store/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
