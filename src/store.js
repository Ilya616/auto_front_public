import { configureStore } from "@reduxjs/toolkit";
import createCardReducer from "./store/createCard";

export const store = configureStore({
  reducer: {
    createCard: createCardReducer,
  },
});
