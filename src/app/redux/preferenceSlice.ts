import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = JSON.parse(
  typeof window !== "undefined" ? localStorage.getItem("prefs") || "[]" : "[]",
);

const preferenceSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    togglePref: (state, action: PayloadAction<string>) => {
      const exists = state.includes(action.payload);

      const updated = exists
        ? state.filter((c) => c !== action.payload)
        : [...state, action.payload];

      if (typeof window !== "undefined") {
        localStorage.setItem("prefs", JSON.stringify(updated));
      }

      return updated;
    },
  },
});

export const { togglePref } = preferenceSlice.actions;
export default preferenceSlice.reducer;
