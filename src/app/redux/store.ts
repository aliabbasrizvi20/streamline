import { configureStore } from "@reduxjs/toolkit";
import preferenceReducer from "./preferenceSlice";
import favoriteReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    preferences: preferenceReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
