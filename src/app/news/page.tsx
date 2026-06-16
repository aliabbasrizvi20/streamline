"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function NewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const perPage = 8;

    useEffect(() => {
        setMounted(true);
        loadNews();
    }, []);

    async function loadNews() {
        try {
            setLoading(true);

            const res = await fetch(
                "/api/news",
                {
                    cache: "no-store" // 🔥 IMPORTANT FIX
                }
            );

            const data = await res.json();

            setNews(data?.articles ?? []);
        } catch (err) {
            console.error("News error:", err);
            setNews([]);
        } finally {
            setLoading(false);
        }
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

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginated = news.slice(start, end);

    // 🚨 prevents blank hydration flash
    if (!mounted) {
        return (
            <DashboardLayout>
                <div className="text-gray-400">
                    Loading page...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">
                News
            </h1>

            {/* LOADING */}
            {loading ? (
                <div className="text-gray-400">
                    Fetching latest news...
                </div>
            ) : news.length === 0 ? (
                <div className="text-gray-400">
                    No news found (API issue or limit reached)
                </div>
            ) : (
                <>
                    {/* GRID */}
                    <div className="grid grid-cols-4 gap-6">
                        {paginated.map((n, i) => (
                            <div
                                key={i}
                                className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 cursor-pointer hover:scale-[1.02] transition"
                                onClick={() =>
                                    window.open(
                                        n.url,
                                        "_blank"
                                    )
                                }
                            >
                                {n.image && (
                                    <img
                                        src={n.image}
                                        className="h-40 w-full object-cover rounded"
                                    />
                                )}

                                <p className="text-sm font-bold mt-2 line-clamp-2">
                                    {n.title}
                                </p>

                                <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
                                    {n.description}
                                </p>

                                <p className="text-xs text-zinc-500 mt-2">
                                    {n.source?.name}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addFav(n);
                                    }}
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
                            onClick={() =>
                                setPage(page - 1)
                            }
                            className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-white mt-2">
                            Page {page}
                        </span>

                        <button
                            disabled={end >= news.length}
                            onClick={() =>
                                setPage(page + 1)
                            }
                            className="bg-zinc-800 px-4 py-2 rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}