import { configureStore } from "@reduxjs/toolkit";
import createCardReducer from "./store/createCard";
import userMakeReducer from "./store/userMake";

export const store = configureStore({
  reducer: {
    createCard: createCardReducer,
    userMake: userMakeReducer,
  },
});
