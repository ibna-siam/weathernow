import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  unit: "celsius" | "fahrenheit";
  darkMode: boolean;
}

const savedDarkMode = localStorage.getItem("weathernow-darkmode") === "true";

const initialState: SettingsState = {
  unit: "celsius",
  darkMode: savedDarkMode,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
    },
    setUnit(state, action: PayloadAction<"celsius" | "fahrenheit">) {
      state.unit = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("weathernow-darkmode", String(state.darkMode));
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      localStorage.setItem("weathernow-darkmode", String(state.darkMode));
    },
  },
});

export const { toggleUnit, setUnit, toggleDarkMode, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
