// "use client";

// import { useEffect } from "react";

// import { useAppDispatch, useAppSelector }
//   from "../redux/hooks";

// import { setFavorites }
//   from "../redux/favoriteSlice";

// export default function PersistFavorites() {

//   const dispatch = useAppDispatch();

//   const favorites =
//     useAppSelector(
//       (state) => state.favorites.items
//     );

//   useEffect(() => {
//     const stored = JSON.parse(
//       localStorage.getItem("favs") || "[]"
//     );

//     dispatch(setFavorites(stored));
//   }, [dispatch]);

//   useEffect(() => {
//     localStorage.setItem(
//       "favs",
//       JSON.stringify(favorites)
//     );
//   }, [favorites]);

//   return null;
// }