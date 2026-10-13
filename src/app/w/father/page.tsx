"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { shootConfetti } from "@/lib/confetti";
import { Award, BookOpen } from "lucide-react";
import Link from "next/link";

export default function FatherReceiverPage() {
  const [data, setData] = useState<any>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) setData(decodeData(raw));
    }
  }, []);

  const handleOpen = () => {
    setOpened(true);
    shootConfetti("gold");
  };

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-950 text-amber-400 font-serif">
        Loading Edition...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-12 text-stone-100 flex flex-col items-center justify-center">
      {!opened ? (
        <div className="w-full max-w-sm rounded-3xl border border-amber-600/40 bg-stone-900 p-8 text-center shadow-2xl">
          <Award className="mx-auto h-12 w-12 text-amber-400 animate-pulse" />
          <p className="mt-4 text-xs font-serif uppercase tracking-widest text-amber-500">Official Tribute Edition For</p>
          <h1 className="mt-1 font-serif text-2xl font-bold text-white">{data.to}</h1>

          <button
            onClick={handleOpen}
            className="cursor-pointer mt-8 flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 py-3.5 text-xs font-bold tracking-wider uppercase text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
          >
            <BookOpen className="h-4 w-4" /> Open Magazine Cover
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm rounded-2xl border-4 border-stone-300 bg-stone-900 p-6 shadow-2xl">
          <div className="border-b-4 border-amber-500 pb-2 text-center">
            <h2 className="font-serif text-3xl font-black tracking-widest text-amber-400">FORBES</h2>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Person of the Year • Special Tribute</p>
          </div>

          <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-lg border border-stone-700">
            <img
              src={data.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"}
              alt="Leader"
              className="h-full w-full object-cover contrast-105"
            />
            <div className="absolute bottom-0 inset-x-0 bg-red-600 px-3 py-1 text-xs font-black uppercase text-white">
              HONORING: {data.headline}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-xs text-amber-400 font-serif font-bold">
              <span>{data.rank}</span>
              <span>{data.netWorth}</span>
            </div>

            <div className="mt-3 rounded-lg bg-stone-800/90 p-4 font-serif text-xs leading-relaxed text-stone-200 border-l-2 border-amber-500 whitespace-pre-line">
              "{data.message}"
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-3 text-xs text-stone-400 font-serif">
            <span>Special Dedication</span>
            <span className="font-bold text-amber-400">— {data.from}</span>
          </div>
        </div>
      )}

      <Link href="/" className="mt-8 rounded-full border border-stone-800 px-4 py-1.5 text-xs text-stone-400 hover:text-white">
        ⚡ Create one with VibeWish
      </Link>
    </main>
  );
}
