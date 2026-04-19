import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{ id, name, price, image }]
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((p) => p.id === item.id);
      if (!exists) state.items.push(item);
    },
    removeFromFavorite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((p) => p.id !== id);
    },
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((p) => p.id === item.id);
      if (exists) {
        state.items = state.items.filter((p) => p.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorite, removeFromFavorite, toggleFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
