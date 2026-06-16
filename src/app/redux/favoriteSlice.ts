import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavItem = {
  id: string | number;
  type: string;
  title: string;
  image?: string;
  description?: string;
};

const loadFromStorage = (): FavItem[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  } catch {
    return [];
  }
};

const saveToStorage = (data: FavItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favs", JSON.stringify(data));
  }
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: loadFromStorage(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavItem>) => {
      const exists = state.find(
        (f) => f.id === action.payload.id
      );

      let updated;

      if (exists) {
        updated = state.filter(
          (f) => f.id !== action.payload.id
        );
      } else {
        updated = [...state, action.payload];
      }

      saveToStorage(updated);
      return updated;
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;