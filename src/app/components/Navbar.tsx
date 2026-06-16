"use client";

import SearchBar from "./SearchBar";

type NavbarProps = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({
  search = "",
  setSearch = () => {},
}: NavbarProps) {
  return (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between">

      <h1 className="text-xl font-bold text-white">
        Streamline
      </h1>

      <div className="w-96">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-4">

        <button className="text-white">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          U
        </div>

      </div>

    </nav>
  );
}