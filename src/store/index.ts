import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
