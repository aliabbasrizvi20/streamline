"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [drag, setDrag] = useState<{
    index: number;
    type: string;
  } | null>(null);

  useEffect(() => {
    loadAll();

    const handler = () => loadAll();

    window.addEventListener(
      "preferencesUpdated",
      handler
    );

    return () =>
      window.removeEventListener(
        "preferencesUpdated",
        handler
      );
  }, []);

  async function loadAll() {
    try {
      setLoading(true);

      const prefs = JSON.parse(
        localStorage.getItem("prefs") || "[]"
      );

      let newsUrl;

      if (prefs.length > 0) {
        const query = encodeURIComponent(
          prefs.join(" OR ")
        );

        newsUrl = `/api/news?q=${query}`;
      } else {
        newsUrl = "/api/news";
      }

      const [newsRes, movieRes, postRes] =
        await Promise.all([
          fetch(newsUrl, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(
            "https://api.themoviedb.org/3/trending/movie/day?api_key=60a0190544d9a75b17eb427b55b9fc29"
          ).then((r) => r.json()),
          fetch("https://dummyjson.com/posts").then((r) =>
            r.json()
          ),
        ]);

      setNews(newsRes?.articles ?? []);
      setMovies(movieRes?.results ?? []);
      setPosts(postRes?.posts ?? []);
    } catch (err) {
      console.error(err);
      setNews([]);
      setMovies([]);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  function openArticle(url: string) {
    if (url) window.open(url, "_blank");
  }

  function addFav(item: any) {
    const prev = JSON.parse(
      localStorage.getItem("favs") || "[]"
    );

    localStorage.setItem(
      "favs",
      JSON.stringify([...prev, item])
    );

    alert("Added to Favorites");
  }


  function handleDragStart(index: number, type: string) {
    setDrag({ index, type });
  }


  function handleDrop(index: number, type: string) {
    if (!drag || drag.type !== type) return;

    const reorder = (
      list: any[],
      setter: any
    ) => {
      const updated = [...list];

      const draggedItem = updated[drag.index];
      if (!draggedItem) return;

      updated.splice(drag.index, 1);
      updated.splice(index, 0, draggedItem);

      setter(updated);
    };

    if (type === "news") reorder(news, setNews);
    if (type === "movies") reorder(movies, setMovies);
    if (type === "posts") reorder(posts, setPosts);

    setDrag(null);
  }

  function Skeleton() {
    return (
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-4 rounded animate-pulse"
          >
            <div className="h-40 bg-zinc-800 rounded mb-3" />
            <div className="h-4 bg-zinc-800 rounded mb-2" />
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard Feed
        </h1>

        <button
          onClick={loadAll}
          disabled={loading}
          className="bg-white text-black px-4 py-2 rounded font-bold"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>


      <h2 className="text-xl font-bold mb-3">
        📰 News
      </h2>

      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-4 gap-6 mb-10">
          {news.slice(0, 8).map((n, i) => (
            <div
              key={n.url || i}
              draggable
              onDragStart={() =>
                handleDragStart(i, "news")
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                handleDrop(i, "news")
              }
              className="bg-zinc-900 rounded overflow-hidden cursor-move"
              onClick={() => openArticle(n.url)}
            >
              {n.image && (
                <img
                  src={n.image}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-3">
                <p className="text-sm font-bold line-clamp-2">
                  {n.title}
                </p>

                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                  {n.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addFav(n);
                  }}
                  className="bg-white text-black w-full mt-3 p-2 font-bold"
                >
                  Add to Fav
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      <h2 className="text-xl font-bold mb-3">
        🎬 Movies
      </h2>

      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-4 gap-6 mb-10">
          {movies.slice(0, 8).map((m, i) => (
            <div
              key={m.id}
              draggable
              onDragStart={() =>
                handleDragStart(i, "movies")
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                handleDrop(i, "movies")
              }
              className="bg-zinc-900 p-4 rounded cursor-move"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                className="h-40 w-full object-cover rounded"
              />

              <p className="text-sm font-bold mt-2">
                {m.title}
              </p>

              <button
                onClick={() => addFav(m)}
                className="bg-white text-black w-full mt-3 p-2 font-bold"
              >
                Add to Fav
              </button>
            </div>
          ))}
        </div>
      )}


      <h2 className="text-xl font-bold mb-3">
        💬 Social
      </h2>

      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {posts.slice(0, 8).map((p, i) => (
            <div
              key={p.id}
              draggable
              onDragStart={() =>
                handleDragStart(i, "posts")
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                handleDrop(i, "posts")
              }
              className="bg-zinc-900 p-4 rounded cursor-move"
            >
              <p className="text-sm font-bold line-clamp-2">
                {p.title}
              </p>

              <p className="text-xs text-zinc-400 line-clamp-3 mt-1">
                {p.body}
              </p>

              <button
                onClick={() => addFav(p)}
                className="bg-white text-black w-full mt-3 p-2 font-bold"
              >
                Add to Fav
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
