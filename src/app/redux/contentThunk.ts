// import { AppDispatch } from "./store";
// import { setNews, setMovies, setSocial } from "./contentSlice";

// import { getNews } from "../services/newsApi";
// import { getMovies } from "../services/movieapi";
// import { getSocialPosts } from "../services/socialApi";

// export const loadDashboardContent =
//   () => async (dispatch: AppDispatch) => {
//     try {
//       const [news, movies, social] = await Promise.all([
//         getNews(),
//         getMovies(),
//         getSocialPosts(),
//       ]);

//       dispatch(setNews(news));
//       dispatch(setMovies(movies));
//       dispatch(setSocial(social));
//     } catch (error) {
//       console.error(error);
//     }
//   };