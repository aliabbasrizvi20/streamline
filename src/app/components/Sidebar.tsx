"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Movies", path: "/movies" },
  { name: "Social", path: "/social" },
  { name: "Favorites", path: "/favorites" },
  //   { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <div className="w-56 min-h-screen bg-zinc-950 border-r border-zinc-800 p-4">
      <h2 className="text-white font-bold mb-6 text-lg">Streamline</h2>

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const active = path === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`p-3 rounded-lg text-sm font-semibold transition ${active
                  ? "bg-white text-black"
                  : "text-zinc-300 hover:bg-zinc-800"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}