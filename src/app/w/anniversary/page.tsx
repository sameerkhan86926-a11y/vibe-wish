"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { shootConfetti } from "@/lib/confetti";
import { Play, Film, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AnniversaryReceiverPage() {
  const [data, setData] = useState<any>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) setData(decodeData(raw));
    }
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    shootConfetti("gold");
  };

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-600 font-bold">
        Loading Premiere...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-zinc-100 flex flex-col items-center justify-center">
      {!playing ? (
        <div className="w-full max-w-sm rounded-3xl border border-red-600/30 bg-zinc-950 p-8 text-center shadow-[0_0_50px_rgba(220,38,38,0.25)]">
          <span className="text-3xl font-black text-red-600 tracking-tighter">VIBEFLIX</span>
          <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">World Premiere for</p>
          <h1 className="mt-1 text-2xl font-bold text-white">{data.to}</h1>

          <button
            onClick={handlePlay}
            className="cursor-pointer mt-8 flex items-center justify-center gap-2 w-full rounded-full bg-red-600 py-3.5 text-xs font-black uppercase text-white shadow-lg shadow-red-600/30 active:scale-95 transition-transform"
          >
            <Play className="h-4 w-4 fill-white" /> Watch Premiere Episode
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm rounded-3xl border border-red-900/50 bg-zinc-950 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="font-black text-2xl text-red-600 tracking-tighter">VIBEFLIX</span>
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">ORIGINAL</span>
          </div>

          <div className="relative my-4 aspect-16/10 overflow-hidden rounded-2xl border border-zinc-800">
            <img
              src={data.photoUrl || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500"}
              alt="Movie Poster"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-xs font-bold text-red-400">
              {data.daysCount}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-emerald-400">{data.matchScore}</span>
            <span className="rounded border border-zinc-700 px-1 text-[10px] text-zinc-400">4K Ultra HD</span>
            <span className="rounded border border-zinc-700 px-1 text-[10px] text-zinc-400">U/A 16+</span>
          </div>

          <h3 className="mt-2 text-xl font-black text-white">{data.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-300 whitespace-pre-line">{data.synopsis}</p>

          <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs text-zinc-500">
            <span>Starring: <b className="text-zinc-200">{data.to} & {data.from}</b></span>
            <span className="text-red-500 font-bold">Top 1 in Hearts</span>
          </div>
        </div>
      )}

      <Link href="/" className="mt-8 rounded-full border border-zinc-800 px-4 py-1.5 text-xs text-zinc-400 hover:text-white">
        ⚡ Create your vibe with VibeWish
      </Link>
    </main>
  );
}
