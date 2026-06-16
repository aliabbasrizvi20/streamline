"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full
        p-3
        rounded-xl
        bg-zinc-900
        text-white
        border
        border-zinc-800
        outline-none
        focus:border-blue-500
      "
    />
  );
}