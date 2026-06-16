import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavItem = {
  id: string | number;
  type: string;
  title: string;
  image?: string;
  description?: string;
};

const initialState: FavItem[] = JSON.parse(
  typeof window !== "undefined"
    ? localStorage.getItem("favs") || "[]"
    : "[]"
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavItem>) => {
      const exists = state.find((f) => f.id === action.payload.id);

      let updated;

      if (exists) {
        updated = state.filter((f) => f.id !== action.payload.id);
      } else {
        updated = [...state, action.payload];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("favs", JSON.stringify(updated));
      }

      return updated;
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;