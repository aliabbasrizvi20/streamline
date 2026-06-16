"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function SocialPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const perPage = 8;

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("https://dummyjson.com/posts").then((r) =>
      r.json()
    );
    setPosts(res.posts || []);
  }

  function addFav(item: any) {
    const prev = JSON.parse(localStorage.getItem("favs") || "[]");
    localStorage.setItem("favs", JSON.stringify([...prev, item]));
    alert("Added to Favorites");
  }


  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginated = posts.slice(start, end);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Social Feed</h1>


      <div className="grid grid-cols-4 gap-6">
        {paginated.map((p) => (
          <div
            key={p.id}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
          >
            <p className="text-sm font-bold line-clamp-2">
              {p.title}
            </p>

            <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
              {p.body}
            </p>

            <div className="text-xs text-zinc-500 mt-3">
              👍 {p.reactions?.likes || 0} | 👁{" "}
              {Math.floor(Math.random() * 1000)}
            </div>

            <button
              onClick={() => addFav(p)}
              className="bg-white text-black w-full mt-3 p-2 font-bold rounded"
            >
              Add to Fav
            </button>
          </div>
        ))}
      </div>


      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-white mt-2">Page {page}</span>

        <button
          disabled={end >= posts.length}
          onClick={() => setPage(page + 1)}
          className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
}