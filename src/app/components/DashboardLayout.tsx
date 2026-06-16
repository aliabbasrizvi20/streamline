"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const OPTIONS = [
  "tech",
  "finance",
  "sports",
  "business",
  "entertainment",
];

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("prefs") || "[]"
    );
    setPrefs(saved);
  }, []);

  function toggle(val: string) {
    setPrefs((prev) =>
      prev.includes(val)
        ? prev.filter((p) => p !== val)
        : [...prev, val]
    );
  }

  function save() {
    localStorage.setItem("prefs", JSON.stringify(prefs));

    // notify Home page instantly
    window.dispatchEvent(
      new CustomEvent("preferencesUpdated")
    );

    setOpen(false);
    setSavedToast(true);

    setTimeout(() => setSavedToast(false), 2000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800">
        <h1 className="font-bold text-lg">Streamline</h1>

        <div className="flex items-center gap-4">
          <span className="text-xl cursor-pointer">🔔</span>

          <div
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold cursor-pointer"
          >
            U
          </div>
        </div>
      </div>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-[350px]">
            <h2 className="text-lg font-bold mb-4">
              Choose Interests
            </h2>

            <div className="flex flex-wrap gap-2">
              {OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  className={`px-3 py-1 rounded text-sm border ${prefs.includes(opt)
                      ? "bg-white text-black"
                      : "border-zinc-600"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={save}
              className="mt-5 bg-white text-black w-full py-2 rounded font-bold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {savedToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
          Preferences saved! Feed updating...
        </div>
      )}
    </div>
  );
}