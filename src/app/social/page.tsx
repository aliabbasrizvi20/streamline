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

  // pagination logic
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginated = posts.slice(start, end);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Social Feed</h1>

      {/* GRID */}
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

      {/* PAGINATION CONTROLS */}
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
// "use client";

// import { useEffect, useState } from "react";
// import { toggleFav } from "../utils/favorite";

// type Social = {
//   id: number;
//   title: string;
//   body: string;
//   tags?: string[];
//   reactions?: {
//     likes: number;
//     dislikes: number;
//   };
//   views?: number;
// };

// export default function SocialPage() {
//   const [socialData, setSocialData] = useState<Social[]>([]);
//   const [favIds, setFavIds] = useState<number[]>([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   // ---------------- LOAD FAVS ----------------
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("favs") || "[]");
//     setFavIds(stored.map((f: any) => f.id));
//   }, []);

//   // ---------------- FETCH ----------------
//   async function fetchSocial() {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `https://dummyjson.com/posts?limit=10&skip=${page * 10}`
//       );

//       const data = await res.json();
//       setSocialData((prev) => [...prev, ...(data.posts || [])]);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchSocial();
//   }, [page]);

//   // ---------------- FAVORITES ----------------
//   function handleFav(item: any) {
//     toggleFav(item);

//     const stored = JSON.parse(localStorage.getItem("favs") || "[]");
//     setFavIds(stored.map((f: any) => f.id));
//   }

//   const isFav = (id: number) => favIds.includes(id);

//   // ---------------- SEARCH ----------------
//   const filteredData = socialData.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">

//       {/* HEADER */}
//       <div className="mb-6">

//         <h1 className="text-3xl font-bold text-white">
//           📱 Social Feed
//         </h1>

//         <p className="text-zinc-400 text-sm mt-1">
//           Latest posts from community
//         </p>

//         {/* SEARCH */}
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search posts..."
//           className="mt-4 w-full p-3 rounded-xl bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 outline-none"
//         />

//       </div>

//       {/* EMPTY */}
//       {!loading && filteredData.length === 0 && (
//         <p className="text-center text-zinc-500">
//           No posts found
//         </p>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {filteredData.map((item) => (
//           <div
//             key={item.id}
//             className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col hover:bg-zinc-800 transition"
//           >

//             {/* TITLE */}
//             <h2 className="font-semibold text-white text-lg">
//               {item.title}
//             </h2>

//             {/* BODY */}
//             <p className="text-zinc-400 text-sm mt-2 line-clamp-4">
//               {item.body}
//             </p>

//             {/* TAGS */}
//             <div className="flex flex-wrap gap-2 mt-3">
//               {item.tags?.map((tag, i) => (
//                 <span
//                   key={i}
//                   className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full border border-zinc-700"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>

//             {/* STATS */}
//             <div className="flex justify-between mt-4 text-sm text-zinc-500">
//               <span>👍 {item.reactions?.likes}</span>
//               <span>👎 {item.reactions?.dislikes}</span>
//               <span>👀 {item.views}</span>
//             </div>

//             {/* FAVORITE */}
//             <button
//               onClick={() =>
//                 handleFav({
//                   id: item.id,
//                   type: "social",
//                   title: item.title,
//                   description: item.body,
//                 })
//               }
//               className="mt-4 w-full py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition flex items-center justify-center gap-2"
//             >
//               {isFav(item.id) ? (
//                 <span className="text-red-400 text-lg">❤️ Favorited</span>
//               ) : (
//                 <span className="text-zinc-400 text-lg">
//                   🤍 Add to Favorites
//                 </span>
//               )}
//             </button>

//           </div>
//         ))}

//       </div>

//       {/* LOAD MORE */}
//       <div className="text-center mt-8">
//         <button
//           onClick={() => setPage((p) => p + 1)}
//           disabled={loading}
//           className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700"
//         >
//           {loading ? "Loading..." : "Load More"}
//         </button>
//       </div>

//     </div>
//   );
// }