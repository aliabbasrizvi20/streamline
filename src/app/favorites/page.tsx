"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function FavoritesPage() {
  const [favs, setFavs] = useState<any[]>([]);

  useEffect(() => {
    loadFavs();
  }, []);

  function loadFavs() {
    const data = JSON.parse(localStorage.getItem("favs") || "[]");
    setFavs(data);
  }

  function removeFav(index: number) {
    const updated = [...favs];
    updated.splice(index, 1);

    setFavs(updated);
    localStorage.setItem("favs", JSON.stringify(updated));
  }

  function getImage(item: any) {

    if (item.poster_path) {
      return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    }


    if (item.image) {
      return item.image;
    }


    return "https://via.placeholder.com/300x200?text=No+Image";
  }

  function getTitle(item: any) {
    return item.title || item.name || "Untitled";
  }

  function getDesc(item: any) {
    return item.overview || item.description || item.body || "";
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>

      {favs.length === 0 ? (
        <p className="text-zinc-500">No favorites added yet</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {favs.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
            >

              <img
                src={getImage(item)}
                className="h-40 w-full object-cover rounded"
              />


              <p className="text-sm font-bold mt-2 line-clamp-2">
                {getTitle(item)}
              </p>


              <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
                {getDesc(item)}
              </p>


              <button
                onClick={() => removeFav(i)}
                className="bg-red-500 text-white w-full mt-3 p-2 font-bold rounded"
              >
                Remove from Fav
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}