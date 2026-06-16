"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function MoviesPage() {
    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);

    const perPage = 8;

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const res = await fetch(
            "https://api.themoviedb.org/3/trending/movie/day?api_key=60a0190544d9a75b17eb427b55b9fc29"
        ).then((r) => r.json());

        setMovies(res.results || []);
    }

    function addFav(item: any) {
        const prev = JSON.parse(localStorage.getItem("favs") || "[]");
        localStorage.setItem("favs", JSON.stringify([...prev, item]));
        alert("Added to Favorites");
    }


    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginated = movies.slice(start, end);

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Movies</h1>


            <div className="grid grid-cols-4 gap-6">
                {paginated.map((m) => (
                    <div
                        key={m.id}
                        className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                            className="h-40 w-full object-cover rounded"
                        />

                        <p className="text-sm font-bold mt-2 line-clamp-2">
                            {m.title}
                        </p>

                        <p className="text-yellow-400 text-sm">
                            ⭐ {m.vote_average?.toFixed(1)}
                        </p>

                        <button
                            onClick={() => addFav(m)}
                            className="bg-white text-black w-full mt-3 p-2 font-bold rounded"
                        >
                            Add to Fav
                        </button>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
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
                    disabled={end >= movies.length}
                    onClick={() => setPage(page + 1)}
                    className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </DashboardLayout>
    );
}