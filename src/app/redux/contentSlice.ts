// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ContentState {
//   news: any[];
//   movies: any[];
//   social: any[];
// }

// const initialState: ContentState = {
//   news: [],
//   movies: [],
//   social: [],
// };

// const contentSlice = createSlice({
//   name: "content",
//   initialState,
//   reducers: {
//     setNews: (state, action: PayloadAction<any[]>) => {
//       state.news = action.payload;
//     },

//     setMovies: (state, action: PayloadAction<any[]>) => {
//       state.movies = action.payload;
//     },

//     setSocial: (state, action: PayloadAction<any[]>) => {
//       state.social = action.payload;
//     },
//   },
// });

// export const {
//   setNews,
//   setMovies,
//   setSocial,
// } = contentSlice.actions;

// export default contentSlice.reducer;