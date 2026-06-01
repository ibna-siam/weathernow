import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_CITY, MAX_RECENT_SEARCHES } from "../utils/constants";

interface WeatherState {
  currentCity: string;
  recentSearches: string[];
  favoriteCities: string[];
}

const savedFavorites = localStorage.getItem("weathernow-favorites");
const savedRecents = localStorage.getItem("weathernow-recents");

const initialState: WeatherState = {
  currentCity: DEFAULT_CITY,
  recentSearches: savedRecents ? JSON.parse(savedRecents) : [],
  favoriteCities: savedFavorites ? JSON.parse(savedFavorites) : [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentCity(state, action: PayloadAction<string>) {
      state.currentCity = action.payload;
      state.recentSearches = [
        action.payload,
        ...state.recentSearches.filter((c) => c !== action.payload),
      ].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem("weathernow-recents", JSON.stringify(state.recentSearches));
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter((c) => c !== city);
      } else {
        state.favoriteCities.push(city);
      }
      localStorage.setItem("weathernow-favorites", JSON.stringify(state.favoriteCities));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteCities = state.favoriteCities.filter((c) => c !== action.payload);
      localStorage.setItem("weathernow-favorites", JSON.stringify(state.favoriteCities));
    },
    clearRecentSearches(state) {
      state.recentSearches = [];
      localStorage.removeItem("weathernow-recents");
    },
    clearFavorites(state) {
      state.favoriteCities = [];
      localStorage.removeItem("weathernow-favorites");
    },
  },
});

export const { setCurrentCity, toggleFavorite, removeFavorite, clearRecentSearches, clearFavorites } = weatherSlice.actions;
export default weatherSlice.reducer;
